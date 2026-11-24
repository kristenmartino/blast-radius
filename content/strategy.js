// AI leadership lane module: AI strategy and portfolio. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice, no single source). Operating model and intake material lives in om-2 and om-3.
'use strict';
const SRC = {
  cafPlan: ['Microsoft Learn, Cloud Adoption Framework: AI Plan (prioritize use cases, proof of concept)', 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/plan', 'Read'],
  cafStrategy: ['Microsoft Learn, Cloud Adoption Framework: AI Strategy (use cases, buy or build)', 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/strategy', 'Read'],
  omb: ['OMB Memorandum M-25-21, Accelerating Federal Use of AI (April 2025)', 'https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf', 'Read'],
  gartner: ['Gartner press release, 30% of GenAI projects abandoned after proof of concept (July 29, 2024)', 'https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025', 'Read'],
  metr: ['METR, Measuring the impact of early-2025 AI on experienced open-source developer productivity (July 10, 2025)', 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/', 'Read']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'as-1', title: 'Scoring AI use cases: value, feasibility, risk', levels: ALL,
    body: [
      'Microsoft’s Cloud Adoption Framework tells you to evaluate each use case against feasibility, strategic value and resource requirements, and to score business impact, technical complexity, resource requirements and alignment with goals (Read, Microsoft Learn, AI Plan).',
      'Add risk as its own axis. US federal guidance calls AI high-impact when its output is a principal basis for decisions with legal or significant effect, including access to insurance, credit and employment, and requires testing, an impact assessment, monitoring and human oversight for those uses (Read, OMB M-25-21). A use case in that class carries those costs before it returns anything.',
      'A rubric is useful only if it ranks the same request the same way twice: fixed scales with written definitions, applied by one triage group on a set cadence. Weight value over feasibility, and send high-risk requests to review whatever their score. (Inferred.)'
    ],
    sources: [SRC.cafPlan, SRC.omb] },
  { id: 'as-2', title: 'Portfolio balance; build, buy or partner', levels: ['vp', 'c-level'],
    body: [
      'Microsoft’s guidance is to approve the option that meets the requirement with the least operational responsibility: start with software you buy when it is customizable enough, move to a managed platform when you need control over models, logic or data integration, and treat running your own infrastructure as the exception (Read, Microsoft Learn, AI Strategy).',
      'The same page separates two purposes: enhancing individual efficiency and automating business functions (Read, Microsoft Learn, AI Strategy). A balanced portfolio holds some of each: bought assistants that lift many people a little, and a few process automations that change a cost line. (Inferred.)',
      'Partner when you need a skill for a limited time. Write knowledge transfer and exit terms into the contract so the work can come in house. (Inferred.)'
    ],
    sources: [SRC.cafStrategy] },
  { id: 'as-3', title: 'Pilot-to-production gates', levels: ALL,
    body: [
      'Microsoft suggests starting proofs of concept with internal, non-customer-facing work, defining success metrics, timelines and resources for each project, and adjusting priorities based on proven feasibility and measured impact. The page sets no numeric go/no-go threshold (Read, Microsoft Learn, AI Plan).',
      'Gartner predicted in July 2024 that at least 30% of generative AI projects would be abandoned after proof of concept by the end of 2025, citing poor data quality, inadequate risk controls, escalating costs or unclear business value (Read, Gartner press release; a forecast, not a measurement).',
      'Write the exit criteria before the pilot starts: the outcome measured against a baseline, cost per task at production volume, data quality, the risk controls that must pass, and the business owner who will run it. A pilot that misses them stops. (Inferred.)'
    ],
    sources: [SRC.cafPlan, SRC.gartner] },
  { id: 'as-4', title: 'Stopping projects', levels: ['vp', 'c-level'],
    body: [
      'Federal agencies must safely discontinue high-impact AI that does not meet the minimum practices, and must have a plan to stop using high-impact AI that is not performing at an appropriate level until it is fixed (Read, OMB M-25-21). The rule binds only federal agencies; the habit it sets, a stopping rule agreed before launch, works anywhere.',
      'Stop on the criteria set at the gate, not on the money already spent. Tell the sponsor with the data, move the team to the next item in the queue, and record what was learned so the next pilot starts further ahead. (Inferred.)',
      'Report stopped projects to the steering group with the capacity they released. If nothing is ever stopped, ask whether anything is being measured. (Inferred.)'
    ],
    sources: [SRC.omb] },
  { id: 'as-5', title: 'Measuring value: claimed against measured', levels: ALL,
    body: [
      'In a randomized trial, 16 experienced open-source developers worked 246 tasks. Before starting they forecast AI would make them 24% faster; afterwards they believed it had made them 20% faster; measured, tasks took 19% longer with AI allowed (Read, METR). The authors call it a snapshot of early-2025 tools in one setting and say it may not apply to less experienced developers or unfamiliar code (Read, METR).',
      'The lesson for a leader is about instruments: what people report is a claim. Measure time saved against a baseline or a comparison group, with a time study on a sample, and track an outcome the business already counts (cycle time, cost per case, error rate). (Inferred.)',
      'Licences issued and weekly active users are inputs. Value is the change in an outcome, and hours saved become money only when the business takes them out of a budget or puts them to named work. (Inferred.)'
    ],
    sources: [SRC.metr] },
  { id: 'as-6', title: 'Reporting AI value to the CFO and the board', levels: ['vp', 'c-level'],
    body: [
      'Microsoft’s guidance says leaders should define the business outcomes AI is expected to support and how the organization will measure the value of AI investments (Read, Microsoft Learn, AI Strategy).',
      'A board update shows the portfolio by stage (idea, pilot, production, stopped), measured value next to what was claimed, cost per task, incidents and their fixes, and the decisions the board needs to make. (Inferred.)',
      'Keep capacity and cash apart: hours saved are capacity; savings are what left a budget. Mixing them undermines the CFO’s trust in the next number. (Inferred.)'
    ],
    sources: [SRC.cafStrategy] }
];
const checks = [
  { id: 'AS-01', lesson: 'as-1', levels: ALL,
    stem: 'A request to automate claim denials scores high on value and feasibility. What should the triage group do with it?',
    options: ['Accept it as the top build', 'Send it to risk and governance review before it is ranked for a build', 'Reject it outright', 'Give it to a vendor to build'],
    answer: 1, why: 'Its output decides customers’ access to insurance, so it carries testing, impact assessment and oversight work that the value score does not count.',
    whyNot: { 0: 'The score left out the risk axis.', 2: 'High risk is a reason for review, not automatic rejection.', 3: 'Outsourcing the build does not move the accountability.' } },
  { id: 'AS-02', lesson: 'as-1', levels: ['director', 'vp'],
    stem: 'Two scorers rate the same request 2 and 5 on value. What does that tell you about the rubric?',
    options: ['One scorer is wrong', 'The value scale needs written definitions so scorers apply it the same way', 'Value should be dropped from the rubric', 'Average the two and move on'],
    answer: 1, why: 'A rubric that ranks the same request differently depending on who scores it is not ranking anything.',
    whyNot: { 0: 'Without definitions neither score is checkable.', 2: 'Value is the axis that matters most.', 3: 'Averaging hides the disagreement instead of fixing the scale.' } },
  { id: 'AS-03', lesson: 'as-2', levels: ['vp', 'c-level'],
    stem: 'A bought assistant meets the requirement with light configuration. A team proposes building on a managed platform for more control. Following Microsoft’s guidance, what do you choose?',
    options: ['Build on the platform for control', 'The bought assistant: the least operational responsibility that meets the requirement', 'Run your own infrastructure', 'Run both and decide in a year'],
    answer: 1, why: 'Microsoft says to approve the option that meets requirements with the least operational responsibility; control is worth paying for only when you need it.',
    whyNot: { 0: 'Control the requirement does not need is cost.', 2: 'Microsoft says infrastructure should not be the default.', 3: 'Two tools for one job doubles cost and support.' } },
  { id: 'AS-04', lesson: 'as-2', levels: ['vp', 'c-level'],
    stem: 'Your AI portfolio is 30 assistants that each save individuals a little time, and no process automation. What is missing?',
    options: ['More assistants', 'A few automations that change a business cost or cycle time', 'A larger AI team', 'A new AI policy'],
    answer: 1, why: 'Individual efficiency and business automation are different purposes; a portfolio needs some of each.',
    whyNot: { 0: 'More of the same leaves the gap.', 2: 'Headcount is an input, not the missing purpose.', 3: 'Policy does not add the missing kind of work.' } },
  { id: 'AS-05', lesson: 'as-3', levels: ALL,
    stem: 'When should a pilot’s exit criteria be written?',
    options: ['After the pilot, once results are in', 'Before the pilot starts', 'When the sponsor asks for them', 'At the first steering meeting after launch'],
    answer: 1, why: 'Criteria written after the results tend to fit the results.',
    whyNot: { 0: 'Too late: the criteria will be shaped by what happened.', 2: 'Then they depend on who asks.', 3: 'After launch is after the gate.' } },
  { id: 'AS-06', lesson: 'as-3', levels: ['director', 'vp'],
    stem: 'Which reason did Gartner not list for generative AI projects being abandoned after proof of concept?',
    options: ['Poor data quality', 'Too many users wanting access', 'Escalating costs', 'Unclear business value'],
    answer: 1, why: 'Gartner listed poor data quality, inadequate risk controls, escalating costs and unclear business value.',
    whyNot: { 0: 'Listed.', 2: 'Listed.', 3: 'Listed.' } },
  { id: 'AS-07', lesson: 'as-4', levels: ['vp', 'c-level'],
    stem: 'A pilot has spent $400,000 and misses its accuracy gate by a wide margin. The sponsor asks for three more months. What decides it?',
    options: ['The $400,000 already spent', 'The exit criteria agreed before the pilot and whether a credible fix exists', 'The sponsor’s seniority', 'Whether the team has other work'],
    answer: 1, why: 'Money already spent is gone either way; the decision is whether more time is likely to meet the gate.',
    whyNot: { 0: 'Sunk cost does not change what the next three months will buy.', 2: 'Seniority is not evidence.', 3: 'Idle capacity is not a reason to continue a failing pilot.' } },
  { id: 'AS-08', lesson: 'as-4', levels: ['vp', 'c-level'],
    stem: 'Under OMB M-25-21, what must a federal agency do with high-impact AI that does not meet the minimum practices?',
    options: ['Keep it running and report it next year', 'Safely discontinue use of the AI functionality', 'Move it to a pilot', 'Ask the vendor to certify it'],
    answer: 1, why: 'The memo says the agency must safely discontinue the AI functionality that is not compliant.',
    whyNot: { 0: 'The memo requires stopping, not reporting later.', 2: 'Relabelling it does not make it compliant.', 3: 'A vendor statement is not compliance.' } },
  { id: 'AS-09', lesson: 'as-5', levels: ALL,
    stem: 'In METR’s 2025 trial, what did developers believe after the study, and what was measured?',
    options: ['Believed 24% faster; measured 24% faster', 'Believed 20% faster; measured 19% slower', 'Believed no change; measured 19% slower', 'Believed 19% slower; measured 20% faster'],
    answer: 1, why: 'Afterwards they believed AI had made them 20% faster; tasks took 19% longer with AI allowed.',
    whyNot: { 0: '24% was the forecast before, and the measurement went the other way.', 2: 'They believed they were faster.', 3: 'Reversed.' } },
  { id: 'AS-10', lesson: 'as-5', levels: ALL,
    stem: 'A survey says the assistant saves users 5 hours a week. What is the best next step before you report it?',
    options: ['Report it; users know their own time', 'Measure time saved on a sample with a time study or comparison group', 'Halve it to be safe', 'Report licences issued instead'],
    answer: 1, why: 'A survey is a claim; a time study or comparison group is a measurement.',
    whyNot: { 0: 'The METR result shows people misjudge their own speed.', 2: 'An arbitrary haircut is still not a measurement.', 3: 'Licences are an input, not value.' } },
  { id: 'AS-11', lesson: 'as-6', levels: ['vp', 'c-level'],
    stem: 'The assistant saves 1,300 measured hours a week. The CFO asks how much money that saved. What do you say?',
    options: ['Hours times the loaded rate is the saving', 'Hours are capacity; the cash saving is what left a budget, such as reduced contractor spend', 'Nothing until headcount falls', 'It cannot be measured'],
    answer: 1, why: 'Keep capacity and cash separate, and name where the capacity went.',
    whyNot: { 0: 'Hours times a rate is capacity priced, not money saved.', 2: 'Cash can leave other budgets too.', 3: 'It can; it is a different number from the hours.' } },
  { id: 'AS-12', lesson: 'as-6', levels: ['vp', 'c-level'],
    stem: 'What belongs in a quarterly AI board update?',
    options: ['Every model in use with its accuracy', 'Portfolio by stage, measured value against claimed, cost per task, incidents and the decisions needed', 'The number of employees trained', 'Vendor roadmaps'],
    answer: 1, why: 'The board needs value, cost, risk and the decisions in front of it.',
    whyNot: { 0: 'Too much detail and no decisions.', 2: 'An input measure.', 3: 'Not your plan.' } }
];
const { place } = require('./place.js');
const POS = [3, 0, 2, 1, 0, 3, 2, 1, 1, 2, 3, 0];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
