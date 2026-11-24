// Data leadership lane module: Data products and analytics value. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice, no single source). Every figure comes from math/numbers.js (N.dp) through {{placeholders}}.
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  mesh: ['Martin Fowler, Data Mesh Principles and Logical Architecture', 'https://martinfowler.com/articles/data-mesh-principles.html', 'Read'],
  finopsUnit: ['FinOps Foundation, Unit Economics capability', 'https://www.finops.org/framework/capabilities/unit-economics/', 'Read'],
  sculley: ['Sculley et al., Hidden Technical Debt in Machine Learning Systems (NIPS 2015), abstract', 'https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html', 'Read'],
  sr262: ['Federal Reserve, SR 26-2, Revised Guidance on Model Risk Management (April 17, 2026)', 'https://www.federalreserve.gov/supervisionreg/srletters/sr2602.htm', 'Relayed (search result text, Nov 24; the letter itself not opened)'],
  roadmap: ['Microsoft Learn, Fabric adoption roadmap: Content ownership and management', 'https://learn.microsoft.com/en-us/power-bi/guidance/fabric-adoption-roadmap-content-ownership-and-management', 'Read']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'dpv-1', title: 'Data as a product', levels: ALL,
    body: [
      'Fowler’s data mesh description says domains should treat their analytical data as a product and its consumers as customers. A data product has to be easy to discover, understand and trust; the page names discoverability, security, explorability, understandability and trustworthiness (Read, Fowler, Data Mesh Principles).',
      'It also names the measures: data quality, a shorter lead time for consumption and user satisfaction, measured by net promoter score. Each domain has a data product owner who understands the users and their needs, plus developers who build and maintain the products, and quality accountability sits upstream, close to the source (Read, same page).',
      'In practice a dataset becomes a product when it has an owner, a written contract for its fields, definition and refresh time, a way to ask for changes, and a count of who uses it. A table with none of these is an extract. (Inferred.)'
    ],
    sources: [SRC.mesh] },
  { id: 'dpv-2', title: 'What an analytics team returns: claimed against measured', levels: ['vp', 'c-level'],
    body: [
      'The FinOps Foundation separates resource efficiency metrics, such as cost per GB stored or cost per token, from business unit metrics, such as cost per transaction or cost per case resolved. The first are mostly in engineers’ control; the second give leaders context for trade-offs across cost, speed, quality and risk (Read, FinOps Foundation, Unit Economics).',
      t('A value claim is a calculation; a measurement is something Finance can find in a budget. Example (invented): a team claims {{dp.claimHours}} hours saved at {{$dp.rate}} an hour, {{$dp.claim}} a year. Finance confirms {{$dp.licSave}}: {{dp.lic}} retired licences at {{$dp.licPrice}} each. The hours are capacity until a plan says where they go; the {{$dp.licSave}} is cash (Inferred; computed in this app).'),
      'Report both, labelled. A CFO who finds the gap alone stops trusting the larger number. (Inferred.)'
    ],
    sources: [SRC.finopsUnit] },
  { id: 'dpv-3', title: 'Which models to fund, scale or retire', levels: ['vp', 'c-level'],
    body: [
      'The 2015 paper by Sculley and colleagues warns against treating the quick gains from machine learning as free: real systems accrue massive ongoing maintenance costs. Its list of risk factors includes boundary erosion, entanglement, hidden feedback loops, undeclared consumers, data dependencies, configuration issues and changes in the external world (Read, NIPS 2015 abstract).',
      'In April 2026 the Federal Reserve, the OCC and the FDIC issued SR 26-2, revised model risk management guidance that replaces SR 11-7 and, as law firms and consultancies summarize it, scales expectations to a model’s materiality (Relayed, Federal Reserve page and search-result text, Nov 24).',
      'A working rule: fund a model that has a named owner and a measured outcome. Scale it when the outcome holds on live data and its maintenance cost is known. Retire it when nobody consumes the output, when the inputs have changed under it, or when upkeep costs more than the measured value. (Inferred.)'
    ],
    sources: [SRC.sculley, SRC.sr262] },
  { id: 'dpv-4', title: 'Adoption of self-serve analytics', levels: ALL,
    body: [
      'Microsoft’s Fabric adoption roadmap describes business-led self-service, where creators in a business unit own and manage the content, and managed self-service, where a central team owns the data and business users own their reports and dashboards, which the page calls discipline at the core and flexibility at the edge. It says managed self-service often suits team and departmental BI (Read, Microsoft Learn, Fabric adoption roadmap).',
      'Adoption means decisions changed. Logins and licences issued measure access. Better signs are the intended audience coming back every week, old reports being switched off, and requests to the analytics team for the same figures falling. (Inferred.)'
    ],
    sources: [SRC.roadmap] },
  { id: 'dpv-5', title: 'Retiring data work', levels: ALL,
    body: [
      'The FinOps Foundation advises reviewing metrics regularly and retiring one when it no longer serves its purpose, including when comparing dissimilar products creates more confusion than insight. It says governance should set the cadence for review, change and retirement (Read, FinOps Foundation, Unit Economics).',
      'Apply the same cadence to datasets, dashboards and pipelines. Review usage over the last 30 days, the named owner and whether anything the board sees depends on it. Give owners notice with a date, archive before you delete, and record what was removed. (Inferred.)'
    ],
    sources: [SRC.finopsUnit] },
  { id: 'dpv-6', title: 'Reporting value to the CFO', levels: ['vp', 'c-level'],
    body: [
      'FinOps describes business unit metrics as the way leaders weigh cost against speed, quality and risk (Read, FinOps Foundation, Unit Economics). A CFO asks the same four things of a data program: what did it cost, what was confirmed, what went wrong, and what is the decision.',
      t('Report confirmed value against what was promised, and give the gap. Example (invented): a customer pipeline cost {{$dp.pipeCost}} and was promised to return {{$dp.pipePlan}} a year; Finance confirms {{$dp.pipeConf}}. The CFO needs those three figures and a recommendation to keep, change or stop, in that order (Inferred; computed in this app).'),
      'Add incidents with their fixes and cost per unit of work, so the update shows what changed since last quarter, and finish with the decisions you need from the board. (Inferred.)'
    ],
    sources: [SRC.finopsUnit] }
];
const checks = [
  { id: 'DPV-01', lesson: 'dpv-1', levels: ALL,
    stem: 'Which measures does Fowler’s data mesh description name for a data product?',
    options: ['Rows stored, tables published and monthly storage cost per terabyte', 'Data quality, lead time for consumption and user satisfaction', 'Dashboards built, licences issued and training hours delivered to staff', 'Platform uptime, incident count and support ticket volume per quarter'],
    answer: 1, why: 'The page names data quality, a shorter lead time for consumption and user satisfaction measured by net promoter score.',
    whyNot: { 0: 'These measure volume and cost, which say nothing about whether consumers get value.', 2: 'These measure activity around the data and not the product.', 3: 'These are operational measures of a service and miss data quality and user satisfaction.' } },
  { id: 'DPV-02', lesson: 'dpv-1', levels: ALL,
    stem: 'Whom does Fowler’s data-as-a-product principle assign in each domain?',
    options: ['A domain data product owner who knows the users, plus developers who build the products', 'A central steward in the data office who approves every dataset before it is released to users', 'A platform administrator who builds and runs the pipelines for each domain', 'A governance liaison who reports each domain’s quality issues to the central team'],
    answer: 2, why: 'Each domain has an owner who knows its users and developers who build and maintain the products, and quality is held close to the source.',
    whyNot: { 0: 'Central approval is the traditional model the page contrasts it with.', 1: 'The platform gives domains self-serve tools; running pipelines is part of the developers’ work.', 3: 'The domain holds quality accountability itself and does not hand it to a central team.' } },
  { id: 'DPV-03', lesson: 'dpv-2', levels: ['vp', 'c-level'],
    stem: t('A team claims {{dp.claimHours}} hours saved at {{$dp.rate}} an hour. Finance confirms {{$dp.licSave}} from {{dp.lic}} retired licences. What do you tell the CFO the analytics work saved?'),
    options: [t('{{$dp.claim}}, because the hours were real and the rate is the company’s own loaded rate'), 'The average of the two figures, since the truth is probably somewhere between them', t('{{$dp.licSave}} confirmed in cash, with the {{$dp.claim}} reported as capacity'), 'Both figures added together, since each of them is a saving the team delivered'],
    answer: 2, why: t('Hours become money only when a budget falls or a plan says where the time went. Finance can confirm {{$dp.licSave}}.'),
    whyNot: { 0: 'Hours times a rate prices capacity; it is not money that left a budget.', 1: 'An average of a claim and a measurement is a number nobody can trace.', 3: 'Adds a claim to a measurement; the hours were never confirmed as money.' } },
  { id: 'DPV-04', lesson: 'dpv-2', levels: ['vp', 'c-level'],
    stem: 'Which of these is a business unit metric rather than a resource efficiency metric, in the FinOps Foundation’s grouping?',
    options: ['Cost per GB stored in the warehouse', 'Cost per virtual CPU on the cluster', 'Cost per API call to the model', 'Cost per case resolved'],
    answer: 3, why: 'Cost per case resolved is a business unit metric, which gives leaders context for trade-offs across cost, speed, quality and risk.',
    whyNot: { 0: 'A resource efficiency metric, mostly in engineers’ control.', 1: 'A resource efficiency metric.', 2: 'A resource efficiency metric.' } },
  { id: 'DPV-05', lesson: 'dpv-3', levels: ['vp', 'c-level'],
    stem: 'What does the 2015 paper by Sculley and colleagues warn about machine learning systems?',
    options: ['Models degrade only when the training set is too small for the problem', 'Real systems accrue massive ongoing maintenance costs, so quick gains are not free', 'Maintenance cost is small once a model has been validated and put into production', 'Technical debt is a software engineering idea and does not carry over to machine learning models'],
    answer: 1, why: 'The abstract applies the technical debt idea to machine learning and warns of massive ongoing maintenance costs.',
    whyNot: { 0: 'The paper lists many risk factors; training set size is not the one it warns about.', 2: 'It argues the opposite: the cost keeps arriving after deployment.', 3: 'It applies the technical debt framework to machine learning.' } },
  { id: 'DPV-06', lesson: 'dpv-3', levels: ['vp', 'c-level'],
    stem: 'A churn model still runs every night, but nobody has opened its output for two quarters. What do you do?',
    options: ['Keep it running, since deleting a model is hard to undo if someone needs it later', 'Retrain it on fresh data, so that people start using its output again', 'Move it to cheaper compute and leave it listed in the catalog for reference', 'Confirm no one consumes it, give owners notice with a date, then retire it'],
    answer: 3, why: 'An unused model still costs upkeep and carries risk. Checking for consumers first guards against the undeclared-consumer risk the paper names.',
    whyNot: { 0: 'Archiving before deleting keeps the step reversible and stops the running cost.', 1: 'Retraining spends money on a model with no demonstrated user.', 2: 'The model remains a maintenance burden and still looks like something to rely on.' } },
  { id: 'DPV-07', lesson: 'dpv-4', levels: ALL,
    stem: 'Which approach does Microsoft’s Fabric adoption roadmap describe as discipline at the core and flexibility at the edge?',
    options: ['Business-led self-service', 'Enterprise', 'Managed self-service', 'A centre of excellence'],
    answer: 2, why: 'In managed self-service a central team owns the data and business creators own their reports and dashboards.',
    whyNot: { 0: 'There the business unit owns and manages all of the content.', 1: 'There a central team owns and manages all of the content.', 3: 'A centre of excellence supports the approaches and is not one of the three.' } },
  { id: 'DPV-08', lesson: 'dpv-4', levels: ALL,
    stem: 'A self-serve dashboard shows 900 logins a month. Which evidence best shows it has been adopted?',
    options: ['Logins are higher than the number of licences the company purchased for the tool', 'The intended team returns weekly and no longer asks analytics for the figures', 'Twelve training sessions on how to use the dashboard were delivered last quarter', 'Forty more dashboards were published to the shared workspace over the same quarter'],
    answer: 1, why: 'Adoption means decisions changed, and weekly return by the intended audience plus fewer repeat requests shows that.',
    whyNot: { 0: 'Logins measure access; people can log in and not use what they find.', 2: 'Training is an input.', 3: 'More dashboards can mean more clutter.' } },
  { id: 'DPV-09', lesson: 'dpv-5', levels: ALL,
    stem: 'According to the FinOps Foundation, when should you retire a metric?',
    options: ['Only when its owner leaves the company and nobody else in the team will take it on', 'When it no longer serves its purpose, such as when it confuses more than it informs', 'Once a year at budget time, whatever the metric is used for in the business that year', 'When it has stayed flat for two quarters in a row on every report'],
    answer: 1, why: 'The page says to retire a metric that no longer serves its purpose and to have governance set the review cadence.',
    whyNot: { 0: 'An owner leaving is a reason to find a new owner.', 2: 'Governance sets a cadence, but the test for retiring is purpose.', 3: 'A steady metric can still be the one the board relies on.' } },
  { id: 'DPV-10', lesson: 'dpv-5', levels: ALL,
    stem: 'A dataset has had no queries for 30 days. What is the first step in retiring it?',
    options: ['Delete it now to stop the storage cost and the pipeline that refreshes it', 'Check what depends on it and who owns it, then give notice with a date', 'Archive it when its owner next changes teams or leaves the company', 'Leave it where it is until the platform bill crosses a threshold set by Finance'],
    answer: 1, why: 'Thirty quiet days is a prompt to check dependencies and owners, and notice with a date gives anyone who still needs it a chance to say so.',
    whyNot: { 0: 'Deleting without checking can break a monthly or quarterly report that has not run yet.', 2: 'Ownership changes do not decide when data stops being useful.', 3: 'A bill threshold ignores whether anyone needs the data.' } },
  { id: 'DPV-11', lesson: 'dpv-6', levels: ['vp', 'c-level'],
    stem: 'What belongs in a quarterly data update to the board?',
    options: ['Every dataset in the catalog with its quality score, owner and number of queries last month', 'Dashboards launched, reports retired and the number of people trained this quarter', 'Confirmed value against promised, incidents and fixes, unit cost, and decisions needed', 'The platform roadmap, planned migrations and the latest vendor announcements'],
    answer: 2, why: 'The board needs value, risk, cost and the decisions in front of it.',
    whyNot: { 0: 'Too much detail and no decision.', 1: 'Inputs and activity, with no value.', 3: 'Your plan and the vendors’ news, which are not results.' } },
  { id: 'DPV-12', lesson: 'dpv-6', levels: ['vp', 'c-level'],
    stem: t('The CFO asks whether the {{$dp.pipeCost}} customer pipeline paid back. It was promised to return {{$dp.pipePlan}} a year. Finance confirms {{$dp.pipeConf}}. What do you say?'),
    options: ['It paid back, since the business case was approved by the investment committee', t('Confirmed value is {{$dp.pipeConf}} a year against {{$dp.pipePlan}} promised; explain the gap, then recommend'), 'It will pay back once adoption catches up, so I suggest waiting another year before judging it', t('Report the {{$dp.pipePlan}} and add that Finance has not yet signed off on the figure for the year')],
    answer: 1, why: 'Give the confirmed figure next to the promise, explain the gap and make a recommendation.',
    whyNot: { 0: 'An approved business case is a promise and not a result.', 2: 'Asking for more time without a measured trend is a request for trust.', 3: 'The board would read the larger number and miss that Finance confirms far less.' } }
];
const { place } = require('./place.js');
const POS = [2, 0, 1, 3, 0, 2, 1, 3, 2, 0, 3, 1];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
