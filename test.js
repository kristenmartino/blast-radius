// Click-tests build/index.html in headless Chrome: every screen at 360, 390 and 414 px in light and dark with no
// horizontal overflow (study-kit's width helper), the lane picker and level filter, routes, the theme switch,
// persistence after a reload, and study-kit's idle-write check against a database stand-in that sorts keys.
// Run: node build.js && node test.js
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = (() => { try { return require('playwright'); } catch (e) { return require('/opt/npm-tools/node_modules/playwright'); } })();
const { overflow, shell, WIDTHS, SCHEMES } = require('./vendor/study-kit/widths.js');

const SCRATCH = process.env.SCRATCH || require('os').tmpdir();
// claude.ai serves the artifact body inside its own document; shell() reproduces that wrapper.
const html = fs.readFileSync(path.join(__dirname, 'build', 'index.html'), 'utf8');
const body = html.replace(/^[\s\S]*?<head>/, '').replace(/<\/head>\s*<body>/, '').replace(/<\/body>\s*<\/html>\s*$/, '').replace(/<meta[^>]*>/g, '').replace(/<title>.*?<\/title>/, '');
const file = path.join(SCRATCH, 'blast-radius-test.html');
fs.writeFileSync(file, shell(body));
const URL = 'file://' + file;

let pass = 0; const fails = [];
function ok(c, m) { if (c) pass++; else { fails.push(m); console.log('FAIL', m); } }

