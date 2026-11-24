// Shared module: Technology economics. Six lessons and fourteen keyed checks (two per lesson; four for ec-6, approved Nov 24).
// Draft until Kristen reviews. ec-6 and EC-11..EC-14 were added in Phase 2b for the AI leadership lane.
// Tiers: Read (opened Nov 23-24, 2026), Relayed (search-result text, page not opened), Inferred (general practice).
// Budgeting mechanics (NPV, IRR, payback) live in Going Concern; this module covers the decisions.
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  finopsRate: ['FinOps Foundation, Rate Optimization capability', 'https://www.finops.org/framework/capabilities/rate-optimization/', 'Read'],
  aws: ['AWS, What are Savings Plans?', 'https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html', 'Read'],
  azure: ['Microsoft Learn, Save compute costs with Azure Reservations', 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations', 'Read'],
  finopsUnit: ['FinOps Foundation, Unit Economics capability', 'https://www.finops.org/framework/capabilities/unit-economics/', 'Relayed (search result text)'],
  claude: ['Claude API pricing (as an example of per-token pricing)', 'https://docs.claude.com/en/docs/about-claude/pricing', 'Relayed (search result text, Nov 24)'],
  finopsCharge: ['FinOps Foundation, Invoicing & Chargeback capability', 'https://www.finops.org/framework/capabilities/invoicing-chargeback/', 'Read'],
  snowflake: ['Snowflake docs, Understanding compute cost', 'https://docs.snowflake.com/en/user-guide/cost-understanding-compute', 'Read'],
  bigquery: ['Google Cloud, BigQuery pricing', 'https://cloud.google.com/bigquery/pricing', 'Read'],
  finopsUnitRead: ['FinOps Foundation, Unit Economics capability', 'https://www.finops.org/framework/capabilities/unit-economics/', 'Read'],
  claudePrompt: ['Claude docs, Prompt engineering overview: when to prompt engineer', 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', 'Relayed (search result text, Nov 24; the page fetch needed approval)']
};
const lessons = [
  { id: 'ec-1', title: 'Total cost of ownership', levels: ['vp', 'c-level'],
    body: [
      'The price on the contract is the smallest part of what a system costs. Total cost of ownership adds implementation, integration, data migration, training, support staff, upgrades, and the cost of leaving at the end. (Inferred: common practice.)',
      'Compare options over the same period, usually three to five years, and count one-time costs in the year they happen. The renewal sim and the ERP cases in this lane do exactly that, with every figure computed in code. (Inferred.)',
      'Exit cost is the one most often missed: data export, contract notice periods and auto-renewals decide how expensive it is to change your mind. (Inferred.)'
    ],
    sources: [] },
  { id: 'ec-2', title: 'Capital and operating spend', levels: ['vp', 'c-level'],
    body: [
      'Capital spend buys an asset that is depreciated over several years; operating spend is expensed in the year it happens. Moving from owned servers and perpetual licences to cloud and subscriptions shifts spend from capital to operating. (Inferred: general accounting practice; Going Concern covers the mechanics.)',
      'CFOs care because the two land in different places: capital hits cash and the balance sheet, operating hits this year’s profit. A budget cut can often be met by deferring capital projects while protecting operating spend, or the reverse. (Inferred.)',
      'When a CFO asks for a percentage cut, ask which line the board is watching before choosing what to cut. (Inferred.)'
    ],
    sources: [] },
  { id: 'ec-3', title: 'Buying cloud: on-demand and commitments', levels: ['director', 'vp', 'c-level'],
    body: [
      'Providers discount committed use. AWS Savings Plans trade a commitment to an amount of compute measured per hour, for one or three years, for lower prices, and AWS says you can save up to 72%; Azure reservations are one- or three-year commitments that Microsoft says can cut costs by up to 72% from pay-as-you-go (Read, AWS and Microsoft).',
      'The FinOps Foundation notes that discounts are higher the more restrictive the mechanism, and suggests a utilization target around 80% for resource-based commitments on steady-state usage (Read, FinOps Foundation).',
      'The working rule: commit to the baseline you are confident of and pay on-demand for the swing. Over-committing turns a discount into paying for capacity nobody uses. (Inferred, consistent with the FinOps targets above.)'
    ],
    sources: [SRC.aws, SRC.azure, SRC.finopsRate] },
  { id: 'ec-4', title: 'Unit cost: spend per unit of work', levels: ['vp', 'c-level'],
    body: [
      'Unit economics divides spend by a unit of business activity, such as cost per order, per active customer or per resolved ticket. The FinOps Foundation frames it in terms of marginal cost and, where possible, marginal revenue (Relayed, search result text from the FinOps Foundation).',
      'A total bill that rises can be good news if cost per unit falls while volume grows. Boards and CFOs read a unit cost trend more easily than a total. (Inferred.)',
      'Showback and chargeback (operating model, lesson 5) use the same allocation data. (Read, FinOps Foundation.)'
    ],
    sources: [SRC.finopsUnit, SRC.finopsCharge] },
  { id: 'ec-5', title: 'Paying for AI: per token, committed, or self-hosted', levels: ['vp', 'c-level'],
    body: [
      'Hosted models are priced per million input and output tokens. Providers discount some patterns: one provider lists a 50% batch discount for requests that can wait, and prices cached input reads at a fraction of the normal input price, with these modifiers stacking (Relayed, Claude API pricing page, search result text, Nov 24).',
      'The order of savings usually runs: stop sending repeated input (caching), send work that can wait through batch, measure cost per unit of work, then commit to a baseline. (Inferred.)',
      'Fine-tuning and self-hosting change the cost shape from per-request to fixed: GPUs and staff cost money before the first request. Compute the break-even volume before switching, and set a trigger to revisit. The inference cost simulation in this lane works one through. (Inferred.)'
    ],
    sources: [SRC.claude] },
  { id: 'ec-6', title: 'Cost per task: tokens, review and failures', levels: ['director', 'vp', 'c-level'],
    body: [
      t('Price an AI task the way the business pays for it: model cost per attempt times attempts, plus the time a person spends checking the output, plus the cost of errors that get through. With {{$ec6.att}} an attempt, {{ec6.tries}} attempts, {{ec6.revMin}} minutes of review at {{$ec6.rate}} an hour and {{ec6.escPct}}% of tasks escaping with a {{$ec6.escCost}} error, a task costs {{$ec6.total}}; review is {{ec6.reviewSharePct}}% of it (Inferred; figures are an invented example computed in this app).'),
      'So the cheapest saving is often in the workflow: better prompts or retrieval that cut review time, or routing only uncertain cases to a person, before any change of model. (Inferred.)',
      'Anthropic’s documentation lists reasons to try prompt engineering before fine-tuning: it uses the base model, which is typically cheaper; it gives results quickly; and it needs little labelled data, where fine-tuning needs task-specific data and incurs significant cost (Relayed, Claude docs, search result text).',
      'Retrieval adds your own documents to each request, so the model can answer from current policy without retraining. Fine-tuning changes the model itself: it can lower the cost per call at high volume, but it has a setup cost and must be redone when the base model changes. Compute the break-even volume before choosing it. (Inferred.)'
    ],
    sources: [SRC.claudePrompt] },
  { id: 'ec-7', title: 'How warehouses and lakehouses bill', levels: ['vp', 'c-level'],
    body: [
      'Snowflake’s documentation says warehouse credits are billed per second with a 60-second minimum, and that each start or resume bills one minute. Its example shows a Small warehouse using 2 credits an hour and a Medium using 4 (Read, Snowflake docs, Understanding compute cost).',
      t('Work it through with an invented credit price of {{$ec7.credPrice}}. A Medium warehouse that wakes {{ec7.wakes}} times a day for {{ec7.runSec}} seconds of work bills {{ec7.billedSec}} seconds a day, {{ec7.credDay}} credits, {{$ec7.monthCost}} over {{ec7.days}} days. Counting only the work seconds gives {{$ec7.noMinCost}}; leaving it running all day gives {{$ec7.allDayCost}} (Inferred; the workload and credit price are made up, computed in this app).'),
      t('BigQuery lists two ways to pay: on demand at $6.25 per TiB scanned with the first TiB each month free, or capacity pricing at $0.04 per slot-hour on the Standard edition, billed per second with a one-minute minimum (Read, Google Cloud, BigQuery pricing). {{ec7.slots}} slots held for {{ec7.hrs}} hours cost {{$ec7.slotMonth}} a month, which equals on-demand pricing at about {{ec7.breakTib}} TiB scanned (ignoring the free TiB).'),
      'Each product bills a different unit: a second of compute, a slot-hour, a byte scanned. Before you approve a platform spend, ask three questions: what unit is billed, what is the minimum charge, and what keeps running when nobody is using it. (Inferred.)'
    ],
    sources: [SRC.snowflake, SRC.bigquery] },
  { id: 'ec-8', title: 'Unit cost of data and chargeback', levels: ['vp', 'c-level'],
    body: [
      'The FinOps Foundation describes unit economics as the link between what an organization spends on technology and the value that spending produces. Units can be per customer, per transaction or per case resolved, or per GB or per token. It advises having Finance validate the assumptions and check that the sources reconcile, and retiring a metric that no longer serves its purpose (Read, FinOps Foundation, Unit Economics).',
      'The same source separates showback from chargeback. Showback shows each group the costs of the scope it owns. Chargeback posts those costs to official accounting budgets, depends on accounting policy, and may not be worth the effort when costs map to one or a few cost centers. Finance and the FinOps team decide together whether shared costs are held centrally or allocated by consumption (Read, FinOps Foundation, Invoicing & Chargeback).',
      t('Example with invented figures. A data platform costs {{$ec8.total}} a month: {{$ec8.dSales}} tagged to Sales, {{$ec8.dMkt}} to Marketing, {{$ec8.dFin}} to Finance and {{$ec8.shared}} shared. Queries split {{ec8.shSales}}% Sales, {{ec8.shMkt}}% Marketing and {{ec8.shFin}}% Finance, so allocating the shared cost by queries gives fully loaded costs of {{$ec8.lSales}}, {{$ec8.lMkt}} and {{$ec8.lFin}}. The platform costs {{$ec8.unit1}} per 1,000 queries (Inferred; computed in this app).'),
      t('Report unit cost next to total cost. In month 6 the platform costs {{$ec8.m6cost}} for {{ec8.m6q}} queries: total spend is up {{ec8.costUpPct}}%, and cost per 1,000 queries is {{$ec8.unit6}}, down {{ec8.unitDownPct}}%. Choose an allocation key the business units can see and influence, and publish the rules before the first bill. (Inferred.)')
    ],
    sources: [SRC.finopsUnitRead, SRC.finopsCharge] }
];
const checks = [
  { id: 'EC-01', lesson: 'ec-1', levels: ['vp', 'c-level'],
    stem: 'Two CRM options have the same annual licence price. What should decide between them?',
    options: ['Whichever vendor is better known', 'Total cost of ownership over the same period, including implementation, integration and exit', 'The licence price, since it is equal', 'Whichever has more features'],
    answer: 1, why: 'Equal licence prices say nothing about implementation, integration, support or exit costs.',
    whyNot: { 0: 'Brand is not cost.', 2: 'Licence price is often the smallest part of the cost.', 3: 'Unused features add cost, not value.' } },
  { id: 'EC-02', lesson: 'ec-1', levels: ['vp', 'c-level'],
    stem: 'Which cost is most often left out of a technology comparison?',
    options: ['The annual licence', 'The cost of leaving: data export, notice periods and auto-renewals', 'The vendor’s discount', 'Sales tax'],
    answer: 1, why: 'Exit cost decides how expensive it is to change your mind, and rarely appears in the first comparison.',
    whyNot: { 0: 'The licence is always counted.', 2: 'Discounts are usually front and centre.', 3: 'A minor line, rarely the deciding one.' } },
  { id: 'EC-03', lesson: 'ec-2', levels: ['vp', 'c-level'],
    stem: 'Moving from owned servers to a cloud subscription mainly shifts spend from where to where?',
    options: ['From operating to capital', 'From capital to operating', 'From IT to finance', 'It does not change the category'],
    answer: 1, why: 'Owned servers are capital assets depreciated over years; subscriptions are operating expense in the year incurred.',
    whyNot: { 0: 'The reverse direction.', 2: 'The budget owner may not change.', 3: 'The accounting category does change.' } },
  { id: 'EC-04', lesson: 'ec-2', levels: ['vp', 'c-level'],
    stem: 'The CFO asks for a 15% IT budget cut. What should you ask first?',
    options: ['Which vendors to drop', 'What the board is watching: this year’s operating cost, capital spend, or a headline total', 'Whether headcount is included', 'When the cut takes effect'],
    answer: 1, why: 'Capital and operating cuts land differently; knowing which line matters opens options such as deferring capital projects.',
    whyNot: { 0: 'Solutions before the goal.', 2: 'Useful later, after the goal is clear.', 3: 'Timing matters, but the goal comes first.' } },
  { id: 'EC-05', lesson: 'ec-3', levels: ['director', 'vp', 'c-level'],
    stem: 'According to AWS, what do you commit to with a Savings Plan?',
    options: ['A number of servers', 'An amount of compute measured per hour, for one or three years', 'A total annual spend with no term', 'A specific region and instance type only'],
    answer: 1, why: 'AWS: a commitment to a specified amount of compute power measured per hour, for a one or three year period.',
    whyNot: { 0: 'Savings Plans are not counted in servers.', 2: 'There is a one- or three-year term.', 3: 'Compute Savings Plans apply across instance families and regions.' } },
  { id: 'EC-06', lesson: 'ec-3', levels: ['vp', 'c-level'],
    stem: 'Usage has a steady baseline and swings about 15% each quarter. How much should you commit?',
    options: ['Peak usage, for the biggest discount', 'The steady baseline, with on-demand for the swing', 'Nothing, to stay flexible', 'Average usage plus 50%'],
    answer: 1, why: 'A commitment you fully use earns the discount every month; the FinOps Foundation suggests around 80% utilization for steady-state commitments.',
    whyNot: { 0: 'Slow quarters leave paid capacity unused.', 2: 'Leaves predictable usage on full price.', 3: 'Over-commits by design.' } },
  { id: 'EC-07', lesson: 'ec-4', levels: ['vp', 'c-level'],
    stem: t('Cloud spend rose {{ec.spendUp}}% this year while orders processed doubled. What is the right headline?'),
    options: ['Cloud spend is out of control', t('Cost per order fell about {{ec.perOrderDropPct}}%'), t('Cloud spend rose {{ec.spendUp}}%'), 'Orders doubled'],
    answer: 1, why: t('Cost per order is 1.4 ÷ 2 = 0.7 of last year’s: about {{ec.perOrderDropPct}}% lower while volume doubled.'),
    whyNot: { 0: 'The unit cost says the opposite.', 2: 'True but misleading without volume.', 3: 'Half the story.' } },
  { id: 'EC-08', lesson: 'ec-4', levels: ['vp', 'c-level'],
    stem: 'Which is a unit cost metric?',
    options: ['Total monthly cloud bill', 'Cost per resolved support ticket', 'Number of servers', 'Discount percentage'],
    answer: 1, why: 'A unit cost divides spend by a unit of business activity.',
    whyNot: { 0: 'A total, not per unit.', 2: 'A count of resources.', 3: 'A rate, not a cost per unit of work.' } },
  { id: 'EC-09', lesson: 'ec-5', levels: ['vp', 'c-level'],
    stem: 'Every request to a hosted model repeats the same 1,800 tokens of instructions. What is the first saving to try?',
    options: ['Switch to a cheaper, untested model', 'Cache the repeated instructions so they are billed at the cached-read price', 'Self-host a model', 'Shorten every answer'],
    answer: 1, why: 'Caching cuts the cost of repeated input without changing answers.',
    whyNot: { 0: 'Quality risk before the free saving.', 2: 'Adds fixed cost before volume justifies it.', 3: 'Changes the answers users get.' } },
  { id: 'EC-10', lesson: 'ec-5', levels: ['vp', 'c-level'],
    stem: t('Self-hosting would cost {{$ec.selfFixed}} a month in GPUs and staff. The hosted model costs about {{$ec.perReq}} a request. Roughly where does self-hosting break even?'),
    options: ['About 870,000 requests a month', t('About {{ec.breakEvenM}} million requests a month'), 'About 87 million requests a month', 'It never breaks even'],
    answer: 1, why: t('{{$ec.selfFixed}} ÷ {{$ec.perReq}} is about {{ec.breakEvenM}} million requests a month, ignoring self-hosting’s own running costs.'),
    whyNot: { 0: 'Off by a factor of ten.', 2: 'Off by a factor of ten.', 3: 'A fixed cost always breaks even at some volume.' } },
  { id: 'EC-11', lesson: 'ec-6', levels: ['director', 'vp', 'c-level'],
    stem: t('A model call costs {{$ec6.att}} and a task takes {{ec6.tries}} attempts on average. A person reviews the final output once, for {{ec6.revMin}} minutes, at {{$ec6.rate}} an hour, and {{ec6.escPct}}% of tasks still go out with an error that costs {{$ec6.escCost}} to fix. What does one task cost?'),
    options: [t('{{$ec6.model}}'), t('{{$ec6.total}}'), t('{{$ec6.noEsc}}'), t('{{$ec6.noReview}}')],
    answer: 1, why: t('{{$ec6.model}} model + {{$ec6.review}} review + {{$ec6.esc}} errors = {{$ec6.total}} a task.'),
    whyNot: { 0: 'Model cost only; the person’s time and the errors are left out.', 2: 'Leaves out the errors that get through.', 3: 'Leaves out the review time, the largest part.' } },
  { id: 'EC-12', lesson: 'ec-6', levels: ['director', 'vp', 'c-level'],
    stem: 'Same task. Which single change cuts the cost per task the most?',
    options: ['Halve the model price', 'Halve the review time', 'Get every task right in one attempt', 'Halve the error rate'],
    answer: 1, why: t('Halving review saves {{$ec6.halfReviewSave}} a task; halving the model price saves {{$ec6.halfModelSave}}, one attempt saves {{$ec6.oneTrySave}}, and halving errors saves {{$ec6.halfEscSave}}.'),
    whyNot: { 0: t('Saves {{$ec6.halfModelSave}} a task.'), 2: t('Saves {{$ec6.oneTrySave}} a task.'), 3: t('Saves {{$ec6.halfEscSave}}: worth doing, but less than review.') } },
  { id: 'EC-13', lesson: 'ec-6', levels: ['director', 'vp', 'c-level'],
    stem: 'An assistant gives out-of-date answers about your returns policy, which changes every quarter. What is the first fix to try?',
    options: ['Fine-tune the model on the policy', 'Retrieve the current policy document into each request', 'Switch to a larger model', 'Add a disclaimer to every answer'],
    answer: 1, why: 'Retrieval answers from the current document; a fine-tune would need redoing every quarter.',
    whyNot: { 0: 'The policy changes quarterly, so the fine-tune goes stale.', 2: 'A larger model still does not know your current policy.', 3: 'Warns about the problem without fixing it.' } },
  { id: 'EC-14', lesson: 'ec-6', levels: ['vp', 'c-level'],
    stem: t('Fine-tuning a smaller model costs {{$ec6.ftSetup}} once and cuts the model cost per task from {{$ec6.model}} to {{$ec6.ftModel}}. Review time does not change. How many tasks before it pays back?'),
    options: ['60,000', t('{{ec6.ftBreakEven}}'), '6,000,000', 'It pays back on the first task'],
    answer: 1, why: t('{{$ec6.ftSetup}} ÷ {{$ec6.ftSaveEach}} saved a task = {{ec6.ftBreakEven}} tasks, and the count restarts if a base-model change forces a new fine-tune.'),
    whyNot: { 0: 'Off by a factor of ten.', 2: 'Off by a factor of ten.', 3: 'The setup cost comes first.' } }
,
  { id: 'EC-15', lesson: 'ec-7', levels: ['vp', 'c-level'],
    stem: t('A Medium warehouse (4 credits an hour) wakes {{ec7.wakes}} times a day for {{ec7.runSec}} seconds of work each time, for {{ec7.days}} days, at {{$ec7.credPrice}} a credit. Billing is per second with a 60-second minimum at each start. What does it cost a month?'),
    options: [t('{{$ec7.noMinCost}}, the work seconds only'), t('{{$ec7.monthCost}}, one minute billed per wake'), t('{{$ec7.allDayCost}}, as if it ran all day'), t('{{$ec7.hourlyCost}}, one full hour billed per wake')],
    answer: 1, why: t('Each wake bills 60 seconds, so {{ec7.wakes}} wakes bill {{ec7.billedSec}} seconds, {{ec7.credDay}} credits a day and {{ec7.credMonth}} credits a month: {{$ec7.monthCost}}.'),
    whyNot: { 0: t('Counts the work seconds and ignores the minute billed at each start; that gives {{$ec7.noMinCost}}.'), 2: t('The always-on cost, {{$ec7.allDayCost}}, assumes it never suspends.'), 3: 'Bills a full hour for every wake; the minimum is one minute.' } },
  { id: 'EC-16', lesson: 'ec-7', levels: ['vp', 'c-level'],
    stem: t('BigQuery on demand costs $6.25 per TiB scanned. {{ec7.slots}} Standard-edition slots at $0.04 a slot-hour run all {{ec7.hrs}} hours of a month. Ignoring the free first TiB, about how many TiB scanned a month make the two cost the same?'),
    options: [t('{{ec7.tenthTib}} TiB, a tenth of the answer'), t('{{ec7.breakTib}} TiB, slot cost divided by the TiB price'), t('{{ec7.wrongTib}} TiB, ten times the answer'), t('{{ec7.slotMonth}} TiB, the slot cost as a scan volume')],
    answer: 1, why: t('{{ec7.slots}} slots × {{ec7.hrs}} hours × $0.04 = {{$ec7.slotMonth}}, and {{$ec7.slotMonth}} ÷ $6.25 = {{ec7.breakTib}} TiB. Below that volume on-demand is cheaper; above it the slots are.'),
    whyNot: { 0: 'Moves the decimal point one place too far left.', 2: 'Moves the decimal point one place too far right.', 3: 'The dollar cost of the slots, read as a number of TiB.' } },
  { id: 'EC-17', lesson: 'ec-8', levels: ['vp', 'c-level'],
    stem: t('A data platform costs {{$ec8.total}} a month: {{$ec8.dSales}} tagged to Sales, {{$ec8.dMkt}} to Marketing, {{$ec8.dFin}} to Finance and {{$ec8.shared}} shared. Queries were Sales {{ec8.qSales}}, Marketing {{ec8.qMkt}} and Finance {{ec8.qFin}}. Allocating the shared cost by queries, what is Marketing’s fully loaded cost?'),
    options: [t('{{$ec8.evenMkt}}, the shared cost split three ways'), t('{{$ec8.lMkt}}, its tagged cost plus {{ec8.shMkt}}% of the shared cost'), t('{{$ec8.dMkt}}, its tagged cost only'), t('{{$ec8.thirds}}, a third of the total')],
    answer: 1, why: t('Marketing ran {{ec8.shMkt}}% of the queries, so it takes {{$ec8.aMkt}} of the shared cost on top of {{$ec8.dMkt}}: {{$ec8.lMkt}}.'),
    whyNot: { 0: 'An even split ignores who used the platform.', 2: 'Leaves the shared cost with nobody, so the three groups would not add up to the bill.', 3: 'Ignores both the tags and the usage.' } },
  { id: 'EC-18', lesson: 'ec-8', levels: ['vp', 'c-level'],
    stem: t('Month 1 cost {{$ec8.total}} for {{ec8.qTot}} queries. Month 6 costs {{$ec8.m6cost}} for {{ec8.m6q}} queries. The CFO notes that spend is up. What do you report?'),
    options: ['Total spend is up, so cost control has failed and the platform needs a spending cap before any new work', t('Cost per 1,000 queries fell from {{$ec8.unit1}} to {{$ec8.unit6}} while total spend rose {{ec8.costUpPct}}%; report both and what drove the volume'), 'Query volume is up, so adoption is working and the total bill is the business units’ concern, not the platform’s', 'Cost per query cannot be reported until every business unit agrees on what counts as a query'],
    answer: 1, why: t('Cost per 1,000 queries fell {{ec8.unitDownPct}}% while volume rose {{ec8.qUpPct}}%. Total cost and unit cost answer different questions, so give the CFO both.'),
    whyNot: { 0: 'A cap on the total would also cap the use that brought the unit cost down.', 2: 'Volume alone says nothing about whether the spend is worth it; the CFO asked about cost.', 3: 'Waiting for agreement delays the number; publish the definition you used and change it if the units object.' } }
];
const { place } = require('./place.js');
const POS = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1, 3, 2, 0, 1, 0, 2, 1, 3];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
