// Answer-length rule for new items (Phase 3a): the key is at most 1.3x the longest distractor, and strictly the longest option in at most 30% of the lane's items.
'use strict';
const mods = { dst: require('../content/dst.js'), dpv: require('../content/dpv.js'), ec: require('../content/economics.js') };
const only = process.argv[2] ? new RegExp(process.argv[2]) : /^(DST|DPV|EC-1[5-8])/;
let n = 0, longest = 0, bad = [];
for (const m of Object.values(mods)) for (const c of m.checks) { if (!only.test(c.id)) continue; n++;
  const L = c.options.map(o => o.length), key = L[c.answer], others = L.filter((_, j) => j !== c.answer), mx = Math.max(...others);
  const strict = key > mx; if (strict) longest++;
  if (key > 1.3 * mx) bad.push(c.id + ' key ' + key + ' vs longest distractor ' + mx);
  if (process.argv.includes('-v')) console.log(c.id, 'pos', c.answer, L.join('/'), strict ? 'LONGEST' : '');
}
console.log(n + ' items; key strictly longest in ' + longest + ' (' + Math.round(100 * longest / n) + '%); ' + bad.length + ' over 1.3x');
bad.forEach(b => console.log('  ' + b));
process.exit(bad.length || longest / n > 0.3 ? 1 : 0);
