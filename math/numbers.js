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

  // ================================================================ Phase 2b: AI leadership lane (all fictional)
  // ---------------------------------------------------------------- ec-6 cost per task, EC-11..EC-14
  { const att = 0.04, tries = 1.5, revMin = 4, rate = 45, escPct = 2, escCost = 40, ftSetup = 18000, ftAtt = 0.02;
    const model = r2(att * tries), review = r2(rate * revMin / 60), esc = r2(escPct / 100 * escCost), total = r2(model + review + esc);
    const ftModel = r2(ftAtt * tries);
    N.ec6 = { att, tries, revMin, rate, escPct, escCost, model, review, esc, total,
      noEsc: r2(model + review), noReview: r2(model + esc),
      reviewSharePct: Math.round(1000 * review / total) / 10,
      halfReviewSave: r2(review / 2), halfModelSave: r2(model / 2), oneTrySave: r2(att * (tries - 1)), halfEscSave: r2(esc / 2),
      ftSetup, ftAtt, ftModel, ftSaveEach: r2(model - ftModel), ftBreakEven: Math.round(ftSetup / (model - ftModel)) }; }

  // ---------------------------------------------------------------- BRN-3 AI assistant rollout (hours a week = value)
  { const staff = 5000, price = 28, L1 = 1200, vol = 300, actRate = 0.70, thinRate = 0.45, claimH = 5.0, measH = 1.6, midH = 3.3, E = 600, R = 150, disc3 = 15;
    const A2 = Math.round(L1 * actRate), A2thin = Math.round(L1 * thinRate), L3 = L1 + E - R, A4 = A2 + Math.round(E * actRate);
    const yr = n => r2(n * price * 12);
    N.ro = { staff, price, L1, vol, actPct: 70, thinPct: 45, claimH, measH, midH, E, R, L3, A2, A2thin, A4, champions: L1 / 50, disc3,
      yrL1: yr(L1), yrAll: yr(staff), yrVol: yr(vol), yrL3: yr(L3), yrA4: yr(A4), restAll: staff - L1 - E,
      all3yr: r2(staff * price * 12 * (1 - disc3 / 100) * 3), allYr: r2(staff * price * 12 * (1 - disc3 / 100)),
      perActiveAll: r2(staff * price * 12 * (1 - disc3 / 100) / A4), perActiveL3: r2(yr(L3) / A4),
      h2meas: r2(A2 * measH), h2claim: r2(A2 * claimH), h2mid: r2(A2 * midH), h2lic: r2(L1 * claimH),
      h4meas: r2(A4 * measH), h4claim: r2(A4 * claimH), inc4meas: r2((A4 - A2) * measH), inc4claim: r2((A4 - A2) * claimH),
      thinDelta: A2thin - A2, cash: 180000, permReview: 60000, unlicensed: staff - L1, studyN: 40, unused: R, startH: 120, A4thin: A2thin + Math.round(E * actRate) };
    const O = N.ro, d = O.thinDelta;
    O.pv = { q2: { meas: O.h2meas, claim: O.h2claim, mid: O.h2mid, lic: O.h2lic },
      thin: { meas: r2(d * measH), claim: r2(d * claimH), mid: r2(d * midH) },
      q4: { meas: O.inc4meas, claim: O.inc4claim } };
    O.best = r2(O.startH + O.h2meas + O.inc4meas); }

  // ---------------------------------------------------------------- BRN-4 intake queue ($k a year of value)
  { const total = 200, self = 60, dup = 40, dupDistinct = 8, vendor = 35, low = 25, build = 30, risk = 10, pods = 3, weeks = 8;
    const after2 = total - self, after3 = after2 - dup + dupDistinct, after4 = after3 - vendor, after6 = after4 - 1;
    N.iq = { total, self, dup, dupDistinct, vendor, low, build, risk, pods, weeks, podWeeks: pods * weeks,
      after2, after3, after4, after6, claimsPods: 2, claimsWeeks: 4, claimsPw: 8, claimsK: 420, vpPw: 6, vpPlanK: 150, vpActK: 30,
      vendorPw: vendor, pilotPlanK: 300, pilotLaunchK: 90, pilotWeeks: 6, pilotAcc: 71, pilotTarget: 90, startK: 200,
      dupPairs: dup - dupDistinct };
    N.iq.bestK = N.iq.startK + N.iq.claimsK; }

  // ---------------------------------------------------------------- BR-8 triage 200 requests (data in data/br8.json)
  { const D8 = require('../data/br8.json'), rows = D8.rows, shown = rows.slice(0, D8.shown);
    const pen = { L: 0, M: 1, H: 4 };
    const draft = r => 2 * r.value + r.feas, fixed = r => 2 * r.value + r.feas - pen[r.risk];
    const cnt = c => rows.filter(r => r.cat === c).length;
    const rank = (list, f) => list.slice().sort((a, b) => f(b) - f(a) || (a.id < b.id ? -1 : 1));
    const draftTop = rank(shown, draft)[0];
    const eligible = shown.filter(r => r.risk !== 'H' && (r.cat === 'build'));
    const top = rank(eligible, fixed).slice(0, 5);
    N.b8 = { total: rows.length, shown: shown.length, self: cnt('self'), dup: cnt('dup'), vendor: cnt('vendor'), low: cnt('low'), build: cnt('build'), risk: cnt('risk'),
      high: rows.filter(r => r.risk === 'H').length, highShown: shown.filter(r => r.risk === 'H').length,
      draftTopId: draftTop.id, draftTopScore: draft(draftTop), draftTopFixed: fixed(draftTop),
      topIds: top.map(r => r.id).join(', '), topScores: top.map(r => fixed(r)).join(', '), topPw: top.reduce((a, r) => a + r.pw, 0),
      buildPwAll: rows.filter(r => r.cat === 'build' && r.risk !== 'H').reduce((a, r) => a + r.pw, 0), capacityPw: 3 * 13 };
    N.b8.afterRoute = N.b8.total - N.b8.self - N.b8.dup - N.b8.vendor - N.b8.low; }

  // ---------------------------------------------------------------- BR-9 assistant business case (claimed vs measured)
  { const seats = 2000, price = 30, pilot = 400, pilotActive = 260, surveyH = 4.5, studyN = 60, studyH = 1.2, weeks = 46, rate = 60, cash = 250000;
    const actPct = Math.round(100 * pilotActive / pilot), active = Math.round(seats * pilotActive / pilot);
    N.b9 = { seats, price, pilot, pilotActive, actPct, active, surveyH, studyN, studyH, weeks, rate, cash,
      licence: r2(seats * price * 12), vendorCase: r2(seats * surveyH * weeks * rate), measCase: r2(active * studyH * weeks * rate),
      measHours: r2(active * studyH), claimHours: r2(seats * surveyH),
      breakEvenH: Math.round(100 * seats * price * 12 / (active * weeks * rate)) / 100,
      overstateX: Math.round(10 * (seats * surveyH) / (active * studyH)) / 10 };
    N.b9.cashGap = r2(N.b9.licence - N.b9.cash); }

  // ---------------------------------------------------------------- BR-10 AI literacy program, 3,000 people
  { const g = { exec: 40, mgr: 360, know: 1900, front: 700 }, rate = 50, delivery = 180000, champs = 60;
    const staff = g.exec + g.mgr + g.know + g.front;
    const h = { basics: staff * 1, role: (g.mgr + g.know) * 4, front: g.front * 2, champ: champs * 12, exec: g.exec * 3 };
    const hours = h.basics + h.role + h.front + h.champ + h.exec;
    N.b10 = { staff, exec: g.exec, mgr: g.mgr, know: g.know, front: g.front, champs, rate, delivery,
      hBasics: h.basics, hRole: h.role, hFront: h.front, hChamp: h.champ, hExec: h.exec, hours,
      timeCost: r2(hours * rate), total: r2(hours * rate + delivery), perHead: r2((hours * rate + delivery) / staff),
      timeSharePct: Math.round(1000 * hours * rate / (hours * rate + delivery)) / 10 }; }

  // ---------------------------------------------------------------- BR-11 first 90 days as CAIO (data in data/br11.json)
  { const D = require('../data/br11.json'), T = D.tools, C = {}; D.contracts.forEach(c => { C[c.id] = c; });
    const qa = C['A-03'], wm = C['A-06'];
    N.b11 = { toolCount: T.length, toolCost: r2(T.reduce((a, x) => a + x.cost, 0)), decisions: T.filter(x => x.customerDecision).length,
      decisionsUntested: T.filter(x => x.customerDecision && !x.tested).length, noOwner: T.filter(x => !x.owner).length,
      noContract: T.filter(x => !x.contract && x.source !== 'In house').length, inHouse: T.filter(x => x.source === 'In house').length,
      regDays: D.regulatorDays, qaNotice: qa.renewDays - qa.noticeDays, qaValue: qa.value, wmNotice: wm.renewDays - wm.noticeDays,
      trains: D.contracts.filter(c => c.trainsOnData).length, contractTotal: r2(D.contracts.reduce((a, c) => a + c.value, 0)) }; }

  // ================================================================ Phase 3a: Data leadership lane (all fictional)
  // ---------------------------------------------------------------- ec-7 how warehouses and lakehouses bill, EC-15 and EC-16
  // Rates follow the billing structures on the vendors' pages (Snowflake: per-second with a 60-second minimum at each start;
  // BigQuery: $6.25 per TiB on demand, $0.04 per slot-hour Standard edition, read Nov 24, 2026); the $3.00 credit price and the workloads are made up.
  { const credPerHr = 4, credPrice = 3, wakes = 30, runSec = 10, minSec = 60, days = 30;
    const billedSec = wakes * Math.max(runSec, minSec), credDay = r2(credPerHr * billedSec / 3600);
    const tibRate = 6.25, slots = 100, slotRate = 0.04, hrs = 720, slotMonth = r2(slots * hrs * slotRate);
    N.ec7 = { credPerHr, credPrice, wakes, runSec, minSec, days, billedSec, credDay, credMonth: r2(credDay * days), monthCost: r2(credDay * days * credPrice),
      noMinCost: r2(credPerHr * wakes * runSec / 3600 * days * credPrice), allDayCost: r2(credPerHr * 24 * days * credPrice), hourlyCost: r2(credPerHr * wakes * days * credPrice),
      tibRate, slots, slotRate, hrs, slotMonth, breakTib: r2(slotMonth / tibRate), wrongTib: r2(slotMonth / (tibRate / 10)), tenthTib: r2(slotMonth / tibRate / 10) }; }

  // ---------------------------------------------------------------- ec-8 unit cost of data and chargeback, EC-17 and EC-18; used again in BRN-5 step 4
  { const direct = { sales: 70000, mkt: 40000, fin: 30000 }, shared = 40000, q = { sales: 1200000, mkt: 720000, fin: 480000 };
    const qTot = q.sales + q.mkt + q.fin, total = direct.sales + direct.mkt + direct.fin + shared;
    const al = k => r2(shared * q[k] / qTot);
    const m6cost = 210000, m6q = 3500000;
    N.ec8 = { dSales: direct.sales, dMkt: direct.mkt, dFin: direct.fin, shared, total, qSales: q.sales, qMkt: q.mkt, qFin: q.fin, qTot,
      shSales: r2(100 * q.sales / qTot), shMkt: r2(100 * q.mkt / qTot), shFin: r2(100 * q.fin / qTot),
      aSales: al('sales'), aMkt: al('mkt'), aFin: al('fin'),
      lSales: r2(direct.sales + al('sales')), lMkt: r2(direct.mkt + al('mkt')), lFin: r2(direct.fin + al('fin')),
      evenMkt: r2(direct.mkt + shared / 3), thirds: r2(total / 3),
      unit1: r2(1000 * total / qTot), m6cost, m6q, unit6: r2(1000 * m6cost / m6q),
      costUpPct: r2(100 * (m6cost - total) / total), qUpPct: r2(100 * (m6q - qTot) / qTot), unitDownPct: r2(100 * (1000 * total / qTot - 1000 * m6cost / m6q) / (1000 * total / qTot)) }; }

  // ---------------------------------------------------------------- BRN-5 data platform, eight quarters (value = $k a year that finance confirms)
  { const months = [40, 44, 47, 52, 58, 61, 64, 66, 70, 76, 95, 71], disc = 0.30;       // monthly platform spend last year, $k at list price
    const sum = months.reduce((a, b) => a + b, 0), mean = sum / 12;
    const cost = c => months.reduce((a, u) => a + c * (1 - disc) + Math.max(u - c, 0), 0);   // commit c ($k a month, paid every month) at 30% off, the rest at list
    const save = c => r2(sum - cost(c));
    const asc = months.slice().sort((a, b) => a - b), cNine = asc[12 - 9];                 // the level used in at least 9 of the 12 months
    let optC = 0; for (let c = 0; c <= 100; c++) if (save(c) > save(optC)) optC = c;      // brute-force check on whole $k levels
    const board = 38, testsPer = 6, daysPer = 3, all = 412, eng = 2;
    const rev = 112000000, dupDays = 3, qDays = 91, over = r2(rev * dupDays / qDays), tol = 0.005;
    N.dp = { workDays: 260, domains: 14, datasets: all, boardDs: board, testsPer, daysPer, boardTests: board * testsPer, boardDays: board * daysPer, allDays: all * daysPer, eng,
      boardWeeks: r2(board * daysPer / eng / 5), allWeeks: r2(all * daysPer / eng / 5), allYears: r2(all * daysPer / eng / 5 / 52),
      monthsText: months.join(', '), pctPay: 70, yrOnDemand: sum, avgMonth: mean, floorMonth: Math.min(...months), peakMonth: Math.max(...months), discPct: 30,
      cPeak: 95, cAvg: 62, cNine: cNine, cFloor: 40, optCommit: optC, headline: r2(sum * disc),
      sPeak: save(95), sAvg: save(62), sNine: save(cNine), sFloor: save(40), sOpt: save(optC),
      sSales: 48200, sMkt: 61500, sFin: 39800, overSales: r2(100 * (48200 - 39800) / 39800), overMkt: r2(100 * (61500 - 39800) / 39800),
      rev, dupDays, qDays, over, overPct: r2(100 * over / rev), tolPct: 0.5, tol: r2(rev * tol), boardMetrics: 11, metricsCert: 1, metricsUncert: 3,
      budget: 400000, monCost: 160000, reconHours: 1600, rate: 45, monSave: r2(1600 * 45), pipeCost: 400000, pipePlan: 600000, pipeConf: 150000,
      claimHours: 12000, claim: r2(12000 * 45), lic: 190, licPrice: 500, licSave: r2(190 * 500), startK: 120 };
    const D = N.dp;
    D.pv = { peakPlan: k2(D.headline * 1000), peakAct: save(95) < 0 ? save(95) : save(95), avg: save(62), nine: save(cNine), floor: save(40),
      mon: k2(D.monSave), pipePlan: k2(D.pipePlan), pipeAct: k2(D.pipeConf), claim: k2(D.claim), conf: k2(D.licSave) };
    D.bestK = r2(D.startK + D.pv.nine + D.pv.mon + D.pv.conf); }

  // ---------------------------------------------------------------- BR-12 first 90 days as Chief Data Officer (data in data/br12.json)
  { const D = require('../data/br12.json'), I = D.inventory, C = D.customers, sh = C.slice(0, D.shown);
    const S = c => c.status === 'open' && c.lastOrder >= 0 && c.lastOrder <= 730;
    const M = c => (c.engage >= 0 && c.engage <= 90) || (c.lastOrder >= 0 && c.lastOrder <= 90);
    const F = c => c.test === 0 && c.orders12 >= 1;
    const n = (L, f) => L.filter(f).length;
    const boardFeeds = I.filter(r => r.feedsBoard);
    N.b12 = { invTotal: I.length, noOwner: n(I, r => !r.owner), board: boardFeeds.length, boardNoOwner: n(boardFeeds, r => !r.owner),
      zeroTests: n(I, r => r.tests === 0), boardStale: Math.max(...boardFeeds.map(r => r.refreshDays)), unusedN: n(I, r => r.q30 === 0),
      unusedMonth: I.filter(r => r.q30 === 0).reduce((a, r) => a + r.cost, 0), invMonth: I.reduce((a, r) => a + r.cost, 0),
      custTables: n(I, r => /^Customer master$|^cust_main/.test(r.name)), dupMonth: I.find(r => r.name === 'cust_main_v2').cost,
      cust: C.length, sales: n(C, S), mkt: n(C, M), fin: n(C, F), all3: n(C, c => S(c) && M(c) && F(c)), any: n(C, c => S(c) || M(c) || F(c)),
      none: n(C, c => !(S(c) || M(c) || F(c))), testAcc: n(C, c => c.test === 1), salesTest: n(C, c => S(c) && c.test === 1),
      salesNotFin: n(C, c => S(c) && !F(c)), shown: sh.length, shS: n(sh, S), shM: n(sh, M), shF: n(sh, F), shAll: n(sh, c => S(c) && M(c) && F(c)), shAny: n(sh, c => S(c) || M(c) || F(c)) };
    N.b12.packDays = 21; N.b12.budgetDays = 60;           // dates in the packet: board pack due, CFO budget review (days from the first Monday)
    N.b12.unusedYear = N.b12.unusedMonth * 12; N.b12.invYear = N.b12.invMonth * 12;
    N.b12.salesOver = r2(100 * (N.b12.sales - N.b12.fin) / N.b12.fin); }

  // ================================================================ Phase 3b: CTO lane (all fictional)
  // ---------------------------------------------------------------- lessons ts-n and ed-n, checks TS-nn and ED-nn
  { const sprints = [21, 18, 24, 19, 22, 16], backlog = 180, weeks = 12;
    const mean = sprints.reduce((a, b) => a + b, 0) / sprints.length, lo = Math.min(...sprints), n = weeks / 2;
    const win = 28 * 24 * 60;                                                   // a rolling four-week window, in minutes
    N.cto = {
      // ed-1: DORA delivery metrics from one quarter's deployment log
      deploys: 46, qWeeks: 13, fails: 9, perWeek: r2(46 / 13), cfr: r2(100 * 9 / 46), leadDays: 6, recoverHrs: 5,
      // ed-2: error budget = 100% minus the SLO
      slo: 99.9, slo2: 99.95, winDays: 28, budgetMin: r2(win * 0.001), budget2Min: r2(win * 0.0005), budget30: r2(30 * 24 * 60 * 0.001), budget4: r2(win * 0.0001), out1: 31, out2: 14,
      usedMin: 45, overMin: r2(45 - win * 0.001), out1Pct: r2(100 * 31 / (win * 0.001)), reqs: 3000000, reqFail: r2(3000000 * 0.001),
      // ed-4: a platform team taking over infrastructure work from six stream-aligned teams
      eng: 60, toilPct: 20, toilFte: r2(60 * 0.2), featBefore: r2(60 * 0.8), plat: 6, toilAfterPct: 5, stream: 54,
      featAfter: r2(54 * 0.95), gain: r2(54 * 0.95 - 60 * 0.8), gainPct: r2(100 * (54 * 95 - 60 * 80) / (60 * 80)), platBig: 15, featBig: r2(45 * 0.95),
      // ed-6: forecasting a date from throughput
      sprintsText: sprints.join(', '), backlog, weeks, sprintsN: n, tpMean: r2(mean), tpMin: lo, needMean: r2(backlog / mean), weeksMean: r2(2 * backlog / mean),
      needMin: r2(backlog / lo), weeksMin: r2(2 * backlog / lo), fitMean: r2(n * mean), fitMin: n * lo, rest: backlog - n * lo, addEng: 8,
      // ts-2: Fowler's interest example, made concrete
      withCruft: 10, without: 6, cleanup: 8, breakEven: r2(8 / (10 - 6)), threeSave: 3 * (10 - 6) - 8, saveEach: 10 - 6, gross3: 3 * (10 - 6),
      // ts-4: a review board that approves every change
      changes: 140, arbEvery: 14, arbWait: 7, leadBase: 2.5, leadArb: 2.5 + 7, leadFull: 2.5 + 14, waitDays: 140 * 7,
      // ts-6: build or buy, three years
      buildEng: 3, loaded: 180000, buildYear: 3 * 180000, build3: 3 * 3 * 180000, saas: 150000, integ: 60000, buy3: 3 * 150000 + 60000, gap3: 3 * 3 * 180000 - (3 * 150000 + 60000)
    }; }

  // ---------------------------------------------------------------- BRN-6 tech debt vs. features, eight quarters
  // Model (stated in the briefing): capacity 720 engineer-weeks a quarter; each engineer-week of hot debt (code changed often)
  // removes 0.06% of capacity, each of cold debt 0.005%; debt work pays hot debt first, then cold; each feature engineer-week
  // adds 0.25 of hot debt. The best share of capacity for debt work, held for eight quarters, is found by scanning 0..100%.
  { const cap = 720, h0 = 400, k0 = 1200, rH = 0.0006, rK = 0.00005, acc = 0.25, Q = 8, v = 0.5;
    const run = s => { let h = h0, k = k0, tot = 0; const per = [];
      for (let q = 0; q < Q; q++) { const eff = cap * (1 - rH * h - rK * k), P = s * eff, F = eff - P, ph = Math.min(P, h), pk = Math.min(P - ph, k);
        h = h - ph + acc * F; k = k - pk; tot += F; per.push(F); }
      return { tot, h, k, per }; };
    let best = 0; for (let p = 0; p <= 100; p++) if (run(p / 100).tot > run(best / 100).tot + 1e-9) best = p;
    const eff0 = cap * (1 - rH * h0 - rK * k0), shares = [0, 10, best, 50];
    const R = {}; shares.forEach(p => { R[p] = run(p / 100); });
    const plan = p => r2(v * Q * eff0 * (1 - p / 100)), act = p => r2(v * R[p].tot);
    N.td = { cap, eng: 60, h0, k0, rHpct: 0.06, rKpct: 0.005, rH100: 6, rK100: 0.5, acc, v, lostPct: r2(100 * (rH * h0 + rK * k0)), eff0: r2(eff0), sBest: best,
      t0: r2(R[0].tot), t10: r2(R[10].tot), tBest: r2(R[best].tot), t50: r2(R[50].tot),
      f0q1: r2(R[0].per[0]), f0q8: r2(R[0].per[7]), fBq1: r2(R[best].per[0]), fBq8: r2(R[best].per[7]),
      h0end: r2(R[0].h), hBend: r2(R[best].h), h50end: r2(R[50].h), k50end: r2(R[50].k), kBend: r2(R[best].k),
      // Q1: last quarter's deployment log (the same figures as lesson ed-1)
      deploys: 46, fails: 9, qWeeks: 13, perWeek: r2(46 / 13), cfr: r2(100 * 9 / 46), leadDays: 6,
      // Q3: the rewrite proposal at today's capacity
      freezeQ: 4, freezeK: r2(v * 4 * eff0), stTeam: 8, stQ: 2, stWeeks: 8 * 12 * 2, stK: r2(v * 8 * 12 * 2),
      // Q4: the date the CEO promised (same throughput as lesson ed-6)
      backlog: 180, weeks: 12, sprintsText: '21, 18, 24, 19, 22, 16', tpMean: 20, tpMin: 16, weeksMean: 18, fitMin: 96, rest: 84, addEng: 8,
      dealK: 600, phaseK: 450, lateK: 240, addK: 300,
      // Q5: error budget on the order service (as lesson ed-2)
      budgetMin: N.cto.budgetMin, out1: 31, out2: 14, overMin: N.cto.overMin, out1Pct: N.cto.out1Pct,
      // Q6: platform team (as lesson ed-4); value over the two remaining quarters
      featBefore: N.cto.featBefore, featAfter: N.cto.featAfter, gain: N.cto.gain, featBig: N.cto.featBig, plat: N.cto.plat, platBig: N.cto.platBig, toilAfterPct: N.cto.toilAfterPct, toilPct: N.cto.toilPct, platK: r2(v * N.cto.gain * 12 * 2),
      bigPlanK: r2(v * N.cto.toilFte * 12 * 2), bigActK: r2(v * (N.cto.featBig - N.cto.featBefore) * 12 * 2), outPlanK: 72,
      // Q7: review board (as lesson ts-4)
      changes: 140, leadBase: 2.5, leadArb: 9.5, waitDays: 980,
      // Q8: the year-end report
      pointsUp: 40, startK: 200 };
    const T = N.td;
    T.pv = { p0: plan(0), a0: act(0), p10: plan(10), a10: act(10), pB: plan(best), aB: act(best), p50: plan(50), a50: act(50) };
    T.bestK = r2(T.startK + T.pv.aB + T.phaseK + T.platK); }

  // ---------------------------------------------------------------- BR-13 first 90 days as CTO (data in data/br13.json)
  { const D = require('../data/br13.json'), S = D.services, I = D.incidents;
    const sum = (L, f) => L.reduce((a, x) => a + f(x), 0);
    const ord = I.filter(i => i.service === 'Order service'), idle = S.filter(s => s.req30 === 0);
    const tp = D.sprints, mean = sum(tp, x => x) / tp.length, lo = Math.min(...tp), n = D.pellmarWeeks / 2;
    const budget = r2(D.quarterDays * 24 * 60 * (100 - D.slo) / 100);
    N.b13 = { svc: S.length, noTeam: S.filter(s => !s.team).length, custNoTeam: S.filter(s => !s.team && s.customer).length,
      deploys: sum(S, s => s.deploys), fails: sum(S, s => s.fails), cfr: r2(100 * sum(S, s => s.fails) / sum(S, s => s.deploys)),
      ordDeploys: S.find(s => s.name === 'Order service').deploys, ordFails: S.find(s => s.name === 'Order service').fails,
      ordCfr: r2(100 * S.find(s => s.name === 'Order service').fails / S.find(s => s.name === 'Order service').deploys),
      payEos: S.find(s => s.name === 'Payments gateway').eosDays, idEos: S.find(s => s.name === 'Identity and login').eosDays,
      costMonth: sum(S, s => s.cost), idleN: idle.length, idleMonth: sum(idle, s => s.cost), idleYear: 12 * sum(idle, s => s.cost),
      p1: I.length, ordP1: ord.length, p1Min: sum(I, i => i.minutes), ordMin: sum(ord, i => i.minutes), ordShare: r2(100 * ord.length / I.length),
      ordMinShare: r2(100 * sum(ord, i => i.minutes) / sum(I, i => i.minutes)), budget, ordOverPct: r2(100 * sum(ord, i => i.minutes) / budget),
      rollbacks: I.filter(i => /rolled back/.test(i.cause)).length, pool: I.filter(i => /connection pool/.test(i.cause)).length,
      sprintsText: tp.join(', '), tpMean: r2(mean), tpMin: lo, items: D.pellmarItems, pWeeks: D.pellmarWeeks, fitMean: r2(n * mean), fitMin: n * lo,
      weeksMean: r2(2 * D.pellmarItems / mean), quarterDays: D.quarterDays, slo: D.slo }; }

  // ---------------------------------------------------------------- BR-14 modernization plan (data in data/br14.json)
  { const D = require('../data/br14.json'), S = D.systems;
    const cls = s => (s.changes === 0 && s.critical === 'Low') ? 'Retire' : (!s.diff && s.market) ? 'Replace' : (s.diff && s.seam) ? 'Strangle' : 'Retain';
    const pb = s => s.effort / s.interest;
    const cand = S.filter(s => cls(s) !== 'Retain').slice().sort((a, b) => pb(a) - pb(b) || (a.id < b.id ? -1 : 1));
    const budget = D.budgetQ * D.quarters; let used = 0; const funded = [], skipped = [];
    for (const s of cand) { if (used + s.effort <= budget) { funded.push(s); used += s.effort; } else skipped.push(s); }
    const top = cand[0], names = L => L.map(s => s.name).join(', ');
    N.b14 = { n: S.length, budgetQ: D.budgetQ, quarters: D.quarters, budget, used, left: budget - used,
      retire: names(S.filter(s => cls(s) === 'Retire')), replace: names(S.filter(s => cls(s) === 'Replace')), strangle: names(S.filter(s => cls(s) === 'Strangle')), retain: names(S.filter(s => cls(s) === 'Retain')),
      nRetire: S.filter(s => cls(s) === 'Retire').length, nReplace: S.filter(s => cls(s) === 'Replace').length, nStrangle: S.filter(s => cls(s) === 'Strangle').length, nRetain: S.filter(s => cls(s) === 'Retain').length,
      order: names(cand), funded: names(funded), skipped: names(skipped), nFunded: funded.length,
      interestCut: funded.reduce((a, s) => a + s.interest, 0), interestAll: S.reduce((a, s) => a + s.interest, 0),
      topName: top.name, topEffort: top.effort, topInterest: top.interest, topPb: r2(pb(top)), topNet8: 8 * top.interest - top.effort,
      dispatchPb: r2(pb(S.find(s => s.id === 'A-01'))), glPb: r2(pb(S.find(s => s.id === 'A-04'))), glInterest: S.find(s => s.id === 'A-04').interest, glEffort: S.find(s => s.id === 'A-04').effort };
    for (const s of S) N.b14['pb_' + s.id.replace('-', '')] = r2(pb(s)); }

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
    if (typeof F[k] === 'string') { if (d) throw new Error('money placeholder on text ' + m); return F[k]; }   // ids and lists (BR-8)
    // A value with more than two decimals would print rounded (0.005 as "0.01"): refuse it (Phase 3b blind check).
    if (!d && Math.abs(Math.round(F[k] * 100) - F[k] * 100) > 1e-6) throw new Error('placeholder ' + m + ' has more than two decimals (' + F[k] + '); round it in the math module or restate the unit');
    return d ? money(F[k]) : Number(F[k]).toLocaleString('en-US', { maximumFractionDigits: 2 });
  });
}
module.exports = { compute, flat, fill, money };
if (require.main === module) process.stdout.write(JSON.stringify(flat(compute()), null, 1) + '\n');
