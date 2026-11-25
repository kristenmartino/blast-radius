// CTO lane module: Engineering org and delivery. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice or arithmetic on invented figures). Every figure comes from math/numbers.js (N.cto).
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  dora: ['DORA, DORA’s software delivery performance metrics (Nathen Harvey, updated January 5, 2026)', 'https://dora.dev/guides/dora-metrics-four-keys', 'Read'],
  slos: ['Google SRE Workbook, Chapter 2: Implementing SLOs', 'https://sre.google/workbook/implementing-slos/', 'Read'],
  policy: ['Google SRE Workbook, Appendix B: Example Error Budget Policy', 'https://sre.google/workbook/error-budget-policy/', 'Read'],
  tt: ['Team Topologies, Key Concepts', 'https://teamtopologies.com/key-concepts', 'Read'],
  ttFowler: ['Martin Fowler, Team Topologies (2023)', 'https://martinfowler.com/bliki/TeamTopologies.html', 'Read'],
  cncf: ['CNCF TAG App Delivery, Platforms White Paper', 'https://tag-app-delivery.cncf.io/whitepapers/platforms/', 'Read'],
  space: ['Forsgren, Storey et al., The SPACE of Developer Productivity (ACM Queue, 2021)', 'https://queue.acm.org/detail.cfm?id=3454124', 'Read'],
  brooks: ['Wikipedia, Brooks’s law (search-result text)', 'https://en.wikipedia.org/wiki/Brooks%27s_law', 'Relayed'],
  meyer: ['Bertrand Meyer, The Mythical Brooks Law (BLOG@CACM; search-result text)', 'https://cacm.acm.org/blogcacm/the-mythical-brooks-law', 'Relayed']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'ed-1', title: 'The DORA delivery metrics', levels: ALL,
    body: [
      'DORA now lists five software delivery metrics. Three measure throughput: change lead time (from commit to running in production), deployment frequency, and failed deployment recovery time. Two measure instability: change fail rate (the share of deployments that need immediate intervention) and deployment rework rate (unplanned deployments caused by a production incident) (Read, DORA).',
      'The guide says speed and stability are not trade-offs: for most teams the metrics move together. It warns against setting the metrics as goals, which invites gaming; judging a complex system by one metric; comparing very different applications; and turning measurement into a competition. The metrics are meant for one application or service at a time (Read, DORA).',
      t('Example (invented): {{cto.deploys}} production deployments in {{cto.qWeeks}} weeks is {{cto.perWeek}} a week; {{cto.fails}} of them needed immediate intervention, a change fail rate of {{cto.cfr}}%. Report the trend per service each quarter, with the median lead time ({{cto.leadDays}} days here) and recovery time beside it. (Inferred.)')
    ],
    sources: [SRC.dora] },
  { id: 'ed-2', title: 'SLOs and error budgets', levels: ALL,
    body: [
      t('Google’s SRE workbook defines the error budget as 100% minus the service level objective. Its example: a service with a 99.9% success objective that gets {{cto.reqs}} requests in four weeks can fail {{cto.reqFail}} of them and still meet the objective (Read, SRE Workbook, Implementing SLOs).'),
      'Its example policy: if a service has spent more than its budget over the preceding four weeks, all changes and releases stop except P0 issues and security fixes until the service is back within its objective. Any single incident that uses more than 20% of the four-week budget gets a postmortem with at least one P0 action. Disputes about the calculation go to the CTO. The policy says it is not a punishment: it gives teams permission to work only on reliability when the data says reliability matters more (Read, SRE Workbook, Example Error Budget Policy).',
      t('In minutes (arithmetic): a 99.9% availability objective over {{cto.winDays}} days allows {{cto.budgetMin}} minutes of downtime; 99.95% allows {{cto.budget2Min}}. Outages of {{cto.out1}} and {{cto.out2}} minutes use {{cto.usedMin}}, which overspends the 99.9% budget by {{cto.overMin}} minutes, and the {{cto.out1}}-minute outage alone used {{cto.out1Pct}}% of it. Agree the policy with product leaders before the budget runs out, so the freeze is a rule already accepted. (Inferred.)')
    ],
    sources: [SRC.slos, SRC.policy] },
  { id: 'ed-3', title: 'Team Topologies: team types and cognitive load', levels: ALL,
    body: [
      'Team Topologies names four team types: stream-aligned (aligned to a flow of work, usually a business domain segment), enabling (helps stream-aligned teams past obstacles), complicated subsystem (where deep specialist knowledge is needed) and platform (provides a compelling internal product that speeds up stream-aligned teams). Teams interact in three modes: collaboration for a defined period, X-as-a-Service, and facilitation. The site says teams can only handle so much complexity, and overloaded teams decide poorly and move slowly (Read, Team Topologies, Key Concepts).',
      'Fowler’s summary calls the stream-aligned team the primary kind, owning the whole stream of value for its customers, ideally small enough for two pizzas. He says the main benefit of a platform is to reduce the cognitive load on stream-aligned teams, that collaboration is a temporary mode while a platform matures toward X-as-a-Service, and that the model is designed with Conway’s Law in mind: team structure shapes the software architecture that follows (Read, Fowler, Team Topologies).',
      'For a CTO the practical use is diagnosis: list what each team owns and runs, and where one team holds more systems, on-call duties and specialisms than it can keep in its head, move work to a platform or a specialist team. A reorganization is also an architecture decision, because the systems will come to match the new team boundaries. (Inferred.)'
    ],
    sources: [SRC.tt, SRC.ttFowler] },
  { id: 'ed-4', title: 'Platform teams', levels: ['director', 'vp'],
    body: [
      'The CNCF white paper lists what successful platforms share: they are run as a product built around user needs, meet users where they work, document golden paths, offer self-service, hide implementation detail to cut cognitive load, stay optional and composable, and are secure by default. It warns that relying on top-down mandates for adoption breeds resistance (Read, CNCF Platforms White Paper).',
      'It suggests measuring a platform by user satisfaction and active use, by how long it takes to fulfil requests, deploy a new service or get a new engineer’s first change in, and by the DORA metrics of the teams that use it. Start with simple surveys and usage data (Read, same paper).',
      t('Arithmetic (invented): {{cto.eng}} engineers spend {{cto.toilPct}}% of their time on infrastructure work, {{cto.toilFte}} full-time equivalents, leaving {{cto.featBefore}} for features. A platform team of {{cto.plat}} that cuts that work to {{cto.toilAfterPct}}% leaves {{cto.featAfter}} for features from the other {{cto.stream}}, {{cto.gain}} more ({{cto.gainPct}}%). A platform team of {{cto.platBig}} at the same {{cto.toilAfterPct}}% leaves {{cto.featBig}}, fewer than before. Size the platform team to the work it removes. (Inferred.)')
    ],
    sources: [SRC.cncf] },
  { id: 'ed-5', title: 'Developer productivity, and why output counts mislead', levels: ALL,
    body: [
      'The SPACE framework describes developer productivity in five dimensions: satisfaction and well-being, performance (outcomes such as quality and business impact), activity (counts of actions such as commits and pull requests), communication and collaboration, and efficiency and flow (Read, Forsgren et al., The SPACE of Developer Productivity).',
      'The authors list myths, including that productivity is all about activity, only about individuals, and measurable with one metric. They recommend a handful of metrics across at least three dimensions, say activity counts should never be used alone to judge people or teams, and note that a team measured only on lines of code behaves very differently from one that also values review quality and customer satisfaction (Read, same article).',
      'Story points are sized by each team for its own planning, so a rise in points can mean the team re-sized its work. To a board, report delivery outcomes (the DORA trends), developer satisfaction from a short survey and value the business has booked. (Inferred.)'
    ],
    sources: [SRC.space] },
  { id: 'ed-6', title: 'Forecasting a date from throughput', levels: ['director', 'vp'],
    body: [
      t('Forecast from items finished per sprint. Example (invented): the last six two-week sprints finished {{cto.sprintsText}} items, a mean of {{cto.tpMean}} and a slowest of {{cto.tpMin}}. {{cto.backlog}} items take {{cto.needMean}} sprints ({{cto.weeksMean}} weeks) at the mean and {{cto.needMin}} sprints ({{cto.weeksMin}} weeks) at the slowest rate. In {{cto.weeks}} weeks the team finishes about {{cto.fitMean}} items at the mean and {{cto.fitMin}} at the slowest. (Inferred.)'),
      t('When a date is fixed, fix the scope to what fits at the slow rate ({{cto.fitMin}} here), commit to that, and give a range for the other {{cto.rest}}. A single date for all {{cto.backlog}} items promises what half the sprints did not deliver. (Inferred.)'),
      'Brooks’s law, from The Mythical Man-Month (1975), says adding people to a late software project makes it later; it applies to projects already late, and people added early can help (Relayed, Wikipedia, search text). Bertrand Meyer argues the law describes bad management rather than a rule, and that good managers can shorten schedules by adding people (Relayed, BLOG@CACM, search text).'
    ],
    sources: [SRC.brooks, SRC.meyer] }
];
const checks = [
  { id: 'ED-01', lesson: 'ed-1', levels: ALL,
    stem: 'Which of these does DORA count as an instability metric?',
    options: ['Deployment frequency', 'Change lead time', 'Change fail rate', 'Failed deployment recovery time'],
    answer: 2, why: 'Change fail rate and deployment rework rate measure instability; the other three measure throughput.',
    whyNot: { 0: 'DORA groups deployment frequency with throughput.', 1: 'Lead time measures throughput.', 3: 'DORA now places recovery time under throughput.' } },
  { id: 'ED-02', lesson: 'ed-1', levels: ALL,
    stem: t('A service had {{cto.deploys}} deployments last quarter ({{cto.qWeeks}} weeks); {{cto.fails}} needed immediate intervention. The VP wants each team given a target of halving its change fail rate. What does DORA’s guide suggest?'),
    options: [t('Set the target: {{cto.cfr}}% is high, and a target focuses the team'), t('Report {{cto.cfr}}% and {{cto.perWeek}} deploys a week as a trend; targets invite gaming'), 'Rank every team by change fail rate and publish the ranking each month', 'Replace the metric with deployment frequency, which is easier to raise quickly'],
    answer: 1, why: t('{{cto.fails}} ÷ {{cto.deploys}} = {{cto.cfr}}%. The guide lists setting the metrics as goals and turning them into competitions as pitfalls; use them to track improvement per service.'),
    whyNot: { 0: 'The guide warns that metric targets invite gaming.', 2: 'Comparing very different applications and competing are both listed pitfalls.', 3: 'Speed and stability move together; dropping the stability measure hides the problem.' } },
  { id: 'ED-03', lesson: 'ed-2', levels: ALL,
    stem: t('An availability objective of 99.9% is measured over a rolling {{cto.winDays}} days. How many minutes of downtime does the error budget allow?'),
    options: [t('{{cto.budget30}} minutes'), t('{{cto.budgetMin}} minutes'), t('{{cto.budget2Min}} minutes'), t('{{cto.budget4}} minutes')],
    answer: 1, why: t('{{cto.winDays}} days of 24 hours is a little over 40,000 minutes, and 0.1% of it is {{cto.budgetMin}} minutes.'),
    whyNot: { 0: t('{{cto.budget30}} minutes is the budget for a 30-day window.'), 2: t('{{cto.budget2Min}} minutes is the budget at 99.95%.'), 3: 'That is 0.01%, the budget at 99.99%.' } },
  { id: 'ED-04', lesson: 'ed-2', levels: ALL,
    stem: t('Under the SRE workbook’s example policy, a service has used {{cto.usedMin}} of its {{cto.budgetMin}} minutes this four-week window. A launch is planned for next week. What happens?'),
    options: ['The launch goes ahead; the objective is a target to aim at, not a rule', 'Changes stop except P0 and security fixes until the service is back within its objective', 'The objective is lowered for this window so that the launch can go ahead as planned', 'The team that caused the outages is barred from releasing for the rest of the quarter'],
    answer: 1, why: t('{{cto.usedMin}} minutes is over the {{cto.budgetMin}}-minute budget, so the example policy freezes changes other than P0 and security fixes until the service is back within its objective.'),
    whyNot: { 0: 'The policy exists so that this decision is already made.', 2: 'Changing the objective mid-window to unblock a launch removes the protection it gives customers.', 3: 'The policy says it is not a punishment, and the freeze lifts when the service is back within its objective.' } },
  { id: 'ED-05', lesson: 'ed-3', levels: ALL,
    stem: 'In Team Topologies, which interaction mode is meant to be temporary?',
    options: ['X-as-a-Service', 'Facilitation', 'Collaboration', 'Stream alignment'],
    answer: 2, why: 'Collaboration runs for a defined period to discover new things; Fowler describes it as the mode used while a platform matures toward X-as-a-Service.',
    whyNot: { 0: 'X-as-a-Service is the steady state for a mature platform.', 1: 'Facilitation is a mode of helping and mentoring, not defined by being temporary.', 3: 'Stream-aligned is a team type, not an interaction mode.' } },
  { id: 'ED-06', lesson: 'ed-3', levels: ALL,
    stem: 'One stream-aligned team owns twelve services, two on-call rotations and the company’s search tuning. Its lead time has doubled. What does Team Topologies point to first?',
    options: ['Hire more engineers into the same team until its lead time recovers', 'Too much cognitive load: move work to a platform or a specialist team', 'Ask the team to report its activity daily so that the slowdown is visible', 'Merge the team with another stream-aligned team to share the load'],
    answer: 1, why: 'Overloaded teams decide poorly and move slowly. Search tuning suits a complicated-subsystem team and shared services a platform.',
    whyNot: { 0: 'A bigger team holds the same load and loses its small size.', 2: 'Activity reports add work without removing any.', 3: 'Merging spreads the same load across a team that is too large.' } },
  { id: 'ED-07', lesson: 'ed-4', levels: ['director', 'vp'],
    stem: 'The CNCF white paper warns against one way of getting teams onto a new internal platform. Which?',
    options: ['Starting with a few engaged application teams', 'Top-down mandates that require every team to use it', 'Offering golden paths with documentation and examples', 'Letting teams use only the parts of the platform they need'],
    answer: 1, why: 'It says relying on top-down mandates for adoption risks resistance; platform teams should gather feedback and partner with application teams.',
    whyNot: { 0: 'The paper recommends starting with a limited number of engaged teams.', 2: 'Golden paths are one of its attributes of a successful platform.', 3: 'Optional and composable is another of its attributes.' } },
  { id: 'ED-08', lesson: 'ed-4', levels: ['director', 'vp'],
    stem: t('{{cto.eng}} engineers spend {{cto.toilPct}}% of their time on infrastructure work. A platform team of {{cto.plat}}, taken from the {{cto.eng}}, would cut that work to {{cto.toilAfterPct}}% for everyone else. How much feature capacity does it add?'),
    options: [t('{{cto.toilFte}} full-time equivalents, all of today’s infrastructure work'), t('{{cto.gain}} full-time equivalents: {{cto.featAfter}} against {{cto.featBefore}} today'), t('None, because the {{cto.plat}} platform engineers stop building features'), t('{{cto.plat}} full-time equivalents, the size of the platform team')],
    answer: 1, why: t('Today {{cto.eng}} − {{cto.toilFte}} = {{cto.featBefore}}. After, the other {{cto.stream}} lose {{cto.toilAfterPct}}% of their time, leaving {{cto.featAfter}}. The gain is {{cto.gain}}.'),
    whyNot: { 0: t('The remaining {{cto.toilAfterPct}}% and the {{cto.plat}} platform engineers come off that figure.'), 2: 'The time the others save more than makes up for them.', 3: 'The platform team’s size is a cost, not the gain.' } },
  { id: 'ED-09', lesson: 'ed-5', levels: ALL,
    stem: 'How many SPACE dimensions do its authors recommend measuring at once?',
    options: ['One well-chosen metric that matters most', 'At least three dimensions, with a handful of metrics', 'All five dimensions, with equal weight on each', 'Only activity, because it can be collected automatically'],
    answer: 1, why: 'They recommend a handful of metrics across at least three dimensions.',
    whyNot: { 0: '“One metric that matters” is one of the myths they list.', 2: 'They ask for at least three, not all five with equal weight.', 3: 'They say activity counts should never be used alone.' } },
  { id: 'ED-10', lesson: 'ed-5', levels: ALL,
    stem: t('Story points per sprint rose {{td.pointsUp}}% this year. What should the CTO tell the board about it?'),
    options: [t('That productivity rose {{td.pointsUp}}%, the clearest single figure the engineering teams have'), 'That points are team-sized; report delivery trends, satisfaction and booked value', 'That the teams should keep raising their points by a set share every quarter', 'That points should replace the DORA metrics in the board pack from now on'],
    answer: 1, why: 'Points are team-relative and can rise because work was re-sized. SPACE warns against judging by activity alone.',
    whyNot: { 0: 'A points rise can be re-sizing, and a single metric is one of the myths.', 2: 'A points target invites inflation.', 3: 'Points are a planning tool for one team, not a cross-team outcome.' } },
  { id: 'ED-11', lesson: 'ed-6', levels: ['director', 'vp'],
    stem: t('The last six sprints finished {{cto.sprintsText}} items. The CEO wants all {{cto.backlog}} remaining items in {{cto.weeks}} weeks (six sprints). What do you commit to?'),
    options: [t('All {{cto.backlog}} in {{cto.weeks}} weeks, since the mean of {{cto.tpMean}} items a sprint is close to what is needed'), t('The date, for the {{cto.fitMin}} items the slowest rate fits; a range for the rest'), t('Add {{cto.addEng}} engineers now so that all {{cto.backlog}} items fit in {{cto.weeks}} weeks'), 'No date at all until every remaining item has been estimated in hours'],
    answer: 1, why: t('At the mean the team finishes {{cto.fitMean}} in six sprints and needs {{cto.weeksMean}} weeks for all {{cto.backlog}}. Committing to the {{cto.fitMin}} that fit at the slowest rate keeps the date honest.'),
    whyNot: { 0: t('At {{cto.tpMean}} a sprint, {{cto.backlog}} items need {{cto.weeksMean}} weeks, not {{cto.weeks}}.'), 2: 'People added to a project already behind take time to become productive and add coordination.', 3: 'Hour estimates add work and are no better than throughput history.' } },
  { id: 'ED-12', lesson: 'ed-6', levels: ['director', 'vp'],
    stem: 'According to its usual statement, when does Brooks’s law apply?',
    options: ['To any software project, at any stage, regardless of how far along it is', 'To a software project that is already late', 'Only to projects with more than a hundred people', 'Only to hardware projects, where parts must arrive in order'],
    answer: 1, why: 'The law says adding people to a late software project makes it later; it is limited to projects already late.',
    whyNot: { 0: 'People added early can help, by the same accounts.', 2: 'The law sets no team size.', 3: 'It is about software projects.' } }
];
const { place } = require('./place.js');
const POS = [2, 1, 3, 0, 1, 2, 0, 3, 2, 0, 3, 1];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
