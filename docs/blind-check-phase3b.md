# Phase 3b fact check and blind check (Nov 24, 2026)

Two separate reviewers, both Claude Sonnet, neither shown the drafting conversation.

- **Fact check:** the lessons, the keyed checks with their keys, and BRN-6's source-based claims (exported to one file), checked against the cited pages. It opened all 18 sources.
- **Blind check:** the unkeyed items, the BR-13 and BR-14 packets, and the role-play setups, exported by `tools/export-blind-3b.js`. The key was kept in a separate file the reviewer was told not to open.
  - Pass 1 covered every keyed item.
  - Pass 2 re-solved every item whose stem, key option or governing rule changed.
  - Pass 3 re-solved BRN-6-02 after a last change to the briefing.

## Result (Measured: answers scored against the key file)

| Set | Items | Agreed with key |
|---|---|---|
| TS-01..12, ED-01..12 | 24 | 24 |
| BRN-6-01..08 | 8 | 8 |
| Pass 2: TS-12, ED-01, ED-05, BRN-6-02 | 4 | 4 |
| Pass 3: BRN-6-01, BRN-6-02 | 2 | 2 |
| BR-13 packet figures | every figure | all matched the key |
| BR-14 packet figures | every figure | all matched the key, once the rule wording was fixed (flag 6) |

**BR-13 figures:**
- 16 services costing $62,500 a month; 4 have no owning team.
- 144 deployments and 16 interventions: an 11.11% change fail rate. The Order service's rate is 44.44%.
- 8 P1 incidents totalling 261 minutes; the Order service had 214 of those minutes against a 129.6-minute budget.
- Idle services cost $9,700 a month.
- Pellmar: 70 to 80 of the 140 items fit in 10 weeks.

**BR-14 figures:**
- Groups: 2 retire, 4 replace, 5 strangle, 1 retain.
- Paybacks run from 3.46 to 25 quarters.
- 8 systems are funded for 720 engineer-weeks.
- Rate quoting nets 118 engineer-weeks.

**BRN-6-02:** the reviewer wrote its own simulator from the briefing and scanned every whole percent. It found 27% best at 3,345.6 engineer-weeks; 0%, 10% and 50% give 2,796.3, 3,012.2 and 2,543.7. This matches `math/numbers.js` and `math/numbers.py`.

## Flags and what was done

1. **Printing bug (both reviewers).** The cold-debt rate 0.005% printed as "0.01%", because placeholders round to two decimals.
   - **Build rule:** `fill()` now refuses any non-money placeholder with more than two decimals. Over the whole app it found only this one.
   - **Briefing:** now states the rates per 100 engineer-weeks: 6% hot and 0.5% cold.
2. **BRN-6-02 readings.** The share's base and the order of events in a quarter each had two readings.
   - The briefing and stem now say the share comes from each quarter's remaining capacity, after the loss.
   - The briefing now says debt work pays only debt that existed at the start of the quarter, and new hot debt is counted at the quarter's end.
   - Pass 3 found no reading left that changes the best share.
3. **ED-01:** the stem now names DORA's current five-metric guide (recovery time moved between DORA versions). **ED-05:** the stem now says "defined as lasting only a set period".
4. **Fact check, overstated:**
   - ts-5 P1: Fowler's four activities are now given as he lists them, in no fixed order.
   - ts-5 P2: the integration-point condition now includes the source code, and rollback is "simplest until… then much more effort and risk".
   - BRN-6-03: "fail" is now "take a long time".
5. **Fact check, wording:**
   - ts-1: Fowler's split is now "95/5 rather than 80/20".
   - ts-2: the second consequence of reckless debt is added.
   - ts-3: the "who was asked" sentence moved out of the Read claim and is tagged Inferred.
   - ts-6 and TS-12: Hohpe's third trap now uses his framing, and the "risk of buying" attribution was dropped.
   - ed-3: the platform definition now uses the site's wording.
   - ed-6: the "half the sprints" sentence was replaced by 30 items a sprint needed against six sprints that never reached it.
   - ED-11: the "add engineers" whyNot now gives that arithmetic.
6. **BR-14:**
   - The sequencing rule now says retirements are on the list and Retain is not, and that the year's budget is pooled.
   - The business case now defines the eight-quarter net.
   - Before the fix, the reviewer left retirements off the list and funded a different set (715 engineer-weeks).
7. **BR-13:** the packet now defines idle (no requests in 30 days) and says to check dependants first.
8. **Role-plays:**
   - BRL-9 hidden facts now give the launch event date and the item count for the feature it needs.
   - BRL-10's good outcome now replaces billing "at its existing API".
   - BRL-11 hidden facts now give the idle-service costs and a test for steady usage. The fifth hidden fact moved into the persona, because the engine allows 2 to 4.

## Not changed

- **Giveaway flags** (TS-10, BRN-6-01, -03, -06, -08, ED-02, ED-03, ED-11): the length rule is met. The key is strictly longest in 7 of 32 items (22%), and none is over 1.3× its longest distractor (`tools/length-check.js`). Items quoting the stem's own figure stay, because the arithmetic is the point.
- **Repeats:** ED-11 and BRN-6-04, and ED-02 and BRN-6-01, share figures on purpose, as a recall check after the lesson.
- **BR-14:**
  - Capacity is idealised: the 720 engineer-weeks are pooled, with no per-quarter cap.
  - The budget runs out exactly after the Old EDI gateway, so General ledger, Fuel card reconciliation and HR intranet wait; the skip rule never has a smaller system to fund.
- **BR-13:**
  - The ranking of the three urgent items is a judgment the packet asks for, not a computed figure.
  - Cost per customer cannot be computed from the packet; the key does not ask for it.
- **ts-4:** "about 9.5 days" adds a mean wait to a median lead time; the text says "about".
- **ed-6 P3:** the CACM page text the fact checker received did not show Meyer's name. The source stays Relayed (search text names him).
- **BRN-6-08:** the $2,362.4k best-path figure includes the Aldine first phase ($450k) and the platform team ($39.6k) as well as the Q2 share; the fact checker saw only the Q2 part.

## Untested

The reviewers answered TS-12, ED-01 and ED-05 from recall, so those items rest on the fact check, which opened the pages.
