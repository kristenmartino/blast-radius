// Stepped runs (study-kit validateSims). Each entry also carries lane and levels.
// BRN-1: vendor and license renewal. Every number comes from math/numbers.js through {{placeholders}}
// ({{$x}} prints money). Companies, products and prices are fictional. Business value (pv) is in $k of savings:
// planned = savings promised to the CFO, actual = savings that land.
// BRN-1 reviewed by Kristen Nov 24, 2026 (00:16 ET).
'use strict';
const { compute, flat, fill } = require('./math/numbers.js');
const N = compute(), F = flat(N), t = s => fill(s, F);
const eff = (a, b, c, d) => [a, b, c, d];
const P = N.pv;
const { place } = require('./content/place.js');
// Answer positions, one per step (written with the answer at B, then moved).
const POS = [2, 0, 3, 1, 3, 0];

const runs = [{
  id: 'BRN-1', status: '', lane: 'cio', section: 'renewal-sim', levels: ['director', 'vp'],
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

const I = N.i, IP = N.i.pv;
runs.push({
  id: 'BRN-2', status: 'Draft', lane: 'cio', alsoIn: ['ai-leadership', 'cto'], section: 'cost-sim', levels: ['vp', 'c-level'],
  title: 'Inference at scale', role: 'CIO',
  blurb: 'Six quarters of an AI assistant’s costs as usage grows tenfold. Every figure is computed in code; prices are fictional but follow the published per-token model.',
  briefing: t('Halvorsen Supply (fictional) runs a customer-service assistant on a hosted model. Each request sends {{i.fixedTok}} tokens of fixed instructions and about {{i.varTok}} tokens of question, and gets about {{i.outTok}} tokens back. The model costs ${{i.pin}} per million input tokens and ${{i.pout}} per million output tokens, so {{$i.cBase}} a request today. Usage will grow from {{i.v1}} to {{i.v6}} requests a month over six quarters. Business value here is monthly savings in $k against the starting price; ${{i.startK}}k was saved last year.'),
  meters: ['unitcost', 'reliability', 'capacity', 'risk'],
  meterLabels: { unitcost: 'Unit cost', reliability: 'Reliability', capacity: 'Team capacity', risk: 'Risk control' },
  start: { planned: I.startK, actual: I.startK },
  predNote: 'Here predictability is savings delivered ÷ savings promised.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-2-01', phase: 'Q1',
      stem: t('{{i.v1}} requests a month cost {{$i.base1}}. The {{i.fixedTok}}-token instructions are identical on every request. The provider bills cached input reads at {{i.cachePct}}% of the input price. An engineer also suggests a model at a third of the price that nobody has tested on your tickets.'),
      options: ['Leave it; the bill is small', t('Cache the fixed instructions, so each request pays full price only for its own {{i.varTok}} tokens'), 'Switch to the cheaper model now', 'Self-host an open model to own the costs'],
      answer: 1,
      whyNot: { 0: 'The bill grows with usage; the waste grows with it.', 2: 'An untested model can cost more in wrong answers and escalations than it saves.', 3: 'Self-hosting adds fixed cost and staff before volume justifies it.' },
      effects: eff({ unitcost: -5 }, { unitcost: 15, risk: 5 }, { unitcost: 10, reliability: -15, risk: -10 }, { unitcost: -10, capacity: -20 }),
      pv: { 1: { planned: IP.s1, actual: IP.s1 }, 2: { planned: IP.cheapPlan, actual: 0 } },
      sets: { 2: 'cheap' },
      why: t('Caching cuts the cost per request from {{$i.cBase}} to {{$i.cCache}}: {{$i.save1}} a month at today’s volume, with no change to answers.'),
      lesson: 'Cut repeated input first: caching changes the bill, not the answers.' },
    { id: 'BRN-2-02', phase: 'Q2',
      stem: t('Volume is {{i.v2}} a month. {{i.batchSharePct}}% of requests are overnight summaries nobody reads until morning. The provider’s batch service processes requests within a day at {{i.batchPct}}% off, and the discount applies on top of caching.'),
      updateIf: { cheap: 'Support escalations rose after the model switch; the team rolled back to the original model.' },
      options: ['Keep everything real-time', t('Send the overnight {{i.batchSharePct}}% through the batch service'), 'Send all requests through batch', 'Cut the summaries to save cost'],
      answer: 1,
      whyNot: { 0: 'Paying real-time prices for work nobody needs in real time.', 2: 'Customers waiting up to a day for live answers breaks the service.', 3: 'The summaries are used every morning; cutting them moves work back to people.' },
      effects: eff({ unitcost: -5 }, { unitcost: 10, reliability: 5 }, { unitcost: 15, reliability: -25 }, { unitcost: 5, capacity: -10 }),
      pv: { 1: { planned: IP.s2, actual: IP.s2 } },
      why: t('Batch halves the cost of the overnight share: {{$i.save2}} a month saved, bringing the blended cost to {{$i.cBlend}} a request.'),
      lesson: 'Match the price to the urgency: batch whatever can wait.' },
    { id: 'BRN-2-03', phase: 'Q3',
      stem: t('Volume is {{i.v3}} a month and the monthly bill is {{$i.cost3}}. The CFO asks whether AI costs are under control. The assistant helped resolve {{i.tickets3}} tickets this month.'),
      options: ['Report the monthly bill', t('Report cost per resolved ticket ({{$i.perTicket3}}) alongside volume, and track it monthly'), 'Report tokens used', 'Report the provider’s list price'],
      answer: 1,
      whyNot: { 0: 'A rising bill alone looks like a problem even when each answer gets cheaper.', 2: 'Tokens mean nothing to a CFO.', 3: 'List price is not what you pay after caching and batch.' },
      effects: eff({ risk: -5 }, { risk: 10, capacity: 5 }, { risk: -5 }, { risk: -10 }),
      why: 'A unit cost ties spend to the work done, so growth in the bill can be read against growth in tickets resolved.',
      lesson: 'Report AI spend per unit of work, not just the total.' },
    { id: 'BRN-2-04', phase: 'Q4',
      stem: t('The provider offers {{i.discPct}}% off a 12-month monthly spend commitment, billed whether used or not; usage above it is billed at the normal price. Forecast spend is {{$i.fc4}} a month ({{i.v4}} requests), but quarterly volume has varied by about 15%. A larger commitment of 150% would get {{i.bigDiscPct}}%.'),
      options: [t('Commit to the full forecast, {{$i.c100}} a month'), t('Commit to 80% of forecast, {{$i.c80}} a month, and pay the rest at the normal price'), 'Make no commitment', t('Commit to 150%, {{$i.c150}} a month, for {{i.bigDiscPct}}% off')],
      answer: 1,
      whyNot: { 0: t('A slow quarter leaves part of the commitment unused. At {{i.act4v}} requests it saves {{$i.save100}} a month instead of the {{$i.plan100}} promised.'), 2: 'Leaves a steady, predictable baseline on full price.', 3: t('Paying for half again as much as you use: at {{i.act4v}} requests the bill rises by {{$i.save150}} a month against no commitment.') },
      effects: eff({ unitcost: 5, risk: -5 }, { unitcost: 10, risk: 5 }, { unitcost: -5 }, { unitcost: -15, risk: -10 }),
      pv: { 0: { planned: IP.p100, actual: IP.a100 }, 1: { planned: IP.p80, actual: IP.a80 }, 3: { planned: IP.p150, actual: IP.a150 } },
      why: t('Committing to the steady baseline uses the whole commitment even in a slow quarter. The quarter came in at {{i.act4v}} requests; the 80% commitment saved {{$i.save80}} a month, as planned.'),
      lesson: 'Commit to the baseline you are sure of; pay normal price for the swing.' },
    { id: 'BRN-2-05', phase: 'Q5',
      stem: t('Volume is {{i.v5}} a month, about {{$i.api5}} on the hosted model. An engineer proposes self-hosting an open model: GPUs at {{$i.gpu}} a month plus two engineers costing {{$i.staff}} a month together, so {{$i.selfFixed}} a month before any request.'),
      options: ['Self-host everything this quarter', t('Stay hosted and set a review trigger at about {{i.breakEvenM}} million requests a month, where the fixed cost breaks even'), 'Fine-tune a model on your tickets this quarter', 'Freeze usage to hold the bill flat'],
      answer: 1,
      whyNot: { 0: t('At this volume self-hosting costs {{$i.selfGap}} a month more than the hosted model.'), 2: 'Fine-tuning is a project with its own cost and evaluation work; nothing here says quality is the problem.', 3: 'Freezing usage caps the value the assistant delivers.' },
      effects: eff({ unitcost: -20, capacity: -20 }, { unitcost: 5, capacity: 10 }, { capacity: -10 }, { reliability: -10, capacity: -5 }),
      pv: { 0: { planned: 0, actual: IP.self } },
      why: t('{{$i.selfFixed}} a month ÷ {{$i.cBlend}} a request is about {{i.breakEvenM}} million requests a month. Below that, the hosted model is cheaper; a dated trigger keeps the option open.'),
      lesson: 'Self-hosting is a volume decision: compute the break-even and set a trigger.' },
    { id: 'BRN-2-06', phase: 'Q6',
      stem: t('Volume is {{i.v6}} a month and the bill is {{$i.spend6}}, up from {{$i.base1}} in Q1. The board asks why AI spend has grown almost fivefold.'),
      options: ['Show the total spend and promise to cut it', t('Show volume up tenfold and cost per request down {{i.unitDropPct}}%, with the next trigger'), 'Show the token counts by month', 'Point to the vendor’s price list'],
      answer: 1,
      whyNot: { 0: 'Promising a cut without the unit view treats growth in use as waste.', 2: 'Token counts do not answer a board question.', 3: 'The price list is not what you pay and not what changed.' },
      effects: eff({ risk: -10 }, { risk: 10 }, { risk: -5 }, { risk: -10 }),
      why: t('Without caching and batch, {{i.v6}} requests would cost {{$i.spendBase6}} a month. Cost per request fell from {{$i.cBase}} to {{$i.cBlend}} ({{i.unitDropPct}}%) while volume grew tenfold.'),
      lesson: 'Explain AI spend as volume times unit cost, and show both moving.' }
  ],
  endings: [
    { min: 75, title: 'Costs that scale with value', text: 'Unit cost fell by half, commitments matched the baseline, and the board saw spend explained by use.' },
    { min: 55, title: 'Savings with gaps', text: 'Some savings landed, but a commitment, a model switch or a self-hosting call cost more than it saved.' },
    { min: 0, title: 'A bill nobody can explain', text: 'Spend grew faster than value, and the board heard a total with no story behind it.' }
  ]
});
// ---------------------------------------------------------------- Phase 2b, AI leadership lane (Draft)
// BRN-3: value is counted in hours a week saved. Planned = hours you put in the business case or board pack;
// actual = hours measured by time study. Predictability = measured ÷ promised.
const RO = N.ro, RP = N.ro.pv;
runs.push({
  id: 'BRN-3', status: 'Draft', lane: 'ai-leadership', section: 'rollout-sim', levels: ['director', 'vp', 'c-level'],
  title: 'AI assistant rollout', role: 'Head of AI Enablement',
  blurb: 'Four quarters, eight decisions, rolling an AI assistant out at a 5,000-person company. Every figure is computed in code; the product and prices are fictional.',
  briefing: t('You lead AI enablement at Larkfield Group, a {{ro.staff}}-person company (fictional). The board approved an AI assistant at {{$ro.price}} a user a month. Over four quarters you decide who gets it, how people learn it, how you measure it and what you report. Business value here is hours a week saved: what you promise in the business case and board pack, and what a time study measures. Last year’s small pilot saves a measured {{ro.startH}} hours a week.'),
  meters: ['adoption', 'value', 'risk', 'trust'],
  meterLabels: { adoption: 'Adoption', value: 'Measured value', risk: 'Risk control', trust: 'CFO and board trust' },
  start: { planned: RO.startH, actual: RO.startH },
  predNote: 'Here predictability is hours measured ÷ hours promised.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-3-01', phase: 'Q1 licences',
      stem: t('The CFO would like everyone on the assistant this year: {{$ro.yrAll}} a year for {{ro.staff}} people. Claims, finance, customer service and sales have named the tasks they want help with; together they are {{ro.L1}} people. Who gets licences first?'),
      options: [t('All {{ro.staff}} people at once'), t('The {{ro.L1}} people in the four functions with named use cases ({{$ro.yrL1}} a year), expanding on measured use'), t('{{ro.vol}} volunteers from anywhere ({{$ro.yrVol}} a year)'), 'Nobody yet; wait a year for prices to fall'],
      answer: 1,
      whyNot: { 0: t('{{$ro.yrAll}} a year before anyone knows which jobs it helps; unused licences are the usual result.'), 2: 'Volunteers are keen but scattered; you learn little about any one job.', 3: 'People use consumer tools in the meantime, with your data.' },
      effects: eff({ value: -10, adoption: 5, risk: -5 }, { adoption: 5, value: 10, trust: 5 }, { adoption: -5, value: -5 }, { adoption: -15, risk: -10 }),
      why: t('Starting where the work is named gives you a measurable first group for {{$ro.yrL1}} a year, against {{$ro.yrAll}} for everyone.'),
      lesson: 'License where the use cases are named, then expand on measured use.' },

    { id: 'BRN-3-02', phase: 'Q1 launch',
      stem: t('The assistant can read any file its user can open. A sample check finds HR and finance folders shared with everyone in the company. A permissions review costs {{$ro.permReview}} and takes six weeks. Launch is planned for next week.'),
      options: ['Launch next week and fix permissions afterwards', 'Publish the acceptable-use policy and fix permissions on the four functions’ sites first; launch each function when its sites are clean', 'Block the assistant from all internal files', 'Rely on the vendor’s default settings'],
      answer: 1,
      whyNot: { 0: 'The assistant will surface those folders to anyone who asks the right question.', 2: 'Most of the value comes from working with internal documents.', 3: 'Default settings follow your permissions; your permissions are the problem.' },
      effects: eff({ adoption: 5, risk: -20 }, { risk: 15, trust: 5 }, { value: -15, adoption: -10, risk: 5 }, { risk: -15 }),
      sets: { 0: 'noperm', 3: 'noperm' },
      why: 'An assistant exposes whatever your permissions already allow. Fixing the sites it will read before it reads them is cheaper than an incident.',
      lesson: 'Clean up file permissions before an assistant can search them.' },

    { id: 'BRN-3-03', phase: 'Q2 training',
      stem: t('Licences are live. You have budget for one of these. Which?'),
      options: ['One all-hands webinar on what the assistant can do', t('Two hours of role-based training, {{ro.champions}} champions (one per 50 users) with 10% of their time, and a library of use cases by function'), 'The vendor’s e-learning course', 'Nothing; the assistant is easy to use'],
      answer: 1,
      whyNot: { 0: 'A webinar shows features, not how to use them in a claims or finance job.', 2: 'Generic courses teach the product, not the work.', 3: 'Easy to open is not the same as useful in a given job.' },
      effects: eff({ adoption: -5 }, { adoption: 15, value: 5 }, { adoption: -5 }, { adoption: -15 }),
      sets: { 0: 'thin', 1: 'trained', 2: 'thin', 3: 'thin' },
      why: 'People adopt a tool when they see it do their own work. Champions in each team answer the next question when the trainer has gone.',
      lesson: 'Train by role, with champions in the teams, not by feature.' },

    { id: 'BRN-3-04', phase: 'Q2 business case',
      stem: t('A survey of weekly users says the assistant saves them {{ro.claimH}} hours a week each. A time study on {{ro.studyN}} of them measures {{ro.measH}} hours. The CFO asks what to put in next year’s business case.'),
      updateIf: { trained: t('Weekly use reached {{ro.actPct}}% of licences: {{ro.A2}} people.'), thin: t('Weekly use reached only {{ro.thinPct}}% of licences: {{ro.A2thin}} people.') },
      options: [t('The survey’s {{ro.claimH}} hours a week per weekly user'), t('The measured {{ro.measH}} hours per weekly user, with the survey shown beside it, and a comparison group to keep measuring'), t('A midpoint of {{ro.midH}} hours per weekly user'), t('{{ro.claimH}} hours for every licence issued')],
      answer: 1,
      whyNot: { 0: 'A survey is what people believe; the time study is what happened.', 2: 'A midpoint between a claim and a measurement is neither.', 3: 'Licences are not users, and the hours are the survey’s.' },
      effects: eff({ trust: -10, value: -5 }, { trust: 10, value: 5 }, { trust: -5 }, { trust: -15, value: -5 }),
      pv: { 0: { planned: RP.q2.claim, actual: RP.q2.meas }, 1: { planned: RP.q2.meas, actual: RP.q2.meas }, 2: { planned: RP.q2.mid, actual: RP.q2.meas }, 3: { planned: RP.q2.lic, actual: RP.q2.meas } },
      pvIf: { thin: { 0: { planned: RP.thin.claim, actual: RP.thin.meas }, 1: { planned: RP.thin.meas, actual: RP.thin.meas }, 2: { planned: RP.thin.mid, actual: RP.thin.meas }, 3: { actual: RP.thin.meas } } },
      why: t('With {{ro.A2}} weekly users, the survey promises {{ro.h2claim}} hours a week; the time study measures {{ro.h2meas}}. Only the measured figure will still be true when finance checks it.'),
      lesson: 'Promise the measured number; show the survey as what people believe.' },

    { id: 'BRN-3-05', phase: 'Q3 incident',
      stem: 'An employee asks the assistant about pay bands and gets a summary of a salary spreadsheet from an HR folder shared with everyone. She reports it.',
      updateIf: { noperm: 'This is one of the folders the sample check found before launch.' },
      options: ['Switch the assistant off for everyone until every permission is reviewed', 'Lock the folder now, fix HR and finance permissions this week, bring in HR and legal, tell the people whose pay was exposed, and keep the assistant running elsewhere', 'Fix the folder quietly and say nothing', 'Remind the employee of the acceptable-use policy'],
      answer: 1,
      whyNot: { 0: 'Stops all the value to fix one class of problem you can fix directly.', 2: 'People whose pay was exposed have a right to know, and silence costs trust when it comes out.', 3: 'She did nothing wrong; the folder did.' },
      effects: eff({ adoption: -15, risk: 5, value: -10 }, { risk: 10, trust: 5 }, { risk: -5, trust: -15 }, { trust: -10, risk: -10 }),
      why: 'The assistant did what the permissions allowed. Contain the data, fix the cause, tell the people affected, and keep the rest of the rollout running.',
      lesson: 'An oversharing incident is a permissions problem: contain, fix, tell, continue.' },

    { id: 'BRN-3-06', phase: 'Q3 expansion',
      stem: t('Business units ask for licences for the {{ro.unlicensed}} people not yet covered. Usage data shows {{ro.unused}} current licences unused for 60 days. Teams with a named use case and a trained champion total {{ro.E}} people.'),
      options: [t('License all {{ro.unlicensed}} now'), t('Add {{ro.E}} licences for the teams with a use case and a champion, and reclaim the {{ro.unused}} unused ones: {{ro.L3}} licences, {{$ro.yrL3}} a year'), 'Freeze licences until next year', 'Give licences to whichever teams ask first'],
      answer: 1,
      whyNot: { 0: 'Repeats the mistake the first wave avoided: licences ahead of use.', 2: 'Teams that are ready wait, and some buy their own tools.', 3: 'Asking first is not evidence of use.' },
      effects: eff({ value: -10, adoption: 5 }, { adoption: 10, value: 5 }, { adoption: -10, trust: -5 }, { value: -5, trust: -5 }),
      why: t('Expanding where the conditions for use exist and reclaiming idle licences gives {{ro.L3}} licences for {{$ro.yrL3}} a year.'),
      lesson: 'Expand to teams that meet the conditions for use; reclaim idle licences as you go.' },

    { id: 'BRN-3-07', phase: 'Q4 renewal',
      stem: t('The vendor offers all {{ro.staff}} seats for three years at {{ro.disc3}}% off, {{$ro.allYr}} a year and {{$ro.all3yr}} in all, if you sign this quarter. You hold {{ro.L3}} licences.'),
      updateIf: { trained: t('{{ro.A4}} people use it weekly.'), thin: t('{{ro.A4thin}} people use it weekly.') },
      options: [t('Sign the three-year deal for {{ro.staff}} seats'), t('Renew {{ro.L3}} seats for one year at list ({{$ro.yrL3}}), with the right to add seats at the list price of {{$ro.price}} as teams qualify'), 'Cut to the people active last week only', 'Let it lapse and see who complains'],
      answer: 1,
      whyNot: { 0: t('On the planned path that is {{$ro.perActiveAll}} a year per weekly user, against {{$ro.perActiveL3}}.'), 2: 'Leaves no room for the teams qualifying next quarter.', 3: 'People move to consumer tools with your data.' },
      effects: eff({ value: -15, trust: -5 }, { value: 10, trust: 5 }, { adoption: -10, value: 5 }, { adoption: -20, risk: -15 }),
      why: t('With {{ro.A4}} weekly users, the three-year deal costs {{$ro.perActiveAll}} a year for each of them; renewing what you use costs {{$ro.perActiveL3}}, and the add-on right keeps the price for growth.'),
      lesson: 'Buy for measured use with a price-protected way up, not for headcount.' },

    { id: 'BRN-3-08', phase: 'Q4 board',
      stem: t('The board asks what the assistant delivered this year. Finance confirms one cash saving: {{$ro.cash}} of claims contractor spend not renewed.'),
      options: ['Survey hours times the loaded rate, reported as savings', t('Measured hours a week, use by function, licence cost, the incident and its fix, and {{$ro.cash}} as the only cash saving'), 'Licences issued and training completions', 'The vendor’s published customer results'],
      answer: 1,
      whyNot: { 0: 'Prices claimed hours as cash; finance will not find it in any budget.', 2: 'Inputs; the board asked what it delivered.', 3: 'Another company’s results are not yours.' },
      effects: eff({ trust: -15 }, { trust: 10, value: 5 }, { trust: -5, value: -5 }, { trust: -10 }),
      pv: { 0: { planned: RP.q4.claim, actual: RP.q4.meas }, 1: { planned: RP.q4.meas, actual: RP.q4.meas }, 2: { planned: RP.q4.meas, actual: RP.q4.meas }, 3: { planned: RP.q4.claim, actual: RP.q4.meas } },
      why: t('Measured savings rose to {{ro.h4meas}} hours a week on the planned path. Hours are capacity; the {{$ro.cash}} is the cash. Keeping them apart is what makes next year’s number believable.'),
      lesson: 'Report measured hours as capacity and only budget cuts as cash.' }
  ],
  endings: [
    { min: 75, title: 'Adoption the CFO can count', text: 'Licences followed use, the incident was contained and fixed, and every number in the board pack was measured.' },
    { min: 55, title: 'Usage without proof', text: 'People use the assistant, but some of what was promised came from surveys, or licences ran ahead of use.' },
    { min: 0, title: 'Licences, not value', text: 'Spend rose, the numbers came from belief, and the next renewal will be a fight.' }
  ]
});

