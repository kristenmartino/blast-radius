// Compares math/numbers.js with math/numbers.py, key by key. Exit 1 on any difference over half a cent or a missing key.
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');
const { compute, flat } = require('./numbers.js');
function check() {
  const js = flat(compute());
  const py = JSON.parse(execFileSync('python3', ['-I', path.join(__dirname, 'numbers.py')], { encoding: 'utf8' }));
  const errs = [];
  for (const k of new Set(Object.keys(js).concat(Object.keys(py)))) {
    if (!(k in js)) errs.push('missing in JS: ' + k); else if (!(k in py)) errs.push('missing in Python: ' + k);
    else if (typeof js[k] === 'number' ? !(Math.abs(js[k] - py[k]) <= 0.005) : js[k] !== py[k]) errs.push(k + ': JS ' + js[k] + ' vs Python ' + py[k]);
  }
  return { n: Object.keys(js).length, errs };
}
module.exports = { check };
if (require.main === module) { const r = check(); console.log(r.n + ' values compared; ' + r.errs.length + ' differences'); r.errs.forEach(e => console.log(' ', e)); process.exit(r.errs.length ? 1 : 0); }
