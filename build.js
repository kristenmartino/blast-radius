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

// Content (empty in Phase 0). Every item carries level tags from L.levels.
const craftDefs = require('./craft-stages.js');
const craft = loadCraft(craftDefs, { dir: path.join(here, 'craft'), idPrefix: 'BR', takenIds: new Set() });
errors.push(...craft.errors);
const sims = validateSims({ runs: require('./sims-runs.js'), roleplays: require('./sims-roleplay.js'), runPrefix: 'BRN', rpPrefix: 'BRL', takenIds: new Set(craft.ids) });
errors.push(...sims.errors);
for (const x of [].concat(craftDefs, sims.runs, sims.roleplays)) {
  if (!Array.isArray(x.levels) || !x.levels.length || x.levels.some(v => !levelIds.has(v))) errors.push(x.id + ': levels must be a non-empty list of ' + Array.from(levelIds).join(', '));
  if (laneIds.indexOf(x.lane) === -1) errors.push(x.id + ': unknown lane ' + x.lane);
}

// Published link ids: the build refuses to drop any.
const PUB = path.join(here, 'published-ids.json');
const pub = JSON.parse(fs.readFileSync(PUB, 'utf8'));
const now = { lanes: laneIds, levels: Array.from(levelIds), sections: sectionIds, craft: craft.ids, sims: sims.ids };
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
const bank = { lanes: L.lanes, levels: L.levels, sections: L.sections, craft: craft.packets, runs: sims.runs, roleplays: sims.roleplays, kitVersion };
const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
const json = JSON.stringify(bank).replace(/<\//g, '<\\/').split(LS).join('\\u2028').split(PS).join('\\u2029');
const tpl = read('index.src.html');
for (const t of ['__BANK__', '__STUDY_KIT__', '__SHELL_CSS__', '__KIT_CSS__']) if (tpl.split(t).length !== 2) { console.error('template must contain one ' + t); process.exit(1); }
const kit = read('vendor/study-kit/study-kit.js').replace(/<\//g, '<\\/');
const out = tpl.replace('__SHELL_CSS__', () => read('vendor/study-kit/shell.css')).replace('__KIT_CSS__', () => read('vendor/study-kit/study-kit.css'))
  .replace('__STUDY_KIT__', () => kit).replace('__BANK__', () => json);
fs.mkdirSync(path.join(here, 'build'), { recursive: true });
fs.writeFileSync(path.join(here, 'build', 'index.html'), out);
console.log('study-kit', kitVersion, '· lanes', laneIds.length, '(active: ' + L.lanes.filter(l => l.active).map(l => l.id).join(', ') + ') · sections', sectionIds.length, '· craft', craft.packets.length, '· runs', sims.runs.length, '· role-plays', sims.roleplays.length, '· bytes', Buffer.byteLength(out));
