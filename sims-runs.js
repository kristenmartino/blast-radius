// Stepped runs (study-kit validateSims). Each entry also carries lane and levels.
// BRN-1: vendor and license renewal. Every number comes from math/numbers.js through {{placeholders}}
// ({{$x}} prints money). Companies, products and prices are fictional. Business value (pv) is in $k of savings:
// planned = savings promised to the CFO, actual = savings that land.
'use strict';
const { compute, flat, fill } = require('./math/numbers.js');
const N = compute(), F = flat(N), t = s => fill(s, F);
const eff = (a, b, c, d) => [a, b, c, d];
const P = N.pv;
const { place } = require('./content/place.js');
// Answer positions, one per step (written with the answer at B, then moved).
const POS = [2, 0, 3, 1, 3, 0];

const runs = [{
  id: 'BRN-1', status: 'Draft', lane: 'cio', levels: ['director', 'vp'],
  title: 'Three renewals, one CFO', role: 'CIO',
  blurb: 'Six decisions across three software renewals. Every figure is computed in code; the prices and companies are fictional.',
  briefing: t('You are CIO of Halvorsen Supply, a 1,800-person distributor (fictional). Three renewals land this year: the Corvane office suite ({{entitled}} seats), the Pipeline CRM ({{crmLicensed}} seats at {{$crmPrice}} a seat a year) and Tallyhouse, the CRM that came with last year’s acquisition ({{tallySeats}} seats at {{$tallyPrice}}). The CFO wants savings and counts the ${{startK}}k last year’s cleanup already delivered. Business value here is savings in $k: what you promise the CFO, and what lands.'),
  meters: ['budget', 'continuity', 'leverage', 'trust'],
  meterLabels: { budget: 'Budget headroom', continuity: 'Service continuity', leverage: 'Vendor leverage', trust: 'Business trust' },
  start: { planned: N.startK, actual: N.startK },
  predNote: 'Here predictability is savings delivered ÷ savings promised to the CFO.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-1-01', phase: 'Audit',
      stem: t('Pipeline CRM renews in 60 days. You hold {{crmLicensed}} seats. Login data shows {{crmActive}} people used it in the last 90 days, and {{crmInactive180}} accounts have not logged in for 180 days. Sales ops expects modest hiring this year. What do you renew?'),
      options: [t('Renew all {{crmLicensed}} seats; cutting seats annoys sales'), t('Renew {{crmRight}} seats: active users plus a 10% buffer, after removing the {{crmInactive180}} dormant accounts'), t('Renew exactly {{crmActive}} seats, the active count'), 'Renew as is and audit usage next year'],
      answer: 1,
      whyNot: { 0: t('Paying for {{crmLicensed}} when {{crmActive}} use it buys shelfware worth about {{$crmTightSave}} a year.'), 2: t('No buffer: the hiring sales ops expects means re-adding seats mid-year at list price.'), 3: 'Waiting a year locks in another year of unused seats.' },
      effects: eff({ budget: -10 }, { budget: 10, trust: 5 }, { budget: 10, continuity: -10, trust: -5 }, { budget: -5, leverage: -5 }),
      pv: { 1: { planned: P.s1.right, actual: P.s1.right }, 2: { planned: P.s1.tight, actual: P.s1.tight } },
      sets: { 2: 'tight' },
      why: t('{{crmRight}} seats is {{crmActive}} active users plus 10%, rounded up. Dropping {{crmLicensed}} − {{crmRight}} seats at {{$crmPrice}} saves {{$crmRightSave}} a year and leaves room for hiring.'),
      lesson: 'Size renewals to measured use plus a stated buffer, not to last year’s count.' },

    { id: 'BRN-1-02', phase: 'True-up',
      stem: t('Corvane’s annual true-up arrives: {{deployed}} accounts deployed against {{entitled}} entitled, so {{over}} extra seats. The contract charges added seats at {{$suitePrice}} a seat a year for the {{monthsLeft}} months left in the term year: {{$trueUp}}. HR’s list shows {{leavers}} of the accounts belong to people who have left.'),
      update: 'The CRM renewal is signed.', updateIf: { tight: 'Sales ops has already asked when new hires get CRM seats.' },
      options: [t('Pay the {{$trueUp}} as reported'), t('Reclaim the {{leavers}} leaver accounts first, true up the remaining {{overClean}} seats, and fix offboarding so licences are released'), 'Dispute the count with Corvane before doing anything', t('Disable the {{over}} newest accounts so there is nothing to true up')],
      answer: 1,
      whyNot: { 0: t('Paying for leavers’ accounts wastes {{$trueUpAvoided}} and the leak repeats next year.'), 2: 'The count is right; the leak is yours. Disputing it spends goodwill you need for the CRM deal.', 3: 'The newest accounts are new hires doing real work. It saves money by breaking service.' },
      effects: eff({ budget: -5 }, { budget: 5, continuity: 5, trust: 5 }, { leverage: -10, trust: -5 }, { continuity: -20, trust: -15 }),
      pv: { 1: { planned: P.s2.avoided, actual: P.s2.avoided }, 3: { planned: P.s2.cut, actual: P.s2.cut } },
      why: t('{{deployed}} − {{leavers}} − {{entitled}} = {{overClean}} seats, so the true-up falls from {{$trueUp}} to {{$trueUpClean}}: {{$trueUpAvoided}} avoided. Fixing offboarding stops the same leak next year.'),
      lesson: 'A true-up is an audit of your own offboarding. Clean the count before you pay it.' },

    { id: 'BRN-1-03', phase: 'Consolidate',
      stem: t('Tallyhouse ({{tallySeats}} seats, {{tallyActive}} active, {{$tallyPrice}} a seat) ends in seven months. Pipeline offers {{tierDiscPct}}% off every seat if you reach {{tierMin}} seats: {{$tierPrice}} a seat. Migrating users costs {{$migration}} once. Renewing both as they are costs {{$baseline}} a year.'),
      updateIf: { tight: t('Sales ops re-added {{reAdd}} Pipeline seats at list price for the last {{reAddMonths}} months of the year: {{$reAddCost}} you had counted as saved.') },
      options: ['Renew Tallyhouse for another year at all 180 seats', t('Move the {{tallyActive}} active Tallyhouse users into Pipeline ({{consSeats}} seats), take the volume price, and retire Tallyhouse'), t('Move all {{tallySeats}} Tallyhouse accounts into Pipeline, active or not'), t('Keep both CRMs and renew Tallyhouse at the {{tallyActive}} active seats')],
      answer: 1,
      whyNot: { 0: 'Renewing as is keeps two CRMs and pays for 30 idle seats.', 2: t('Moving idle accounts buys {{consAllSeats}} seats; after the {{$migration}} migration the first-year saving shrinks to {{$consAllNet}}.'), 3: t('Saves {{$keepBothSave}} but keeps two CRMs, two contracts and two sets of customer records.') },
      effects: eff({ budget: -10, leverage: -5 }, { budget: 5, leverage: 10, continuity: 5 }, { budget: -5 }, { budget: 5, leverage: -5 }),
      pv: { 1: { planned: P.s3.cons, actual: P.s3.cons }, 2: { planned: P.s3.allPlanned, actual: P.s3.allActual }, 3: { planned: P.s3.keep, actual: P.s3.keep } },
      pvIf: { tight: { 0: { actual: P.s1.reAdd }, 1: { actual: P.s1.reAdd }, 2: { actual: P.s1.reAdd }, 3: { actual: P.s1.reAdd } } },
      sets: { 1: 'consolidated' },
      why: t('{{consSeats}} seats at {{$tierPrice}} cost {{$consCost}} against {{$baseline}}: {{$consGross}} a year at full run rate, {{$consNet}} in the first full year after the {{$migration}} migration. Tallyhouse runs until its contract ends, so the first calendar year saves less.'),
      lesson: 'Consolidation pays when it moves you into a better price tier; count the migration in year one.' },

    { id: 'BRN-1-04', phase: 'Term',
      stem: t('Pipeline offers two terms for {{consSeats}} seats at {{$tierPrice}}: one year at a time with price rises capped at {{upliftPct}}% a year ({{$roll3}} over three years if the cap is used), or three years at a locked price ({{$lock3}}). Headcount plans beyond next year are uncertain, and the account team has said contract terms are open to negotiation.'),
      updateIf: { consolidated: 'Tallyhouse users start on Pipeline next month.' },
      options: [t('Sign one year and accept the {{upliftPct}}% cap'), t('Sign three years at the locked price, with the right to reduce seats by {{flexPct}}% a year'), 'Sign three years at the locked price with no seat flexibility', t('Sign three years for {{overbuySeats}} seats to get ahead of growth')],
      answer: 1,
      whyNot: { 0: t('If the cap is used, one-year terms cost {{$termSave}} more over three years.'), 2: 'The price is locked, but so is the seat count; a headcount drop leaves you paying for empty seats.', 3: t('{{overbuySeats}} seats for three years costs {{$overbuyCost3}}, buying growth that is not in the plan.') },
      effects: eff({ budget: -5 }, { budget: 10, leverage: 10 }, { budget: 10, continuity: -5 }, { budget: -15 }),
      why: t('Three years locked saves {{$termSave}} against the capped path ({{$termSaveY2}} in year 2, {{$termSaveY3}} in year 3, nothing in year 1). The flex clause keeps the saving from turning into shelfware if headcount falls.'),
      lesson: 'Lock price, not volume. Multi-year deals need a way down as well as up.' },

    { id: 'BRN-1-05', phase: 'Upsell',
      stem: t('Pipeline’s account executive proposes the premium tier for all {{consSeats}} seats at {{$premium}} more a seat a year ({{$upsellAll}}). Sales ops says {{power}} power users need its forecasting features; nobody else has asked.'),
      options: [t('Buy premium for all {{consSeats}} seats'), t('Buy premium for the {{power}} power users ({{$upsellPower}}) after a 60-day pilot shows they use it'), 'Decline the premium tier entirely', 'Buy premium for all seats if Pipeline takes 2% off the base price'],
      answer: 1,
      whyNot: { 0: t('{{$upsellAll}} a year for features {{power}} people asked for.'), 2: 'Declining outright ignores a real need sales ops raised.', 3: t('2% off the base is {{$upsellSwapDisc}}; the premium tier costs {{$upsellAll}}.') },
      effects: eff({ budget: -20 }, { trust: 5, leverage: 5 }, { trust: -5 }, { budget: -15 }),
      why: t('Buying for the {{power}} users who need it costs {{$upsellPower}} instead of {{$upsellAll}}, and the pilot proves the use before you pay for it.'),
      lesson: 'Buy premium tiers for named users with a named need, after a pilot.' },

    { id: 'BRN-1-06', phase: 'Report',
      stem: 'The CFO asks for the savings number for this year’s board pack. You have one-year savings, a one-time migration cost and a three-year term saving that mostly lands in later years.',
      updateIf: { tight: 'The mid-year CRM re-adds are in the numbers.' },
      options: ['Report the three-year term saving as part of this year’s savings', 'Report this year’s delivered savings against what you promised, with the migration cost and the multi-year saving shown separately', 'Report the gross consolidation saving and leave out the migration cost', 'Hold the report until year end so the number is final'],
      answer: 1,
      whyNot: { 0: 'Most of the term saving lands in years 2 and 3; booking it now overstates this year.', 2: t('Leaving out the {{$migration}} migration overstates year one.'), 3: 'The board pack needs a number now; a dated number with its assumptions beats none.' },
      effects: eff({ trust: -15 }, { trust: 10 }, { trust: -10 }, { trust: -5 }),
      why: t('A CFO trusts the next number only if this one reconciles: on the best path, ${{bestPathK}}k this year, with the term saving shown as future years.'),
      lesson: 'Report savings by the year they land, with one-time costs beside them.' }
  ],
  endings: [
    { min: 75, title: 'A renewal the CFO trusts', text: 'Seats match use, the second CRM is retired, the term protects you both ways, and the savings number reconciles.' },
    { min: 55, title: 'Savings with loose ends', text: 'Money was saved, but some of it came from cuts that cost service, leverage or the CFO’s trust.' },
    { min: 0, title: 'Renewals that cost more than they saved', text: 'Shelfware stayed, the vendor set the terms, and the savings story will not survive the next review.' }
  ]
}];
runs[0].steps.forEach((st, i) => place(st, POS[i]));
module.exports = runs;
