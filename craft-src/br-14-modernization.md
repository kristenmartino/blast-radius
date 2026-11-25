# Modernization plan from a messy system inventory

You are CTO of Corrin Freight Systems (fictional), a trucking and logistics company. The board has approved {{b14.budgetQ}} engineer-weeks a quarter for modernization for the next {{b14.quarters}} quarters. The CEO wants a plan that says what to retire, replace, strangle and leave alone, in what order, and why. The company and its systems are invented.

## Packet

### Application inventory

{{table:b14.systems}}

"Interest" is the owning team's estimate of engineer-weeks lost each quarter to the system's condition (workarounds, slow builds, incidents). "Effort" is the estimate to modernize it in the way the rule below gives. "Sets us apart" means the way the company runs this function is part of why customers choose it. "Seam" means requests to the system can be intercepted at an API or message boundary.

### Classification rule (apply in this order)

1. Retire: no changes last quarter and Low criticality.
2. Replace with a market product: does not set us apart and a market product exists.
3. Strangle (replace in parts behind a façade): sets us apart and has a seam.
4. Retain: everything else. Leave it as it is and clean up only where you are already changing it.

### Sequencing rule

Every system the rule does not mark Retain goes on the list, retirements included. Payback in quarters is effort ÷ interest. Fund systems in order of payback, shortest first. The year's budget of {{b14.budget}} engineer-weeks is pooled across the {{b14.quarters}} quarters. Skip any system that no longer fits what is left and carry on down the list.

### Note from the CEO

> Dispatch is what customers pay us for. I want it done first, whatever else waits.

### Note from the CFO

> The general ledger is ancient. Replacing it should be the headline.

### Task

Hand back four stages.

1. Classify all {{b14.n}} systems by the rule and list each group.
2. Sequence the year: payback for each system to modernize, the order, which ones are funded inside the budget and which wait.
3. Write the business case for the first funded system: effort, interest removed, payback and the net engineer-weeks over the eight quarters after it is done: interest removed over those quarters minus the effort.
4. Write a decision memo to the CEO, under 150 words, that answers his note and the CFO's.

Planted: two systems the CEO and CFO care about that the rule does not put first, two retirements whose savings the table does not show, and a system that sets the company apart but has no seam.

## Key

### Classification

- Retire: {{b14.retire}}.
- Replace: {{b14.replace}}.
- Strangle: {{b14.strangle}}.
- Retain: {{b14.retain}}.

### Plan

- Order by payback: {{b14.order}}.
- Funded within {{b14.budget}} engineer-weeks: {{b14.funded}} ({{b14.used}} engineer-weeks).
- Waiting: {{b14.skipped}}.
- The funded systems remove {{b14.interestCut}} of the {{b14.interestAll}} engineer-weeks of interest a quarter once done.
- Dispatch and routing pays back in {{b14.dispatchPb}} quarters, second after Rate quoting ({{b14.topPb}}). The general ledger pays back in {{b14.glPb}} quarters and waits.

## Model answer

### Stage 1

- Retire ({{b14.nRetire}}): {{b14.retire}}.
- Replace ({{b14.nReplace}}): {{b14.replace}}.
- Strangle ({{b14.nStrangle}}): {{b14.strangle}}.
- Retain ({{b14.nRetain}}): {{b14.retain}}; it sets the company apart but has no seam, so leave it and clean up as you change it.

### Stage 2

- Paybacks (quarters): Rate quoting {{b14.pb_A03}}, Dispatch and routing {{b14.pb_A01}}, Claims and damage {{b14.pb_A09}}, Customer portal {{b14.pb_A02}}, Payroll {{b14.pb_A05}}, Driver mobile app {{b14.pb_A06}}, Document scanning {{b14.pb_A08}}, Old EDI gateway {{b14.pb_A10}}, General ledger {{b14.pb_A04}}, Fuel card reconciliation {{b14.pb_A07}}, HR intranet {{b14.pb_A12}}.
- Funded: {{b14.funded}}, {{b14.used}} engineer-weeks.
- Waiting: {{b14.skipped}}. The two retirements have small interest but may save running costs the table does not show; check those costs before next year.

### Stage 3

- {{b14.topName}}: {{b14.topEffort}} engineer-weeks to strangle, removing {{b14.topInterest}} engineer-weeks of interest a quarter. Payback {{b14.topPb}} quarters. Over the eight quarters after it is done it returns {{b14.topNet8}} engineer-weeks net (8 × {{b14.topInterest}} − {{b14.topEffort}}).
- Risks: the façade must not become a single point of failure, and quote data must reconcile between old and new before cutover.

### Stage 4

- "Dispatch is in the first year's plan and starts this quarter alongside Rate quoting, which pays back faster ({{b14.topPb}} quarters against {{b14.dispatchPb}}) and is smaller. Both are strangled in parts behind a façade, so dispatch keeps running while it is replaced. The general ledger pays back in {{b14.glPb}} quarters and waits for next year; replacing it now would push out three faster paybacks. The year's plan funds {{b14.nFunded}} systems for {{b14.used}} engineer-weeks and removes {{b14.interestCut}} of the {{b14.interestAll}} engineer-weeks a quarter the teams lose today. Yard management stays as it is. I will report progress quarterly against these paybacks."

## Grading notes

- A strong hand-back applies the rule in order (so Fuel card reconciliation and the Old EDI gateway are retirements, not replacements), computes every payback and funds exactly {{b14.funded}}.
- The business case uses the packet's effort and interest and states the payback and the two-year net correctly.
- The memo answers both notes with numbers, keeps dispatch in the first year without overriding the rule, and stays under 150 words.
