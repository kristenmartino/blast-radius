# An assistant business case: claimed against measured

You are VP of Enterprise AI at Ostrander Foods (fictional), 6,000 people. A {{b9.pilot}}-person pilot of Wingmate, an AI office assistant (fictional), has ended. The vendor has sent a business case for {{b9.seats}} seats at {{$b9.price}} a user a month, and the CFO wants your view before Friday. Companies, products and prices are invented.

## Packet

### Vendor's business case

> {{b9.seats}} seats × {{b9.surveyH}} hours saved a week × {{b9.weeks}} working weeks × {{$b9.rate}} an hour = {{$b9.vendorCase}} of productivity a year, for {{$b9.licence}} in licences. A return of more than 30 to 1.

### Pilot results

- {{b9.pilot}} licensed, chosen by managers in finance, sales and customer service (not volunteers); {{b9.pilotActive}} used the assistant in a typical week ({{b9.actPct}}%).
- End-of-pilot survey of weekly users: average {{b9.surveyH}} hours saved a week.
- Time study: {{b9.studyN}} weekly users, drawn at random, timed on their usual tasks with and without the assistant for two weeks: {{b9.studyH}} hours saved a week on average.
- {{$b9.rate}} an hour is the company's loaded cost for office staff.

### Note from finance operations

> We will not renew {{$b9.cash}} of temporary staff contracts in accounts payable if the assistant goes company-wide. That is the only budget line anyone has offered to cut.

### Note from the CFO

> Is this a $25 million return or not? I need one number I can defend.

### Task

Hand back four stages.

1. Sort the vendor's case into what was measured, what was claimed and what was assumed.
2. Rebuild the case on measured figures, and separate capacity from cash.
3. Say what would make the measured figure stronger before a full rollout.
4. Write your recommendation to the CFO, under 120 words.

Planted: the vendor counts every seat as a weekly user, uses survey hours instead of the time study, and prices all hours saved as cash.

## Key

### Claims and measurements

- Measured: {{b9.actPct}}% weekly use; {{b9.studyH}} hours a week from the time study of {{b9.studyN}} users.
- Claimed: {{b9.surveyH}} hours a week from the survey.
- Assumed: every seat used weekly; every hour saved worth {{$b9.rate}} in cash.
- The vendor's weekly hours ({{b9.claimHours}}) are {{b9.overstateX}} times the measured estimate ({{b9.measHours}}).

### Rebuilt case

- Expected weekly users: {{b9.seats}} × {{b9.actPct}}% = {{b9.active}}.
- Measured capacity: {{b9.active}} × {{b9.studyH}} hours × {{b9.weeks}} weeks × {{$b9.rate}} = {{$b9.measCase}} a year of staff time, not cash.
- Licences: {{$b9.licence}} a year. Break-even is about {{b9.breakEvenH}} hours a week per weekly user, well below the measured {{b9.studyH}}.
- Cash offered: {{$b9.cash}}, {{$b9.cashGap}} short of the licence cost. The case rests on what the freed time is used for.

## Model answer

### Stage 1

- Measured: {{b9.actPct}}% weekly use and {{b9.studyH}} hours a week (time study, {{b9.studyN}} users).
- Claimed: {{b9.surveyH}} hours (survey).
- Assumed: all {{b9.seats}} seats active, and hours equal cash.

### Stage 2

- {{b9.active}} weekly users × {{b9.studyH}} h × {{b9.weeks}} × {{$b9.rate}} = {{$b9.measCase}} of capacity a year against {{$b9.licence}} of licences.
- Cash: {{$b9.cash}}, {{$b9.cashGap}} short of the licences; the rest is capacity that needs a named use.

### Stage 3

- A comparison group over a quarter, not two weeks.
- Measure an outcome finance already counts (invoices per person, close days).
- Name where freed time goes in each function before licences are bought.

### Stage 4

- "Not $25 million. Measured, the assistant frees about {{$b9.measCase}} of staff time a year for {{$b9.licence}} in licences, and saves {{$b9.cash}} in cash. I recommend licensing the functions where we can name the work the freed time goes to, measuring against a comparison group for a quarter, and expanding on that result. I will bring the first measured quarter in 90 days."

## Grading notes

- A strong hand-back separates measured, claimed and assumed before doing any arithmetic.
- The rebuilt numbers match the key, and capacity is never called savings.
- The recommendation gives the CFO one defensible figure and a next decision date.
