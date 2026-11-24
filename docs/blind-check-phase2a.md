# Phase 2a blind check (Nov 24, 2026)

Reviewer: a second model (Claude Sonnet) given the items with no answer key (`/tmp/blind2/items.md`, `/tmp/blind2/packet.md`, exported from the build). It answered every multiple-choice item, recomputed every number with python3, reviewed the three role-play setups and worked the BR-7 packet.

## Result (Measured)

| Set | Items | Agreed with key |
|---|---|---|
| Economics checks EC-01 to EC-10 | 10 | 10 |
| Inference sim steps BRN-2-01 to BRN-2-06 | 6 | 6 |
| BR-7 totals, windows, notice date, lock-in, consolidation saving | every figure | all |

It also recomputed BRN-2's per-request costs ($0.012, $0.00714, $0.005712), the monthly bills, the commitment amounts and the 9.1 million break-even, and found them correct.

## Flags and what was done

1. BRN-2-05: "two engineers at $30,000" read as $30,000 each. Fixed: "costing $30,000 a month together".
2. BRN-2-03: $0.0457 per ticket shown as $0.05. Fixed: shown to three decimals ($0.046).
3. BRL-1: the good outcome needed the auto-renewal raised but no rubric point scored it, and no capital/operating split was given. Fixed: brief gives the split (from the math module), the hidden fact states the 15-day notice, rubric point 3 scores raising it.
4. BRL-3: pilot clause was in the walkaway but not a hidden fact; no list price; discount ceiling missing from the good outcome. Fixed: fourth hidden fact (Jordan can add the pilot), premium list price in the brief, "up to 18%" in the good outcome.
5. BR-7 used the same company name as BRN-1 with different facts (380 CRM users vs 714 seats), and Tripwise plus Spendly users exceeded headcount. Fixed: BR-7's company is now Corbel Distribution; Tripwise has 1,100 users at $49,500 ($45 a user unchanged); the windows say day 120 is included; "two weeks" changed to "15 days".

Not changed: EC-05 option D (correct as written: Compute Savings Plans are not tied to a region or instance type); EC-10 uses its own $0.006 figure, separate from the sim.
