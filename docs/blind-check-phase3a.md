# Phase 3a blind check (Nov 24, 2026)

Reviewer: a second model (Claude Sonnet) given the items with no key, exported by `tools/export-blind-3a.js` (items, the BR-12 packet, role-play setups; the key in a separate file it was told not to read). Pass 1 covered every keyed item and BRN-5 step; pass 2 re-solved every item whose stem or key changed.

## Result (Measured)

| Set | Items | Agreed with key |
|---|---|---|
| DST-01..12, DPV-01..12, EC-15..18 | 28 | 27 on pass 1; DPV-02 was a real key error (fixed); all agree after the fix |
| BRN-5-01..08 | 8 | 8 |
| Pass 2, changed items (DPV-02, DPV-04, DST-04, DST-05, DST-10, EC-15, BRN-5-01..05) | 11 | 11 |
| BR-12 packet figures | every figure | all (24 datasets, $41,850 a month, 6 board feeds, 7 without owner, 9 without tests, 5 unused at $8,650 a month; 15-row counts 11, 10, 7) |

## Flags and what was done

1. DPV-02: the key pointed at the platform-administrator option (answer index and whyNot written for a different order). Fixed in the source.
2. EC-15: said nothing about suspending after each job. Stem now says it does.
3. DST-10, BRN-5-01: 5-day weeks and 260 working days were unstated. Both stems state them (`dp.workDays`, in both math modules).
4. DST-04: "most likely result" now "in its first year, across the company". DST-05: stem asks who decides the Certified endorsement; option C reworded. DPV-04: option C replaced (cost per API call could pass as a unit metric).
5. BRN-5-02: stem says next year's usage matches last year's. The scan found 52 cheapest ($581.8k); the cost curve is flat from 47 to 61, so the margin over the average is small (kept; the key's saving is computed in both implementations).
6. BRN-5 value tracker: the briefing now says confirmed savings are added to the $120k start (120 + 162.2 + 72 + 95 = 449.2).
7. BRN-5-04: lead-in now depends on the Q1 flag. BRN-5-05: the contested line fits every Q3 option that sets it.
8. BR-12: the packet now says which refresh cadence applies, that Marketing counts any account and any placed order, which definition the deck prints, that the 15 rows are illustrative, a harm rule for ranking, and that cust_main_v2 being a copy is Inferred.

## Not changed

- DST-04 is a judgment call, not a derivation, and BRN-5-03 treats Finance's definition as the answer (the stem says the board sees one number). Kept.
- Items resting on OMB M-19-23, Fowler, the Fabric roadmap, FinOps and dbt were answered from recall by the reviewer; their tags stay as set by the fact check (Read where opened, Relayed for SR 26-2).
- BRN-5 repeats DST/DPV questions with near-identical options on purpose (a recall check after the lesson).
- The packet gives no start date, so "the date each one bites" is day 21 or day 60; no lineage shows what feeds the active-customer count.
- Role-plays: both briefs consistent with their hidden facts; BRL-7 names no review date and BRL-8's walk-away says "settled" where the good outcome says "handled". Not changed.
