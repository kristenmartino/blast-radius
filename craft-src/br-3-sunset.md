# Sunsetting a legacy order system

Halvorsen Supply (fictional) still runs a 1990s order-entry system on leased hardware. Almost everything has moved to the new ERP, but three groups still log in. The hardware support contract ends March 31. Prices and companies are invented.

## Packet

### What is left on the old system

| Group | Users | What they do there |
|---|---|---|
| Returns desk | 6 | Look up 2019 to 2022 orders to approve returns |
| Brennan Hardware (customer) | EDI feed | Sends orders through a feed nobody moved |
| Finance | 7 | Look up historical invoices for audits |

### Costs

- Hosting and hardware support: {{$b3.host}} a month.
- Read-only archive with search: {{$b3.archOnce}} one-time, {{$b3.archYear}} a year.

### Note from the controller

> Our records policy is seven years for invoices and orders.

### Note from the external auditor

> Please keep all the data from that system. We may need it.

### Task

Hand back four stages.

1. List every remaining use and the replacement for each.
2. Work out the payback period of the archive and the first-year saving.
3. Set the retention rule and how you will settle the auditor's request.
4. Write the go/no-go criteria for switching the system off.

Planted: a live customer feed hidden in the user list, and a retention request that conflicts with policy.

## Key

### Arithmetic

- Hosting: {{$b3.host}} × 12 = {{$b3.hostYear}} a year.
- Payback: {{$b3.archOnce}} ÷ ({{$b3.host}} − {{$b3.archMonth}} a month) = {{b3.paybackMonths}} months.
- First-year saving: {{$b3.hostYear}} − {{$b3.archOnce}} − {{$b3.archYear}} = {{$b3.firstYearSave}}.

### Hidden dependency

Brennan Hardware's EDI feed is a live order channel, not a lookup. It must move to the ERP and be tested with Brennan before switch-off.

### Retention

Policy says seven years. "Keep everything" needs a written scope from the auditor; the archive holds seven years unless legal or audit names a longer hold in writing.

## Model answer

### Stage 1

- Returns desk: search the archive for 2019 to 2022 orders.
- Brennan Hardware: move the EDI feed to the ERP, tested end to end with Brennan.
- Finance: search the archive for historical invoices.

### Stage 2

- {{b3.paybackMonths}} months to pay back; {{$b3.firstYearSave}} saved in the first year.

### Stage 3

- Keep seven years, per policy, in the archive.
- Ask the auditor to name, in writing, what records and periods they need beyond seven years; route any longer hold through legal.

### Stage 4

- Brennan's orders flowing through the ERP for two full cycles with no errors.
- Archive search signed off by the returns desk and finance.
- Retention scope agreed in writing.
- A final full export stored before switch-off, and a rollback window before the hardware is returned.

## Grading notes

- A strong hand-back finds the EDI feed and treats it as the critical path.
- The arithmetic matches the key.
- The auditor's request is settled in writing, not ignored and not accepted as "everything forever".
