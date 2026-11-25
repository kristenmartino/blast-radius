// CTO lane module: Technology strategy and architecture governance. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice or arithmetic on invented figures, no single source). Every figure comes from
// math/numbers.js (N.cto) through {{placeholders}}. TOGAF's governance material lives in Inspect & Adapt (links section).
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  utility: ['Martin Fowler, Utility Vs Strategic Dichotomy (2010)', 'https://www.martinfowler.com/bliki/UtilityVsStrategicDichotomy.html', 'Read'],
  hohpe: ['Gregor Hohpe, Revisiting Buy vs. Build: 3 Traps to Avoid (AWS Enterprise Strategy blog, 2020)', 'https://aws.amazon.com/blogs/enterprise-strategy/revisiting-buy-vs-build-3-traps-to-avoid', 'Read'],
  debt: ['Martin Fowler, Technical Debt', 'https://martinfowler.com/bliki/TechnicalDebt.html', 'Read'],
  quadrant: ['Martin Fowler, Technical Debt Quadrant', 'https://martinfowler.com/bliki/TechnicalDebtQuadrant.html', 'Read'],
  adr: ['Michael Nygard, Documenting Architecture Decisions (Cognitect, 2011)', 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions', 'Read'],
  advice: ['Andrew Harmel-Law, Scaling the Practice of Architecture, Conversationally (martinfowler.com, 2021)', 'https://martinfowler.com/articles/scaling-architecture-conversationally.html', 'Read'],
  bezos: ['Amazon, 2016 Letter to Shareholders', 'https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders', 'Read'],
  strangler: ['Martin Fowler, Strangler Fig (2024)', 'https://www.martinfowler.com/bliki/StranglerFigApplication.html', 'Read'],
  msStrangler: ['Microsoft Learn, Azure Architecture Center: Strangler Fig pattern', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig', 'Read']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'ts-1', title: 'Technology strategy and the roadmap', levels: ['vp', 'c-level'],
    body: [
      'Fowler separates software that supports a function the company competes on (strategic) from software that supports a function it does not (utility). For utility work he advises buying a package, adapting the process to it and keeping cost low; for strategic work, speed matters more than cost because delay costs more than development. He thinks only a few projects are strategic, perhaps a 95/5 split rather than 80/20, and that strategic functions drift toward utility over time (Read, Fowler, Utility Vs Strategic Dichotomy).',
      'A technology strategy states four things: which capabilities set the company apart and get the engineering investment, what the shared platform has to make cheap and safe for everyone else, what the company will stop building or running, and how progress will be measured. A strategy that funds everything equally has made none of those choices. (Inferred.)',
      'A roadmap turns the strategy into a sequence of bets, each tied to an outcome, with dates for the next quarter and ranges after that. It shows the capacity held back for debt and reliability work, so that promises to the CEO and customers already allow for it. (Inferred.) The tech-debt simulation in this lane shows what happens to those promises when nothing is held back.'
    ],
    sources: [SRC.utility] },
  { id: 'ts-2', title: 'Tech debt: kinds, interest, and how to show it', levels: ALL,
    body: [
      'Fowler calls the deficiencies in internal quality that make a system harder to change cruft. The extra effort each new feature takes because of it is the interest; removing the cruft is paying the principal. Cleaning up pays only if more work is coming in that area. Cruft in code that rarely changes can be left, because interest is only paid when someone works there, while busy areas need a zero-tolerance attitude because their interest is high (Read, Fowler, Technical Debt).',
      'His quadrant crosses deliberate with inadvertent and prudent with reckless. Prudent, deliberate debt is taken knowingly to reach a release; reckless debt, deliberate or not, brings crippling interest payments or a long period of paying down the principal; prudent, inadvertent debt appears when a good team learns what the design ought to have been, and he says it is inevitable and should be expected (Read, Fowler, Technical Debt Quadrant).',
      t('A worked example (invented figures): a change takes {{cto.withCruft}} days with the cruft and {{cto.without}} without, and cleaning up costs {{cto.cleanup}} days. The clean-up pays back after {{cto.breakEven}} changes; if three are planned it saves {{cto.threeSave}} days. To a board, describe debt as capacity lost each quarter in the code that changes most, with the trend. A count of debt tickets says nothing about cost. (Inferred.)')
    ],
    sources: [SRC.debt, SRC.quadrant] },
  { id: 'ts-3', title: 'Architecture decision records', levels: ALL,
    body: [
      'Nygard proposed a short record for each architecturally significant decision, meaning one that affects structure, non-functional characteristics, dependencies, interfaces or construction techniques. Each record has a numbered title, a value-neutral context that names the forces in tension, the decision in full sentences (“We will…”), a status and every consequence, good, bad and neutral. Records are kept in the code repository as short text files of one or two pages (Read, Nygard, Documenting Architecture Decisions).',
      'A reversed decision is not deleted: its record is marked deprecated or superseded and points to the one that replaces it, so a later reader sees both what was decided and that it no longer holds (Read, same post).',
      'Harmel-Law’s version adds the options considered and all the advice received to each record (Read, Harmel-Law, Scaling the Practice of Architecture, Conversationally). The record then shows who was asked as well as what was decided. (Inferred.)',
      'At executive level the number of records is not a measure of anything. The useful question in a review is “where is this decision recorded, and who was asked?”; a decision that cannot be found will be argued again. (Inferred.)'
    ],
    sources: [SRC.adr, SRC.advice] },
  { id: 'ts-4', title: 'Review boards and lightweight governance', levels: ['vp', 'c-level'],
    body: [
      'Harmel-Law’s advice process has one rule and one qualifier: anyone can make an architectural decision, but first they must consult everyone meaningfully affected and people with expertise in the area. They need not follow the advice; they must seek it and record it. A weekly, hour-long open architecture advisory forum supports it, and the forum does not approve decisions: other attendees can only offer advice (Read, Harmel-Law).',
      'Bezos’s 2016 letter says never to use one decision process for everything. Reversible decisions, which he calls two-way doors, can use a light-weight process, and most decisions should be made with about 70% of the information you wish you had (Read, Amazon, 2016 Letter to Shareholders).',
      t('A board that approves every change costs time even when it says yes. If it meets every {{cto.arbEvery}} days, a change waits about {{cto.arbWait}} days on average, so a median lead time of {{cto.leadBase}} days becomes about {{cto.leadArb}}; across {{cto.changes}} changes a quarter that is {{cto.waitDays}} change-days spent waiting. Keep formal review for one-way-door decisions, such as a database of record or a vendor that is hard to leave, and use records and advice for the rest. (Inferred.) TOGAF’s Architecture Board is covered in Inspect & Adapt (links section).')
    ],
    sources: [SRC.advice, SRC.bezos] },
  { id: 'ts-5', title: 'Modernization sequencing: strangler fig, rewrite, retire', levels: ALL,
    body: [
      'Fowler argues against cut-over rewrites: replacing a serious system takes a long time and users cannot wait for new features, and the old system’s behaviour is hard to specify and partly unwanted. He lists four activities, in no fixed order: understand the outcomes, break the problem into smaller parts (finding seams to split the system), deliver those parts, and change the organization so the work continues. Small parts let a team start with low-risk components and learn. Temporary code that lets old and new run side by side looks wasteful, he says, but buys lower risk and earlier value (Read, Fowler, Strangler Fig).',
      'Microsoft’s pattern puts a façade in front of the old system that routes each request to the old or new code, shifting traffic over time. It advises against the pattern when requests cannot be intercepted, when you cannot reach the old system’s source code and it has no other integration point you can change, such as its database, when the system is small enough to replace at once, or when the original must be shut down quickly. It warns that the façade must not become a single point of failure, that data should be checked for consistency before cutover, and that rollback is simplest until legacy objects are removed, after which it costs much more effort and risk (Read, Microsoft Learn, Strangler Fig pattern).',
      'To sequence a portfolio, divide each system’s modernization effort by the interest it costs each quarter: the result is a payback in quarters. Fund the shortest paybacks inside a fixed share of capacity, retire what nobody uses, and leave stable, rarely changed systems alone. (Inferred.) Packet BR-14 applies this to twelve systems.'
    ],
    sources: [SRC.strangler, SRC.msStrangler] },
  { id: 'ts-6', title: 'Build, buy or partner at the platform level', levels: ['vp', 'c-level'],
    body: [
      'Hohpe writes that buying is the default for most organizations, sensibly, because most of the IT estate does not set the business apart, and that “build what differentiates, buy the rest” is a useful start but not the whole answer. His three traps: building costs the value those engineers could otherwise create; custom features create value only with the data, back-end systems and decision processes behind them; and building does not avoid lock-in: moving off your own system can be as hard as moving off a vendor’s, through debt and rewrites (Read, Hohpe, Revisiting Buy vs. Build).',
      t('Three-year example (invented figures): building needs {{cto.buildEng}} engineers at {{$cto.loaded}} a year loaded, {{$cto.build3}} over three years; a software-as-a-service product costs {{$cto.saas}} a year plus {{$cto.integ}} once to integrate, {{$cto.buy3}}. Building costs {{$cto.gap3}} more. That gap is worth paying only for a capability the company competes on, where Fowler says speed matters more than cost. (Inferred, with Read, Fowler, Utility Vs Strategic Dichotomy.)'),
      'Partnering sits between the two: a vendor or integrator builds or runs the capability under a contract that keeps the company’s data and exit route under its own control. Write the exit terms before signing. (Inferred.)'
    ],
    sources: [SRC.hohpe, SRC.utility] }
];
const checks = [
  { id: 'TS-01', lesson: 'ts-1', levels: ['vp', 'c-level'],
    stem: 'Under Fowler’s utility-versus-strategic split, how should a payroll system at a logistics company be run?',
    options: ['As a strategic project with its own team, because payroll errors are expensive', 'As a utility: buy a package, adapt the process to it, keep cost low', 'Built in house, so that the company keeps full control of the code', 'Outsourced to the lowest bidder with no service levels in the contract'],
    answer: 1, why: 'Payroll does not set a logistics company apart, so it is a utility: buy, adapt the process, keep cost down. Fowler places utility risk in catastrophic errors, which a sound package guards against.',
    whyNot: { 0: 'High error cost is the utility kind of risk; it does not make the function a differentiator.', 2: 'Building a utility spends engineers on something that cannot set the company apart.', 3: 'Fowler says utility work still needs enough care to avoid catastrophe; no service levels gives none.' } },
  { id: 'TS-02', lesson: 'ts-1', levels: ['vp', 'c-level'],
    stem: 'The CEO wants next year’s roadmap. Which feature should it include so that its promises hold?',
    options: ['Every request from sales, ordered by the size of the deal attached to it', 'Fixed dates for every item across all four quarters, so that customers can plan', 'The capacity held back for debt and reliability work, shown beside the feature bets', 'A list of technologies the teams want to adopt, with a date for each one'],
    answer: 2, why: 'A roadmap that shows the capacity reserved for debt and reliability makes its feature promises match what the teams can deliver.',
    whyNot: { 0: 'A request list is an input to choices, not a roadmap.', 1: 'Fixed dates beyond the next quarter promise more than anyone knows; use ranges.', 3: 'Technologies are means; a roadmap ties bets to outcomes.' } },
  { id: 'TS-03', lesson: 'ts-2', levels: ALL,
    stem: 'Two modules carry similar amounts of cruft. Module A changes every sprint; module B has not changed in two years. Following Fowler, where do you pay the debt down first?',
    options: ['Module B, because old code is riskier than new code', 'Both equally, so that the whole codebase reaches one standard', 'Module A, because interest is paid each time the code changes', 'Neither, until a full rewrite of the system can be funded'],
    answer: 2, why: 'Interest is paid only when someone works in the code. A changes every sprint, so its cruft costs the most; B’s can be left.',
    whyNot: { 0: 'Age alone costs nothing; interest comes from change.', 1: 'An even spread spends effort on code that charges no interest.', 3: 'Waiting for a rewrite keeps paying A’s interest every sprint.' } },
  { id: 'TS-04', lesson: 'ts-2', levels: ALL,
    stem: t('A change takes {{cto.withCruft}} days with the current cruft and {{cto.without}} days after a clean-up that costs {{cto.cleanup}} days. Three such changes are planned. What does cleaning up first do?'),
    options: [t('Costs {{cto.cleanup}} extra days, since the changes would ship anyway'), t('Saves {{cto.threeSave}} days: it pays back after {{cto.breakEven}} changes'), t('Saves {{cto.gross3}} days, the time saved across the three changes'), 'Breaks even on the third change and saves nothing'],
    answer: 1, why: t('Each change saves {{cto.withCruft}} − {{cto.without}} = {{cto.saveEach}} days, so three save {{cto.gross3}} days against a cost of {{cto.cleanup}}: a net {{cto.threeSave}} days, with payback after {{cto.breakEven}} changes.'),
    whyNot: { 0: t('It ignores the {{cto.saveEach}} days each later change saves.'), 2: t('{{cto.gross3}} days is the gross saving; the {{cto.cleanup}}-day clean-up comes off it.'), 3: t('It breaks even after the second change, {{cto.cleanup}} ÷ {{cto.saveEach}}.') } },
  { id: 'TS-05', lesson: 'ts-3', levels: ALL,
    stem: 'A team reverses an architecture decision recorded last year. What does Nygard’s method say to do with the old record?',
    options: ['Delete it so nobody follows the old decision by mistake', 'Edit it in place so that it describes the new decision', 'Keep it, mark it superseded, and point it to the new record', 'Move it to an archive folder that the team no longer reads'],
    answer: 2, why: 'Old records stay; the reversed one is marked superseded and points to its replacement, so readers see both the history and what holds now.',
    whyNot: { 0: 'Deleting loses why the first choice was made.', 1: 'Editing in place hides that the decision changed.', 3: 'Nygard keeps records in the repository with a status; an unread archive defeats that.' } },
  { id: 'TS-06', lesson: 'ts-3', levels: ALL,
    stem: 'Which decision does Nygard’s definition count as architecturally significant, needing a record?',
    options: ['Renaming a variable in one service to match the style guide', 'Moving order events from synchronous calls to a message queue', 'Changing the colour of a button after a usability test', 'Fixing a typo in a customer-facing error message'],
    answer: 1, why: 'Switching to a message queue changes structure, dependencies and interfaces, the kinds of decision Nygard names.',
    whyNot: { 0: 'A rename touches no structure or interface.', 2: 'A visual tweak is a product decision, not architecture.', 3: 'A copy fix changes nothing structural.' } },
  { id: 'TS-07', lesson: 'ts-4', levels: ['vp', 'c-level'],
    stem: 'Under Harmel-Law’s advice process, what can the architecture advisory forum do with a team’s proposed decision?',
    options: ['Approve or reject it by a vote of the architects present', 'Offer advice; the decision stays with the team that proposed it', 'Send it to the CTO, who decides on the forum’s behalf', 'Hold it until every team affected has agreed to it'],
    answer: 1, why: 'The forum does not approve. Attendees offer advice; the decision-taker owns the decision, having sought and recorded advice.',
    whyNot: { 0: 'The article says the advice process reigns and attendees can only offer advice.', 2: 'Escalation to one person is the centralised model the process replaces.', 3: 'The goal is a range of inputs, not consensus.' } },
  { id: 'TS-08', lesson: 'ts-4', levels: ['vp', 'c-level'],
    stem: t('Teams ship {{cto.changes}} changes a quarter at a median lead time of {{cto.leadBase}} days. A proposed board would approve every change at a meeting every {{cto.arbEvery}} days. About what median lead time follows?'),
    options: [t('{{cto.leadBase}} days, because the board only adds a check'), t('About {{cto.leadArb}} days, with an average wait of {{cto.arbWait}} days'), t('About {{cto.arbEvery}} days, the time between meetings'), t('About {{cto.leadFull}} days: the full {{cto.arbEvery}}-day cycle added to {{cto.leadBase}} days')],
    answer: 1, why: t('A change arriving at a random time waits half the cycle on average, {{cto.arbWait}} days, so {{cto.leadBase}} + {{cto.arbWait}} = {{cto.leadArb}} days.'),
    whyNot: { 0: 'The wait for the meeting is added whether the board says yes or no.', 2: t('Waiting is added to the {{cto.leadBase}} days already needed.'), 3: 'On average a change waits half a cycle, not a full one.' } },
  { id: 'TS-09', lesson: 'ts-5', levels: ALL,
    stem: 'When does Microsoft’s guidance say the strangler fig pattern does not fit?',
    options: ['When the old system must keep running during a long migration', 'When requests to the old system cannot be intercepted at any point', 'When replacing the whole system at once would be risky', 'When the system is large and has many complex features'],
    answer: 1, why: 'The pattern needs a façade that intercepts requests; with no interception point it cannot route traffic gradually.',
    whyNot: { 0: 'A long-running original is a reason to use it.', 2: 'Risk in a one-step replacement is the case it is built for.', 3: 'Large, complex systems are where it helps most.' } },
  { id: 'TS-10', lesson: 'ts-5', levels: ALL,
    stem: t('System X costs {{b14.topInterest}} engineer-weeks of interest a quarter and {{b14.topEffort}} to modernize; system Y costs {{b14.glInterest}} a quarter and {{b14.glEffort}} to modernize. Which goes first, and why?'),
    options: ['Y, because the larger project carries the most risk to the business', 'Whichever system the most senior engineers prefer to work on', t('X: it pays back in {{b14.topPb}} quarters against {{b14.glPb}} for Y'), 'Both at once, so that neither system falls further behind'],
    answer: 2, why: t('Effort ÷ interest: {{b14.topEffort}} ÷ {{b14.topInterest}} = {{b14.topPb}} quarters for X and {{b14.glEffort}} ÷ {{b14.glInterest}} = {{b14.glPb}} for Y. Fund the shorter payback first.'),
    whyNot: { 0: 'Size is not a reason to go first; return per engineer-week is.', 1: 'Preference is not a sequencing rule.', 3: 'Splitting delays the faster payback without speeding the slower one.' } },
  { id: 'TS-11', lesson: 'ts-6', levels: ['vp', 'c-level'],
    stem: t('Building a capability costs {{$cto.build3}} over three years; buying it costs {{$cto.buy3}}. When is building the better choice?'),
    options: ['Whenever the team has the skills to build it in house', 'When the company competes on it and speed matters more than cost', 'Never, because buying is always cheaper over three years', 'When the vendor’s product lacks one feature that a single team asked for'],
    answer: 1, why: t('The {{$cto.gap3}} gap is worth paying only for a differentiating capability, where Fowler says the cost of delay outweighs development cost.'),
    whyNot: { 0: 'Having the skills does not make the work differentiating; those engineers could create value elsewhere.', 2: 'Cost is not the deciding factor for strategic work.', 3: 'One missing feature is usually met by configuration or a workaround.' } },
  { id: 'TS-12', lesson: 'ts-6', levels: ['vp', 'c-level'],
    stem: 'Which is one of Hohpe’s three traps of building in house?',
    options: ['Vendors can raise their prices once the company depends on them', 'Building creates lock-in of its own, through debt and rewrites', 'Packages always need heavy customization before they work', 'In-house teams cannot meet security standards'],
    answer: 1, why: 'Hohpe’s third trap: building does not avoid lock-in; it creates its own through technical debt and rewrites.',
    whyNot: { 0: 'That is not one of his three traps of building.', 2: 'He presents configuration as a middle ground, not a trap of building.', 3: 'He makes no such claim.' } }
];
const { place } = require('./place.js');
const POS = [3, 0, 1, 2, 0, 3, 2, 1, 3, 0, 1, 2];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
