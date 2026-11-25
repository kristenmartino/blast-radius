# First 90 days as CTO

You start Monday as CTO of Halyard Software (fictional), a business-software company with 340 staff and 64 engineers. Your predecessor left a service inventory, last quarter's P1 incident log and the sprint figures for a promised launch. The CEO wants your plan in two weeks. The company, its services, customers and people are invented.

## Packet

### Service inventory (last quarter; days from your first Monday)

{{table:b13.services}}

Treat a service with no requests in the last 30 days as idle; check whether anything still depends on it before switching it off. "Needed intervention" counts deployments that needed an immediate fix or rollback. "Runtime support ends" is the vendor's notice for the language runtime the service runs on; a dash means it is supported.

### P1 incidents last quarter

{{table:b13.incidents}}

Customer-facing services carry an availability objective of {{b13.slo}}% over the quarter ({{b13.quarterDays}} days).

### Sprint throughput

The teams working on the Pellmar launch finished {{b13.sprintsText}} items in the last six two-week sprints. The Pellmar backlog is {{b13.items}} items.

### Note from the CEO

> We promised Pellmar, our biggest prospect, three new features in {{b13.pWeeks}} weeks. Can we make it? And I keep hearing about outages.

### Note from the CFO

> The cloud bill is {{$b13.costMonth}} a month and rising. What can we stop paying for?

### Note from a principal engineer

> The order service is beyond saving. Give the Orders team nine months with no feature work and we will rewrite it properly.

### Task

Hand back four stages.

1. Triage the inventory, the incident log and the sprint figures: what they tell you, what is missing, and the counts that matter (services, owners, deployments and the change fail rate, incidents by service, the error budget, runtimes losing support, idle services and their cost, and what the Pellmar team can finish in {{b13.pWeeks}} weeks).
2. Name the three most urgent items, ranked by harm to customers first and then by date, with the date each one bites.
3. Write a 30/60/90-day plan.
4. Write your first note to the CEO, under 120 words.

Planted: a customer-facing payments service with no owning team whose runtime loses support in {{b13.payEos}} days; one service behind most of the P1 downtime; idle services still billed; and a launch date the throughput does not support.

## Key

### Counts

- {{b13.svc}} services costing {{$b13.costMonth}} a month; {{b13.noTeam}} have no owning team, {{b13.custNoTeam}} of them customer-facing (Payments gateway and Old mobile API v1).
- {{b13.deploys}} deployments last quarter, {{b13.fails}} needing intervention: a change fail rate of {{b13.cfr}}%. The Order service deployed {{b13.ordDeploys}} times with {{b13.ordFails}} failures ({{b13.ordCfr}}%).
- {{b13.p1}} P1 incidents, {{b13.p1Min}} minutes of downtime; the Order service had {{b13.ordP1}} of them ({{b13.ordShare}}%) and {{b13.ordMin}} minutes ({{b13.ordMinShare}}%). A {{b13.slo}}% objective over {{b13.quarterDays}} days allows {{b13.budget}} minutes, so the Order service used {{b13.ordOverPct}}% of its quarterly budget. {{b13.rollbacks}} incidents were bad deployments rolled back by hand and {{b13.pool}} were the same connection-pool failure during promotions.
- Payments gateway: no team, customer-facing, runtime support ends in {{b13.payEos}} days, and its certificate expired last quarter. Identity and login loses runtime support in {{b13.idEos}} days.
- {{b13.idleN}} services had no requests in 30 days and cost {{$b13.idleMonth}} a month ({{$b13.idleYear}} a year): Legacy admin portal, Recommendations (pilot) and Old mobile API v1. The pilot has an owning team; ask the Data team before switching it off.
- Pellmar: a mean of {{b13.tpMean}} items a sprint and a slowest of {{b13.tpMin}}. In {{b13.pWeeks}} weeks (five sprints) the team finishes about {{b13.fitMean}} at the mean and {{b13.fitMin}} at the slowest rate; all {{b13.items}} take about {{b13.weeksMean}} weeks at the mean.
- Missing: lead time for most services is only a median, there is no recovery time, no on-call or postmortem record, no cost by team, and nothing says which Pellmar items are must-haves.

