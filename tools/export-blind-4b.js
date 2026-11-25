// Writes the Phase 4b blind-check set from build/bank.json: the security program checks (no key), the BR-15 and BR-16
// packets with every figure, the lessons, and the key separately. Usage: node build.js && node tools/export-blind-4b.js <dir>
'use strict';
const fs = require('fs'), path = require('path');
const dir = process.argv[2] || '/tmp/blind4b';
fs.mkdirSync(dir, { recursive: true });
const B = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'build', 'bank.json'), 'utf8'));
const L = 'ABCD', m = B.modules.find(x => x.id === 'security-program');
let out = '# Blind check, Phase 4b: multiple-choice items (no key)\n\nAnswer each with one letter and a one-line reason. Recompute any figure with python3.\n\n';
for (const c of m.checks) out += '## ' + c.id + '\n' + c.stem + '\n' + c.options.map((o, k) => L[k] + '. ' + o).join('\n') + '\n\n';
fs.writeFileSync(path.join(dir, 'items.md'), out);
let ls = '# Blind check, Phase 4b: lesson text\n\nRecompute every figure with python3. List any figure that does not follow from the text, and any tier tag that looks wrong for the source named.\n\n';
for (const l of m.lessons) ls += '## ' + l.id + ' ' + l.title + '\n' + l.body.join('\n\n') + '\nSources: ' + l.sources.map(s => s[0] + ' (' + s[2] + ', ' + s[1] + ')').join('; ') + '\n\n';
fs.writeFileSync(path.join(dir, 'lessons.md'), ls);
// Packets: the packet text only (tables and notes), with the key and model answer, so the reviewer can recount every figure.
for (const id of ['BR-15', 'BR-16']) {
  const p = B.craft.find(x => x.id === id);
  fs.writeFileSync(path.join(dir, id.toLowerCase() + '.json'), JSON.stringify({ id, title: p.title, sections: p.sections, stages: p.stages.map(s => ({ id: s.id, title: s.title, checklist: s.checklist })) }, null, 1));
}
const rp = B.roleplays.filter(r => /^BRL-1[234]$/.test(r.id)).map(r => ({ id: r.id, title: r.title, brief: r.brief, hidden: r.hidden, rubric: r.rubric }));
fs.writeFileSync(path.join(dir, 'roleplays.json'), JSON.stringify(rp, null, 1));
const key = {}; for (const c of m.checks) key[c.id] = L[c.answer];
fs.writeFileSync(dir + '-key.json', JSON.stringify(key, null, 1));
console.log(Object.keys(key).length + ' keyed items; files in ' + dir + ', key in ' + dir + '-key.json');
