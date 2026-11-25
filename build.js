// Builds build/index.html from index.src.html, the lane data, Craft packets and Simulations, after validating them.
// Engines come from study-kit, pinned in vendor/study-kit/VERSION. Never edit the vendored files by hand.
// `node build.js --record` adds every current link id to published-ids.json (run after a publish).
'use strict';
const fs = require('fs');
const path = require('path');
const here = __dirname;
const { loadCraft } = require('./vendor/study-kit/tools/craft-parse.js');
const { validateSims } = require('./vendor/study-kit/tools/sims-validate.js');
const L = require('./lanes.js');

const errors = [];
const levelIds = new Set(L.levels.map(l => l.id));
const laneIds = [], sectionIds = [], seen = new Set();
const claim = (id, w) => { if (seen.has(id)) errors.push(w + ': duplicate id ' + id); seen.add(id); };
// Link ids use the dash form only (#lane-cio, #stage-cf-1-1): published links keep the dash form (study-kit accepts dots too since v0.2.1).
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
for (const l of L.levels) if (!ID.test(l.id)) errors.push('level ' + l.id + ': bad id');
for (const ln of L.lanes) {
  if (!ID.test(ln.id)) errors.push('lane ' + ln.id + ': bad id');
  claim(ln.id, 'lane'); laneIds.push(ln.id);
  if (!ln.name || !ln.blurb || !ln.short) errors.push('lane ' + ln.id + ': name, short and blurb required');
}
if (L.lanes.filter(l => l.active).map(l => l.id).join() !== 'cio,ai-leadership,data-leadership,cto,ciso') errors.push('Phase 4b: the CIO, AI leadership, Data leadership, CTO and CISO lanes are active');
const ACTIVE = L.lanes.filter(l => l.active);
for (const ln of ACTIVE) if (!Array.isArray(ln.roles) || !ln.roles.length || !(L.sections[ln.id] || []).length) errors.push('active lane ' + ln.id + ': roles and sections required');
for (const lane in L.sections) {
  if (laneIds.indexOf(lane) === -1) errors.push('sections for unknown lane ' + lane);
  for (const s of L.sections[lane]) { const id = lane + '-' + s.id; if (!ID.test(id)) errors.push('section ' + id + ': bad id'); claim(id, 'section'); sectionIds.push(id); }
}

