# Phase 4a fact check and blind check (Nov 24, 2026)

Two separate reviewers, both Claude Sonnet, neither shown the drafting conversation.

- **Fact check:** the six risk lessons, RK-01..12 with their keys, and BRN-7..9 with keys and explanations, exported to one file and checked against the cited pages. It opened 10 of 12 source URLs; iso.org and nsf.org failed at the site and were not retried, so those two claims stay Relayed.
- **Blind check:** the unkeyed items and the lesson text, exported by `tools/export-blind-4a.js`. The key was kept in a separate file the reviewer was told not to open.
  - Pass 1 covered every keyed item.
  - Pass 2 re-solved every item whose stem, briefing or an option changed after pass 1.

## Result (Measured: answers scored against the key file)

| Set | Items | Agreed with key |
|---|---|---|
| RK-01..12 | 12 | 12 |
| BRN-7-01..08, BRN-8-01..08, BRN-9-01..08 | 24 | 24 |
| Pass 2: RK-08, BRN-7-02, -03, -05, -06, BRN-9-03, -05, -07 | 8 | 8 |
| Lesson figures (rk-1, rk-3, rk-4, rk-5) | every figure | all matched |

Both reviewers recomputed every figure with Python, including the business days (Oct 15 → Oct 21; Nov 4 → Nov 10) and the 72-hour marks (Saturday 14:00 → Tuesday 14:00; hour 44 → hour 116, Friday 22:10). No mismatch. The fact check found no wrong key and every Read claim correct; flags were wording.

## Flags and what was done

| # | Flag | Action |
|---|---|---|
| 1 | BRN-7: equal output per site was assumed, not stated | Briefing now says each site ships about $300k a day |
| 2 | BRN-7-03 seemed to appear only on one path | Rejected: the step always appears; only its extra line is conditional |
| 3 | BRN-7-06: when awareness starts was not stated | Stem says the confirmation is when Marrowgate becomes aware |
| 4 | BRN-9-07: new-ARR figures not derivable | Stem now gives sales's forecast for each launch plan |
| 5 | BRN-9-05: 80% renewal for a general notice not in the briefing | Added to the briefing; a garbled why-not reworded |
| 6 | BRN-9-05 and -07: options state the same promised figure | Kept on purpose: the figure is what you tell the CEO; what lands differs, and predictability shows it (same design as BRN-6) |
| 7 | RK-08: tier sizes missing from the stem; "close to one analyst’s year" wrong | Tier sizes and hours added; why now says about a fifth of a year |
| 8 | RK-02: insurance "cannot transfer lost trust or downtime" overstated | Now cites NIST: lost trust often cannot be transferred |
| 9 | RK-07: prospective customers qualify only if they know the system | Why reworded |
| 10 | BRN-8-06: contract point attributed to OWASP | Reworded; the contract step is tagged Inferred |
| 11 | BRN-7-03: "most of the fee" overstated; forensic inexperience not in stem | Why-not gives $170k; the stem states it |
| 12 | rk-2: "maps onto" the six Functions | Now "is written as a CSF 2.0 Community Profile" |
| 13 | BRN-9-03: B and D both partial | D now says "Only re-tag" |
| 14 | Gerding statement could move to Read | Kept Relayed: the reviewer opened it, the author did not |

NIST CSF 2.0 (CSWP 29) was opened on Nov 25 after Kristen approved the sources. rk-4 gained one paragraph on GV.SC, tagged Read. No stem, option or key changed, so nothing was re-solved. iso.org (two URLs) and nsf.org still fail at the site, so those claims stay Relayed.
