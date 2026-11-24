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
    const ctx = await browser.newContext(Object.assign({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 }, opts));
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
    ok(await page.locator('.secrow').count() === 7 && /Operating model/.test(await page.locator('.secrow').first().textContent()), 'CIO lane lists its sections');
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

  // ---- 3. idle-write check (study-kit's method): a database that returns keys sorted; no writes once idle
  {
    const { ctx, page } = await newPage({}, () => {
      const sortKeys = v => Array.isArray(v) ? v.map(sortKeys) : v && typeof v === 'object' ? Object.keys(v).sort().reduce((o, k) => { o[k] = sortKeys(v[k]); return o; }, {}) : v;
      // docs live in sessionStorage so a reload acts like a second device (localStorage cleared, account kept)
      const docs = JSON.parse(sessionStorage.getItem('__docs') || '{}'), sets = {}; window.__docs = docs; window.__sets = sets;
      const mkRef = p => { const ls = []; const snap = () => ({ exists: !!docs[p], data: () => docs[p] ? JSON.parse(JSON.stringify(docs[p])) : undefined });
        return { set: async d => { sets[p] = (sets[p] || 0) + 1; docs[p] = sortKeys(JSON.parse(JSON.stringify(d))); sessionStorage.setItem('__docs', JSON.stringify(docs)); setTimeout(() => ls.forEach(f => f(snap())), 5); }, onSnapshot: next => { ls.push(next); setTimeout(() => next(snap()), 30); return () => {}; } }; };
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
