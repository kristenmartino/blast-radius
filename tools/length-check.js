// Answer-length rule for new items (since Phase 3a): the key is at most 1.3x the longest distractor, and strictly the longest
// option in at most 30% of the lane's items. Default set: Phase 4a (RK, BRN-7..9). Phase 3b: node tools/length-check.js '^(TS|ED)-|^BRN-6-'. Phase 3a: node tools/length-check.js '^(DST|DPV|EC-1[5-8])|^BRN-5-'
'use strict';
const mods = { dst: require('../content/dst.js'), dpv: require('../content/dpv.js'), ec: require('../content/economics.js'),
  ts: require('../content/techstrat.js'), ed: require('../content/delivery.js'), rk: require('../content/risk.js') };
const runs = require('../sims-runs.js');
const arg = process.argv.slice(2).find(a => a !== '-v');
const only = arg ? new RegExp(arg) : /^RK-|^BRN-[789]-/;
let n = 0, longest = 0;
const bad = [];
const look = (id, options, answer) => {
  if (!only.test(id)) return; n++;
  const L = options.map(o => o.length), key = L[answer], mx = Math.max(...L.filter((_, j) => j !== answer));
  const strict = key > mx; if (strict) longest++;
  if (key > 1.3 * mx) bad.push(id + ' key ' + key + ' vs longest distractor ' + mx);
  if (process.argv.includes('-v')) console.log(id, 'pos', answer, L.join('/'), strict ? 'LONGEST' : '');
};
for (const m of Object.values(mods)) for (const c of m.checks) look(c.id, c.options, c.answer);
for (const r of runs) for (const st of r.steps) look(st.id, st.options, st.answer);
console.log(n + ' items; key strictly longest in ' + longest + ' (' + Math.round(100 * longest / n) + '%); ' + bad.length + ' over 1.3x');
bad.forEach(b => console.log('  ' + b));
process.exit(bad.length || longest / n > 0.3 ? 1 : 0);
