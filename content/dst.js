// Data leadership lane module: Data strategy and governance. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice, no single source). Every figure comes from math/numbers.js (N.dp) through {{placeholders}}.
// The operating-model module in this lane (om-2, om-5) covers the same choices for IT teams; lessons here do not copy it.
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  omb: ['OMB Memorandum M-19-23, Phase 1 Implementation of the Foundations for Evidence-Based Policymaking Act (July 2019)', 'https://www.whitehouse.gov/wp-content/uploads/2019/07/M-19-23.pdf', 'Read'],
  mesh: ['Martin Fowler, Data Mesh Principles and Logical Architecture', 'https://martinfowler.com/articles/data-mesh-principles.html', 'Read'],
  metricflow: ['dbt Docs, About MetricFlow', 'https://docs.getdbt.com/docs/build/about-metricflow', 'Read'],
  endorse: ['Microsoft Learn, Endorse Power BI content', 'https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-endorse-content', 'Read'],
  roadmap: ['Microsoft Learn, Fabric adoption roadmap: Content ownership and management', 'https://learn.microsoft.com/en-us/power-bi/guidance/fabric-adoption-roadmap-content-ownership-and-management', 'Read'],
  purview: ['Microsoft Learn, Microsoft Purview data quality rules', 'https://learn.microsoft.com/en-us/purview/unified-catalog-data-quality-rules', 'Read'],
  dbtTests: ['dbt Docs, Add data tests to your DAG', 'https://docs.getdbt.com/docs/build/data-tests', 'Read'],
  finopsUnit: ['FinOps Foundation, Unit Economics capability', 'https://www.finops.org/framework/capabilities/unit-economics/', 'Read']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'dst-1', title: 'What a data strategy covers, and where the Chief Data Officer reports', levels: ['vp', 'c-level'],
    body: [
      'OMB’s memo implementing the US Evidence Act has each agency head designate a senior, nonpolitical Chief Data Officer and says the role goes where it can best perform its functions: the Act sets no particular unit or reporting line. The memo wants the officer in a central leadership position with enough seniority to engage the agency head regularly, with authority over data governance and lifecycle data management. Duties include leading the Data Governance Body and coordinating with the Chief Information Officer on data access (Read, OMB M-19-23).',
      'A data strategy answers five questions: which decisions or products the data serves, who owns each dataset and metric, what quality the board numbers need, what the platform costs and returns, and who decides when owners disagree. (Inferred.)',
      'Companies place the role under the CEO, the CFO or the CIO. Pick by the first problem to fix: a platform that has to be consolidated fits the CIO, disputed metric definitions fit the CFO, and ownership fights between business units fit the CEO. (Inferred.)'
    ],
    sources: [SRC.omb] },
  { id: 'dst-2', title: 'Centralized, federated and data mesh', levels: ['vp', 'c-level'],
    body: [
      'Fowler’s description of data mesh rests on four principles: domain teams own and serve their analytical data; they treat it as a product and its consumers as customers; a self-serve platform lets them do it without deep infrastructure skill; and governance is federated, with domains deciding locally inside global rules the platform automates (Read, Fowler, Data Mesh Principles).',
      'He sets this against the traditional model, where a central team is responsible for quality, security and compliance, holds custodianship, keeps a global canonical model and measures success by the volume of governed tables. In the mesh model a federated team of domain representatives sets the standards, domains hold custodianship, and success is measured by how much data is consumed (Read, same page).',
      'The mesh needs two things in place: people in each domain who can own a data product, and a platform that enforces the shared rules automatically. Without them a decision to federate leaves datasets with a named domain and nobody who maintains them. (Inferred.) The operating-model module in this lane covers the same choice for IT teams.'
    ],
    sources: [SRC.mesh] },
  { id: 'dst-3', title: 'Who owns a metric’s definition', levels: ALL,
    body: [
      'dbt’s documentation says that when analysts each write their own query for a metric, the result is confusion and inconsistency, and recommends defining the metric once in YAML kept in a git repository, where the data and business teams can see and approve it as the only source (Read, dbt Docs, About MetricFlow).',
      'Power BI separates two endorsements. Promoted content is content its owner thinks is valuable; certified content meets the organization’s quality standards and is treated as reliable and authoritative. Only reviewers whom the Power BI administrator has defined can certify (Read, Microsoft Learn, Endorse content).',
      t('A board metric needs one accountable business owner, one written definition and one home. Other uses get another name. Example (invented): Sales counts {{dp.sSales}} active customers, Marketing {{dp.sMkt}} and Finance {{dp.sFin}}. Marketing’s count is {{dp.overMkt}}% above Finance’s. Naming Finance’s definition (a paid order in the last 12 months) as the board metric, and renaming the others (for example “reachable contacts”), removes the argument (Inferred).')
    ],
    sources: [SRC.metricflow, SRC.endorse] },
  { id: 'dst-4', title: 'Governance programs that make decisions', levels: ALL,
    body: [
      'The OMB memo describes the agency Data Governance Body as the process of setting and enforcing priorities for managing data as a strategic asset. The Chief Data Officer chairs it, with senior staff from business units, data functions and financial management taking part (Read, OMB M-19-23).',
      'Fowler’s federated computational governance is the same idea built into the platform: domains keep autonomy over local decisions, and a group of domain data product owners and platform owners sets global rules that the platform applies automatically (Read, Fowler, Data Mesh Principles).',
      'Microsoft’s Fabric adoption roadmap names three ways content is owned: business-led self-service, managed self-service and enterprise. The oversight a piece of content needs depends on who owns it, how widely it is delivered, how sensitive the subject is and how important it is for critical decisions. Business-led content gets the lightest oversight and enterprise content the most. The page says organizations rarely use just one approach (Read, Microsoft Learn, Fabric adoption roadmap).',
      'A governance group earns its time by making a short list of decisions on a set cadence, with an owner for each and rules the platform enforces. A group that only writes policy documents is not governing anything. (Inferred.)'
    ],
    sources: [SRC.omb, SRC.mesh, SRC.roadmap] },
  { id: 'dst-5', title: 'Data quality as a program', levels: ALL,
    body: [
      'Microsoft Purview lists six data quality dimensions: accuracy, completeness, conformity, consistency, timeliness and uniqueness. Its built-in rule types include freshness, unique values, duplicate rows and empty or blank fields, and the quality score comes from assessing data against the rules you define (Read, Microsoft Learn, Purview data quality rules).',
      'In dbt a data test is a query that returns the rows breaking an assertion; zero rows means a pass. Four generic tests ship with dbt: unique, not_null, accepted_values and relationships. A singular test is a one-off query saved as its own file (Read, dbt Docs, data tests).',
      t('Scope the program by what the board sees. Example (invented): {{dp.domains}} domains hold {{dp.datasets}} datasets, and {{dp.boardDs}} of them feed the board pack. At {{dp.testsPer}} tests and {{dp.daysPer}} person-days a dataset, certifying those {{dp.boardDs}} takes {{dp.boardTests}} tests and {{dp.boardDays}} person-days, {{dp.boardWeeks}} weeks for {{dp.eng}} engineers. Certifying all {{dp.datasets}} takes {{dp.allDays}} person-days, {{dp.allWeeks}} weeks or {{dp.allYears}} years (Inferred; computed in this app).'),
      'Publish each dataset’s status so a user can tell which ones are certified, and certify in the order the board would be hurt by an error. (Inferred.)'
    ],
    sources: [SRC.purview, SRC.dbtTests] },
  { id: 'dst-6', title: 'Putting a number in front of the board', levels: ['vp', 'c-level'],
    body: [
      'The FinOps Foundation advises having Finance validate the assumptions behind a metric and check that its sources reconcile (Read, FinOps Foundation, Unit Economics).',
      'A number is ready for a board pack when it has a named owner, a written definition, a reconciliation to the system of record within a stated tolerance, and an explanation of any change since last quarter. (Inferred.)',
      t('Example (invented): the quarter’s net revenue on the ledger is {{$dp.rev}}. A rerun duplicated {{dp.dupDays}} of the quarter’s {{dp.qDays}} days of orders, so the feed overstates revenue by {{$dp.over}}, which is {{dp.overPct}}%. A tolerance of {{dp.tolPct}}% is {{$dp.tol}}, so a reconciliation before the pack goes out would have stopped it (Inferred; computed in this app).'),
      'If a wrong number does reach the board, tell the CFO and the chair what you know and what you do not yet know, freeze the feed, and then correct it. A correction that waits for a full root cause reaches them after someone else finds the error. (Inferred.)'
    ],
    sources: [SRC.finopsUnit] }
];
const checks = [
  { id: 'DST-01', lesson: 'dst-1', levels: ['vp', 'c-level'],
    stem: 'Under OMB memo M-19-23, where must an agency place its Chief Data Officer?',
    options: ['Inside the Chief Information Officer’s organization, since both roles run on the same systems', 'Where it can best perform its functions; the Evidence Act sets no unit or reporting line', 'Reporting to the chief financial officer, since the memo gives that office the data budget', 'Under the Evaluation Officer, since both roles support the learning agenda'],
    answer: 1, why: 'The memo says the role is placed where it can best perform its functions and that the Act sets no unit or reporting line.',
    whyNot: { 0: 'The memo asks the officer to coordinate with the Chief Information Officer; it does not put the role under that office.', 2: 'The memo names no budget owner for the role.', 3: 'The Evaluation Officer leads the learning agenda, a separate duty.' } },
  { id: 'DST-02', lesson: 'dst-1', levels: ['vp', 'c-level'],
    stem: 'Three business units dispute which of them owns customer data, and the board pack depends on it. Which first move fits a data strategy?',
    options: ['Buy a catalog tool so every team can see which datasets exist and who queries them', 'Name one accountable owner for each board metric and dataset, and who settles disputes', 'Commission a three-year platform roadmap and settle ownership once the design is agreed', 'Ask each unit to document its own definition and publish all three side by side'],
    answer: 1, why: 'The dispute is about who is accountable, and a tool or roadmap leaves it open.',
    whyNot: { 0: 'A catalog shows usage and leaves the ownership question unanswered.', 2: 'A roadmap built on contested ownership inherits the dispute.', 3: 'Three published definitions keep the disagreement and put it in front of the board.' } },
  { id: 'DST-03', lesson: 'dst-2', levels: ['vp', 'c-level'],
    stem: 'In Fowler’s description of the data mesh model, who holds custodianship of the data?',
    options: ['A central data team, which keeps one canonical model for the company', 'The domain teams, who own and serve their analytical data', 'The platform team, because it runs the infrastructure', 'The governance council, which approves every dataset'],
    answer: 1, why: 'In the mesh model domains hold custodianship; the central-team model is the traditional contrast.',
    whyNot: { 0: 'Fowler describes this as the traditional centralized model.', 2: 'The platform gives domains self-serve tools; it does not own their data.', 3: 'The federated group sets global rules; domains decide locally within them.' } },
  { id: 'DST-04', lesson: 'dst-2', levels: ['vp', 'c-level'],
    stem: 'A 600-person retailer with one analytics team and no engineers in its business units is told to adopt data mesh. What is the most likely result?',
    options: ['Faster delivery, because each domain can now change its own data without waiting in a queue', 'Datasets with a named owner and nobody staffed to run them or enforce the shared rules', 'Lower platform cost, since the central team shrinks as domains take over its work', 'Better data quality, because ownership moves closer to the source and errors surface sooner'],
    answer: 1, why: 'The model needs people in each domain to own data products and a platform that automates the rules; without them ownership exists only on paper.',
    whyNot: { 0: 'Without domain engineers the work has no one to do it.', 2: 'The central team’s work moves to nobody, and the platform still has to be built.', 3: 'Quality accountability moves upstream only when upstream has people to hold it.' } },
  { id: 'DST-05', lesson: 'dst-3', levels: ALL,
    stem: 'In Power BI, who can certify content?',
    options: ['Any member with write permission on the workspace', 'Only reviewers whom the Power BI administrator has defined', 'The content owner, once the report has been in use for a quarter', 'Any user who requests it and follows the organization’s guidelines'],
    answer: 1, why: 'Certification is limited to authorized reviewers defined by the administrator; promotion is the lighter step open to owners and writers.',
    whyNot: { 0: 'Write permission lets a member promote content; certification is a separate permission.', 2: 'The page sets no time rule and does not let owners certify their own content.', 3: 'Following the guidelines gets a request reviewed; the decision stays with an authorized reviewer.' } },
  { id: 'DST-06', lesson: 'dst-3', levels: ALL,
    stem: t('Sales reports {{dp.sSales}} active customers, Marketing {{dp.sMkt}} and Finance {{dp.sFin}}, and the board will see one number. What is the best fix?'),
    options: ['Report the average of the three, so that no business unit feels overruled by another', 'Report the largest, since it shows the full reach of the customer base to the board', 'Put all three on the slide, each with a footnote explaining that unit’s definition', 'Name one owner, write one definition, publish it, and rename the other counts'],
    answer: 3, why: 'One owner and one definition removes the conflict; the other counts stay useful under names that say what they measure.',
    whyNot: { 0: 'An average matches no definition and nobody can explain it.', 1: 'The largest count is the loosest definition, and the board would be told it is the customer base.', 2: 'The board then has to settle a definition dispute that the data team should have settled.' } },
  { id: 'DST-07', lesson: 'dst-4', levels: ALL,
    stem: 'Under OMB memo M-19-23, who chairs the agency Data Governance Body?',
    options: ['The Chief Information Officer', 'The Evaluation Officer', 'The Chief Data Officer', 'The Chief Financial Officer'],
    answer: 2, why: 'The Chief Data Officer chairs it, with senior staff from business units, data functions and financial management taking part.',
    whyNot: { 0: 'The Chief Information Officer coordinates with the Chief Data Officer on data access but does not chair the body.', 1: 'The Evaluation Officer leads the learning agenda.', 3: 'Financial management takes part; it does not chair.' } },
  { id: 'DST-08', lesson: 'dst-4', levels: ALL,
    stem: 'Under Microsoft’s Fabric adoption roadmap, which content should get the most rigorous governance?',
    options: ['Personal and team reports that creators in a business unit build for themselves', 'Every dataset equally, so that the company keeps a single standard for all of it', 'Whichever content has the most users, since it reaches the most people', 'Enterprise content behind critical decisions or holding regulated, sensitive data'],
    answer: 3, why: 'The page ties oversight to who owns the content, how widely it is delivered, how sensitive it is and how important it is; enterprise solutions get the most.',
    whyNot: { 0: 'Business-led self-service gets the lightest oversight.', 1: 'The page says there is no one-size-fits-all approach.', 2: 'User count is one input to scope; sensitivity and importance matter as well.' } },
  { id: 'DST-09', lesson: 'dst-5', levels: ALL,
    stem: 'Which are the four generic data tests that ship with dbt?',
    options: ['unique, not_null, freshness and row_count', 'unique, not_null, accepted_values and relationships', 'not_null, range, regex and unique', 'relationships, freshness, accepted_values and row_count'],
    answer: 1, why: 'The four generic tests that ship with dbt are unique, not_null, accepted_values and relationships.',
    whyNot: { 0: 'Freshness and row_count are not among the four.', 2: 'Range and regex are not among the four that ship with dbt.', 3: 'Freshness and row_count are not among the four.' } },
  { id: 'DST-10', lesson: 'dst-5', levels: ALL,
    stem: t('{{dp.datasets}} datasets exist and {{dp.boardDs}} feed the board pack. Certifying one takes {{dp.testsPer}} tests and {{dp.daysPer}} person-days, and you have {{dp.eng}} engineers. Where do you start?'),
    options: [t('Certify all {{dp.datasets}} for consistency: {{dp.allDays}} person-days, over {{dp.allYears}} years with {{dp.eng}} engineers'), t('Certify the {{dp.boardDs}} board-feeding datasets first: {{dp.boardDays}} person-days, {{dp.boardWeeks}} weeks with {{dp.eng}} engineers'), 'Test only the largest tables first, since an error costs the most where the data is biggest', 'Wait for a catalog tool to rank the datasets by how often people query them'],
    answer: 1, why: t('The datasets the board sees carry the most risk, and {{dp.boardDays}} person-days is a quarter of work; all {{dp.datasets}} would take {{dp.allWeeks}} weeks.'),
    whyNot: { 0: t('Consistent coverage is right in the long run, but it leaves the board numbers uncertified for {{dp.allYears}} years.'), 2: 'Table size says little about whether the board sees the data.', 3: 'Query counts show use, and the board pack is the use that matters.' } },
  { id: 'DST-11', lesson: 'dst-6', levels: ['vp', 'c-level'],
    stem: t('Quarterly net revenue on the ledger is {{$dp.rev}}. The board feed is {{$dp.over}} higher because a rerun duplicated {{dp.dupDays}} days of orders. Your tolerance is {{dp.tolPct}}%. What does the reconciliation show?'),
    options: [t('It passes: {{dp.overPct}}% is small against {{$dp.rev}}'), t('It fails: the gap is {{dp.overPct}}%, above a tolerance of {{$dp.tol}}'), 'It passes if next quarter’s feed comes in lower and offsets it', 'It cannot be judged until Finance recomputes the quarter from scratch'],
    answer: 1, why: t('{{dp.tolPct}}% of {{$dp.rev}} is {{$dp.tol}}, and the gap is {{$dp.over}}, so the check fails.'),
    whyNot: { 0: t('{{dp.overPct}}% is more than six times the {{dp.tolPct}}% tolerance.'), 2: 'A later offset leaves this quarter’s board number wrong.', 3: 'The reconciliation exists to give an answer before a full recompute.' } },
  { id: 'DST-12', lesson: 'dst-6', levels: ['vp', 'c-level'],
    stem: 'A wrong revenue number has gone into the board pack. What do you do first?',
    options: ['Fix it before the next pack goes out and note the change in the appendix', 'Wait until the cause is confirmed so that the message you send is complete', 'Tell the CFO and board chair now what is known, freeze the feed, then correct it', 'Ask the business unit that owns the feed to announce the correction to the board'],
    answer: 2, why: 'The people relying on the number need to hear it from you first, and the feed has to stop producing more wrong numbers.',
    whyNot: { 0: 'The board relied on the wrong number for a quarter and hears about it from an appendix.', 1: 'A complete message that arrives after someone else finds the error costs trust.', 3: 'The data leader owns the number the board saw, so the announcement is yours.' } }
];
const { place } = require('./place.js');
const POS = [1, 3, 0, 2, 3, 1, 0, 2, 1, 3, 2, 0];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
