// Writes the Phase 3a blind-check set from build/bank.json: unkeyed items, packets (no key) and role-play setups,
// plus the key separately for scoring the reviewer's answers. Usage: node build.js && node tools/export-blind-2b.js <dir>
'use strict';
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || '/tmp/blind3a';
fs.mkdirSync(dir, { recursive: true });
const B = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build', 'bank.json'), 'utf8'));
const L = 'ABCD', mine = c => /^DST-|^DPV-|^EC-1[5-8]$/.test(c.id), runs = B.runs.filter(r => /^BRN-5$/.test(r.id));
let out = '# Blind check, Phase 3a: multiple-choice items (no key)\n\nAnswer each with one letter and a one-line reason. Recompute any figure with python3.\n\n';
for (const m of B.modules) for (const c of m.checks) if (mine(c)) out += '## ' + c.id + '\n' + c.stem + '\n' + c.options.map((o, k) => L[k] + '. ' + o).join('\n') + '\n\n';
for (const r of runs) {
  out += '# ' + r.id + ' ' + r.title + ' (a stepped simulation; pick the best option at each step)\n' + r.briefing + '\n\n';
  for (const s of r.steps) out += '## ' + s.id + ' (' + s.phase + ')\n' + (s.update ? s.update + '\n' : '') +
    (s.updateIf ? Object.entries(s.updateIf).map(([f, t]) => '[shown only if an earlier choice set "' + f + '"] ' + t).join('\n') + '\n' : '') +
    s.stem + '\n' + s.options.map((o, k) => L[k] + '. ' + o).join('\n') + '\n\n';
}
fs.writeFileSync(path.join(dir, 'items.md'), out);
const blk = b => b.p !== undefined ? b.p : b.ul ? b.ul.map(x => '- ' + x).join('\n') : b.ol ? b.ol.map((x, k) => (k + 1) + '. ' + x).join('\n') :
  b.quote !== undefined ? '> ' + b.quote : b.table ? ['| ' + b.table.head.join(' | ') + ' |'].concat(b.table.rows.map(r => '| ' + r.join(' | ') + ' |')).join('\n') : JSON.stringify(b);
let pk = '# Blind check, Phase 3a: Craft packets (no key)\n\nFor each packet, work every task and compute every figure it asks for with python3. Then list anything inconsistent, ambiguous or unsupported.\n\n';
for (const p of B.craft.filter(p => /^BR-12$/.test(p.id)))
  pk += '# ' + p.id + ' ' + p.title + '\n' + p.blurb + '\n' + p.lead.map(blk).join('\n') + '\n\n' + p.sections.map(s => '## ' + s.h + '\n' + s.blocks.map(blk).join('\n')).join('\n\n') +
    '\n\n## Task\n' + p.taskLead + '\n' + p.taskList.map((t, k) => (k + 1) + '. ' + t).join('\n') + '\n\n';
fs.writeFileSync(path.join(dir, 'packets.md'), pk);
let rp = '# Blind check, Phase 3a: role-play setups\n\nClaude will play the counterpart; the learner sees only the brief and the opening line. For each: is the brief consistent with the hidden facts and walk-away; can the good outcome be reached; does each rubric point have something to score?\n\n';
for (const x of B.roleplays.filter(r => /^BRL-[78]$/.test(r.id)))
  rp += '## ' + x.id + ' ' + x.title + '\nCounterpart: ' + x.role + '\nBrief: ' + x.brief + '\nPersona: ' + x.persona + '\nHidden: ' + x.hidden.join(' | ') + '\nWalk-away: ' + x.walkaway +
    '\nOpening: ' + x.opening + '\nGood outcome: ' + x.goodOutcome + '\nRubric: ' + x.rubric.join(' | ') + '\n\n';
fs.writeFileSync(path.join(dir, 'roleplays.md'), rp);
const key = {};
for (const m of B.modules) for (const c of m.checks) if (mine(c)) key[c.id] = L[c.answer];
for (const r of runs) for (const s of r.steps) key[s.id] = L[s.answer];
fs.writeFileSync(path.join(dir + '-key.json'), JSON.stringify(key, null, 1));
console.log(Object.keys(key).length + ' keyed items; files in ' + dir + ', key in ' + dir + '-key.json');
