// Writes the Phase 4a blind-check set from build/bank.json: the risk module's checks and the three incident runs (no key),
// the lessons' figures to recompute, and the key separately for scoring. Usage: node build.js && node tools/export-blind-4a.js <dir>
'use strict';
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || '/tmp/blind4a';
fs.mkdirSync(dir, { recursive: true });
const B = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build', 'bank.json'), 'utf8'));
const L = 'ABCD', mine = c => /^RK-/.test(c.id), runs = B.runs.filter(r => /^BRN-[789]$/.test(r.id));
let out = '# Blind check, Phase 4a: multiple-choice items (no key)\n\nAnswer each with one letter and a one-line reason. Recompute any figure with python3, including dates and business days.\n\n';
for (const m of B.modules) for (const c of m.checks) if (mine(c)) out += '## ' + c.id + '\n' + c.stem + '\n' + c.options.map((o, k) => L[k] + '. ' + o).join('\n') + '\n\n';
for (const r of runs) {
  out += '# ' + r.id + ' ' + r.title + ' (a stepped simulation; pick the best option at each step)\n' + r.briefing + '\n\n';
  for (const s of r.steps) out += '## ' + s.id + ' (' + s.phase + ')\n' +
    (s.updateIf ? Object.entries(s.updateIf).map(([f, t]) => '[shown only if an earlier choice set "' + f + '"] ' + t).join('\n') + '\n' : '') +
    s.stem + '\n' + s.options.map((o, k) => L[k] + '. ' + o).join('\n') + '\n\n';
}
fs.writeFileSync(path.join(dir, 'items.md'), out);
// The lessons themselves: every figure and every claim, so the reviewer can check the arithmetic and the sourcing.
const risk = B.modules.find(m => m.id === 'risk');
let ls = '# Blind check, Phase 4a: lesson text\n\nRecompute every figure with python3. List any figure that does not follow from the text, and any sentence whose tier tag (Read, Relayed, Inferred) looks wrong for the source named.\n\n';
for (const l of risk.lessons) ls += '## ' + l.id + ' ' + l.title + '\n' + l.body.join('\n\n') + '\nSources: ' + l.sources.map(s => s[0] + ' (' + s[2] + ', ' + s[1] + ')').join('; ') + '\n\n';
fs.writeFileSync(path.join(dir, 'lessons.md'), ls);
const key = {};
for (const m of B.modules) for (const c of m.checks) if (mine(c)) key[c.id] = L[c.answer];
for (const r of runs) for (const s of r.steps) key[s.id] = L[s.answer];
fs.writeFileSync(path.join(dir + '-key.json'), JSON.stringify(key, null, 1));
console.log(Object.keys(key).length + ' keyed items; files in ' + dir + ', key in ' + dir + '-key.json');