### Urgent items

- Payments gateway: no owner and a runtime losing support in {{b13.payEos}} days, on a service that takes customers' money.
- Order service: {{b13.ordMin}} minutes of P1 downtime against a {{b13.budget}}-minute quarterly budget, two repeated causes and a {{b13.ordCfr}}% change fail rate.
- Pellmar: the promised {{b13.pWeeks}}-week date fits about {{b13.fitMin}} to {{b13.fitMean}} of the {{b13.items}} items; the CEO needs a scope he can promise.

## Model answer

### Stage 1

- {{b13.svc}} services, {{$b13.costMonth}} a month; {{b13.noTeam}} without an owning team ({{b13.custNoTeam}} customer-facing).
- {{b13.deploys}} deployments, {{b13.fails}} needing intervention ({{b13.cfr}}%); Order service {{b13.ordCfr}}%.
- {{b13.p1}} P1s and {{b13.p1Min}} minutes; Order service {{b13.ordP1}} and {{b13.ordMin}} minutes, {{b13.ordOverPct}}% of a {{b13.budget}}-minute budget.
- Runtime support ends in {{b13.payEos}} days (Payments gateway) and {{b13.idEos}} days (Identity and login).
- {{b13.idleN}} idle services at {{$b13.idleMonth}} a month.
- Pellmar: about {{b13.fitMin}} to {{b13.fitMean}} of {{b13.items}} items fit in {{b13.pWeeks}} weeks.
- Gaps: recovery times, on-call and postmortems, cost by team, the must-have list for Pellmar.

### Stage 2

- Payments gateway: name an owning team this week, renew certificates on a schedule, and plan the runtime upgrade to finish before day {{b13.payEos}}.
- Order service: apply an error-budget rule (only P0 and security changes while it is over budget), fix the connection-pool limit and add automated rollback, with postmortems on the repeated causes.
- Pellmar: agree with the CEO and the customer the must-have items that fit at the slowest rate (about {{b13.fitMin}}), commit to those for the date, and forecast the rest from throughput.

### Stage 3

- 30 days: owners for every service; the payments runtime upgrade under way; an error-budget policy agreed with product leaders; Pellmar scope agreed; idle services confirmed unused and switched off.
- 60 days: delivery metrics per service reported monthly; the order service's two repeated failures fixed; the rewrite proposal answered with a strangler-fig plan that starts with the worst part behind a seam; cost by team shown to the CFO.
- 90 days: Payments gateway on a supported runtime; a share of capacity held for debt in the order service; decision records for significant changes; a quarterly engineering report to the board with trends, incidents and promised against delivered.

### Stage 4

- "Three things first. Payments has no owning team and its runtime loses support in {{b13.payEos}} days; I am naming an owner this week and the upgrade starts now. The Order service caused {{b13.ordMin}} of last quarter's {{b13.p1Min}} outage minutes; we will freeze risky changes there while it is over budget and fix the two repeated causes. For Pellmar, about {{b13.fitMin}} of the {{b13.items}} items fit in {{b13.pWeeks}} weeks; I propose we agree the must-haves with them this week and give a date for the rest. Idle services cost {{$b13.idleMonth}} a month and will be switched off once confirmed."

## Grading notes

- A strong hand-back finds the ownerless payments service and its {{b13.payEos}}-day runtime deadline, ties the Order service to most of the downtime and its budget, and gives the Pellmar scope from throughput.
- The counts match the key, including the change fail rate and the idle cost, and the plan answers the rewrite proposal without a feature freeze.
- The CEO note leads with customer risk, gives an action and a date for each item, and stays under 120 words.