// Numbers: math/numbers.js and math/numbers.py must agree to the cent before anything is built.
const { compute, flat, fill, money } = require('./math/numbers.js');
const mc = require('./math/check.js').check();
if (mc.errs.length) errors.push('math cross-check failed:\n  ' + mc.errs.join('\n  '));
const NUM = compute(), FL = flat(NUM);
// {{table:b7.apps}} and {{table:b7.contracts}} render data/br7.json as markdown tables, so the packet and the math read one source.
const D7 = require('./data/br7.json');
const TABLES = {
  'b7.apps': ['| Application | Function | Business owner | Users | Annual cost | Contract |', '|---|---|---|---|---|---|']
    .concat(D7.apps.map(a => '| ' + a.name + ' | ' + a.fn + ' | ' + (a.owner || '—') + ' | ' + a.users.toLocaleString('en-US') + ' | ' + money(a.cost) + ' | ' + (a.contract || 'In house') + ' |')).join('\n'),
  'b7.contracts': ['| Contract | Vendor | Annual value | Renews in | Notice | Auto-renews for |', '|---|---|---|---|---|---|']
    .concat(D7.contracts.map(c => '| ' + c.id + ' | ' + c.vendor + ' | ' + money(c.value) + ' | ' + c.renewDays + ' days | ' + c.noticeDays + ' days | ' + c.autoYears + (c.autoYears === 1 ? ' year' : ' years') + ' |')).join('\n')
};
// Phase 2b tables: BR-8 (shown rows and category counts over all 200) and BR-11 (inventory and contracts).
{ const D8 = require('./data/br8.json'), D11 = require('./data/br11.json');
  const CAT = { self: 'Drafting or summarizing', dup: 'Duplicate of another request', vendor: 'Buy an AI tool', low: 'No owner or measurable outcome', build: 'Process automation', risk: 'Decision about customers or staff' };
  const RISK = { L: 'Low', M: 'Medium', H: 'High' };
  TABLES['b8.shown'] = ['| Id | Request | Unit | Council’s category | Value | Feasibility | Risk | Pod-weeks |', '|---|---|---|---|---|---|---|---|']
    .concat(D8.rows.slice(0, D8.shown).map(r => '| ' + r.id + ' | ' + r.title + (r.dupOf ? ' (same need as ' + r.dupOf + ')' : '') + ' | ' + r.unit + ' | ' + CAT[r.cat] + ' | ' + r.value + ' | ' + r.feas + ' | ' + RISK[r.risk] + ' | ' + (r.pw || '—') + ' |')).join('\n');
  TABLES['b8.cats'] = ['| Council’s category | Requests (all 200) | High risk |', '|---|---|---|']
    .concat(Object.keys(CAT).map(k => '| ' + CAT[k] + ' | ' + D8.rows.filter(r => r.cat === k).length + ' | ' + D8.rows.filter(r => r.cat === k && r.risk === 'H').length + ' |'))
    .concat(['| Total | ' + D8.rows.length + ' | ' + D8.rows.filter(r => r.risk === 'H').length + ' |']).join('\n');
  TABLES['b11.tools'] = ['| Tool | Use | Owner | Source | Decides for customers | Tested | Annual cost | Contract |', '|---|---|---|---|---|---|---|---|']
    .concat(D11.tools.map(x => '| ' + x.name + ' | ' + x.use + ' | ' + (x.owner || '—') + ' | ' + x.source + ' | ' + (x.customerDecision ? 'Yes' : 'No') + ' | ' + (x.tested ? 'Yes' : 'No') + ' | ' + (x.cost ? money(x.cost) : 'In house') + ' | ' + (x.contract || '—') + ' |')).join('\n');
  TABLES['b11.contracts'] = ['| Contract | Vendor | Annual value | Renews in | Notice | Vendor may train on our data |', '|---|---|---|---|---|---|']
    .concat(D11.contracts.map(c => '| ' + c.id + ' | ' + c.vendor + ' | ' + money(c.value) + ' | ' + c.renewDays + ' days | ' + c.noticeDays + ' days | ' + (c.trainsOnData ? 'Yes' : 'No') + ' |')).join('\n'); }
// Phase 3a table: BR-12 (Ashgrove Outfitters' dataset inventory, the customer rows shown, and the full-extract counts).
{ const D12 = require('./data/br12.json'), B = NUM.b12;
  TABLES['b12.inventory'] = ['| Id | Dataset | Domain | Owner | Feeds the board pack | Days since refresh | Tests | Queries, last 30 days | Cost a month |', '|---|---|---|---|---|---|---|---|---|']
    .concat(D12.inventory.map(r => '| ' + r.id + ' | ' + r.name + ' | ' + r.domain + ' | ' + (r.owner || '—') + ' | ' + (r.feedsBoard ? 'Yes' : 'No') + ' | ' + r.refreshDays + ' | ' + r.tests + ' | ' + r.q30.toLocaleString('en-US') + ' | ' + money(r.cost) + ' |')).join('\n');
  TABLES['b12.customers'] = ['| Customer | Account | Internal test account | Days since last order | Paid orders, last 12 months (after refunds) | Days since last email open, click or visit |', '|---|---|---|---|---|---|']
    .concat(D12.customers.slice(0, D12.shown).map(c => '| ' + c.id + ' | ' + c.status[0].toUpperCase() + c.status.slice(1) + ' | ' + (c.test ? 'Yes' : 'No') + ' | ' + (c.lastOrder < 0 ? 'Never' : c.lastOrder) + ' | ' + c.orders12 + ' | ' + (c.engage < 0 ? 'None' : c.engage) + ' |')).join('\n');
  TABLES['b12.counts'] = ['| Customers in the full extract, counted by | Count |', '|---|---|', '| Sales’s definition | ' + B.sales + ' |', '| Marketing’s definition | ' + B.mkt + ' |', '| Finance’s definition | ' + B.fin + ' |',
    '| All three definitions | ' + B.all3 + ' |', '| At least one definition | ' + B.any + ' |', '| No definition | ' + B.none + ' |', '| Internal test accounts | ' + B.testAcc + ' |', '| Extract size | ' + B.cust + ' |'].join('\n'); }
