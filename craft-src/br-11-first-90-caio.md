# First 90 days as Chief AI Officer

You start Monday as the first Chief AI Officer of Tamsin Mutual Insurance (fictional), a regional insurer with 2,200 staff. Your predecessor in the CIO's office left an AI inventory and a contract list, neither complete. The CEO wants your plan in two weeks. The insurer, vendors and the regulator's letter are invented; for the real law on insurers' use of AI, see the AI governance deck in Inspect & Adapt.

## Packet

### AI inventory

{{table:b11.tools}}

### AI contracts (days from your first Monday)

{{table:b11.contracts}}

### Letter from the state insurance department (fictional)

> Please describe your company's program for governing AI used in underwriting, pricing, claims and collections, including how models are tested and monitored, within {{b11.regDays}} days of this letter.

The letter arrived on your first Monday. "Tested" in the inventory means a documented test of accuracy and of outcomes across customer groups before go-live.

### Note from the CEO

> I want us to use more AI, not less. Tell me what could hurt us first.

### Note from the Head of Claims

> Please don't slow down the fraud score. It pays for itself.

### Task

Hand back four stages.

1. Triage the two lists: what they tell you, what is missing, and the counts that matter.
2. Name the three most urgent items, ranked by harm and then by date, with the date each one bites.
3. Write a 30/60/90-day plan.
4. Write your first note to the CEO, under 120 words.

Planted: an untested tool that declines home insurance applications with no owner, whose vendor may train on your data and whose notice date is 10 days away; and a regulator deadline.

## Key

### Counts

- {{b11.toolCount}} AI tools costing {{$b11.toolCost}} a year in licences; {{b11.inHouse}} built in house.
- {{b11.decisions}} make or shape decisions about customers (fraud flags, pricing, home underwriting, collections); {{b11.decisionsUntested}} of those have no testing on record: home underwriting triage and collections call scoring.
- {{b11.noOwner}} tools have no owner; {{b11.noContract}} vendor tools have no contract (bought on cards).
- Missing: what data each tool uses, how each is monitored, who can switch it off, and whether customers are told.

### Urgent items

- Home underwriting triage (Quarrel Labs, A-03): declines applications, untested, no owner, and the vendor may train on Tamsin's data. Renews in 40 days with 30 days' notice: notice due in {{b11.qaNotice}} days, or another year at {{$b11.qaValue}}.
- Regulator's letter: response due in {{b11.regDays}} days, needing an inventory, test records and monitoring for the {{b11.decisions}} decision tools.
- Collections call scoring: decides who gets a payment plan, untested; it bites every day it runs, and its contract (A-01, Sentra) has a notice date in 120 days.

## Model answer

### Stage 1

- {{b11.toolCount}} tools, {{$b11.toolCost}} a year; {{b11.decisions}} affect customers; {{b11.decisionsUntested}} of those untested; {{b11.noOwner}} without owners; {{b11.noContract}} bought on cards.
- Gaps: data used, monitoring, who can switch each off, customer notice. The list is a start.

### Stage 2

- Home underwriting triage: name an owner this week; give notice or renegotiate the training-on-data term within {{b11.qaNotice}} days; test it for unfair outcomes before it declines more applications, or route its declines to an underwriter meanwhile.
- Regulator: {{b11.regDays}} days; start the inventory and test records now.
- Collections scoring: test it and put a person on final decisions until it passes.

### Stage 3

- 30 days: owners for every tool, the Quarrel Labs notice handled, card-bought tools reviewed, an AI council chartered.
- 60 days: testing and monitoring standards for decision tools; both untested tools tested; a draft of the regulator response.
- 90 days: regulator response sent; acceptable-use policy and intake process live; a short list of new use cases scored for value, feasibility and risk.

### Stage 4

- "Three things could hurt us this quarter. A vendor tool that declines home applications has no owner, has never been tested, and its contract lets the vendor train on our data; notice is due in {{b11.qaNotice}} days, and I will name an owner and act on it this week. The regulator wants our AI governance program in {{b11.regDays}} days. Collections scoring is untested. The fraud score is tested and owned, so it keeps running. More AI follows once we can show it is tested."

## Grading notes

- A strong hand-back finds the Quarrel Labs notice date first and ties it to the missing owner, the missing test and the data term.
- The counts match the key, and the decision tools are separated from productivity tools.
- The CEO note leads with risks and dates, protects what is already tested, and stays under 120 words.
