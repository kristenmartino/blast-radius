# Phase 4b blind check and fact check (Nov 25, 2026)

## Blind check (Claude Sonnet, no key; Measured: answers scored against the key file)

Exported by `tools/export-blind-4b.js`: SP-01..12 without the key, the six lessons, the BR-15 and BR-16 packets and the three role-play setups. The reviewer recounted every packet figure from the tables before reading the key.

| Set | Items | Agreed with key |
|---|---|---|
| SP-01..12 | 12 | 12 |
| Lesson figures (sp-1, sp-3..sp-6) | every figure | all matched |
| BR-15 and BR-16 figures | every figure | all matched but one (below) |
| Role-play figures | every figure | matched; one wording flag |

The reviewer's own check of all 63 combinations found I-1, I-2 and I-3 the unique best set within the BR-16 budget ($950k, cutting $1,350k).

## Flags and what was done

| # | Flag | Action |
|---|---|---|
| 1 | BR-15: "4 KEV findings past 14 days" only holds if the target covers every KEV finding; the packet said internet-facing only | Packet now says the target covers every KEV finding, internet-facing ones first |
| 2 | BR-15 stage 2: the public storage bucket (F-16) is as usable by an attacker as the keyed items | Key and checklist now credit it |
| 3 | BR-15 stage 2: F-03 is KEV and internet-facing but owned and inside the target | Key says listing it is fine but not required |
| 4 | BRL-12: "flat budget" contradicted removing the $240k tool | Hidden fact now says he accepts a cut of about $240k in place of 15% |
| 5 | sp-3 and sp-5 use different admin counts for invented examples | sp-3 now says it is a different company |
| 6 | sp-6: "A and C: 900 for 550" read as spend | Reworded as cut and cost |
| 7 | sp-6: B's ratio 1.125 printing as 1.13 | Kept: both math modules round half up to 1.13 (Measured) |

No stem, option or key changed, so nothing was re-solved.

## Fact check (Claude Sonnet, keys shown)

Opened 5 of 7 sources: NIST CSF 2.0, the SEC page, NIST SP 800-55 v1, the CISA KEV page and the CISA MFA page. NIST SP 800-207 (approval unanswered) and the CISA phishing-resistant MFA fact sheet (fetch failed) could not be checked. No wrong key, no defensible distractor, no arithmetic mismatch; all 15 budget subsets recomputed.

| # | Flag | Action |
|---|---|---|
| 1 | Item 106 drops "material" | Now "material cybersecurity risks" |
| 2 | SP-03 why-not: GV.RR-02 is about roles, not employees | Reworded |
| 3 | sp-5: "most secure form of MFA", SS7, SIM swap, push bombing and administrators-first rest on the fact sheet | Kept as Relayed: that wording is in the fact sheet's search-result text; the page is still unopened |
| 4 | GV.RR-02 full phrasing and GV.RR-01's culture clause not in the reviewer's summary | Kept: the author's own fetch of CSF 2.0 (Read) shows both |
| 5 | Admin MFA examples differ across sp-3, sp-5 and BR-16 | sp-3 now names a different company; BR-15's 74 of 120 is BR-16's Q2 row, the same company |
| 6 | SP 800-207 unchecked | Stays Relayed |

Confirmed on the page by the reviewer, still tagged Relayed because the author did not open them: SP 800-55 v1 (date, supersession, purpose), the CISA KEV recommendation, FIDO/WebAuthn as the only widely available phishing-resistant method, number matching.

## Sources

- Read (opened Nov 25): NIST CSF 2.0 (Profiles, Tiers, Govern categories, GV.RR-01..04). SEC Corporation Finance page (Item 106) was read for Phase 4a.
- Relayed (search-result text; the pages needed approval and were not opened): CISA KEV, NIST SP 800-207, CISA phishing-resistant MFA fact sheet and MFA page, NIST SP 800-55 Vol. 1.