// BRN-4: value is $k a year from AI work in production. Planned = what you promise sponsors; actual = what lands.
const IQ = N.iq;
runs.push({
  id: 'BRN-4', status: 'Draft', lane: 'ai-leadership', section: 'intake-sim', levels: ['director', 'vp'],
  title: 'Intake queue', role: 'AI Program Lead',
  blurb: 'Eight weeks of triage on a queue of 200 AI requests with a fixed team. Counts and values are computed in code; the company is fictional.',
  briefing: t('You run the AI program at Brightwater Logistics (fictional). {{iq.total}} requests are waiting. Your team is six people in {{iq.pods}} pods of two: {{iq.podWeeks}} pod-weeks of build capacity over the next {{iq.weeks}} weeks. Each week the triage group makes one call. Business value here is $k a year from AI work in production: ${{iq.startK}}k today.'),
  meters: ['backlog', 'satisfaction', 'value', 'load'],
  meterLabels: { backlog: 'Backlog health', satisfaction: 'Stakeholder satisfaction', value: 'Delivered value', load: 'Team capacity' },
  start: { planned: IQ.startK, actual: IQ.startK },
  predNote: 'Here predictability is value delivered ÷ value promised to sponsors.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-4-01', phase: 'Week 1',
      stem: 'Requests arrive by email, chat and corridor. How will the triage group rank them?',
      options: ['First come, first served', 'Score value, feasibility and risk on written scales, in a weekly triage group that includes the business; send high-risk requests to governance review', 'By the seniority of the sponsor', 'By value alone'],
      answer: 1,
      whyNot: { 0: 'Arrival order is not value.', 2: 'Seniority ranks people, not work.', 3: 'Ignores whether it can be built and what could go wrong.' },
      effects: eff({ value: -10, satisfaction: 5 }, { value: 10, backlog: 5 }, { satisfaction: -10, value: -10 }, { value: 5, backlog: -5 }),
      why: 'Written scales let anyone check a ranking, and a weekly cadence gives requesters a date for an answer.',
      lesson: 'A published rubric and a fixed cadence make every decision explainable.' },

    { id: 'BRN-4-02', phase: 'Week 2',
      stem: t('{{iq.self}} requests ask for help drafting, summarizing or translating documents. The company already licenses an AI assistant that does this.'),
      options: [t('Build a small tool for each of the {{iq.self}}'), 'Send them to the existing assistant with a prompt library and weekly office hours', 'Reject them', 'Defer them to next quarter'],
      answer: 1,
      whyNot: { 0: t('{{iq.self}} builds would use far more than the {{iq.podWeeks}} pod-weeks you have.'), 2: 'The need is real and already paid for.', 3: 'They wait for something they can have today.' },
      effects: eff({ load: -25, backlog: 5 }, { backlog: 15, satisfaction: 5 }, { satisfaction: -15, backlog: 10 }, { backlog: -10, satisfaction: -5 }),
      sets: { 0: 'swamped' },
      why: t('Self-service closes {{iq.self}} requests in a week: {{iq.after2}} left.'),
      lesson: 'Route what existing tools can do to self-service, with help.' },

    { id: 'BRN-4-03', phase: 'Week 3',
      stem: t('{{iq.dup}} of the remaining requests describe the same {{iq.dupDistinct}} needs, raised separately by different business units.'),
      options: ['Treat each as its own request', t('Merge them into {{iq.dupDistinct}} shared requests with one sponsor each, and tell every requester'), 'Keep the first of each and close the rest without notice', 'Let each unit build its own'],
      answer: 1,
      whyNot: { 0: 'The team would build the same thing several times.', 2: 'Requesters who hear nothing assume the worst.', 3: 'Duplicate tools cost more to run and support.' },
      effects: eff({ backlog: -10, load: -10 }, { backlog: 10, satisfaction: 5 }, { satisfaction: -15 }, { backlog: 5, value: -10 }),
      why: t('{{iq.after2}} − {{iq.dup}} + {{iq.dupDistinct}} = {{iq.after3}} requests, and each shared need now has one owner.'),
      lesson: 'Merge duplicates into one request with one sponsor, and say so.' },

    { id: 'BRN-4-04', phase: 'Week 4',
      stem: t('{{iq.vendor}} requests ask to buy an AI tool from a vendor. Each would take about one pod-week to evaluate.'),
      options: [t('Have the team evaluate all {{iq.vendor}}'), 'Route them to procurement and security with a standard AI vendor checklist; the team advises when asked', 'Approve them all', 'Reject them all'],
      answer: 1,
      whyNot: { 0: t('{{iq.vendorPw}} pod-weeks is more than the {{iq.podWeeks}} you have; nothing else gets built.'), 2: 'Unchecked tools may train on your data or duplicate what you own.', 3: 'People buy them on a card anyway.' },
      effects: eff({ load: -25, value: -10 }, { backlog: 10, load: 5 }, { satisfaction: 5, value: -10 }, { satisfaction: -15 }),
      sets: { 0: 'swamped' },
      why: t('A checklist lets procurement and security handle buying decisions; the queue falls to {{iq.after4}} and the team keeps its {{iq.podWeeks}} pod-weeks for building.'),
      lesson: 'Buying decisions go through procurement with an AI checklist, not through the build team.' },

    { id: 'BRN-4-05', phase: 'Week 5',
      stem: t('The VP of Sales asks you to build an AI sales-coaching avatar now. It scores 2 of 5 on value and 2 on feasibility, needs {{iq.vpPw}} pod-weeks, and has no measured outcome. The VP says it will be worth ${{iq.vpPlanK}}k a year.'),
      options: ['Build it now', 'Defer it, show the VP the score, say what would raise it (a measured outcome and a business owner), and give the next review date', 'Reject it without explanation', 'Put it at the top of the queue ahead of claims triage'],
      answer: 1,
      whyNot: { 0: 'Spends capacity on the lowest-scoring work because of who asked.', 2: 'A VP who gets no reason escalates.', 3: 'Delays the highest-value request in the queue.' },
      effects: eff({ load: -10, value: -5, satisfaction: 5 }, { satisfaction: 5, value: 5 }, { satisfaction: -15 }, { value: -15, satisfaction: -5 }),
      pv: { 0: { planned: IQ.vpPlanK, actual: IQ.vpActK }, 3: { planned: IQ.vpPlanK, actual: IQ.vpActK } },
      why: 'Deferring with the score and a path to a higher one keeps the rubric credible and the VP engaged.',
      lesson: 'Say no with the score, what would change it, and when you will look again.' },

    { id: 'BRN-4-06', phase: 'Week 6',
      stem: t('Claims triage scores highest in the queue: ${{iq.claimsK}}k a year, {{iq.claimsPods}} pods for {{iq.claimsWeeks}} weeks ({{iq.claimsPw}} pod-weeks), and the claims director will own it.'),
      updateIf: { swamped: t('The team has spent its pod-weeks on earlier work; anything accepted now cannot be built this quarter.') },
      options: ['Ask for a full business case first', t('Accept it now and build it with the claims team'), 'Accept it with one pod working on it part-time', 'Hand it to a vendor without the claims data'],
      answer: 1,
      whyNot: { 0: 'It already has a scored case and an owner; more paperwork delays the value.', 2: 'Half the team for twice as long delays the value and risks the quality.', 3: 'A model without the claims data cannot learn your claims.' },
      effects: eff({ value: -10 }, { value: 15, satisfaction: 5 }, { load: -5, value: 5 }, { value: -10, satisfaction: -5 }),
      pv: { 1: { planned: IQ.claimsK, actual: IQ.claimsK }, 2: { planned: IQ.claimsK, actual: IQ.claimsK / 2 }, 3: { planned: IQ.claimsK, actual: 0 } },
      pvIf: { swamped: { 1: { actual: -IQ.claimsK }, 2: { actual: -IQ.claimsK / 2 } } },
      why: t('The top-scoring request with an owner gets the capacity: ${{iq.claimsK}}k a year for {{iq.claimsPw}} of your {{iq.podWeeks}} pod-weeks.'),
      lesson: 'Give the highest-scoring request with an owner the capacity it needs.' },

    { id: 'BRN-4-07', phase: 'Week 7',
      stem: t('A pilot started before you arrived is {{iq.pilotWeeks}} weeks in. Accuracy is {{iq.pilotAcc}}% against a {{iq.pilotTarget}}% gate, and the sponsor, who promised ${{iq.pilotPlanK}}k a year, missed the last three reviews.'),
      options: ['Extend it four more weeks', 'Stop it at the gate, release the pod, tell the sponsor with the data, and record what was learned', 'Launch it anyway at 71%', 'Hand it to a vendor to finish'],
      answer: 1,
      whyNot: { 0: 'No sign that four weeks closes a 19-point gap, and no engaged owner.', 2: 'Launching below the gate moves the errors to customers.', 3: 'Moves the problem; the missing owner stays missing.' },
      effects: eff({ load: -10, value: -5 }, { load: 10, value: 5 }, { value: -10, satisfaction: -5 }, { value: -5 }),
      pv: { 0: { planned: IQ.pilotPlanK, actual: 0 }, 2: { planned: IQ.pilotPlanK, actual: IQ.pilotLaunchK }, 3: { planned: IQ.pilotPlanK, actual: 0 } },
      why: 'The gate was agreed before the pilot. Stopping releases a pod for scored work, and the sponsor gets the data to try again later.',
      lesson: 'Stop at the gate; release the capacity; keep the lessons.' },

    { id: 'BRN-4-08', phase: 'Week 8',
      stem: 'The steering group asks for the quarter’s intake report.',
      options: ['Value delivered only', t('{{iq.after6}} requests still waiting (claims triage left the queue for build), what was redirected, merged, routed and deferred and why, capacity used, and value delivered against promised'), 'The number of requests received', 'How busy the team was'],
      answer: 1,
      whyNot: { 0: 'Hides the decisions that made the value possible.', 2: 'Counts demand, not decisions.', 3: 'Effort is not outcome.' },
      effects: eff({ satisfaction: -5 }, { satisfaction: 10, backlog: 5 }, { satisfaction: -10 }, { satisfaction: -5 }),
      why: t('On the planned path {{iq.total}} requests became {{iq.after6}} open ones, and value in production rose from ${{iq.startK}}k to ${{iq.bestK}}k a year. Showing each decision and its reason is what makes the next ranking accepted.'),
      lesson: 'Report the decisions and their reasons, not just the output.' }
  ],
  endings: [
    { min: 75, title: 'A queue people trust', text: 'Most requests got an answer within weeks, the team built what scored highest, and the report showed every call and its reason.' },
    { min: 55, title: 'Busy, not better', text: 'Some value landed, but capacity went to low scorers, duplicates or evaluations, and sponsors saw why only part of the time.' },
    { min: 0, title: 'The queue ran the team', text: 'Requests were handled by arrival or rank of sponsor, the build team was swamped, and promised value did not land.' }
  ]
});

