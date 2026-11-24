// Shared module: Operating model. Six lessons and twelve keyed checks (two per lesson).
// Every lesson lists its sources with a tier: Read (opened Nov 23, 2026), Relayed (search snippet or a secondary
// source repeating the original), Inferred (general practice, no single source). Draft until Kristen reviews.
'use strict';
const ALL = ['director', 'vp', 'c-level'];
const SRC = {
  isg: ['ISG, The Hub-and-Spoke IT Operating Model', 'https://isg-one.com/articles/the-hub-and-spoke-it-operating-model', 'Read'],
  datos: ['Datos Insights, centralized vs. federated IT operating models (brief summary)', 'https://datos-insights.com/?p=13766', 'Relayed'],
  mck: ['McKinsey, Managing the forces of fragmentation (federated model)', 'https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/managing-the-forces-of-fragmentation-how-it-can-balance-local-needs-and-global-efficiency-in-a-multipolar-world', 'Relayed'],
  omb: ['White House, OMB AI memo fact sheet (M-25-21)', 'https://www.whitehouse.gov/wp-content/uploads/2025/02/AI-Memo-Fact-Sheet.pdf', 'Read'],
  nist: ['NIST Cybersecurity Framework 2.0 (CSWP 29), GOVERN function', 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf', 'Read'],
  finops: ['FinOps Foundation, Invoicing & Chargeback capability', 'https://www.finops.org/framework/capabilities/invoicing-chargeback/', 'Read'],
  leanix: ['LeanIX wiki, Gartner TIME model (vendor page describing Gartner’s model)', 'https://www.leanix.net/en/wiki/ea/gartner-time-model', 'Read (Gartner’s original is paywalled: Relayed)'],
  msea: ['Microsoft, Enterprise Agreement licensing guidance (true-up)', 'https://microsoft.com/licensing/guidance/Enterprise-Agreement', 'Read']
};

const lessons = [
  { id: 'om-1', title: 'Who owns what: the technology chairs', levels: ALL,
    body: [
      'Titles vary by company, so ask what a chair owns, not what it is called. A common split: the Chief Information Officer runs the enterprise systems and the IT operating model (ERP, CRM, service desk, vendors); the Chief Technology Officer runs the technology the company sells or builds on; the Chief Information Security Officer runs the security program; a Chief Data Officer owns data strategy, definitions and governance; a Chief AI Officer owns AI adoption and AI risk. (Inferred: common practice, not a standard.)',
      'Public anchors exist for two of these. U.S. federal guidance asks each agency’s Chief AI Officer to promote AI adoption for lower-risk uses, mitigate risks for higher-impact AI, and advise on AI investments and spending (Read, OMB fact sheet). NIST CSF 2.0 puts “roles, responsibilities, and authorities” for cybersecurity under its GOVERN function, which also covers policy and oversight of strategy (Read, NIST).',
      'In an interview, say where the boundaries sit at the company you are describing and who breaks ties: for example, who decides when a security control slows an ERP rollout.'
    ],
    sources: [SRC.omb, SRC.nist] },
  { id: 'om-2', title: 'Centralized, decentralized, hybrid, hub-and-spoke', levels: ALL,
    body: [
      'ISG describes four structures (Read). Centralized: IT sits in one unit that provides standard services to every business unit. Decentralized: IT sits inside the business units with no central unit. Hybrid: partly central, partly in the units. Hub-and-spoke: IT is coordinated by a central hub but performed in the units.',
      'Each fails in a recognisable way (Read, ISG). Centralized IT can lack knowledge of each unit’s processes and slow down under competing priorities, which pushes teams toward shadow IT. Decentralized IT duplicates software, weakens purchasing power and makes security harder. Hybrid models create duplicate effort when roles are unclear. Hub-and-spoke still depends on clear mandates, or teams build the same thing twice.',
      'Federated is the term many firms use for a central core of standard components with local layers on top (Relayed, McKinsey snippet). Datos Insights notes insurers tend to cycle between centralized and federated models every few years (Relayed, summary only).'
    ],
    sources: [SRC.isg, SRC.mck, SRC.datos] },
  { id: 'om-3', title: 'Intake, councils and saying no', levels: ['director', 'vp'],
    body: [
      'An operating model shows up in how work gets in. Most enterprise IT shops run some form of intake: one front door for requests, a short form that states the problem and the value, a triage step, and a council of business leaders that ranks the larger asks against capacity. (Inferred: common practice; ITIL’s portfolio and demand practices cover the same ground, see Inspect & Adapt’s ITIL decks.)',
      'The council’s job is to make trade-offs visible: if this request goes first, which one waits. Without that, the loudest business unit wins and the CIO absorbs the blame for everything else. (Inferred.)',
      'At Director level you run the intake; at VP level you own the capacity it is ranked against; at C-level you set the rules the council uses and defend them when a business unit head goes around them.'
    ],
    sources: [] },
  { id: 'om-4', title: 'Application and vendor inventory', levels: ALL,
    body: [
      'You cannot run a portfolio you cannot list. A useful inventory names each application, its business owner, its users, its annual cost, the contract and renewal date, and the systems it feeds. (Inferred.)',
      'Gartner’s TIME model sorts applications on two axes. In LeanIX’s description (Read): Tolerate is high technical fit with low functional fit; Invest is high on both; Migrate is low technical fit with high functional fit; Eliminate is low on both. Functional fit is how well the application serves the business. Gartner’s own document is paywalled, so the model’s wording here is Relayed through LeanIX.',
      'Renewal dates belong in the inventory because they set your deadlines. Under a Microsoft Enterprise Agreement, for example, the annual true-up is “an annual inventory of products, services, users, and devices added during the year,” due 60 to 30 days before the anniversary (Read, Microsoft).'
    ],
    sources: [SRC.leanix, SRC.msea] },
  { id: 'om-5', title: 'Paying for IT: showback and chargeback', levels: ['vp', 'c-level'],
    body: [
      'Showback shows each unit what its technology costs. Chargeback moves that cost into the unit’s budget. The FinOps Foundation describes the difference as one of formality, and says showback is always required while chargeback is not always required; neither is more mature than the other (Read, FinOps Foundation).',
      'Chargeback changes behaviour faster because the money is real, but it also invites disputes over how shared costs are split. Showback is the usual first step because it builds the allocation data chargeback needs. (Inferred.)',
      'Budget arithmetic (NPV, payback, budgeting mechanics) lives in Going Concern; this module covers the decision.'
    ],
    sources: [SRC.finops] },
  { id: 'om-6', title: 'Choosing and changing the model', levels: ['vp', 'c-level'],
    body: [
      'Pick the structure that fits the business operating model, then manage its known weakness on purpose. A company of near-identical units can centralize; a company of very different businesses usually needs a hub with strong spokes. (Inferred, consistent with ISG’s drawbacks list, Read.)',
      'Switching models has a cost: reporting lines change, people leave, and decisions stall while authority is unclear. Before proposing a switch, name the specific failure you are fixing (slow delivery, duplicate tools, security gaps, cost) and check whether a narrower fix, such as a clearer intake or a shared platform, would do. (Inferred.)',
      'A sim on running an operating model as business units are added is planned for a later phase.'
    ],
    sources: [SRC.isg] }
];

const checks = [
  { id: 'OM-01', lesson: 'om-1', levels: ALL,
    stem: 'A security control is slowing an ERP rollout, and the CIO and CISO disagree. What should the operating model already say?',
    options: ['That the CIO always wins, because the ERP is a CIO system', 'Who owns each decision and who breaks the tie', 'That the CISO always wins, because security comes first', 'Nothing; leaders should settle it case by case'],
    answer: 1, why: 'Clear roles and decision rights are the point of an operating model; NIST CSF 2.0 puts roles, responsibilities and authorities under GOVERN.',
    whyNot: { 0: 'A blanket rule ignores real risk.', 2: 'A blanket rule ignores the business cost.', 3: 'Case by case is how the same fight happens every quarter.' } },
  { id: 'OM-02', lesson: 'om-1', levels: ALL,
    stem: 'In U.S. federal guidance (OMB M-25-21 fact sheet), which is part of a Chief AI Officer’s remit?',
    options: ['Running the agency’s ERP', 'Promoting AI adoption for lower-risk uses and mitigating risks for higher-impact AI', 'Approving every software purchase', 'Owning the agency’s cybersecurity program'],
    answer: 1, why: 'The fact sheet tasks Chief AI Officers with promoting adoption of lower-risk AI, mitigating risks for higher-impact AI, and advising on AI investments.',
    whyNot: { 0: 'ERP is usually a CIO system.', 2: 'The fact sheet says advising on AI investments, not approving all software.', 3: 'Cybersecurity sits with the security leadership.' } },
  { id: 'OM-03', lesson: 'om-2', levels: ALL,
    stem: 'Business units at a manufacturer each bought their own CRM, and security reviews take months because every stack differs. Which structure most likely produced this?',
    options: ['Centralized', 'Decentralized', 'Hub-and-spoke with clear mandates', 'Outsourced'],
    answer: 1, why: 'ISG lists duplicate software, weaker purchasing power and harder security as drawbacks of decentralized IT.',
    whyNot: { 0: 'Centralized IT tends toward one standard, not many.', 2: 'Clear mandates are what prevent the duplication.', 3: 'Outsourcing is a sourcing choice, not a structure.' } },
  { id: 'OM-04', lesson: 'om-2', levels: ['vp', 'c-level'],
    stem: 'Which description matches ISG’s hub-and-spoke model?',
    options: ['All IT staff in one central unit', 'IT coordinated centrally but performed in the business units', 'No central IT at all', 'Each unit picks its own tools with no shared standards'],
    answer: 1, why: 'ISG: enterprise IT is coordinated centrally, with a hub, but performed decentrally.',
    whyNot: { 0: 'That is centralized.', 2: 'That is decentralized.', 3: 'That is decentralized without coordination.' } },
  { id: 'OM-05', lesson: 'om-3', levels: ['director', 'vp'],
    stem: 'Three business-unit heads each say their request is the top priority. What should the intake council produce?',
    options: ['A promise to deliver all three this quarter', 'One ranked list against capacity, showing what each choice displaces', 'Equal capacity split three ways', 'A decision by whoever escalates first'],
    answer: 1, why: 'A council makes trade-offs visible: if this goes first, what waits.',
    whyNot: { 0: 'Over-promising moves the conflict to delivery.', 2: 'An even split ignores value.', 3: 'That rewards escalation, not value.' } },
  { id: 'OM-06', lesson: 'om-3', levels: ['director', 'vp', 'c-level'],
    stem: 'A business-unit head bypasses intake and asks the CEO to approve a new tool directly. What protects the operating model best?',
    options: ['Approve it quietly to keep the peace', 'Ask the CEO to route it back through intake under the rules the council agreed', 'Block the tool with no explanation', 'Let the business unit run it outside IT'],
    answer: 1, why: 'The rules only work if the C-level defends them when someone goes around them.',
    whyNot: { 0: 'One exception teaches everyone to go around intake.', 2: 'A block with no reason looks like gatekeeping.', 3: 'That creates shadow IT.' } },
  { id: 'OM-07', lesson: 'om-4', levels: ALL,
    stem: 'In the TIME model as LeanIX describes it, an application with high functional fit but low technical fit belongs in which category?',
    options: ['Tolerate', 'Invest', 'Migrate', 'Eliminate'],
    answer: 2, why: 'Migrate: low technical fit, high functional fit. The business needs it; the technology needs replacing.',
    whyNot: { 0: 'Tolerate is high technical, low functional fit.', 1: 'Invest is high on both.', 3: 'Eliminate is low on both.' } },
  { id: 'OM-08', lesson: 'om-4', levels: ['director', 'vp'],
    stem: 'Why do contract and renewal dates belong in the application inventory?',
    options: ['Auditors require a date column', 'They set the deadlines for retire, renegotiate or renew decisions', 'Vendors ask for them', 'They determine the TIME category'],
    answer: 1, why: 'A renewal or true-up date is the latest point to act; Microsoft’s EA true-up, for example, is due 60 to 30 days before the anniversary.',
    whyNot: { 0: 'Not the main reason.', 2: 'Vendors already know your dates.', 3: 'TIME uses fit, not dates.' } },
  { id: 'OM-09', lesson: 'om-5', levels: ['vp', 'c-level'],
    stem: 'According to the FinOps Foundation, which statement about showback and chargeback is correct?',
    options: ['Chargeback is the more mature practice', 'Showback is always required; chargeback depends on the organization', 'Chargeback is always required', 'They are the same thing'],
    answer: 1, why: 'The Foundation says showback is always required, chargeback is not always required, and neither is more mature.',
    whyNot: { 0: 'The Foundation says neither is more mature.', 2: 'Chargeback depends on accounting policy.', 3: 'The difference is formality: chargeback moves cost into budgets.' } },
  { id: 'OM-10', lesson: 'om-5', levels: ['vp', 'c-level'],
    stem: 'The CFO wants business units to feel the cost of the data platform, but nobody yet agrees how shared costs are split. What is the sensible first step?',
    options: ['Charge back immediately by headcount', 'Start with showback while the allocation rules are agreed', 'Keep the cost central and say nothing', 'Charge the largest unit for everything'],
    answer: 1, why: 'Showback builds the allocation data and agreement chargeback needs.',
    whyNot: { 0: 'Headcount ignores actual use and invites disputes.', 2: 'Nobody changes behaviour without seeing cost.', 3: 'Arbitrary and unfair.' } },
  { id: 'OM-11', lesson: 'om-6', levels: ['vp', 'c-level'],
    stem: 'A new CIO wants to recentralize IT after two years of a federated model. What should come first?',
    options: ['Announce the change in the first town hall', 'Name the specific failure being fixed and test whether a narrower fix would solve it', 'Copy the model of the CIO’s last company', 'Survey staff on their preferred model'],
    answer: 1, why: 'Switching models is costly; name the failure (cost, duplication, speed, security) and check smaller fixes first.',
    whyNot: { 0: 'Announcing before diagnosing commits to a cost you have not justified.', 2: 'Another company’s fit is not this one’s.', 3: 'Preference is not a diagnosis.' } },
  { id: 'OM-12', lesson: 'om-6', levels: ['c-level'],
    stem: 'A company runs four very different businesses (retail, logistics, finance, manufacturing). Which structure usually fits?',
    options: ['Fully centralized, one standard for everything', 'A central hub for shared platforms and standards, with strong spokes in each business', 'Fully decentralized with no shared standards', 'Outsource all IT to one provider'],
    answer: 1, why: 'Very different businesses need local fit; a hub keeps shared platforms, security and buying power.',
    whyNot: { 0: 'One standard will not fit four different businesses.', 2: 'No standards brings duplication and security gaps.', 3: 'A sourcing choice, not a structure.' } }
];

// Answer positions, one per check (OM-07 was written with the answer at C, the rest at B, then moved).
const { place } = require('./place.js');
const POS = [3, 0, 2, 1, 0, 3, 1, 2, 3, 0, 2, 1];
checks.forEach((c, i) => place(c, POS[i]));
module.exports = { lessons, checks };
