# Phase 1 blind check (Nov 23, 2026)

Reviewer: a second model (Claude Sonnet) given the items with no answer key (`/tmp/blind/items.md`, `/tmp/blind/packets.md`, exported from the build). It answered every multiple-choice item and recomputed every packet number with python3.

## Result (Measured)

| Set | Items | Agreed with key |
|---|---|---|
| Operating model checks OM-01 to OM-12 | 12 | 12 |
| Renewal sim steps BRN-1-01 to BRN-1-06 | 6 | 6 |
| Packet arithmetic and BR-6 classification (BR-1 to BR-6) | every figure the tasks ask for | all |

The reviewer also confirmed BRN-1's internal figures (564 seats, $951,120 baseline, $12,540 true-up, $867,081.60 consolidated cost, $186,335.84 term saving, $25,200 and $299,880 upsell).

## Flags and what was done

1. BR-1, "incremental" had no stated baseline. Fixed: task 2 now names what each option counts.
2. BR-3, returns desk looked up pre-2019 orders, outside a seven-year policy. Fixed: 2019 to 2022 orders.
3. BR-5, 61% of 1,140 is 695.4. Fixed: key shows the rounding.
4. BRN-1-04, the 5% flex clause was not stated as available. Fixed: stem says terms are open to negotiation.
5. BRN-1-03, the first-year consolidation saving assumed a full year. Fixed: the why says full run rate and notes the partial first calendar year.
6. OM-09, "always required" sounds absolute. Kept: it is the FinOps Foundation's own wording (Read).

Not changed (noted by the reviewer, outside the tasks): BR-1 Kestrel's own renewal falls in month 26; BR-2 gives no cutover cost; BR-4 does not say when extended maintenance must be elected; BR-6 sample is 10 of 140, so savings are not extrapolated (the model answer already says the review extends to all 140).
