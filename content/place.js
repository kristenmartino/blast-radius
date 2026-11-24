// Moves an item's correct option to position `to` and remaps every field keyed by option index
// (whyNot, effects, pv, sets, pvIf), so keyed content is written once and answer positions are spread out.
'use strict';
function place(item, to) {
  const n = item.options.length, from = item.answer;
  const rest = []; for (let j = 0; j < n; j++) if (j !== from) rest.push(j);
  const order = rest.slice(0, to).concat([from], rest.slice(to));   // order[newIndex] = oldIndex
  const nw = old => order.indexOf(old);
  const remapObj = o => { if (!o) return o; const r = {}; for (const k in o) r[nw(+k)] = o[k]; return r; };
  item.options = order.map(j => item.options[j]);
  if (Array.isArray(item.effects)) item.effects = order.map(j => item.effects[j]);
  for (const f of ['whyNot', 'pv', 'sets']) if (item[f]) item[f] = remapObj(item[f]);
  if (item.pvIf) for (const fl in item.pvIf) item.pvIf[fl] = remapObj(item.pvIf[fl]);
  item.answer = to;
  return item;
}
module.exports = { place };
