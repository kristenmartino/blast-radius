# Phase 2b blind check (Nov 24, 2026)

Reviewer: a second model (Claude Sonnet) given the items with no answer key, exported by `tools/export-blind-2b.js` (items, packets and role-play setups; the key written to a separate file it was told not to read). It answered every multiple-choice item and simulation step, recomputed every packet figure with python3, and reviewed the three role-play setups.

## Result (Measured)

| Set | Items | Agreed with key |
|---|---|---|
| AI strategy checks AS-01 to AS-12 | 12 | 12 |
| Economics checks EC-11 to EC-14 (lesson ec-6) | 4 | 4 |
| Rollout sim steps BRN-3-01 to BRN-3-08 | 8 | 8 |
| Intake queue sim steps BRN-4-01 to BRN-4-08 | 8 | 8 |
| Packet figures BR-8 to BR-11 | every figure | all |

Figures it recomputed and matched: EC-11 $3.86 a task; EC-14 600,000 tasks; BRN-3 $403,200, $554,400, $1,428,000 a year and $4,284,000; BR-8 corrected top five R-003, R-020, R-006, R-018, R-010 at 23 of 39 pod-weeks, category totals 200 and 11 high risk; BR-9 $24,840,000 vendor case, $4,305,600 measured capacity, $720,000 licences; BR-10 14,280 hours, $714,000 staff time, $894,000 in all; BR-11 12 tools, $685,000, 4 customer-decision tools (2 untested), 3 without owners, Quarrel Labs notice in 10 days.

## Flags and what was done

1. EC-11: "reviews each output" with 1.5 attempts could mean a review per attempt. Fixed: "reviews the final output once".
2. BRN-3-07: "the same price" was ambiguous. Fixed: "at the list price of $28".
3. BRN-3-07: the thin-training path showed no weekly-use figure. Fixed: a knock-on line for that path (960 people), computed in both math modules.
4. BRN-4-08: 72 open requests looked like 73. Fixed: the option says claims triage left the queue for build.
5. BRN-4-06: the swamped path said nothing could start before week 8 while option B said build now. Fixed: the knock-on says anything accepted now cannot be built this quarter (the value already drops to zero on that path).
6. and 7. BR-8: categories (R-018, R-011) and ties. Fixed: the task says to use the council's process-automation rows, leave out high-risk rows and break ties by fewer pod-weeks; the key explains R-018. The top five is unchanged.
8. BRL-5: no approved transcription option or council date. Fixed: the brief names the company assistant's call transcription and a council meeting in three weeks; a hidden fact says he has not tried it.
9. BRL-4: rubric point 4 had nothing to score. Fixed: hidden fact gives the two-week enterprise contract, who sends the user notice, and legal's review of the pasted emails.
10. BRL-6: no launch date or consultation length. Fixed: launch in six weeks in the brief; consultation takes about four weeks; the persona does not expect a headcount promise.
11. BR-9: pilot selection and time-study sampling unstated. Fixed: pilot users chosen by managers, not volunteers; time-study users drawn at random.
12. BR-10: champions' hours. Fixed: stated as on top of their own group's training (the math already counted them that way).
13. BR-11: "Tested" undefined. Fixed: defined in the packet. The Head of Claims' "pays for itself" stays an unsupported claim on purpose.
14. BR-11: urgency order ambiguous. Fixed: rank by harm, then date; the key gives collections scoring's dates.

Earlier session, same export: BR-8 said the scores were the council's while its key faulted units for scoring their own requests. Fixed before the blind check (units score their own; the governance lead adds risk and proposes the penalty).

Not changed: the correct option is often the longest one, as in Phases 1 and 2a. A pattern a careful reader could use; worth a later pass across the whole app.