// Phase 3b tables: BR-13 (Halyard's services and incidents) and BR-14 (Corrin's inventory).
{ const D13 = require('./data/br13.json'), D14 = require('./data/br14.json'), yn = b => b ? 'Yes' : 'No';
  TABLES['b13.services'] = ['| Id | Service | Owning team | Customer-facing | Deployments | Needed intervention | Median lead time (days) | Runtime support ends in | Requests, last 30 days | Cloud cost a month |', '|---|---|---|---|---|---|---|---|---|---|']
    .concat(D13.services.map(r => '| ' + r.id + ' | ' + r.name + ' | ' + (r.team || '—') + ' | ' + yn(r.customer) + ' | ' + r.deploys + ' | ' + r.fails + ' | ' + (r.deploys ? r.leadDays : '—') + ' | ' + (r.eosDays < 0 ? '—' : r.eosDays + ' days') + ' | ' + (r.req30 ? (r.req30 * 1000).toLocaleString('en-US') : '0') + ' | ' + money(r.cost) + ' |')).join('\n');
  TABLES['b13.incidents'] = ['| Id | Service | Minutes down | Cause |', '|---|---|---|---|'].concat(D13.incidents.map(i => '| ' + i.id + ' | ' + i.service + ' | ' + i.minutes + ' | ' + i.cause + ' |')).join('\n');
  TABLES['b14.systems'] = ['| Id | System | Changes last quarter | Interest (engineer-weeks a quarter) | Effort (engineer-weeks) | Criticality | Sets us apart | Market product | Seam | Users |', '|---|---|---|---|---|---|---|---|---|---|']
    .concat(D14.systems.map(r => '| ' + r.id + ' | ' + r.name + ' | ' + r.changes + ' | ' + r.interest + ' | ' + r.effort + ' | ' + r.critical + ' | ' + yn(r.diff) + ' | ' + yn(r.market) + ' | ' + yn(r.seam) + ' | ' + r.users.toLocaleString('en-US') + ' |')).join('\n'); }
// Phase 4b tables: BR-15 (Calloway's findings and tools) and BR-16 (quarterly figures and investments).
{ const D15 = require('./data/br15.json'), D16 = require('./data/br16.json'), yn = b => b ? 'Yes' : 'No';
  TABLES['b15.findings'] = ['| Id | System | Finding | Internet-facing | KEV | Severity | Days open | Owner | Exception |', '|---|---|---|---|---|---|---|---|---|']
    .concat(D15.findings.map(r => '| ' + r.id + ' | ' + r.system + ' | ' + r.finding + ' | ' + yn(r.internet) + ' | ' + yn(r.kev) + ' | ' + r.severity + ' | ' + r.ageDays + ' | ' + (r.owner || '—') + ' | ' + (r.exception === null ? '—' : r.exception < 0 ? 'Expired ' + (-r.exception) + ' days ago' : 'Expires in ' + r.exception + ' days') + ' |')).join('\n');
  TABLES['b15.tools'] = ['| Id | Tool | Category | Cost a year | Coverage | Owner |', '|---|---|---|---|---|---|']
    .concat(D15.tools.map(r => '| ' + r.id + ' | ' + r.tool + ' | ' + r.category + ' | $' + r.costK + 'k | ' + r.coverage + '% | ' + (r.owner || '—') + ' |')).join('\n');
  TABLES['b16.quarters'] = ['| Quarter | KEV due | Fixed in time | Median detection (hours) | Median containment (hours) | Admins | Admins on phishing-resistant MFA | Critical vendors | Reviewed in 12 months | Severity 1 | Severity 2 | Phishing tests sent | Clicked | Budget | Spend |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|']
    .concat(D16.quarters.map(q => '| ' + [q.q, q.kevDue, q.kevMet, q.mttdH, q.mttcH, q.admins, q.adminsPR, q.critVendors, q.critReviewed, q.sev1, q.sev2, q.sent.toLocaleString('en-US'), q.clicked, '$' + q.planK.toLocaleString('en-US') + 'k', '$' + q.spentK.toLocaleString('en-US') + 'k'].join(' | ') + ' |')).join('\n');
  TABLES['b16.investments'] = ['| Id | Investment | First-year cost | Cuts expected loss a year |', '|---|---|---|---|']
    .concat(D16.investments.map(i => '| ' + i.id + ' | ' + i.name + ' | $' + i.costK + 'k | $' + i.cutK + 'k |')).join('\n'); }
