# Application portfolio review

Halvorsen Supply (fictional) has 140 applications and a CFO asking which ones to cut. You start with a scored sample of ten. Scores are 1 to 5; 3 or above counts as high. Prices and companies are invented.

## Packet

### Scored sample

| Application | Business value | Technical fit | Annual cost | Note |
|---|---|---|---|---|
| Order hub | 5 | 4 | $420,000 | Core order flow |
| Field service app | 4 | 2 | $185,000 | Unsupported framework |
| Old intranet | 1 | 2 | $64,000 | Replaced by new intranet |
| Expense tool | 2 | 4 | $38,000 | Works; few users |
| Payroll bridge | 2 | 1 | $51,000 | Sends payroll data to the state for tax filing |
| Quote builder A | 3 | 3 | $72,000 | Used by sales |
| Quote builder B | 2 | 2 | $69,000 | Same job as A, one region |
| Data warehouse | 5 | 3 | $310,000 | Board reporting |
| Shipping labels | 4 | 1 | $47,000 | Runs on an end-of-life server |
| Survey tool | 1 | 4 | $12,000 | Rarely used |

### TIME rule (functional fit = business value)

- Invest: high value, high fit. Migrate: high value, low fit. Tolerate: low value, high fit. Eliminate: low value, low fit.

### Note from the CFO

> Cut everything in Eliminate this quarter.

### Task

Hand back four stages.

1. Classify the ten applications with the TIME rule.
2. Total the annual cost in each quadrant.
3. Pick the first three retirements and their order, and say which Eliminate app cannot simply be switched off.
4. Write the board line for the portfolio program.

Planted: an Eliminate app with a regulatory dependency, and a duplicate pair.

## Key

### Classification

- Invest: Order hub, Quote builder A, Data warehouse.
- Migrate: Field service app, Shipping labels.
- Tolerate: Expense tool, Survey tool.
- Eliminate: Old intranet, Payroll bridge, Quote builder B.

### Arithmetic

- Invest {{$b6.byQuad.Invest}}; Migrate {{$b6.byQuad.Migrate}}; Tolerate {{$b6.byQuad.Tolerate}}; Eliminate {{$b6.byQuad.Eliminate}}; total {{$b6.total}}.

### Traps

- Payroll bridge scores Eliminate but sends tax data to the state: it needs a replacement path before it goes.
- Quote builder B duplicates A: consolidate B's region onto A.

## Model answer

### Stage 1

- Invest: Order hub, Quote builder A, Data warehouse. Migrate: Field service app, Shipping labels. Tolerate: Expense tool, Survey tool. Eliminate: Old intranet, Payroll bridge, Quote builder B.

### Stage 2

- Invest {{$b6.byQuad.Invest}}, Migrate {{$b6.byQuad.Migrate}}, Tolerate {{$b6.byQuad.Tolerate}}, Eliminate {{$b6.byQuad.Eliminate}}; total {{$b6.total}}.

### Stage 3

- First: Old intranet (already replaced). Second: Quote builder B (move the region to A). Third: Payroll bridge, only after its tax filing moves to the payroll provider or the ERP.
- Payroll bridge cannot simply be switched off: it carries a regulatory filing.

### Stage 4

- "The ten-app sample puts {{$b6.byQuad.Eliminate}} of {{$b6.total}} a year in Eliminate. We will retire the intranet and the duplicate quote builder first, move payroll tax filing before retiring its bridge, and extend the review to all 140 applications over the next two quarters."

## Grading notes

- The classification matches the key on all ten.
- The payroll bridge is caught as a regulatory dependency; the CFO's "cut everything this quarter" is answered with a sequence.
- The duplicate quote builders are consolidated, not both kept.
