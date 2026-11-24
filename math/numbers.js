// Every number in the renewal simulation and the portfolio cases, computed here. Text gets them only through
// {{placeholders}}; build.js fails if math/numbers.py (written separately) disagrees by a cent.
// All prices and companies are fictional.
'use strict';
const r2 = x => Math.round(x * 100) / 100;
const k2 = x => r2(x / 1000);           // dollars to $k, 2 decimals

function compute() {
  const N = {};
  // ---------------------------------------------------------------- BRN-1 renewal simulation
  // Pipeline CRM (main CRM)
  const crmPrice = 1380, crmLicensed = 650, crmActive = 512, crmInactive180 = 41;
  const crmRight = Math.ceil(crmActive * 1.10);                 // active + 10% buffer
  N.crmPrice = crmPrice; N.crmLicensed = crmLicensed; N.crmActive = crmActive; N.crmInactive180 = crmInactive180; N.crmRight = crmRight;
  N.crmRightSave = r2((crmLicensed - crmRight) * crmPrice);
  N.crmTightSave = r2((crmLicensed - crmActive) * crmPrice);
  const reAdd = 52, reAddMonths = 6;                            // seats re-added mid-year at list after cutting to 512
  N.reAdd = reAdd; N.reAddMonths = reAddMonths;
  N.reAddCost = r2(reAdd * crmPrice * reAddMonths / 12);
  // Corvane Office suite true-up
  const suitePrice = 264, entitled = 1900, deployed = 2014, leavers = 96, monthsLeft = 5;
  N.suitePrice = suitePrice; N.entitled = entitled; N.deployed = deployed; N.leavers = leavers; N.monthsLeft = monthsLeft;
  N.over = deployed - entitled;
  N.overClean = deployed - leavers - entitled;
  N.trueUp = r2(N.over * suitePrice * monthsLeft / 12);
  N.trueUpClean = r2(N.overClean * suitePrice * monthsLeft / 12);
  N.trueUpAvoided = r2(N.trueUp - N.trueUpClean);
  // Tallyhouse CRM (acquired), consolidation
  const tallyPrice = 960, tallySeats = 180, tallyActive = 150, tierMin = 700, tierDisc = 0.12, migration = 38000;
  N.tallyPrice = tallyPrice; N.tallySeats = tallySeats; N.tallyActive = tallyActive; N.tierMin = tierMin; N.tierDiscPct = 12; N.migration = migration;
  N.tierPrice = r2(crmPrice * (1 - tierDisc));
  N.baseline = r2(crmRight * crmPrice + tallySeats * tallyPrice);           // right-sized main CRM + Tallyhouse renewed as is
  N.keepBoth = r2(crmRight * crmPrice + tallyActive * tallyPrice);
  N.consSeats = crmRight + tallyActive;
  N.consAllSeats = crmRight + tallySeats;
  N.consCost = r2(N.consSeats * N.tierPrice);
  N.consAllCost = r2(N.consAllSeats * N.tierPrice);
  N.keepBothSave = r2(N.baseline - N.keepBoth);
  N.consGross = r2(N.baseline - N.consCost);
  N.consNet = r2(N.consGross - migration);
  N.consAllNet = r2(N.baseline - N.consAllCost - migration);
  // Term: 1-year with a 7% uplift cap vs 3 years at a locked price, for the consolidated seats
  const uplift = 0.07;
  N.upliftPct = 7;
  N.year1 = N.consCost;
  N.roll3 = r2(N.consCost * (1 + (1 + uplift) + (1 + uplift) ** 2));
  N.lock3 = r2(N.consCost * 3);
  N.termSave = r2(N.roll3 - N.lock3);
  N.termSaveY2 = r2(N.consCost * uplift);
  N.termSaveY3 = r2(N.consCost * ((1 + uplift) ** 2 - 1));
  N.flexPct = 5;
  N.overbuySeats = 800;
  N.overbuyCost3 = r2(N.overbuySeats * N.tierPrice * 3);
  // Premium tier upsell
  const premium = 420, power = 60;
  N.premium = premium; N.power = power;
  N.upsellAll = r2(N.consSeats * premium);
  N.upsellPower = r2(power * premium);
  N.upsellSwapDisc = r2(N.consCost * 0.02);
  // Savings promised and delivered on the best path (start $50k, carried from last year)
  N.startK = 50;
  N.bestPathK = r2(N.startK + k2(N.crmRightSave) + k2(N.trueUpAvoided) + k2(N.consNet));
  // pv deltas in $k
  N.pv = {
    s1: { right: k2(N.crmRightSave), tight: k2(N.crmTightSave), reAdd: -k2(N.reAddCost) },
    s2: { avoided: k2(N.trueUpAvoided), cut: k2(N.trueUp) },
    s3: { cons: k2(N.consNet), keep: k2(N.keepBothSave), allPlanned: k2(N.consNet), allActual: k2(N.consAllNet) }
  };

  // ---------------------------------------------------------------- BR-1 two ERPs after an acquisition
  const perUser = 1200, acqUsers = 260, acqErp = 310000, migErp = 1400000, ext = 0.15, integ = 220000, integRun = 40000, synergy = 450000;
  N.b1 = {
    perUser, acqUsers, acqErp, migErp, extPct: 15, integ, integRun, synergy,
    extCost: r2(acqErp * (1 + ext)),
    usersY23: r2(acqUsers * perUser * 2),
    noticeMonths: 4 - 3
  };
  N.b1.optA = r2(N.b1.migErp + N.b1.usersY23 + N.b1.extCost);
  N.b1.optB = r2(acqErp * 3 + integ + integRun * 3);
  N.b1.synergy2 = synergy * 2;
  N.b1.optANet = r2(N.b1.optA - N.b1.synergy2);
  N.b1.gap = r2(N.b1.optANet - N.b1.optB);
  N.b1.breakEvenSynergy = r2((N.b1.optA - N.b1.optB) / 2);    // per year, years 2 and 3

  // ---------------------------------------------------------------- BR-2 two CRMs after an acquisition
  const pSeat = 150, aSeat = 96, aSeats = 95, aAccounts = 6800, overlap = 1240;
  N.b2 = { pSeat, aSeat, aSeats, aAccounts, overlap,
    aCost: r2(aSeat * aSeats * 12), addCost: r2(pSeat * aSeats * 12),
    dupPct: Math.round(1000 * overlap / aAccounts) / 10 };
  N.b2.delta = r2(N.b2.addCost - N.b2.aCost);

  // ---------------------------------------------------------------- BR-3 sunsetting a legacy order system
  const host = 14000, archOnce = 38000, archYear = 6000;
  N.b3 = { host, archOnce, archYear, hostYear: host * 12,
    archMonth: archYear / 12 };
  N.b3.paybackMonths = Math.round(100 * archOnce / (host - N.b3.archMonth)) / 100;
  N.b3.firstYearSave = r2(N.b3.hostYear - archOnce - archYear);

  // ---------------------------------------------------------------- BR-4 major ERP upgrade timing
  const lic = 5000000, maintPct = 22, extPts = 2;
  N.b4 = { lic, maintPct, extPts, maint: r2(lic * maintPct / 100), extYear: r2(lic * extPts / 100) };
  N.b4.ext3 = r2(N.b4.extYear * 3);
  N.b4.maintExt = r2(lic * (maintPct + extPts) / 100);

  // ---------------------------------------------------------------- BR-5 CRM customization debt
  const fields = 1140, deadShare = 0.61, breaks = 9, hoursRelease = 120, releases = 2, rate = 95;
  N.b5 = { fields, deadPct: 61, breaks, hoursRelease, releases, rate,
    deadFields: Math.round(fields * deadShare), hoursYear: hoursRelease * releases };
  N.b5.costYear = r2(N.b5.hoursYear * rate);

  // ---------------------------------------------------------------- BR-6 application portfolio review (sample of 10)
  // [name, business value 1-5, technical fit 1-5, annual cost]
  const apps = [
    ['Order hub', 5, 4, 420000], ['Field service app', 4, 2, 185000], ['Old intranet', 1, 2, 64000], ['Expense tool', 2, 4, 38000],
    ['Payroll bridge', 2, 1, 51000], ['Quote builder A', 3, 3, 72000], ['Quote builder B', 2, 2, 69000], ['Data warehouse', 5, 3, 310000],
    ['Shipping labels', 4, 1, 47000], ['Survey tool', 1, 4, 12000]
  ];
  const quad = (v, f) => v >= 3 ? (f >= 3 ? 'Invest' : 'Migrate') : (f >= 3 ? 'Tolerate' : 'Eliminate');
  N.b6 = { apps: apps.map(a => ({ name: a[0], value: a[1], fit: a[2], cost: a[3], quad: quad(a[1], a[2]) })) };
  N.b6.byQuad = {};
  for (const a of N.b6.apps) N.b6.byQuad[a.quad] = r2((N.b6.byQuad[a.quad] || 0) + a.cost);
  N.b6.total = r2(apps.reduce((s, a) => s + a[3], 0));
  // ---------------------------------------------------------------- economics checks EC-07, EC-10
  N.ec = { spendUp: 40, ordersX: 2, perOrderDropPct: Math.round(100 * (1 - 1.4 / 2)), selfFixed: 52000, perReq: 0.006, breakEvenM: Math.round(10 * 52000 / 0.006 / 1e6) / 10 };

  // ---------------------------------------------------------------- BRL-1 budget cut
  N.rp = { itBudget: 16000000, cutPct: 15, cut: r2(16000000 * 0.15), opex: r2(16000000 * 0.6), capex: r2(16000000 * 0.4) };

  // ---------------------------------------------------------------- BR-7 first 90 days as CIO (data in data/br7.json)
  const D7 = require('../data/br7.json');
  const byId = {}; D7.contracts.forEach(c => { byId[c.id] = c; });
  N.b7 = { appCount: D7.apps.length, contractCount: D7.contracts.length };
  N.b7.appTotal = r2(D7.apps.reduce((a, x) => a + x.cost, 0));
  N.b7.unowned = D7.apps.filter(x => !x.owner).length;
  N.b7.unownedCritical = D7.apps.filter(x => !x.owner && x.critical).length;
  N.b7.inHouse = D7.apps.filter(x => !x.contract).length;
  const om = byId['C-08'];
  N.b7.omNoticeDays = om.renewDays - om.noticeDays;
  N.b7.omLock = r2(om.value * om.autoYears);
  N.b7.omAutoYears = om.autoYears;
  const due120 = D7.contracts.filter(c => c.renewDays <= 120);
  N.b7.due120Count = due120.length;
  N.b7.due120Value = r2(due120.reduce((a, c) => a + c.value, 0));
  N.b7.notice60Count = D7.contracts.filter(c => c.renewDays - c.noticeDays <= 60).length;
  const tw = D7.apps.find(x => x.name === 'Expense tool (Tripwise)'), sp = D7.apps.find(x => x.name === 'Expense tool (Spendly)');
  N.b7.twPerUser = r2(tw.cost / tw.users);
  N.b7.spMoveCost = r2(sp.users * tw.cost / tw.users);
  N.b7.dupSave = r2(sp.cost - N.b7.spMoveCost);
  N.b7.spNoticeDays = byId['C-04'].renewDays - byId['C-04'].noticeDays;

  // ---------------------------------------------------------------- BRN-2 inference cost simulation (fictional prices)
  const pin = 3, pout = 15, cacheRead = 0.1, batchDisc = 0.5, fixedTok = 1800, varTok = 200, outTok = 400;
  const cBase = (fixedTok + varTok) * pin / 1e6 + outTok * pout / 1e6;
  const cCache = varTok * pin / 1e6 + fixedTok * pin * cacheRead / 1e6 + outTok * pout / 1e6;
  const batchShare = 0.4, cBlend = cCache * (1 - batchShare * batchDisc);
  const V = [500000, 1000000, 2000000, 3000000, 4000000, 5000000];
  const r6 = x => Math.round(x * 1e6) / 1e6;
  N.i = { pin, pout, cachePct: 10, batchPct: 50, fixedTok, varTok, outTok, batchSharePct: 40,
    cBase: r6(cBase), cCache: r6(cCache), cBlend: r6(cBlend),
    v1: V[0], v2: V[1], v3: V[2], v4: V[3], v5: V[4], v6: V[5],
    base1: r2(V[0] * cBase), cache1: r2(V[0] * cCache), save1: r2(V[0] * (cBase - cCache)),
    cheapPlanned: r2(V[0] * cBase * 2 / 3),
    save2: r2(V[1] * batchShare * cCache * batchDisc), cost2: r2(V[1] * cBlend),
    tickets3: 250000, cost3: r2(V[2] * cBlend), perTicket3: Math.round(1000 * V[2] * cBlend / 250000) / 1000,
    fc4: r2(V[3] * cBlend), act4v: 2600000, act4: r2(2600000 * cBlend), discPct: 20, bigDiscPct: 25 };
  const I = N.i, commitCost = (c, d, use) => r2(c * (1 - d) + Math.max(0, use - c));
  I.c80 = r2(I.fc4 * 0.8); I.c100 = I.fc4; I.c150 = r2(I.fc4 * 1.5);
  I.pay80 = commitCost(I.c80, 0.2, I.act4); I.pay100 = commitCost(I.c100, 0.2, I.act4); I.pay150 = commitCost(I.c150, 0.25, I.act4);
  I.plan80 = r2(I.fc4 - commitCost(I.c80, 0.2, I.fc4)); I.plan100 = r2(I.fc4 - commitCost(I.c100, 0.2, I.fc4)); I.plan150 = r2(I.fc4 - commitCost(I.c150, 0.25, I.fc4));
  I.save80 = r2(I.act4 - I.pay80); I.save100 = r2(I.act4 - I.pay100); I.save150 = r2(I.act4 - I.pay150);
  I.gpu = 22000; I.staff = 30000; I.selfFixed = I.gpu + I.staff;
  I.api5 = r2(V[4] * cBlend); I.selfGap = r2(I.selfFixed - I.api5);
  I.breakEvenM = Math.round(10 * I.selfFixed / cBlend / 1e6) / 10;
  I.unitDropPct = Math.round(1000 * (1 - cBlend / cBase)) / 10;
  I.spend6 = r2(V[5] * cBlend); I.spendBase6 = r2(V[5] * cBase);
  I.startK = 10;
  I.bestK = r2(I.startK + k2(I.save1) + k2(I.save2) + k2(I.save80));
  I.pv = { s1: k2(I.save1), cheapPlan: k2(I.cheapPlanned), s2: k2(I.save2),
    p80: k2(I.plan80), a80: k2(I.save80), p100: k2(I.plan100), a100: k2(I.save100), p150: k2(I.plan150), a150: k2(I.save150), self: -k2(I.selfGap) };

  // ---------------------------------------------------------------- TMAY budgets (word counts of the bank's career introduction)
  const W = [20, 19, 17, 26, 24], stress = [3, 2];
  const wt = W.map((w, i) => w * (stress.indexOf(i) !== -1 ? 1.5 : 1)), sw = wt.reduce((a, b) => a + b, 0);
  N.tm = { lo: wt.map(x => Math.round(60 * x / sw)), hi: wt.map(x => Math.round(75 * x / sw)) };
  return N;
}

// Amounts under $0.10 (per-request prices) keep up to 5 decimals; everything else is shown to the cent.
const money = x => '$' + Number(x).toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: Math.abs(x) < 0.1 && !Number.isInteger(x) ? 5 : 2 });
// Flattens N into {path: value} for templates and the cross-check.
function flat(o, p, out) { out = out || {}; for (const k in o) { const v = o[k], q = p ? p + '.' + k : k; if (v && typeof v === 'object') flat(v, q, out); else out[q] = v; } return out; }
// Replaces {{path}} with a number and {{$path}} with money. Unknown placeholders throw.
function fill(text, F) {
  return String(text).replace(/\{\{(\$?)([a-zA-Z0-9_.]+)\}\}/g, (m, d, k) => {
    if (!(k in F)) throw new Error('unknown placeholder ' + m);
    return d ? money(F[k]) : Number(F[k]).toLocaleString('en-US', { maximumFractionDigits: 2 });
  });
}
module.exports = { compute, flat, fill, money };
if (require.main === module) process.stdout.write(JSON.stringify(flat(compute()), null, 1) + '\n');