const tables = t => t.replace(/\{\{table:([a-z0-9.]+)\}\}/g, (m, k) => { if (!TABLES[k]) throw new Error('unknown table ' + m); return TABLES[k]; });

// Content. Every item carries level tags from L.levels.
// Craft: fill {{placeholders}} in craft-src/*.md and in the checklists, then parse with study-kit.
const craftDefs = require('./craft-stages.js');
const craftDir = path.join(here, 'build', 'craft');
fs.mkdirSync(craftDir, { recursive: true });
for (const d of craftDefs) {
  try { fs.writeFileSync(path.join(craftDir, d.file), fill(tables(fs.readFileSync(path.join(here, 'craft-src', d.file), 'utf8')), FL)); }
  catch (e) { errors.push(d.id + ': ' + e.message); }
  for (const st of d.stages) {
    try { st.checklist = st.checklist.map(c => fill(c, FL)); } catch (e) { errors.push(st.id + ': ' + e.message); }
    if (!levelIds.has(st.level)) errors.push(st.id + ': stage level must be one of ' + Array.from(levelIds).join(', '));
  }
}
const craft = loadCraft(craftDefs, { dir: craftDir, idPrefix: 'BR', takenIds: new Set() });
// BR-6's table is typed in the markdown; it must match the numbers module row for row.
{ const md = fs.existsSync(path.join(craftDir, 'br-6-portfolio.md')) ? fs.readFileSync(path.join(craftDir, 'br-6-portfolio.md'), 'utf8') : '';
  for (const a of NUM.b6.apps) if (md.indexOf('| ' + a.name + ' | ' + a.value + ' | ' + a.fit + ' | ' + money(a.cost) + ' |') === -1) errors.push('BR-6 table row for ' + a.name + ' does not match math/numbers.js');
  const key = (md.split('### Classification')[1] || '').split('###')[0];
  for (const q of ['Invest', 'Migrate', 'Tolerate', 'Eliminate']) { const line = (key.match(new RegExp('- ' + q + ': (.*)')) || [])[1] || ''; const want = NUM.b6.apps.filter(a => a.quad === q).map(a => a.name).join(', ') + '.'; if (line !== want) errors.push('BR-6 key ' + q + ' is "' + line + '", numbers say "' + want + '"'); } }
errors.push(...craft.errors);
const sims = validateSims({ runs: require('./sims-runs.js'), roleplays: require('./sims-roleplay.js'), runPrefix: 'BRN', rpPrefix: 'BRL', takenIds: new Set(craft.ids) });
errors.push(...sims.errors);
for (const x of [].concat(craftDefs, sims.runs, sims.roleplays)) {
  if (!Array.isArray(x.levels) || !x.levels.length || x.levels.some(v => !levelIds.has(v))) errors.push(x.id + ': levels must be a non-empty list of ' + Array.from(levelIds).join(', '));
  if (laneIds.indexOf(x.lane) === -1) errors.push(x.id + ': unknown lane ' + x.lane);
}

