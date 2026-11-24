# Two CRMs after an acquisition

Kestrel Foods (fictional) also inherited Marlowe's CRM. Sales leadership wants one pipeline; Marlowe's reps are worried about losing their history. A claim about cost savings does not survive the arithmetic. Prices and companies are invented.

## Packet

### The two CRMs

| | Kestrel CRM | Marlowe CRM |
|---|---|---|
| Sales seats | 420 | {{b2.aSeats}} |
| Price | {{$b2.pSeat}} a seat a month | {{$b2.aSeat}} a seat a month |
| Accounts | 21,500 | {{b2.aAccounts}} |
| Contract | Renews in 10 months | Renews in 5 months |

### Data team finding

- {{b2.overlap}} accounts exist in both CRMs, often with a different owner in each.
- Marlowe's opportunities carry five years of notes and activity history.

### Note from the VP of Sales Operations

> Consolidating the CRMs will save money. Let's move Marlowe's reps over at their renewal.

### Note from Marlowe's sales director

> My reps will lose every note on their deals. And who owns the accounts we both sell to?

### Task

Hand back four stages.

1. Name the decisions that must be made before any data moves.
2. Work out the overlap as a share of Marlowe's accounts, and the annual licence cost change from moving Marlowe's reps.
3. Outline the cutover, including what happens to opportunity history.
4. Write a short message to Marlowe's sales director.

Planted: a cost-saving claim the prices contradict, and an account-ownership conflict.

## Key

### Arithmetic

- Overlap: {{b2.overlap}} ÷ {{b2.aAccounts}} = {{b2.dupPct}}% of Marlowe's accounts.
- Marlowe today: {{b2.aSeats}} × {{$b2.aSeat}} × 12 = {{$b2.aCost}} a year.
- On Kestrel's CRM: {{b2.aSeats}} × {{$b2.pSeat}} × 12 = {{$b2.addCost}} a year.
- Licence cost rises by {{$b2.delta}} a year. The case for one CRM is one pipeline and one customer record, not licence savings.

### Ownership

{{b2.overlap}} shared accounts need an ownership rule (for example, by territory or by largest open opportunity) agreed by both sales leaders before migration.

## Model answer

### Stage 1

- Account ownership for the {{b2.overlap}} shared accounts, agreed by both sales leaders.
- Which history migrates (open opportunities, closed-won, activity notes) and how far back.
- The cutover date, tied to Marlowe's renewal in 5 months.

### Stage 2

- Overlap {{b2.dupPct}}%.
- Licence cost goes up {{$b2.delta}} a year ({{$b2.aCost}} to {{$b2.addCost}}). The VP's "save money" claim is wrong on licences; the benefit is one pipeline view and no duplicate customer records.

### Stage 3

- Agree ownership rules, then de-duplicate the {{b2.overlap}} accounts.
- Migrate open opportunities with full notes; archive closed history read-only, searchable from the account.
- Pilot with one Marlowe team, then cut over the rest before the renewal date.

### Stage 4

- "Your reps keep their open deals with every note, and closed history stays searchable. We'll agree ownership of the shared accounts with you and Kestrel's sales lead before anything moves."

## Grading notes

- A strong hand-back corrects the cost claim with the numbers and still makes the case for one CRM.
- Ownership is settled before data moves.
- Gap Analysis packet PK-3 (Dynamics 365 Sales to Salesforce) covers the BA-level migration work in detail.
