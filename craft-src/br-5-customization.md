# CRM customization debt

Halvorsen Supply's (fictional) CRM has been customized by four admins over eight years. Every vendor release breaks automations, and sales ops wants a freeze on all changes. Prices and companies are invented.

## Packet

### Usage scan

| Item | Count | Finding |
|---|---|---|
| Custom fields | {{b5.fields}} | {{b5.deadPct}}% are filled on fewer than 1% of records |
| Custom objects | 86 | 19 have had no new records in two years |
| Automation rules | 214 | {{b5.breaks}} break on each vendor release |

### Release cost

- The vendor ships {{b5.releases}} major releases a year.
- Fixing broken automations takes about {{b5.hoursRelease}} admin hours a release, at {{$b5.rate}} an hour.

### Note from sales ops

> Freeze all changes until the CRM is stable.

### Note from the finance director

> Some of those fields feed our commission reports. Don't touch them.

### Task

Hand back four stages.

1. Diagnose the problem in two or three lines.
2. Work out how many custom fields are near-empty and the annual cost of release breakage.
3. Set the rule for retiring fields and objects safely.
4. Propose the governance that stops the sprawl coming back.

Planted: a blanket freeze proposal, and fields that look unused but feed a finance report.

## Key

### Arithmetic

- Near-empty fields: {{b5.deadPct}}% × {{b5.fields}} = 695.4, about {{b5.deadFields}}.
- Breakage: {{b5.hoursRelease}} hours × {{b5.releases}} releases = {{b5.hoursYear}} hours; × {{$b5.rate}} = {{$b5.costYear}} a year.

### Safe retirement

Low fill rate is not proof of no use: check reports, integrations and automations for each field before removing it. Archive the data, hide the field for one release cycle, then delete.

## Model answer

### Stage 1

- Eight years of unmanaged change: no owner per field, no review, so releases break automations and admins spend time fixing rather than improving.

### Stage 2

- {{b5.deadFields}} near-empty fields.
- {{b5.hoursYear}} hours, {{$b5.costYear}} a year on release breakage, before counting lost sales time.

### Stage 3

- Every field and object gets a business owner who signs off on retirement.
- Check dependencies (reports, integrations, automations), including finance's commission reports.
- Archive, hide for one release, then delete.

### Stage 4

- A design authority reviews new fields and objects against the standard data model.
- Each new customization names an owner and a review date.
- Automations get release testing in a sandbox before each vendor release.
- No blanket freeze: changes keep flowing through the review.

## Grading notes

- A strong hand-back rejects the blanket freeze and replaces it with a review.
- Finance's fields are checked, not assumed safe or untouchable.
- The arithmetic matches the key.