// BRN-5: data platform, eight quarters. Value is $k a year that Finance confirms. Planned = what you promise the CFO; actual = what lands.
// Company, usage and prices are fictional; every figure comes from math/numbers.js (N.dp, N.ec8).
const DP = N.dp, E8 = N.ec8;
runs.push({
  id: 'BRN-5', status: 'Draft', lane: 'data-leadership', section: 'platform-sim', levels: ['vp', 'c-level'],
  title: 'Data platform, eight quarters', role: 'Chief Data Officer',
  blurb: 'Eight quarterly decisions on a retailer’s data platform: certification, commitments, definitions, showback, an incident, controls, spend and the board report. Figures are computed in code; the company is fictional.',
  briefing: t('You are Chief Data Officer of Pennant Retail Group (fictional), 4,200 staff, {{dp.domains}} data domains and {{dp.datasets}} datasets. The CFO approved the platform on a promise of savings, the board sees {{dp.boardMetrics}} data metrics each quarter, and you have {{dp.eng}} engineers on data quality. Each quarter you make one call. Business value here is $k a year that Finance confirms: ${{dp.startK}}k today, and each saving Finance confirms later is added to it.'),
  meters: ['quality', 'trust', 'spend', 'adoption'],
  meterLabels: { quality: 'Data quality', trust: 'Trust in the numbers', spend: 'Spend control', adoption: 'Adoption' },
  start: { planned: DP.startK, actual: DP.startK },
  predNote: 'Here predictability is value Finance confirms ÷ value promised to the CFO.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-5-01', phase: 'Quarter 1',
      stem: t('{{dp.boardDs}} of the {{dp.datasets}} datasets feed the board pack. Certifying a dataset takes {{dp.testsPer}} tests and {{dp.daysPer}} person-days. You have {{dp.eng}} engineers working five-day weeks, {{dp.workDays}} working days a year. Where do you start?'),
      options: [t('Certify all {{dp.datasets}} for consistency: {{dp.allDays}} person-days, {{dp.allYears}} years for {{dp.eng}} engineers'), t('Certify the {{dp.boardDs}} datasets that feed the board pack: {{dp.boardDays}} person-days, {{dp.boardWeeks}} weeks'), 'Start with the largest tables first, since an error there would touch the most rows in the warehouse', 'Wait for a catalog tool to rank every dataset by how often it is queried, then certify in that order'],
      answer: 1,
      whyNot: { 0: t('Consistent coverage is the right end state, but the board numbers stay uncertified for {{dp.allYears}} years.'), 2: 'Table size says little about whether the board sees the data.', 3: 'Query counts show use; the board pack is the use that matters.' },
      effects: eff({ quality: -5, spend: -10 }, { quality: 10, trust: 5 }, { quality: -5, trust: -5 }, { quality: -5, adoption: -5 }),
      sets: { 0: 'uncertified', 2: 'uncertified', 3: 'uncertified', 1: 'certified' },
      why: t('{{dp.boardDs}} datasets × {{dp.testsPer}} tests is {{dp.boardTests}} tests and {{dp.boardDays}} person-days, {{dp.boardWeeks}} weeks for {{dp.eng}} engineers. The board’s numbers are covered inside a quarter.'),
      lesson: 'Certify what the board sees first, and publish which datasets are certified.' },

    { id: 'BRN-5-02', phase: 'Quarter 2',
      stem: t('Platform spend last year at list price, in $k a month: {{dp.monthsText}} (total ${{dp.yrOnDemand}}k, average ${{dp.avgMonth}}k; ${{dp.peakMonth}}k was a one-off launch month). A one-year commitment pays {{dp.pctPay}}% of the committed level every month and bills usage above it at list. Assume next year’s usage matches last year’s. What level do you commit to?'),
      options: [t('${{dp.cPeak}}k a month, the peak, so no month is billed at list price'), t('${{dp.cNine}}k a month, a level used in at least 9 of the 12 months'), t('${{dp.cAvg}}k a month, the yearly average'), t('${{dp.cFloor}}k a month, the quietest month, to avoid any risk')],
      answer: 1,
      whyNot: { 0: t('You pay for ${{dp.cPeak}}k in all twelve months. Against {{dp.discPct}}% off, the year’s saving is {{dp.sPeak}} (in $k), a loss, where the headline promise was ${{dp.headline}}k.'), 2: t('Saves ${{dp.sAvg}}k, less than the best level, because five months run below the average and you pay for the unused part.'), 3: t('Safe, and it saves ${{dp.sFloor}}k, but it leaves the steady usage above ${{dp.cFloor}}k at list price.') },
      effects: eff({ spend: -20, trust: -10 }, { spend: 10, trust: 5 }, { spend: 5 }, { spend: 5, adoption: -5 }),
      pv: { 0: { planned: DP.pv.peakPlan, actual: DP.pv.peakAct }, 1: { planned: DP.pv.nine, actual: DP.pv.nine }, 2: { planned: DP.pv.avg, actual: DP.pv.avg }, 3: { planned: DP.pv.floor, actual: DP.pv.floor } },
      why: t('A commitment pays when you use it more than {{dp.pctPay}}% of the time, which is at least 9 of 12 months. At ${{dp.cNine}}k it saves ${{dp.sNine}}k a year; a scan of every whole-dollar level found no better one.'),
      lesson: 'Commit to the level you use most of the time, not to the peak.' },

    { id: 'BRN-5-03', phase: 'Quarter 3',
      stem: t('Three teams report different active-customer counts: Sales {{dp.sSales}}, Marketing {{dp.sMkt}}, Finance {{dp.sFin}}. The board will see one. How do you settle it?'),
      options: ['Show all three on the slide, each footnoted with its team’s own definition of an active customer', 'Name one owner, write one definition (Finance’s paid-order rule), publish it, rename the others', 'Report the average of the three counts, so that no team feels that its number has been overruled', 'Let the CEO choose which of the three numbers goes on the slide each quarter, as the board prefers'],
      answer: 1,
      whyNot: { 0: 'The board then settles a definition dispute that your team should have settled.', 2: 'An average matches no definition and nobody can explain it.', 3: 'The number changes with the mood of the quarter, and so does trust in it.' },
      effects: eff({ trust: -10, adoption: -5 }, { trust: 10, quality: 5 }, { trust: -10, quality: -5 }, { trust: -5, adoption: -10 }),
      sets: { 0: 'contested', 2: 'contested', 3: 'contested', 1: 'defined' },
      why: t('Marketing’s count is {{dp.overMkt}}% above Finance’s. One owner and one definition removes the argument; the other counts stay useful under names that say what they measure.'),
      lesson: 'One accountable owner and one written definition for every board metric.' },

    { id: 'BRN-5-04', phase: 'Quarter 4',
      stem: t('The platform costs {{$ec8.total}} a month: {{$ec8.dSales}} tagged to Sales, {{$ec8.dMkt}} to Marketing, {{$ec8.dFin}} to Finance and {{$ec8.shared}} shared. Queries split {{ec8.shSales}}%, {{ec8.shMkt}}% and {{ec8.shFin}}%. The business units ask who pays. What do you set up?'),
      updateIf: { certified: 'The first quarter of certified numbers has reached the board.', uncertified: 'The first quarter of numbers has reached the board without certification.' },
      options: ['Charge each unit’s budget the full bill at once, using allocation rules that the data team writes alone, from next month', t('Monthly showback, shared cost allocated by queries ({{$ec8.lSales}}, {{$ec8.lMkt}}, {{$ec8.lFin}}), rules agreed with Finance'), t('Split the {{$ec8.shared}} shared cost evenly three ways, since every unit benefits from the platform in some way'), 'Keep all of the cost in the central budget and show the business units nothing, so they do not worry about it'],
      answer: 1,
      whyNot: { 0: 'Chargeback posts to official budgets, so Finance has to agree the rules first.', 2: t('An even split charges Marketing {{$ec8.evenMkt}} for a platform where it runs {{ec8.shMkt}}% of the queries.'), 3: 'Units that see no cost have no reason to use the platform carefully.' },
      effects: eff({ trust: -5, adoption: -10 }, { spend: 10, trust: 5, adoption: 5 }, { trust: -10 }, { spend: -10, adoption: -5 }),
      why: t('Marketing’s {{$ec8.dMkt}} tagged plus {{$ec8.aMkt}} of the shared cost is {{$ec8.lMkt}}. The FinOps Foundation treats showback as the required step and chargeback as depending on accounting policy.'),
      lesson: 'Show each unit its cost first; charge back only when Finance’s policy needs it.' },

    { id: 'BRN-5-05', phase: 'Quarter 5',
      stem: t('A rerun duplicated {{dp.dupDays}} of the quarter’s {{dp.qDays}} days of orders. The board pack shows net revenue {{$dp.over}} too high, {{dp.overPct}}% of the {{$dp.rev}} on the ledger. The CFO has not seen it yet. What do you do first?'),
      updateIf: { certified: t('The error entered through a team-built view over a certified table, so {{dp.metricsCert}} board metric is affected.'), uncertified: t('The feed has no tests, so the same duplicate reaches {{dp.metricsUncert}} of the {{dp.boardMetrics}} board metrics.'), contested: t('The board has seen active-customer counts of {{dp.sSales}} and {{dp.sFin}} in the same quarter, so questions will multiply.') },
      options: ['Fix the feed before the next pack goes out and describe the change in a footnote in the appendix', 'Tell the CFO and board chair now what you know and do not, freeze the feed, then correct it', 'Wait until the root cause is confirmed so that the message you send to the CFO is complete', 'Ask the sales operations team that owns the order feed to announce the error and the correction'],
      answer: 1,
      whyNot: { 0: 'The board relied on the wrong number for a quarter and hears about it from an appendix.', 2: 'A complete message that arrives after someone else spots the error costs more trust than a partial one now.', 3: 'The data leader owns the number the board saw, so the announcement is yours.' },
      effects: eff({ trust: -20 }, { trust: 15, quality: 5 }, { trust: -15 }, { trust: -15, adoption: -5 }),
      why: t('A {{dp.overPct}}% error is large against a revenue number. Telling the CFO and the chair first turns a discovery by someone else into a disclosure by you.'),
      lesson: 'Tell the people relying on a wrong number before they find out.' },

    { id: 'BRN-5-06', phase: 'Quarter 6',
      stem: t('What control stops the next duplicate before a pack goes out?'),
      options: ['Add a second analyst who reviews every board dashboard by eye before each pack goes to the board', t('Reconcile revenue to the ledger within {{dp.tolPct}}% ({{$dp.tol}}) before each pack, test order ids for uniqueness'), 'Put a “preliminary” banner on every board number until the quarter has been closed for a month', 'Move the revenue feed to a different tool that the data engineers say handles reruns more cleanly'],
      answer: 1,
      whyNot: { 0: t('Nobody spots {{$dp.over}} by eye in a dashboard; the check has to compare to the ledger.'), 2: 'A banner warns the reader without fixing the number.', 3: 'A new tool carries the same duplicate unless a test stops it.' },
      effects: eff({ quality: -5, spend: -5 }, { quality: 10, trust: 10 }, { trust: -5 }, { spend: -10, quality: -5 }),
      why: t('A reconciliation to the ledger with a {{dp.tolPct}}% tolerance would have flagged the {{dp.overPct}}% gap, and a uniqueness test on order ids catches the duplicate at its source.'),
      lesson: 'Reconcile to the system of record before release, with a named owner.' },

    { id: 'BRN-5-07', phase: 'Quarter 7',
      stem: t('You have {{$dp.budget}} to spend. Option A: monitoring and contracts on the {{dp.boardMetrics}} board metrics, {{$dp.monCost}}; Finance confirms {{dp.reconHours}} reconciliation hours a year at {{$dp.rate}} an hour, a contractor not renewed. Option B: a customer-360 pipeline, {{$dp.pipeCost}}, promised to return {{$dp.pipePlan}} a year; Finance confirms {{$dp.pipeConf}}. Where does the budget go first?'),
      options: [t('The customer-360 pipeline, because its promised return of {{$dp.pipePlan}} a year is the larger of the two'), t('Monitoring and contracts on the board metrics: {{$dp.monCost}} for {{$dp.monSave}} a year that Finance confirms'), 'Split the budget evenly between the two, so that neither team feels that it was passed over', 'Hold the whole budget until the next planning cycle, when more evidence of both returns is in'],
      answer: 1,
      whyNot: { 0: t('Finance confirms {{$dp.pipeConf}} of the {{$dp.pipePlan}} promised, and the build costs {{$dp.pipeCost}}.'), 2: 'An even split funds the weaker case at the same level as the stronger one.', 3: 'The board metrics stay exposed for another cycle while the money waits.' },
      effects: eff({ spend: -10, trust: -5 }, { spend: 10, trust: 5, quality: 5 }, { spend: -5 }, { quality: -5, adoption: -5 }),
      pv: { 0: { planned: DP.pv.pipePlan, actual: DP.pv.pipeAct }, 1: { planned: DP.pv.mon, actual: DP.pv.mon } },
      why: t('{{$dp.monCost}} returns {{$dp.monSave}} a year that Finance can see; the pipeline returns {{$dp.pipeConf}} on {{$dp.pipeCost}}. Fund what has a confirmed return first.'),
      lesson: 'Fund the option with a confirmed return, not the largest promise.' },

    { id: 'BRN-5-08', phase: 'Quarter 8',
      stem: t('The board asks for the year’s data report. The team claims {{dp.claimHours}} hours saved at {{$dp.rate}} an hour, {{$dp.claim}}; Finance confirms {{$dp.licSave}} ({{dp.lic}} retired licences at {{$dp.licPrice}}). There was one incident and one definition change. What do you present?'),
      options: [t('The {{$dp.claim}} saving, the largest figure that the team can show with its own time records'), 'Confirmed against promised value, the incident and fix, unit cost, and decisions needed', 'Dashboards launched, reports retired and the number of people trained during the year', 'The platform roadmap for next year, with the vendor commitments and the hiring plan'],
      answer: 1,
      whyNot: { 0: t('Finance confirms {{$dp.licSave}}; the rest is capacity, and the board will find the gap.'), 2: 'Activity measures, with no value or risk.', 3: 'Your plan, not results.' },
      effects: eff({ trust: -15 }, { trust: 10, adoption: 5, spend: 5 }, { trust: -5, adoption: 5 }, { trust: -5 }),
      pv: { 0: { planned: DP.pv.claim, actual: DP.pv.conf }, 1: { planned: DP.pv.conf, actual: DP.pv.conf } },
      why: t('On the planned path value rose from ${{dp.startK}}k to ${{dp.bestK}}k a year. Showing the confirmed figure beside the claim is what lets the board trust the next one.'),
      lesson: 'Report confirmed value against promised, with incidents, unit cost and decisions.' }
  ],
  endings: [
    { min: 75, title: 'A platform the board can rely on', text: 'The board’s numbers were certified first, commitments matched use, definitions had owners, and the report showed confirmed value beside the promise.' },
    { min: 55, title: 'Trusted by some', text: 'Parts of the platform earned trust, but ownership, controls or reporting left gaps that the board and the CFO noticed.' },
    { min: 0, title: 'Dashboards without trust', text: 'Spend and dashboards grew, a wrong number reached the board, and the promised value was not the value Finance confirmed.' }
  ]
});

