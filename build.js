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
// Link ids use the dash form only (#lane-cio, #stage-cf-1-1): study-kit v0.2.0's craft.route rejects dots.
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
for (const l of L.levels) if (!ID.test(l.id)) errors.push('level ' + l.id + ': bad id');
for (const ln of L.lanes) {
  if (!ID.test(ln.id)) errors.push('lane ' + ln.id + ': bad id');
  claim(ln.id, 'lane'); laneIds.push(ln.id);
  if (!ln.name || !ln.blurb || !ln.short) errors.push('lane ' + ln.id + ': name, short and blurb required');
}
if (L.lanes.filter(l => l.active).map(l => l.id).join() !== 'cio') errors.push('Phase 0/1: only the CIO lane is active');
for (const lane in L.sections) {
  if (laneIds.indexOf(lane) === -1) errors.push('sections for unknown lane ' + lane);
  for (const s of L.sections[lane]) { const id = lane + '-' + s.id; if (!ID.test(id)) errors.push('section ' + id + ': bad id'); claim(id, 'section'); sectionIds.push(id); }
}

// Numbers: math/numbers.js and math/numbers.py must agree to the cent before anything is built.
const { compute, flat, fill, money } = require('./math/numbers.js');
const mc = require('./math/check.js').check();
if (mc.errs.length) errors.push('math cross-check failed:\n  ' + mc.errs.join('\n  '));
const NUM = compute(), FL = flat(NUM);

// Content. Every item carries level tags from L.levels.
// Craft: fill {{placeholders}} in craft-src/*.md and in the checklists, then parse with study-kit.
const craftDefs = require('./craft-stages.js');
const craftDir = path.join(here, 'build', 'craft');
fs.mkdirSync(craftDir, { recursive: true });
for (const d of craftDefs) {
  try { fs.writeFileSync(path.join(craftDir, d.file), fill(fs.readFileSync(path.join(here, 'craft-src', d.file), 'utf8'), FL)); }
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
const OM = require('./content/opmodel.js'), BP = require('./content/prompts.js');
const lessonIds = OM.lessons.map(l => l.id), checkIds = OM.checks.map(c => c.id), promptIds = BP.prompts.map(p => p.id);
const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
for (const l of OM.lessons) {
  claim(l.id, 'lesson');
  if (!/^om-\d+$/.test(l.id) || !l.title || !Array.isArray(l.body) || !l.body.length) errors.push(l.id + ': id om-n, title and body required');
  if (!Array.isArray(l.levels) || !l.levels.length || l.levels.some(v => !levelIds.has(v))) errors.push(l.id + ': bad levels');
  for (const s of l.sources) if (!/^https:\/\//.test(s[1]) || !/^(Read|Relayed|Inferred)/.test(s[2])) errors.push(l.id + ': source needs an https link and a tier');
  for (const p of l.body) if (!/\((Read|Relayed|Inferred)/.test(p) && !/Going Concern|later phase|In an interview|At Director level/.test(p)) errors.push(l.id + ': every paragraph needs a tier tag: ' + p.slice(0, 50));
  if (OM.checks.filter(c => c.lesson === l.id).length !== 2) errors.push(l.id + ': needs exactly two checks');
}
for (const c of OM.checks) {
  claim(c.id, 'check');
  if (!/^OM-\d\d$/.test(c.id) || lessonIds.indexOf(c.lesson) === -1) errors.push(c.id + ': bad id or lesson');
  if (!Array.isArray(c.options) || c.options.length !== 4 || !(c.answer >= 0 && c.answer < 4) || !c.why || words(c.stem) < 6) errors.push(c.id + ': four options, an answer, a why and a stem');
  for (let j = 0; j < 4; j++) if (j !== c.answer && !(c.whyNot && c.whyNot[j])) errors.push(c.id + ': option ' + j + ' needs a whyNot');
  if (c.whyNot && c.whyNot[c.answer]) errors.push(c.id + ': the answer has a whyNot');
  if (!Array.isArray(c.levels) || !c.levels.length || c.levels.some(v => !levelIds.has(v))) errors.push(c.id + ': bad levels');
}
const ROLES = new Set(L.lanes.find(l => l.id === 'cio').roles);
for (const p of BP.prompts) {
  claim(p.id, 'prompt');
  if (!/^BP-\d\d$/.test(p.id) || !p.prompt || !p.tests || !p.level || !p.stories.length) errors.push(p.id + ': id, prompt, tests, level and stories required');
  if (p.roles.some(r => !ROLES.has(r))) errors.push(p.id + ': unknown role');
  if (!Array.isArray(p.levels) || !p.levels.length || p.levels.some(v => !levelIds.has(v))) errors.push(p.id + ': bad levels');
  for (const st of p.stories) if (!/^https:\/\/claude\.ai\/artifact\/J5TiiDwLanHF9oMU1UFPJ6#(story-\d+|f\d+)$/.test(st.url)) errors.push(p.id + ': bad story link');
}
for (const x of [].concat(OM.lessons, OM.checks, BP.prompts, craftDefs, sims.runs)) if (x.status !== 'Draft' && x.status !== '') errors.push(x.id + ': status must be Draft or empty');
for (const r of ROLES) if (!BP.prompts.some(p => p.roles.indexOf(r) !== -1)) errors.push('no prompt for role ' + r);
if (BP.prompts.length !== 10) errors.push('Phase 1 has 10 behavioral prompts');

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
for (const p of craft.packets) { const d = craftDefs.find(x => x.id === p.id); p.lane = d.lane; p.levels = d.levels; p.stages.forEach((s, i) => { s.level = d.stages[i].level; }); }
const bank = { lanes: L.lanes, levels: L.levels, sections: L.sections, craft: craft.packets, runs: sims.runs, roleplays: sims.roleplays, kitVersion,
  opmodel: OM, prompts: BP.prompts, storyBankVersion: BP.storyBankVersion };
const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
const json = JSON.stringify(bank).replace(/<\//g, '<\\/').split(LS).join('\\u2028').split(PS).join('\\u2029');
const tpl = read('index.src.html');
for (const t of ['__BANK__', '__STUDY_KIT__', '__SHELL_CSS__', '__KIT_CSS__']) if (tpl.split(t).length !== 2) { console.error('template must contain one ' + t); process.exit(1); }
const kit = read('vendor/study-kit/study-kit.js').replace(/<\//g, '<\\/');
const out = tpl.replace('__SHELL_CSS__', () => read('vendor/study-kit/shell.css')).replace('__KIT_CSS__', () => read('vendor/study-kit/study-kit.css'))
  .replace('__STUDY_KIT__', () => kit).replace('__BANK__', () => json);
fs.mkdirSync(path.join(here, 'build'), { recursive: true });
fs.writeFileSync(path.join(here, 'build', 'index.html'), out);
console.log('study-kit', kitVersion, '· lanes', laneIds.length, '(active: ' + L.lanes.filter(l => l.active).map(l => l.id).join(', ') + ') · sections', sectionIds.length, '· craft', craft.packets.length, '(' + craft.packets.reduce((n, p) => n + p.stages.length, 0) + ' stages)', '· lessons', lessonIds.length, '· checks', checkIds.length, '· prompts', promptIds.length, '· math', mc.n + ' values, JS = Python', '· runs', sims.runs.length, '· role-plays', sims.roleplays.length, '· bytes', Buffer.byteLength(out));