(async () => {
  const browser = await chromium.launch();
  const errs = [];
  const newPage = async (opts, init) => {
    const binds = (opts || {}).__bindings; if (opts) delete opts.__bindings;
    const ctx = await browser.newContext(Object.assign({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }, opts));
    for (const k in (binds || {})) await ctx.exposeBinding(k, binds[k]);
    await ctx.route('**/*', r => r.request().url().startsWith('file:') ? r.continue() : r.abort());
    if (init) await ctx.addInitScript(init);
    const page = await ctx.newPage(); page.setDefaultTimeout(6000);
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    return { ctx, page };
  };
  const fit = async (page, label) => { const r = await overflow(page); ok(r.ok, 'overflow ' + label + ' ' + JSON.stringify(r)); };
  const act = (page, a, id) => page.locator('[data-act="' + a + '"]' + (id ? '[data-id="' + id + '"]' : '')).first().click();

  // ---- 1. every screen, every width, both themes
  for (const w of WIDTHS) for (const scheme of SCHEMES) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: 800 }, colorScheme: scheme });
    const tag = w + ' ' + scheme;
    await page.goto(URL); await page.waitForSelector('.lanebtn');
    await fit(page, tag + ' home');
    await page.goto(URL + '#lane-cio'); await page.waitForSelector('.secrow');
    await fit(page, tag + ' CIO lane');
    for (const h of ['#lesson-om-1', '#lesson-om-2', '#lesson-om-4', '#lesson-om-5', '#lesson-ec-1', '#lesson-ec-3', '#lesson-ec-5', '#prompts-cio', '#packet-br-1', '#packet-br-6', '#packet-br-7', '#stage-br-1-2', '#stage-br-6-1', '#stage-br-7-2', '#run-brn-1', '#run-brn-2', '#rp-brl-1', '#rp-brl-3']) {
      await page.goto(URL + h); await page.waitForTimeout(150); await fit(page, tag + ' ' + h);
    }
    await page.goto(URL + '#lesson-om-3'); await page.waitForSelector('[data-act="check-pick"]');
    await page.locator('[data-act="check-pick"]').first().click(); await page.waitForSelector('.verdict');
    await fit(page, tag + ' lesson with a checked answer');
    await page.goto(URL + '#lane-cio'); await page.waitForSelector('.secrow');
    await page.evaluate(() => { BANK.tmay.pendingOk = false; location.hash = '#tmay-cio'; }); await page.waitForSelector('.beat');
    await fit(page, tag + ' TMAY');
    await page.goto(URL + '#craft'); await page.waitForTimeout(150); await fit(page, tag + ' craft list');
    await page.goto(URL + '#sims'); await page.waitForTimeout(150); await fit(page, tag + ' sims list');
    // the forced themes too (the switch sets data-theme)
    await page.goto(URL); await page.waitForSelector('.lanebtn');
    await act(page, 'theme', scheme === 'dark' ? 'light' : 'dark');
    await fit(page, tag + ' home, forced other theme');
    await ctx.close();
  }

  // ---- 2. lane picker, level filter, routes, theme, reload
  {
    const { ctx, page } = await newPage();
    await page.goto(URL); await page.waitForSelector('.lanebtn');
    const lanes = await page.locator('.lanebtn').evaluateAll(b => b.map(x => ({ id: x.dataset.id, off: x.disabled, t: x.textContent })));
    ok(lanes.map(l => l.id).join() === 'cio,ai-leadership,data-leadership,cto,ciso', 'lane order ' + lanes.map(l => l.id).join());
    ok(lanes.filter(l => !l.off).map(l => l.id).join() === 'cio', 'only CIO active');
    ok(lanes.every(l => !/\b(CDO|CRO|CPO|CCO)\b/.test(l.t)), 'no colliding bare acronyms in lane names');
    await page.locator('.lanebtn[data-id="cto"]').click({ force: true }); await page.waitForTimeout(100);
    ok(await page.locator('.lanebtn').count() === 5, 'a disabled lane does not open');
    const tog = await page.locator('[data-act="level"]').evaluateAll(b => b.map(x => x.dataset.id + ':' + x.getAttribute('aria-pressed')));
    ok(tog.join() === 'director:true,vp:true,c-level:true', 'levels default to all on ' + tog.join());
    await act(page, 'level', 'director'); await act(page, 'level', 'vp');
    ok(await page.locator('[data-act="level"][data-id="c-level"]').getAttribute('aria-pressed') === 'true' && await page.locator('[data-act="level"][aria-pressed="true"]').count() === 1, 'filter narrows to C-level');
    await act(page, 'level', 'c-level'); await page.waitForTimeout(100);
    ok(await page.locator('[data-act="level"][aria-pressed="true"]').count() === 1 && await page.locator('.toast').count() === 1, 'last level cannot be turned off (toast)');
    await act(page, 'lane', 'cio'); await page.waitForSelector('.secrow');
    ok(/#lane-cio$/.test(page.url()), 'opening CIO sets #lane-cio');
    ok(/C-level/.test(await page.locator('.playtop .meta').textContent()), 'lane header shows the level filter');
    ok(await page.locator('.secrow').count() === 9 && /Operating model/.test(await page.locator('.secrow').first().textContent()), 'CIO lane lists its sections');
    await page.reload(); await page.waitForSelector('.secrow');
    ok(await page.locator('[data-act="level"][aria-pressed="true"]').count() === 1, 'level filter survives a reload');
    await act(page, 'home'); await page.waitForSelector('.lanebtn');
    ok(/last visited/.test(await page.locator('.lanebtn[data-id="cio"]').textContent()), 'last lane remembered');
    await page.goto(URL + '#lane-cto'); await page.waitForSelector('.lanebtn');
    ok(true, 'inactive lane route falls back to home');
    await page.goto(URL + '#lane-cio'); await page.waitForSelector('.secrow');
    await act(page, 'theme', 'dark');
    ok(await page.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'theme switch sets dark');
    await page.reload(); await page.waitForSelector('.secrow');
    ok(await page.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'theme survives a reload');
    await act(page, 'theme', 'system');
    ok(await page.evaluate(() => document.documentElement.hasAttribute('data-theme')) === false, 'system theme clears the override');
    ok(await page.evaluate(() => window.StudyKit.version) === 'v0.2.0' || await page.evaluate(() => /0\.2\.0/.test(window.StudyKit.version)), 'study-kit v0.2.0 loaded');
    await ctx.close();
  }

  // ---- 2b. Phase 1 content: lane lists, level filter on content, lessons, prompts, packets, the sim's best path
  {
    const { ctx, page } = await newPage();
    const BANK = await (async () => { await page.goto(URL); await page.waitForSelector('.lanebtn'); return page.evaluate(() => BANK); })();
    await page.goto(URL + '#lane-cio'); await page.waitForSelector('.itemrow');
    ok(await page.locator('#cio-operating-model .itemrow').count() === 6, 'lane lists 6 lessons');
    ok(await page.locator('#cio-portfolio-cases .itemrow').count() === 6, 'lane lists 6 cases');
    ok(await page.locator('#cio-renewal-sim .itemrow').count() === 1 && await page.locator('#cio-behavioral .itemrow').count() === 1, 'lane lists the sim and the prompts');
    ok(await page.locator('.secrow .soon').count() === 0, 'every CIO section now has content');
    ok(/OK which two beats/.test(await page.locator('#cio-tmay').textContent()) && await page.locator('#cio-tmay .itemrow').count() === 0, 'TMAY held back until the stressed beats are OK\'d');
    ok(await page.locator('#cio-operating-model .cchip.draft, #cio-portfolio-cases .cchip.draft, #cio-renewal-sim .cchip.draft, #cio-behavioral .cchip.draft').count() === 0, 'reviewed Phase 1 items carry no Draft label (Kristen, Nov 24)');
    ok(await page.locator('#cio-economics .cchip.draft').count() === 5 && await page.locator('#cio-first-90 .cchip.draft').count() === 1 && await page.locator('#cio-cost-sim .cchip.draft').count() === 1 && await page.locator('#cio-role-plays .cchip.draft').count() === 3, 'new Phase 2 items carry Draft labels');
    // C-level only: the Director-only case and Director/VP items drop out
    await act(page, 'level', 'director'); await act(page, 'level', 'vp');
    const cases = await page.locator('#cio-portfolio-cases .itemrow b').allTextContents();
    ok(cases.length === 3 && cases.indexOf('Sunsetting a legacy order system') === -1, 'C-level filter: cases ' + cases.join(' / '));
    ok(await page.locator('#cio-renewal-sim .itemrow').count() === 0 && /1 more hidden/.test(await page.locator('#cio-renewal-sim').textContent()), 'C-level filter hides the Director/VP sim and says so');
    ok(await page.locator('#cio-operating-model .itemrow').count() === 5, 'C-level filter: 5 lessons');
    await act(page, 'level', 'director'); await act(page, 'level', 'vp');
    // lesson: answer one check right and one wrong
    await page.goto(URL + '#lesson-om-1'); await page.waitForSelector('[data-act="check-pick"]');
    const c1 = BANK.modules[0].checks.find(c => c.id === 'OM-01'), c2 = BANK.modules[0].checks.find(c => c.id === 'OM-02');
    await page.locator('[data-act="check-pick"][data-id="OM-01"][data-j="' + c1.answer + '"]').click(); await page.waitForTimeout(80);
    const wrong = (c2.answer + 1) % 4;
    await page.locator('[data-act="check-pick"][data-id="OM-02"][data-j="' + wrong + '"]').click(); await page.waitForTimeout(80);
    const v = await page.locator('.verdict').allTextContents();
    ok(v.join() === 'Right,Not quite', 'checks mark right and wrong ' + v.join());
    ok(await page.locator('#check-om-02 .is-correct').count() === 1 && await page.locator('#check-om-02 .is-wrong').count() === 1, 'wrong pick shows the answer and the pick');
    ok((await page.locator('#check-om-02').textContent()).indexOf(c2.whyNot[wrong]) !== -1, 'wrong pick shows its whyNot');
    ok(await page.locator('#check-om-02 [data-act="check-pick"]:not([disabled])').count() === 0, 'answered check locks');
    ok(await page.locator('.src a[href^="https://"]').count() === 2, 'lesson 1 lists its two sources');
    await page.locator('a.btn-primary').click(); await page.waitForTimeout(150);
    ok(/#lesson-om-2$/.test(page.url()), 'Next goes to lesson 2');
    await act(page, 'lane', 'cio'); await page.waitForSelector('.itemrow');
    ok(/#lane-cio$/.test(page.url()), 'lesson back button returns to the lane');
    // answer positions are spread
    const pos = [].concat(...BANK.modules.map(m => m.checks.map(c => c.answer)), ...BANK.runs.map(r => r.steps.map(s => s.answer)));
    ok([0, 1, 2, 3].every(j => pos.filter(x => x === j).length >= 3), 'answer positions spread across A to D ' + pos.join(''));
    // prompts
    await page.goto(URL + '#prompts-cio'); await page.waitForSelector('.stem');
    ok(await page.locator('.stem').count() === 10, '10 prompts');
    const hrefs = await page.locator('.src a').evaluateAll(a => a.map(x => x.getAttribute('href')));
    ok(hrefs.length >= 13 && hrefs.every(h => /^https:\/\/claude\.ai\/artifact\/J5TiiDwLanHF9oMU1UFPJ6#(story-\d+|f\d+)$/.test(h)), 'story links point at Story Bank cards (' + hrefs.length + ')');
    for (const r of ['CIO', 'Director of IT', 'VP Business Systems', 'Head of Enterprise Applications']) ok((await page.locator('.roles .pill').allTextContents()).indexOf(r) !== -1, 'prompts cover ' + r);
    // packets and stages: numbers filled, no placeholders anywhere in the page data
    ok(!/\{\{/.test(JSON.stringify(BANK)), 'no unfilled {{placeholders}} in the page data');
    await page.goto(URL + '#packet-br-1'); await page.waitForTimeout(200);
    ok(/Two ERPs after an acquisition/.test(await page.locator('main').textContent()), 'packet BR-1 opens');
    await page.goto(URL + '#stage-br-1-2'); await page.waitForSelector('#craft-text');
    ok(/Three-year cost/.test(await page.locator('main').textContent()), 'stage BR-1.2 opens');
    ok(BANK.craft[0].stages[1].checklist.indexOf('Option A totals $2,380,500') !== -1, 'checklist numbers filled from the math module');
    // sim: best path ends at 100% predictability and the top ending
    await page.goto(URL + '#run-brn-1'); await page.waitForSelector('.opts');
    const steps = BANK.runs[0].steps;
    for (let i = 0; i < steps.length; i++) {
      await page.locator('[data-act="run-pick"][data-j="' + steps[i].answer + '"]').click(); await page.waitForTimeout(120);
      const nx = page.locator('[data-act="run-next"]'); if (await nx.count()) { await nx.first().click(); await page.waitForTimeout(120); }
    }
    const end = await page.locator('main').textContent();
    ok(/100(\.0)?%/.test(end) && /A renewal the CFO trusts/.test(end), 'sim best path: 100% and the top ending');
    await fit(page, '390 sim result');

    // Phase 2a: economics checks, BR-7 tables, BRN-2 best path, role-plays without Claude, TMAY
    await page.goto(URL + '#lesson-ec-5'); await page.waitForSelector('[data-act="check-pick"]');
    ok(/Technology economics/.test(await page.locator('.playtop').textContent()), 'economics lesson header');
    const ec10 = BANK.modules[1].checks.find(c => c.id === 'EC-10');
    await page.locator('[data-act="check-pick"][data-id="EC-10"][data-j="' + ec10.answer + '"]').click(); await page.waitForTimeout(80);
    ok(/Right/.test(await page.locator('#check-ec-10 .verdict').textContent()), 'EC-10 keyed answer marks right');
    ok(await page.locator('.src a[href^="https://"]').count() === 1, 'lesson ec-5 lists its source');
    const b7 = BANK.craft.find(p => p.id === 'BR-7');
    ok(b7 && JSON.stringify(b7.sections).indexOf('Orderwell') !== -1 && JSON.stringify(b7.sections).indexOf('In house') !== -1, 'BR-7 tables rendered from data/br7.json');
    ok(b7.stages[1].checklist.indexOf('Order management notice is due in 15 days') !== -1, 'BR-7 checklist numbers filled');
    await page.goto(URL + '#run-brn-2'); await page.waitForSelector('.opts');
    const st2 = BANK.runs.find(r => r.id === 'BRN-2').steps;
    for (let i = 0; i < st2.length; i++) {
      await page.locator('[data-act="run-pick"][data-j="' + st2[i].answer + '"]').click(); await page.waitForTimeout(120);
      const nx = page.locator('[data-act="run-next"]'); if (await nx.count()) { await nx.first().click(); await page.waitForTimeout(120); }
    }
    const end2 = await page.locator('main').textContent();
    ok(/100(\.0)?%/.test(end2) && /Costs that scale with value/.test(end2), 'BRN-2 best path: 100% and the top ending');
    await page.goto(URL + '#run-brn-2'); await page.waitForTimeout(150);
    await page.locator('[data-act="run-replay"]').click(); await page.waitForTimeout(120);
    await page.locator('[data-act="run-pick"][data-j="' + ((st2[0].answer + 1) % 4) + '"]').first().click(); await page.waitForTimeout(120);
    ok(/BRN-2-01|Q1/.test(await page.locator('main').textContent()), 'BRN-2 replay and a wrong pick render');
    for (const id of ['brl-1', 'brl-2', 'brl-3']) {
      await page.goto(URL + '#rp-' + id); await page.waitForSelector('.fbblock');
      ok(/opens with/.test(await page.locator('main').textContent()), 'role-play ' + id + ' shows the opening line without Claude');
    }
    await page.goto(URL + '#lane-cio'); await page.waitForSelector('.secrow');
    ok(await page.locator('#cio-role-plays .itemrow').count() === 3 && await page.locator('#cio-cost-sim .itemrow').count() === 1 && await page.locator('#cio-first-90 .itemrow').count() === 1 && await page.locator('#cio-economics .itemrow').count() === 5, 'lane lists the Phase 2a content');
    await page.goto(URL + '#tmay-cio'); await page.waitForTimeout(150);
    ok(/#lane-cio|#tmay-cio/.test(page.url()) && await page.locator('.beat').count() === 0, 'TMAY route stays closed while pending');
    await page.evaluate(() => { BANK.tmay.pendingOk = false; location.hash = '#lane-cio'; }); await page.waitForTimeout(100);
    await page.evaluate(() => { location.hash = '#tmay-cio'; }); await page.waitForSelector('.beat');
    ok(await page.locator('.beat').count() === 5 && await page.locator('.beat.stressed').count() === 2, 'TMAY: five beats, two stressed');
    const secs = await page.locator('.beat .secs').allTextContents();
    const lo = secs.reduce((a, x) => a + +x.split(/\D+/)[0], 0), hi = secs.reduce((a, x) => a + +x.split(/\D+/)[1], 0);
    ok(Math.abs(lo - 60) <= 1 && Math.abs(hi - 75) <= 1, 'TMAY budgets sum to about 60 and 75 seconds (' + lo + ', ' + hi + ')');
    ok(await page.locator('a[href="https://claude.ai/artifact/J5TiiDwLanHF9oMU1UFPJ6#practice"]').count() === 1, 'TMAY links the bank’s career introduction');
    ok(!/I started at Towers Watson/.test(JSON.stringify(BANK)), 'no Story Bank text is copied into the page');
    await ctx.close();
  }

  // ---- 3. idle-write check (study-kit's method): a database that returns keys sorted; no writes once idle
  {
    // The stand-in database lives in the test process (exposeBinding), so it survives the reload that plays the
    // second device. An earlier version kept it in sessionStorage, which came back empty after the file:// reload in
    // 4 of 20 runs (Measured Nov 24); that was the intermittent "second device" failure.
    const STORE = {};
    const { ctx, page } = await newPage({ __bindings: { __dbGet: () => JSON.stringify(STORE), __dbPut: (src, p, d) => { STORE[p] = d; } } }, () => {
      const sortKeys = v => Array.isArray(v) ? v.map(sortKeys) : v && typeof v === 'object' ? Object.keys(v).sort().reduce((o, k) => { o[k] = sortKeys(v[k]); return o; }, {}) : v;
      // docs live in sessionStorage so a reload acts like a second device (localStorage cleared, account kept)
      const docs = {}, ready = window.__dbGet().then(j => Object.assign(docs, JSON.parse(j))), sets = {}; window.__docs = docs; window.__sets = sets;
      const mkRef = p => { const ls = []; const snap = () => ({ exists: !!docs[p], data: () => docs[p] ? JSON.parse(JSON.stringify(docs[p])) : undefined });
        return { set: async d => { sets[p] = (sets[p] || 0) + 1; docs[p] = sortKeys(JSON.parse(JSON.stringify(d))); window.__dbPut(p, docs[p]); setTimeout(() => ls.forEach(f => f(snap())), 5); }, onSnapshot: next => { ls.push(next); ready.then(() => setTimeout(() => next(snap()), 30)); return () => {}; } }; };
      const refs = {}, db = { doc: p => refs[p] || (refs[p] = mkRef(p)) };
      window.claude = { use: async n => n === 'db' ? db : n === 'user' ? { id: async () => 'u_loop' } : null };
    });
    await page.goto(URL); await page.waitForSelector('.lanebtn');
    await page.waitForTimeout(800);
    ok(/Saved to your account/.test(await page.locator('#prefs-saved').textContent()), 'save line shows the account once db attaches');
    await act(page, 'level', 'director');
    await act(page, 'lane', 'cio'); await page.waitForSelector('.secrow');
    await page.waitForTimeout(5000);
    const n = await page.evaluate(() => Object.assign({}, window.__sets));
    await page.waitForTimeout(3000);
    const n2 = await page.evaluate(() => Object.assign({}, window.__sets));
    ok((n['data/users/u_loop/prefs'] || 0) >= 1, 'idle-write: prefs document written (' + JSON.stringify(n) + ')');
    ok(JSON.stringify(n2) === JSON.stringify(n), 'idle-write: no further writes once idle (' + JSON.stringify(n) + ' then ' + JSON.stringify(n2) + ')');
    ok(!n['data/users/u_loop/craft'] && !n['data/users/u_loop/sims'], 'idle-write: empty Craft and Simulations documents are never written');
    const d = await page.evaluate(() => window.__docs['data/users/u_loop/prefs']);
    ok(d && d.prefs && d.prefs.levels && d.prefs.levels.v.join() === 'vp,c-level' && d.prefs.lane.v === 'cio', 'idle-write: prefs hold the filter and lane ' + JSON.stringify(d && d.prefs));
    // a second device: the stored copy loads, and loading it writes nothing
    await page.evaluate(() => localStorage.clear()); await page.goto(URL); await page.reload(); await page.waitForSelector('.lanebtn'); await page.waitForTimeout(3000);
    ok(await page.locator('[data-act="level"][aria-pressed="true"]').count() === 2, 'second device: filter comes from the account');
    const n3 = await page.evaluate(() => Object.assign({}, window.__sets));
    ok(JSON.stringify(n3) === '{}', 'second device: loading writes nothing (' + JSON.stringify(n3) + ')');
    await ctx.close();
  }

  await browser.close();
  ok(!errs.length, 'page errors: ' + errs.join(' | '));
  console.log(pass + ' passed, ' + fails.length + ' failed');
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
