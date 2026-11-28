# Quarterly board security briefing from raw data

You are CISO of Calloway Software (fictional). The board's audit committee meets in two weeks and has asked for a security briefing: where the company stands, which way it is moving, and what you want funded next year. Below are the raw quarterly figures your team keeps and the candidate investments from the risk register. The company, its figures and people are invented.

## Packet

### Quarterly figures (last four quarters)

{{table:b16.quarters}}

"KEV due" counts internet-facing findings on CISA's Known Exploited Vulnerabilities catalog that fell due in the quarter; "fixed in time" counts those fixed within the 14-day target. Detection and containment times are medians from incident reviews. "Admins on phishing-resistant MFA" counts administrator accounts on security keys. Budget and spend are in $k.

### Candidate investments for next year ($k)

{{table:b16.investments}}

"Cuts expected loss" is the reduction in expected annual loss each investment gives on the risk register. Next year's budget for new investment is ${{b16.budget}}k. Each investment is all or nothing.

### Note from the audit committee chair

> Please keep it to one page. And be ready for the question I always get from the full board: are we secure?

### Task

Hand back four stages.

1. Pick five measures for the board and compute each as a rate per quarter with the trend from Q1 to Q4; say which figure you would not show and why.
2. Draft the one-page briefing: where we stand, which way we are moving, the two risks that remain largest, and what changed this quarter.
3. Make the funding ask: the set of investments that cuts expected loss the most within the budget, what it costs and cuts, and which risks stay unfunded for the committee to accept.
4. Answer the chair's question, "Are we secure?", in under 100 words.

Planted: a funding question to check against every combination; a vanity count (phishing emails sent) beside the rate that matters; spend close to plan that hides nothing.

## Key

### Measures (Q1 to Q4)

- Internet-facing KEV fixed in time: {{b16.kev1}}%, {{b16.kev2}}%, {{b16.kev3}}%, {{b16.kev4}}%.
- Administrators on phishing-resistant MFA: {{b16.pr1}}%, {{b16.pr2}}%, {{b16.pr3}}%, {{b16.pr4}}%.
- Critical vendors reviewed in 12 months: {{b16.vend1}}%, {{b16.vend2}}%, {{b16.vend3}}%, {{b16.vend4}}%.
- Median detection time {{b16.mttd1}} to {{b16.mttd4}} hours ({{b16.mttdCut}}% shorter); median containment {{b16.mttc1}} to {{b16.mttc4}} hours ({{b16.mttcCut}}% shorter).
- Phishing-test click rate: {{b16.click1}}%, {{b16.click2}}%, {{b16.click3}}%, {{b16.click4}}%.
- Incidents over the year: {{b16.sev1Y}} severity 1 and {{b16.sev2Y}} severity 2. Spend ${{b16.spentY}}k of ${{b16.planY}}k ({{b16.spentPct}}%).
- Not shown as a measure: the count of phishing emails sent (activity, not outcome).

### Funding ask

- Checking every combination within ${{b16.budget}}k: {{b16.bestIds}}, costing ${{b16.bestCost}}k and cutting expected loss by ${{b16.bestCut}}k, with ${{b16.bestLeft}}k unspent. Funding down the list by cut per dollar gives the same set here ({{b16.greedyIds}}).
- Unfunded: {{b16.unfunded}}, which would cut a further ${{b16.unfundedCut}}k of expected loss, for the committee to accept or fund.

## Model answer

### Stage 1

- KEV fixed in time {{b16.kev1}}% → {{b16.kev4}}%; admins on phishing-resistant MFA {{b16.pr1}}% → {{b16.pr4}}%; critical vendors reviewed {{b16.vend1}}% → {{b16.vend4}}%; detection {{b16.mttd1}} → {{b16.mttd4}} hours and containment {{b16.mttc1}} → {{b16.mttc4}} hours; phishing click rate {{b16.click1}}% → {{b16.click4}}%.
- Left out: emails sent, and alert counts if anyone asks for them.

### Stage 2

- Where we stand: exploited flaws are fixed in time {{b16.kev4}}% of the time and nearly all administrators use security keys; we detect and contain incidents faster than a year ago.
- Moving: every measure improved each quarter; vendor reviews still miss one critical vendor.
- Largest remaining risks: staff accounts without phishing-resistant MFA, and endpoints without detection.
- This quarter: no severity 1 incident; spend {{b16.spentPct}}% of plan for the year.

### Stage 3

- Fund {{b16.bestIds}} for ${{b16.bestCost}}k, cutting expected loss by ${{b16.bestCut}}k. The monitoring replacement, data loss prevention and the vendor analyst stay unfunded; I ask the committee to accept that risk or add budget, and record which.

### Stage 4

- "No company is fully secure; the question is whether our largest risks are shrinking and owned. They are. Flaws that attackers are exploiting are fixed on time {{b16.kev4}}% of the time, up from {{b16.kev1}}%. We detect incidents {{b16.mttdCut}}% faster and contain them {{b16.mttcCut}}% faster than a year ago. The largest remaining gap is staff accounts that a phishing email could still take over; next year's plan closes it, and I will report the same measures every quarter."

## Grading notes

- The five measures are rates with a trend, the vanity count is left out, and the arithmetic matches the key.
- The funding set comes from checking combinations within the budget, with the unfunded risk named for the committee to accept.
- The answer to "Are we secure?" does not claim full security, gives the trend and the largest remaining risk, and stays under 100 words.
