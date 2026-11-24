// Shared module: Technology economics. Five lessons and ten keyed checks (two per lesson). Draft until Kristen reviews.
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
  finopsCharge: ['FinOps Foundation, Invoicing & Chargeback capability', 'https://www.finops.org/framework/capabilities/invoicing-chargeback/', 'Read']
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
    sources: [SRC.claude] }
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
    whyNot: { 0: 'Off by a factor of ten.', 2: 'Off by a factor of ten.', 3: 'A fixed cost always breaks even at some volume.' } }
];
const { place } = require('./place.js');
const POS = [2, 0, 3, 1, 1, 3, 0, 2, 3, 1];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