// Operating model module and behavioral prompts.
// Shared modules: lessons and two keyed checks per lesson. Lesson ids <prefix>-n, check ids <PREFIX>-nn.
const MODS = [
  { id: 'operating-model', title: 'Operating model', prefix: 'om', data: require('./content/opmodel.js') },
  { id: 'economics', title: 'Technology economics', prefix: 'ec', data: require('./content/economics.js') },
  { id: 'strategy', title: 'AI strategy and portfolio', prefix: 'as', data: require('./content/strategy.js') },
  { id: 'data-strategy', title: 'Data strategy and governance', prefix: 'dst', data: require('./content/dst.js') },
  { id: 'data-products', title: 'Data products and analytics value', prefix: 'dpv', data: require('./content/dpv.js') },
  { id: 'tech-strategy', title: 'Technology strategy and architecture governance', prefix: 'ts', data: require('./content/techstrat.js') },
  { id: 'engineering-delivery', title: 'Engineering org and delivery', prefix: 'ed', data: require('./content/delivery.js') },
  { id: 'risk', title: 'Risk, security and incident leadership', prefix: 'rk', data: require('./content/risk.js') },
  { id: 'security-program', title: 'Security program and board reporting', prefix: 'sp', data: require('./content/secprog.js') }
];
const LINKS = require('./content/links.js');
const BP = require('./content/prompts.js'), TMAY = require('./content/tmay.js'), TMAYD = require('./content/tmay-data.js'), TMAYC = require('./content/tmay-cto.js'), TMAYS = require('./content/tmay-ciso.js');
const allLessons = [].concat(...MODS.map(m => m.data.lessons)), allChecks = [].concat(...MODS.map(m => m.data.checks));
const lessonIds = allLessons.map(l => l.id), checkIds = allChecks.map(c => c.id), promptIds = BP.prompts.map(p => p.id);
const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
for (const m of MODS) {
  if (!laneIds.some(ln => sectionIds.indexOf(ln + '-' + m.id) !== -1)) errors.push('module ' + m.id + ' has no section in any lane');
  for (const l of m.data.lessons) {
    claim(l.id, 'lesson');
    if (!new RegExp('^' + m.prefix + '-\\d+$').test(l.id) || !l.title || !Array.isArray(l.body) || !l.body.length) errors.push(l.id + ': id ' + m.prefix + '-n, title and body required');
    if (!Array.isArray(l.levels) || !l.levels.length || l.levels.some(v => !levelIds.has(v))) errors.push(l.id + ': bad levels');
    for (const src of l.sources) if (!/^https:\/\//.test(src[1]) || !/^(Read|Relayed|Inferred)/.test(src[2])) errors.push(l.id + ': source needs an https link and a tier');
    for (const p of l.body) if (!/\((Read|Relayed|Inferred)/.test(p) && !/Going Concern|later phase|In an interview|At Director level/.test(p)) errors.push(l.id + ': every paragraph needs a tier tag: ' + p.slice(0, 50));
    { const n = m.data.checks.filter(c => c.lesson === l.id).length; if (n !== 2 && !(l.id === 'ec-6' && n === 4)) errors.push(l.id + ': needs two checks (ec-6: four, approved Nov 24)'); }
  }
  for (const c of m.data.checks) {
    claim(c.id, 'check');
    if (!new RegExp('^' + m.prefix.toUpperCase() + '-\\d\\d$').test(c.id) || !m.data.lessons.some(l => l.id === c.lesson)) errors.push(c.id + ': bad id or lesson');
    if (!Array.isArray(c.options) || c.options.length !== 4 || !(c.answer >= 0 && c.answer < 4) || !c.why || words(c.stem) < 6) errors.push(c.id + ': four options, an answer, a why and a stem');
    for (let j = 0; j < 4; j++) if (j !== c.answer && !(c.whyNot && c.whyNot[j])) errors.push(c.id + ': option ' + j + ' needs a whyNot');
    if (c.whyNot && c.whyNot[c.answer]) errors.push(c.id + ': the answer has a whyNot');
    if (!Array.isArray(c.levels) || !c.levels.length || c.levels.some(v => !levelIds.has(v))) errors.push(c.id + ': bad levels');
  }
}
// Every lane-tagged run, packet and role-play names one of its lane's sections.
for (const x of [].concat(craftDefs, sims.runs, sims.roleplays)) for (const ln of [x.lane].concat(x.alsoIn || [])) if (sectionIds.indexOf(ln + '-' + x.section) === -1) errors.push(x.id + ': unknown section ' + ln + '-' + x.section);
// Links out: https only, to another app's published id; every active lane with a links section has a list.
for (const ln in LINKS) { if (sectionIds.indexOf(ln + '-links') === -1) errors.push('links for ' + ln + ' but no links section');
  for (const g of LINKS[ln]) for (const x of g.items) if (!/^https:\/\/claude\.ai\/artifact\/[A-Za-z0-9]+#[a-z0-9-]+$/.test(x.url) || !x.title || !x.app || !x.note) errors.push('link ' + (x.title || '?') + ': artifact URL with a route, title, app and note required'); }
for (const id of sectionIds) if (/-links$/.test(id) && !LINKS[id.replace(/-links$/, '')]) errors.push(id + ': no links listed');
// TMAY: five beats with budgets that add up to the target range (rounding allowed: one second each way).
{ const lo = TMAY.beats.reduce((a, b) => a + b.lo, 0), hi = TMAY.beats.reduce((a, b) => a + b.hi, 0);
  if (TMAY.beats.length !== 5 || Math.abs(lo - 60) > 1 || Math.abs(hi - 75) > 1) errors.push('TMAY: five beats summing to 60 and 75 seconds (got ' + lo + ', ' + hi + ')');
  if (TMAY.beats.filter(b => b.stressed).length !== 2) errors.push('TMAY: two stressed beats');
  if (TMAYD.closes.map(c => c.role).sort().join() !== Array.from(new Set(L.lanes.find(l => l.id === 'data-leadership').roles)).sort().join()) errors.push('TMAY data: one close per data-leadership title');
  if (TMAYC.closes.map(c => c.role).sort().join() !== Array.from(new Set(L.lanes.find(l => l.id === 'cto').roles)).sort().join()) errors.push('TMAY CTO: one close per CTO-lane title');
  if (TMAYS.closes.map(c => c.role).sort().join() !== Array.from(new Set(L.lanes.find(l => l.id === 'ciso').roles)).sort().join()) errors.push('TMAY CISO: one close per CISO-lane title');
  if (TMAY.closes.map(c => c.role).sort().join() !== Array.from(new Set(L.lanes.find(l => l.id === 'cio').roles)).sort().join()) errors.push('TMAY: one close per CIO-family title'); }
const ROLES = {}; for (const ln of ACTIVE) ROLES[ln.id] = new Set(ln.roles);
for (const p of BP.prompts) {
  if (!p.lane) p.lane = 'cio';
  if (!ROLES[p.lane]) errors.push(p.id + ': lane ' + p.lane + ' is not active');
  claim(p.id, 'prompt');
  if (!/^BP-\d\d$/.test(p.id) || !p.prompt || !p.tests || !p.level || !p.stories.length) errors.push(p.id + ': id, prompt, tests, level and stories required');
  if (p.roles.some(r => !(ROLES[p.lane] && ROLES[p.lane].has(r)))) errors.push(p.id + ': role not in lane ' + p.lane);
  if (!Array.isArray(p.levels) || !p.levels.length || p.levels.some(v => !levelIds.has(v))) errors.push(p.id + ': bad levels');
  for (const st of p.stories) if (!/^https:\/\/claude\.ai\/artifact\/J5TiiDwLanHF9oMU1UFPJ6#(story-\d+|f\d+)$/.test(st.url)) errors.push(p.id + ': bad story link');
}
for (const x of [].concat(allLessons, allChecks, BP.prompts, craftDefs, sims.runs, sims.roleplays, [TMAY, TMAYD, TMAYC, TMAYS])) if (x.status !== 'Draft' && x.status !== '') errors.push(x.id + ': status must be Draft or empty');
for (const ln in ROLES) for (const r of ROLES[ln]) if (!BP.prompts.some(p => p.lane === ln && p.roles.indexOf(r) !== -1)) errors.push('no prompt for ' + ln + ' role ' + r);
if (BP.prompts.filter(p => p.lane === 'cio').length !== 10) errors.push('the CIO lane keeps its 10 behavioral prompts');

// Published link ids: the build refuses to drop any.
const PUB = path.join(here, 'published-ids.json');
const pub = JSON.parse(fs.readFileSync(PUB, 'utf8'));
const now = { lanes: laneIds, levels: Array.from(levelIds), sections: sectionIds, craft: craft.ids, sims: sims.ids, lessons: lessonIds, checks: checkIds, prompts: promptIds };
for (const k of Object.keys(now)) for (const id of (pub[k] || [])) if (now[k].indexOf(id) === -1) errors.push('published ' + k + ' id ' + id + ' is missing; links depend on it');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
if (process.argv.includes('--record')) {
  const rec = { note: pub.note };
  for (const k of Object.keys(now)) rec[k] = Array.from(new Set((pub[k] || []).concat(now[k])));
  fs.writeFileSync(PUB, JSON.stringify(rec, null, 1) + '\n');
  console.log('recorded', Object.keys(now).map(k => rec[k].length + ' ' + k).join(', '));
}

const read = f => fs.readFileSync(path.join(here, f), 'utf8');
const kitVersion = read('vendor/study-kit/VERSION').split('\n')[0].trim();
// study-kit drops fields it does not know; carry lane and level tags across for the lane screen.
for (const p of craft.packets) { const d = craftDefs.find(x => x.id === p.id); p.lane = d.lane; p.levels = d.levels; p.section = d.section; p.stages.forEach((s, i) => { s.level = d.stages[i].level; }); }
const bank = { lanes: L.lanes, levels: L.levels, sections: L.sections, craft: craft.packets, runs: sims.runs, roleplays: sims.roleplays, kitVersion,
  modules: MODS.map(m => ({ id: m.id, title: m.title, lessons: m.data.lessons, checks: m.data.checks })), prompts: BP.prompts, storyBankVersion: BP.storyBankVersion, tmay: TMAY, tmayData: TMAYD, tmayCto: TMAYC, tmayCiso: TMAYS, links: LINKS };
const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
const json = JSON.stringify(bank).replace(/<\//g, '<\\/').split(LS).join('\\u2028').split(PS).join('\\u2029');
const tpl = read('index.src.html');
for (const t of ['__BANK__', '__STUDY_KIT__', '__SHELL_CSS__', '__KIT_CSS__']) if (tpl.split(t).length !== 2) { console.error('template must contain one ' + t); process.exit(1); }
const kit = read('vendor/study-kit/study-kit.js').replace(/<\//g, '<\\/');
const out = tpl.replace('__SHELL_CSS__', () => read('vendor/study-kit/shell.css')).replace('__KIT_CSS__', () => read('vendor/study-kit/study-kit.css'))
  .replace('__STUDY_KIT__', () => kit).replace('__BANK__', () => json);
fs.mkdirSync(path.join(here, 'build'), { recursive: true });
fs.writeFileSync(path.join(here, 'build', 'index.html'), out);
fs.writeFileSync(path.join(here, 'build', 'bank.json'), JSON.stringify(bank));   // for blind-check exports; not published
console.log('study-kit', kitVersion, '· lanes', laneIds.length, '(active: ' + L.lanes.filter(l => l.active).map(l => l.id).join(', ') + ') · sections', sectionIds.length, '· craft', craft.packets.length, '(' + craft.packets.reduce((n, p) => n + p.stages.length, 0) + ' stages)', '· lessons', lessonIds.length, '· checks', checkIds.length, '· prompts', promptIds.length, '· math', mc.n + ' values, JS = Python', '· runs', sims.runs.length, '· role-plays', sims.roleplays.length, '· bytes', Buffer.byteLength(out));
