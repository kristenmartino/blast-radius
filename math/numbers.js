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
  return N;
}

const money = x => '$' + Number(x).toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 });
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
