# Two ERPs after an acquisition

Kestrel Foods (fictional) bought Marlowe Snacks eight months ago. Finance wants one ERP; Marlowe's team wants to keep theirs. A contract date decides more than either side thinks. Prices and companies are invented.

## Packet

### The two systems

| | Kestrel (parent) | Marlowe (acquired) |
|---|---|---|
| ERP | Tier-1 cloud ERP | Mid-market cloud ERP |
| Users | 900 | {{b1.acqUsers}} |
| Annual cost | {{$b1.perUser}} a user a year | {{$b1.acqErp}} a year |
| Contract | Renews in 26 months | Renews in 4 months; auto-renews for 3 years unless cancelled 90 days before |
| Customer EDI links | 31 | 14 |

### Estimates from the program office

- Migrating Marlowe onto Kestrel's ERP: {{$b1.migErp}} one-time, about 12 months.
- If Marlowe is migrated, its current vendor will extend the contract for one year at a {{b1.extPct}}% premium: {{$b1.extCost}}.
- Keeping both: an integration build of {{$b1.integ}} and {{$b1.integRun}} a year to run it.
- Marlowe's 260 users would join Kestrel's ERP from year 2, at Kestrel's per-user price.

### Note from the CFO's office

> One ERP lets us merge the two finance teams. That saves {{$b1.synergy}} a year from year 2. We're confident in that number.

### Task

Hand back four stages.

1. Separate the facts from the estimates and opinions, and find the decision deadline.
2. Work out the three-year cost of migrating (option A: migration, the one-year extension and Marlowe's users on Kestrel's ERP) and of keeping both (option B: Marlowe's ERP for three years plus the integration), and A net of the CFO's saving.
3. Name what would change the answer and what you would test first.
4. Write the two-sentence board line: your recommendation and the decision needed now.

Planted: an auto-renewal notice date one month away, and a confident synergy estimate nobody has tested.

## Key

### Deadline

The Marlowe contract renews in 4 months and must be cancelled 90 days before: the decision is due in {{b1.noticeMonths}} month. Missing it locks Marlowe's ERP in for 3 years.

### Arithmetic

- Option A (migrate): {{$b1.migErp}} + users in years 2 and 3 ({{b1.acqUsers}} × {{$b1.perUser}} × 2 = {{$b1.usersY23}}) + one-year extension {{$b1.extCost}} = {{$b1.optA}}.
- Option B (keep both): {{$b1.acqErp}} × 3 + {{$b1.integ}} + {{$b1.integRun}} × 3 = {{$b1.optB}}.
- A net of the CFO's saving in years 2 and 3 ({{$b1.synergy2}}): {{$b1.optANet}}, still {{$b1.gap}} more than B.
- A breaks even with B only if the saving reaches {{$b1.breakEvenSynergy}} a year.

## Model answer

### Stage 1

- Facts: user counts, contract terms, EDI link counts, current prices.
- Estimates: migration cost and duration, extension premium, integration cost.
- Opinion: the CFO office's {{$b1.synergy}} saving ("confident" is not evidence).
- Deadline: notice is due in {{b1.noticeMonths}} month, or Marlowe's ERP auto-renews for 3 years.

### Stage 2

- A: {{$b1.optA}}. B: {{$b1.optB}}.
- A net of the claimed saving: {{$b1.optANet}}, {{$b1.gap}} more than B over three years.
- A needs {{$b1.breakEvenSynergy}} a year of saving to break even.

### Stage 3

- The saving estimate: test which roles actually merge and when.
- The migration estimate: 14 EDI customer links each need re-testing with the customer.
- The 3-year lock in B: a lower cost today that removes the option to consolidate until year 4.

### Stage 4

- "On today's numbers, keeping both ERPs is {{$b1.gap}} cheaper over three years unless merging finance saves more than {{$b1.breakEvenSynergy}} a year. We need a decision this month on Marlowe's renewal: we recommend negotiating a one-year renewal instead of the automatic three while we validate the saving."

## Grading notes

- A strong hand-back finds the deadline before it does any arithmetic.
- The arithmetic matches the key, and the saving is treated as a claim to test.
- The board line gives a recommendation, the money, and the decision needed now.
