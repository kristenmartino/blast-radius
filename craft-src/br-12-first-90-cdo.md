# First 90 days as Chief Data Officer

You start Monday as the first Chief Data Officer of Ashgrove Outfitters (fictional), an outdoor-gear retailer with 1,900 staff. Your predecessor in the CIO's office left a dataset inventory and an extract of customer records, both incomplete. The CEO wants your plan in two weeks. The company, its datasets and its people are invented; for the real rules on data governance, see the Data leadership lane's links.

## Packet

### Dataset inventory

{{table:b12.inventory}}

Datasets that feed the board pack are meant to refresh at least weekly. The other datasets have no stated refresh cadence.

### Customer extract (15 of the extract's {{b12.cust}} rows)

{{table:b12.customers}}

### The three definitions of "active customer"

- Sales: an open account with an order in the last 24 months (730 days).
- Marketing: an email open, click or site visit in the last 90 days, or a placed order in the last 90 days (refunded or not), on any account (open or closed, test accounts included).
- Finance: a paid order, after refunds, in the last 12 months, excluding internal test accounts.

{{table:b12.counts}}

The 15 rows above are illustrative; the counts table covers the whole extract. Sales’s and Marketing’s definitions do not exclude test accounts.

The current board deck prints Marketing’s count.

### Note from the CEO

> The board deck says "active customers". I have heard three different numbers. Which one is right, and can I trust the rest of the pack? The pack goes to the board in {{b12.packDays}} days.

### Note from the CFO

> The data platform costs {{$b12.invMonth}} a month. I have a budget review in {{b12.budgetDays}} days. Tell me what we can cut and what we cannot.

### Note from the Head of Marketing

> Please don't change how we count active customers. Our campaigns and the email team's targets depend on our definition.

### Task

Hand back four stages.

1. Triage the inventory and the customer counts: what they tell you, what is missing, and the counts that matter (datasets, cost, owners, tests, board-feeding datasets, datasets nobody queried, and the active-customer counts). On the 15 customer rows shown, count how many each definition marks active.
2. Name the three most urgent items, ranked by harm (what the board sees first, then no owner and no tests) and then by date, with the date each one bites.
3. Write a 30/60/90-day plan.
4. Write your first note to the CEO, under 120 words.

Planted: two datasets that feed the board pack with no owner, one of them untested and one {{b12.boardStale}} days stale; three definitions of one board metric; and spend on datasets nobody has queried for 30 days.

## Key

### Counts

- {{b12.invTotal}} datasets costing {{$b12.invMonth}} a month ({{$b12.invYear}} a year); {{b12.board}} feed the board pack.
- {{b12.noOwner}} datasets have no owner; {{b12.boardNoOwner}} of them feed the board pack (Customer master and Supplier costs). {{b12.zeroTests}} datasets have no tests.
- {{b12.unusedN}} datasets had no queries in 30 days and cost {{$b12.unusedMonth}} a month ({{$b12.unusedYear}} a year).
- cust_main_v2 looks like a second copy of Customer master (Inferred from its name and domain); it costs {{$b12.dupMonth}} a month, has no owner and 890 queries, so check who uses it before cutting it.
- Active customers in the extract of {{b12.cust}}: {{b12.sales}} by Sales's definition, {{b12.mkt}} by Marketing's and {{b12.fin}} by Finance's. Sales's count is {{b12.salesOver}}% above Finance's; {{b12.salesTest}} of Sales's active accounts are internal test accounts, and only {{b12.all3}} customers are active by all three definitions.
- On the 15 rows shown: {{b12.shS}} by Sales's definition, {{b12.shM}} by Marketing's, {{b12.shF}} by Finance's.
- Missing: what each definition is for, who approved each, how the board metric is calculated, and what the tests on each dataset check.

### Urgent items

- Board feeds with no owner: Customer master has no owner and no tests, and Supplier costs has no owner, one test and a {{b12.boardStale}}-day-old refresh. The pack goes out in {{b12.packDays}} days.
- Active customers: three definitions and one board number. Finance's definition is the one that excludes test accounts and counts paid orders; the board pack is due in {{b12.packDays}} days.
- Spend: {{b12.unusedN}} datasets unused for 30 days cost {{$b12.unusedMonth}} a month. The CFO's review is in {{b12.budgetDays}} days.

## Model answer

### Stage 1

- {{b12.invTotal}} datasets, {{$b12.invMonth}} a month; {{b12.board}} feed the board pack and {{b12.boardNoOwner}} of those have no owner; {{b12.zeroTests}} have no tests; {{b12.unusedN}} unused for 30 days at {{$b12.unusedMonth}} a month.
- Active customers: {{b12.sales}}, {{b12.mkt}} and {{b12.fin}} across the extract by the three definitions, and {{b12.shS}}, {{b12.shM}} and {{b12.shF}} on the 15 rows shown. Sales's count includes {{b12.salesTest}} test accounts.
- Gaps: what each definition is for, who approved it, how the board metric is built, what the tests check.

### Stage 2

- Ownerless board feeds: name an owner for Customer master and Supplier costs this week, refresh and test Supplier costs, and check both against their source before the pack goes out in {{b12.packDays}} days.
- Active customers: pick one definition for the board with its accountable owner (Finance's, which excludes test accounts), publish it, and rename the others (for example "reachable contacts" for Marketing's). The pack is due in {{b12.packDays}} days.
- Spend: confirm that the {{b12.unusedN}} unused datasets have no dependants, give owners notice with a date, then archive them. That is {{$b12.unusedMonth}} a month for the CFO's review in {{b12.budgetDays}} days.

### Stage 3

- 30 days: owners for every dataset that feeds the board pack; Supplier costs refreshed and tested; one active-customer definition with an owner; board pack numbers reconciled to their sources before release.
- 60 days: owners for the datasets still without one, out of the {{b12.noOwner}} found at the start; tests on every dataset that feeds the board; unused datasets reviewed and the savings confirmed with Finance; a decision on cust_main_v2 once its users are known.
- 90 days: a published metric list with owner and definition for each board metric; a data governance group with a cadence; a short list of data products to fund, scored by confirmed value.

### Stage 4

- "Three things could hurt the board pack this quarter. Two datasets that feed it have no owner, and one of them is {{b12.boardStale}} days stale; I will name owners this week and check both before the pack goes out in {{b12.packDays}} days. The board sees one active-customer number but the company has three definitions, from {{b12.fin}} to {{b12.sales}} in our sample extract; I will propose Finance's, which excludes test accounts, with one owner. Unused datasets cost {{$b12.unusedMonth}} a month and I will bring confirmed savings to the CFO. I would trust the pack once those three are done."

## Grading notes

- A strong hand-back ties the ownerless board feeds to the pack date, finds the stale feed, and shows that the three definitions produce {{b12.fin}}, {{b12.mkt}} and {{b12.sales}} in the extract.
- The counts match the key, the 15-row counts are right, and the unused datasets are separated from the ones the board depends on.
- The CEO note leads with what could hurt the board pack, gives an action and a date for each risk, and stays under 120 words.
