# First 90 days as CIO

You start Monday as CIO of Corbel Distribution (fictional), a 1,500-person distributor. Your predecessor left an application list and a contract list, neither complete. The CEO wants your plan in two weeks. Prices and companies are invented.

## Packet

### Application inventory

{{table:b7.apps}}

### Contract list (days from your first Monday)

{{table:b7.contracts}}

### Note from the CEO

> I don't need a strategy deck in week one. I need to know what could hurt us this quarter and what you'll fix first.

### Note from the VP of Sales

> My team uses Spendly for expenses. Please don't touch it.

### Task

Hand back four stages.

1. Triage the two lists: what they tell you, what is missing, and the totals that matter.
2. Name the three most urgent items, with the date each one bites.
3. Write a 30/60/90-day plan.
4. Write your first note to the CEO, under 120 words.

Planted: an auto-renewal notice date 15 days away on a critical system nobody owns, and two applications doing the same job.

## Key

### Totals

- {{b7.appCount}} applications costing {{$b7.appTotal}} a year; {{b7.inHouse}} are built in house with no contract.
- {{b7.due120Count}} contracts renew within 120 days (day 120 included), worth {{$b7.due120Value}} a year; {{b7.notice60Count}} have a notice deadline within 60 days.
- Missing from the lists: integrations between systems, who supports the in-house applications, and security or support status.

### Urgent items

- Order management (Orderwell, C-08): critical, no business owner, renews in 45 days with 30 days' notice, so notice is due in {{b7.omNoticeDays}} days. Missing it auto-renews for {{b7.omAutoYears}} years, {{$b7.omLock}}.
- Two expense tools: Tripwise ({{$b7.twPerUser}} a user a year) and Spendly. Moving Spendly's 310 users (none of whom use Tripwise) to Tripwise costs {{$b7.spMoveCost}} against Spendly's $21,000: {{$b7.dupSave}} a year saved. Spendly's notice is due in {{b7.spNoticeDays}} days.
- The in-house customer portal (9,000 users, critical) has no contract and no named support team.

## Model answer

### Stage 1

- {{b7.appCount}} applications, {{$b7.appTotal}} a year; {{b7.inHouse}} in house.
- {{b7.due120Count}} renewals within 120 days, {{$b7.due120Value}} a year; {{b7.notice60Count}} notice deadlines within 60 days.
- Gaps: integrations, support for in-house systems, security status. The list is a start, not an inventory.

### Stage 2

- Order management: notice in {{b7.omNoticeDays}} days or a {{b7.omAutoYears}}-year lock-in worth {{$b7.omLock}}; name a business owner this week and send a non-renewal or renegotiation notice.
- Spendly: notice in {{b7.spNoticeDays}} days; decide on consolidation with the VP of Sales before then ({{$b7.dupSave}} a year).
- Customer portal: confirm who supports it and test the recovery plan.

### Stage 3

- 30 days: owners for every critical system, the two notices handled, a full inventory including integrations.
- 60 days: a renewal calendar with notice dates, the expense-tool decision, a support plan for in-house systems.
- 90 days: portfolio review (Tolerate, Invest, Migrate, Eliminate) and the first roadmap, agreed with the business heads.

### Stage 4

- "Three things could hurt us this quarter. Order management has no owner and auto-renews for three years unless we give notice in two weeks; I'll name an owner and send notice this week. We pay for two expense tools; I'll bring a consolidation proposal to Sales within a month. The customer portal has no named support team; I'll confirm coverage and test recovery. A full plan follows at 90 days."

## Grading notes

- A strong hand-back finds the order management notice date first and ties it to the missing owner.
- The totals match the key, and the duplicate expense tools are costed, not just named.
- The CEO note leads with risks and actions, and stays under 120 words.