// ---------------------------------------------------------------- Phase 3b, CTO lane (Draft)
// BRN-6: tech debt vs. features, eight quarters. Value is $k of new ARR from features: planned = what you promise the CEO,
// actual = what Finance books. Company, rates and figures are fictional; every figure comes from math/numbers.js (N.td).
// The model in the briefing is invented and simple on purpose; the Q2 best share is found by a scan in both math modules.
// Q2 promises: a share chosen with the model (the best share, 50%) is promised at the model's forecast; 0% and 10% are
// promised at today's capacity, which ignores the interest, so they land below the promise.
const TD = N.td, TP = N.td.pv;
runs.push({
  id: 'BRN-6', status: 'Draft', lane: 'cto', section: 'debt-sim', levels: ['vp', 'c-level'],
  title: 'Tech debt vs. features, eight quarters', role: 'CTO',
  blurb: 'Eight quarterly decisions at a SaaS company: what to measure, how much capacity goes to debt, a rewrite proposal, a date the CEO promised, an outage, a platform team, architecture control and the board report. Figures are computed in code from a stated model; the company is fictional.',
  briefing: t('You are CTO of Tallyline (fictional), a business-software company with {{td.eng}} engineers: {{td.cap}} engineer-weeks a quarter. A simple model, invented for this exercise, stands in for the codebase. Teams estimate {{td.h0}} engineer-weeks of debt in code that changes often (hot) and {{td.k0}} in code that rarely changes (cold). Every 100 engineer-weeks of hot debt remove {{td.rH100}}% of a quarter’s capacity and every 100 of cold debt {{td.rK100}}%, so {{td.lostPct}}% is lost today and {{td.eff0}} engineer-weeks remain. Each quarter, the share you reserve for debt is taken from that quarter’s remaining capacity, after the loss. Debt work pays hot debt first, then cold, and can only pay debt that existed at the start of the quarter. Each engineer-week of feature work adds {{td.acc}} engineer-weeks of hot debt, counted at the end of the quarter, and brings ${{td.v}}k of new annual recurring revenue (ARR). Business value here is $k of new ARR from features: what you promise the CEO and what Finance books, starting from the ${{td.startK}}k already booked.'),
  meters: ['delivery', 'reliability', 'people', 'trust'],
  meterLabels: { delivery: 'Delivery', reliability: 'Reliability', people: 'Team health', trust: 'Trust in engineering' },
  start: { planned: TD.startK, actual: TD.startK },
  predNote: 'Here predictability is ARR Finance books ÷ ARR you promised the CEO.',
  endLabel: 'See the result',
  steps: [
    { id: 'BRN-6-01', phase: 'Quarter 1',
      stem: t('Last quarter: {{td.deploys}} production deployments in {{td.qWeeks}} weeks, {{td.fails}} of which needed immediate intervention, with a median of {{td.leadDays}} days from commit to production. The CEO asks how engineering will show it is improving. What do you set up?'),
      options: ['A monthly ranking of teams by story points finished per engineer, shared with all staff', t('A per-service DORA baseline: {{td.perWeek}} deploys a week, {{td.cfr}}% fail rate, tracked as trends'), 'A dashboard of lines of code and commits per engineer, reviewed by managers', 'One goal for every team: deploy daily by the fourth quarter, and report only that'],
      answer: 1,
      whyNot: { 0: 'Points are sized by each team, so a ranking rewards inflating them.', 2: 'SPACE warns that activity counts used alone mislead and change behaviour.', 3: 'DORA lists metric targets and single-metric judgments as pitfalls.' },
      effects: eff({ people: -10, trust: -5 }, { trust: 10, delivery: 5 }, { people: -10 }, { reliability: -10, trust: -5 }),
      why: t('{{td.deploys}} ÷ {{td.qWeeks}} weeks = {{td.perWeek}} deploys a week; {{td.fails}} ÷ {{td.deploys}} = {{td.cfr}}%. A baseline per service, tracked as a trend, shows improvement without inviting gaming.'),
      lesson: 'Baseline delivery and stability per service; report trends, not targets.' },

    { id: 'BRN-6-02', phase: 'Quarter 2',
      stem: 'Engineering asks for a fixed share of each quarter’s remaining capacity (after the debt loss) for debt work, held for eight quarters. Under the briefing’s model, which share gives the most feature work over the eight quarters?',
      options: ['None: every engineer-week goes to features', t('{{td.sBest}}% of capacity, held for eight quarters'), '10% of capacity, held for eight quarters', '50% of capacity, held for eight quarters'],
      answer: 1,
      whyNot: { 0: t('Features fall from {{td.f0q1}} engineer-weeks in the first quarter to {{td.f0q8}} in the eighth as hot debt grows to {{td.h0end}}: {{td.t0}} in all, against {{td.tBest}}. Promised at today’s capacity, ${{td.pv.p0}}k of ARR; ${{td.pv.a0}}k lands.'), 2: t('Better than none, {{td.t10}} engineer-weeks of features, but hot debt keeps growing: ${{td.pv.p10}}k promised, ${{td.pv.a10}}k lands.'), 3: t('Hot debt is gone early, and the rest of the share goes to cold debt that costs little: {{td.t50}} engineer-weeks of features.') },
      effects: eff({ delivery: 5, reliability: -15, people: -10 }, { delivery: 10, reliability: 10, people: 5 }, { delivery: 5, reliability: -5 }, { delivery: -15, trust: -5 }),
      pv: { 0: { planned: TP.p0, actual: TP.a0 }, 1: { planned: TP.aB, actual: TP.aB }, 2: { planned: TP.p10, actual: TP.a10 }, 3: { planned: TP.a50, actual: TP.a50 } },
      sets: { 0: 'nodebt' },
      why: t('A scan of every whole percentage from 0 to 100 found {{td.sBest}}% best: {{td.tBest}} engineer-weeks of features over eight quarters. Features dip to {{td.fBq1}} in the first quarter and rise to {{td.fBq8}} by the eighth as hot debt falls to {{td.hBend}}.'),
      lesson: 'Hold back enough capacity to pay down the debt that charges interest, and no more.' },

    { id: 'BRN-6-03', phase: 'Quarter 3',
      stem: t('A principal engineer proposes rewriting the order platform: all {{td.eng}} engineers for {{td.freezeQ}} quarters with no features, about ${{td.freezeK}}k of new ARR forgone at today’s capacity. Billing, the module with most of the hot debt, already sits behind an API that the rest of the platform calls. What do you decide?'),
      updateIf: { nodebt: 'With no capacity held back, feature work has slowed each quarter, which is the engineer’s main argument.' },
      options: [t('Approve the full rewrite with a feature freeze for {{td.freezeQ}} quarters'), t('Strangler fig: {{td.stTeam}} engineers move billing behind a façade over {{td.stQ}} quarters'), 'Leave the platform as it is and fix only the defects customers report', 'Buy a replacement commerce platform and move everything over to it in one cutover'],
      answer: 1,
      whyNot: { 0: 'Fowler warns that cut-over rewrites take a long time and users cannot wait that long for features.', 2: 'The hot debt keeps charging interest every quarter.', 3: 'A one-step cutover carries the same risk as the rewrite, and order processing may be what sets Tallyline apart.' },
      effects: eff({ delivery: -20, trust: -10 }, { delivery: 5, reliability: 10, people: 5 }, { reliability: -10, people: -5 }, { delivery: -10, reliability: -10 }),
      why: t('The façade lets old and new run side by side. {{td.stTeam}} engineers for {{td.stQ}} quarters is {{td.stWeeks}} engineer-weeks (about ${{td.stK}}k of features deferred), and billing’s hot debt goes first.'),
      lesson: 'Replace the worst part first behind a seam; avoid the big cutover.' },

    { id: 'BRN-6-04', phase: 'Quarter 4',
      stem: t('The CEO has promised Aldine Health (fictional) a launch in {{td.weeks}} weeks. The backlog for it is {{td.backlog}} items, and the last six two-week sprints finished {{td.sprintsText}}. What do you commit to?'),
      options: [t('All {{td.backlog}} items in {{td.weeks}} weeks, because the mean of {{td.tpMean}} items a sprint is close enough'), t('Keep the date for the {{td.fitMin}} must-haves the slowest rate fits; forecast the other {{td.rest}}'), t('Add {{td.addEng}} contractors now so that all {{td.backlog}} items fit in {{td.weeks}} weeks'), 'No date until every item has been estimated in hours by the team'],
      answer: 1,
      whyNot: { 0: t('At {{td.tpMean}} a sprint the backlog needs {{td.weeksMean}} weeks, and Aldine signs a smaller deal after the miss.'), 2: 'People added to a late project need time and add coordination; the date still slips.', 3: 'Aldine needs an answer, and hour estimates are no better than throughput history.' },
      effects: eff({ trust: -15, people: -10 }, { trust: 10, delivery: 5 }, { people: -10, delivery: -5 }, { trust: -10 }),
      pv: { 0: { planned: TD.dealK, actual: TD.lateK }, 1: { planned: TD.phaseK, actual: TD.phaseK }, 2: { planned: TD.dealK, actual: TD.addK } },
      why: t('Six sprints at the slowest rate of {{td.tpMin}} is {{td.fitMin}} items. Aldine signs a first phase worth ${{td.phaseK}}k on that scope, and the rest follows on a forecast it can plan around.'),
      lesson: 'Fix the date and flex the scope; forecast from throughput, not hope.' },

    { id: 'BRN-6-05', phase: 'Quarter 5',
      stem: t('The order service’s objective is 99.9% availability over a rolling four weeks, a budget of {{td.budgetMin}} minutes. This window it was down {{td.out1}} and {{td.out2}} minutes. A release for Aldine is planned next week, and the agreed policy follows the SRE workbook’s example. What do you do?'),
      updateIf: { nodebt: 'Both outages trace to order code where hot debt has piled up.' },
      options: ['Ship the release as planned; the objective is something to aim for, not a rule', t('Freeze all but P0 and security fixes until back within budget; postmortem on the {{td.out1}}-minute outage'), 'Lower the objective to 99.8% for this window, which puts the service back within budget, and ship', 'Ask the order team to work over the weekend and ship the release on its planned date'],
      answer: 1,
      whyNot: { 0: 'The policy was agreed so that this call is already made.', 2: 'Moving the objective mid-window removes the protection it gives customers.', 3: 'Tired engineers shipping into an unstable service add risk.' },
      effects: eff({ reliability: -20, trust: -10 }, { reliability: 15, trust: 5 }, { reliability: -10, trust: -10 }, { people: -15, reliability: -5 }),
      why: t('{{td.out1}} + {{td.out2}} minutes is {{td.overMin}} over the {{td.budgetMin}}-minute budget, and the {{td.out1}}-minute outage alone used {{td.out1Pct}}% of it, above the 20% that triggers a postmortem with a P0 action.'),
      lesson: 'When the error budget is spent, the agreed policy decides: reliability first.' },

    { id: 'BRN-6-06', phase: 'Quarter 6',
      stem: t('Each of the six stream-aligned teams ({{td.eng}} engineers) spends about {{td.toilPct}}% of its time on infrastructure: pipelines, environments and on-call for shared services. What do you change?'),
      options: ['Leave each team to run its own infrastructure so that the teams keep full autonomy', t('A platform team of {{td.plat}} as an optional product; people on features rise from {{td.featBefore}} to {{td.featAfter}}'), t('Form a platform team of {{td.platBig}} and require every team to use its tools ({{td.featBig}} people on features)'), 'Outsource all infrastructure work to a managed service provider under one contract'],
      answer: 1,
      whyNot: { 0: 'The same work is repeated in six teams and keeps their cognitive load high.', 2: t('{{td.featBig}} people on features is fewer than the {{td.featBefore}} today, and mandates breed resistance.'), 3: 'A provider runs infrastructure but does not remove the teams’ own pipeline and environment work.' },
      effects: eff({ people: -5 }, { delivery: 10, people: 10 }, { delivery: -10, people: -10 }, { delivery: -5, reliability: -5 }),
      pv: { 1: { planned: TD.platK, actual: TD.platK }, 2: { planned: TD.bigPlanK, actual: TD.bigActK }, 3: { planned: TD.outPlanK, actual: 0 } },
      why: t('Infrastructure work falls to {{td.toilAfterPct}}% for the other teams, so {{td.gain}} more people work on features: over the two quarters left, about ${{td.platK}}k of ARR. A platform run as a product, which teams choose to use, cuts their cognitive load.'),
      lesson: 'Size the platform team to the work it removes, and make teams want to use it.' },

    { id: 'BRN-6-07', phase: 'Quarter 7',
      stem: t('Teams ship about {{td.changes}} changes a quarter at a median lead time of {{td.leadBase}} days. After the outages, the board asks how architecture decisions are controlled. What do you put in place?'),
      options: [t('A review board that approves every change at a meeting every two weeks (median lead time about {{td.leadArb}} days)'), 'Decision records, advice from affected teams, and formal review only for one-way doors', 'No written decisions, so that each team decides alone and nothing slows down', 'The CTO approves every database and framework choice personally'],
      answer: 1,
      whyNot: { 0: t('Every change waits for the meeting: about {{td.waitDays}} change-days a quarter spent waiting.'), 2: 'Unrecorded decisions get argued again, and nobody can see who was asked.', 3: 'One approver becomes the bottleneck the advice process is meant to remove.' },
      effects: eff({ delivery: -15, trust: 5 }, { delivery: 5, trust: 10, reliability: 5 }, { trust: -10, reliability: -5 }, { delivery: -10, people: -10 }),
      why: 'Records show what was decided and who was asked; formal review where a decision is hard to undo keeps control without slowing every change.',
      lesson: 'Match the weight of review to how hard the decision is to undo.' },

    { id: 'BRN-6-08', phase: 'Quarter 8',
      stem: t('The board asks for the year’s engineering report. Story points per sprint rose {{td.pointsUp}}%. You have the DORA trends per service, the hot debt balance, the ARR Finance booked against what you promised, and the incidents. What do you present?'),
      options: [t('The {{td.pointsUp}}% rise in story points per sprint, the clearest single sign of a faster team'), 'Delivery trends, debt and its interest, ARR booked against promised, incidents, decisions', 'Lines of code shipped and the number of features released during the year', 'Next year’s roadmap, the hiring plan and the cloud commitment you want approved'],
      answer: 1,
      whyNot: { 0: 'Points are team-relative; the board learns nothing it can check.', 2: 'Activity counts, with no outcome or risk.', 3: 'Your plan, not your results.' },
      effects: eff({ trust: -10 }, { trust: 15, people: 5 }, { trust: -5 }, { trust: -5 }),
      why: t('On the planned path new ARR rose from ${{td.startK}}k to ${{td.bestK}}k. Showing booked against promised beside the delivery trends is what lets the board trust the next promise.'),
      lesson: 'Report outcomes, debt and incidents against what you promised.' }
  ],
  endings: [
    { min: 75, title: 'Faster and steadier', text: 'Debt that charged interest was paid down, promises matched throughput, the error budget was respected and the board saw outcomes against promises.' },
    { min: 55, title: 'Better in places', text: 'Some calls paid off, but a missed date, a heavy process or unpaid debt cost delivery or trust.' },
    { min: 0, title: 'Busy and slower', text: 'Features slowed as debt grew, dates slipped, and the board heard activity counts instead of results.' }
  ]
});

runs[0].steps.forEach((st, i) => place(st, POS[i]));
const POS2 = [3, 0, 2, 1, 0, 3];
runs[1].steps.forEach((st, i) => place(st, POS2[i]));
const POS3 = [2, 0, 3, 1, 0, 2, 3, 1], POS4 = [1, 3, 0, 2, 3, 1, 2, 0];
runs[2].steps.forEach((st, i) => place(st, POS3[i]));
runs[3].steps.forEach((st, i) => place(st, POS4[i]));
const POS5 = [3, 1, 0, 2, 1, 3, 0, 2];
runs[4].steps.forEach((st, i) => place(st, POS5[i]));
const POS6 = [2, 0, 3, 1, 3, 0, 2, 1];
runs[5].steps.forEach((st, i) => place(st, POS6[i]));
module.exports = runs;
