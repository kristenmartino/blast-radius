# Triage 200 AI requests

You run the AI program at Fernhill Group (fictional), a 4,000-person insurer and distributor. The AI council has collected {{b8.total}} requests and drafted a scoring rubric. Your team has three build pods: {{b8.capacityPw}} pod-weeks a quarter. The council meets Thursday and wants your ranking and rules. Companies and requests are invented.

## Packet

### The council's draft rubric

> Score = 2 × value + feasibility. Value and feasibility are each 1 to 5, scored by the requesting unit. Build the highest scores first.

### The queue by category (all {{b8.total}} requests)

{{table:b8.cats}}

### Twenty requests to score

Value and feasibility are each requesting unit's own scores. Risk was added by the AI governance lead. Pod-weeks are the build team's estimate.

{{table:b8.shown}}

### Note from the AI governance lead

> The rubric needs a risk term. Subtract a penalty (Low 0, Medium 1, High 4), and send every High-risk request to me for review whatever its score.

### Note from the Head of Claims

> R-001 is our top priority. It would clear thousands of small claims a month without an adjuster.

### Note from the VP of Sales

> I asked for the coaching avatar (R-014) in March. Why is Sales always last?

### Task

Hand back four stages.

1. Find what the draft rubric gets wrong, using the twenty rows.
2. Apply the governance lead's corrected rubric to the twenty and name the top five builds among the council's process-automation rows, leaving out high-risk rows and breaking ties by fewer pod-weeks. Give their pod-weeks against one quarter's capacity.
3. Write the rules that route the rest of the {{b8.total}} by category, so the team builds only what needs building.
4. Write the reply to the VP of Sales, under 100 words.

Planted: the draft rubric ranks a request that would deny customers' claims first, two requests are duplicates of others, and a senior sponsor's request scores low.

## Key

### Rubric flaws

- No risk term: under the draft rubric {{b8.draftTopId}} (auto-deny claims) scores {{b8.draftTopScore}}, the highest of the twenty, although it decides customers' claims.
- Scores set by the requesting unit: each unit grades its own request.
- Duplicates (R-007 of R-006, R-017 of R-003) would be scored and built twice.
- {{b8.highShown}} of the twenty are high risk (R-001, R-008, R-016); {{b8.high}} of all {{b8.total}}. R-001 is filed as a build, not as a decision about customers.

### Corrected ranking

- Corrected score (the governance lead's) = 2 × value + feasibility − risk penalty (Low 0, Medium 1, High 4); every high-risk request goes to governance review whatever its score; duplicates merge into the original.
- R-001 falls to {{b8.draftTopFixed}} and goes to review.
- Top five builds: {{b8.topIds}} (scores {{b8.topScores}}; R-003 and R-020 tie at 12, and R-003 needs fewer pod-weeks), {{b8.topPw}} pod-weeks against {{b8.capacityPw}} a quarter. R-018 summarizes recordings but is a build: it feeds the quality-review workflow.

### Routing rules

- Drafting or summarizing ({{b8.self}}): self-service on the existing assistant, with a prompt library and office hours.
- Duplicates ({{b8.dup}}): merge into the original request and tell the requester.
- Buy an AI tool ({{b8.vendor}}): procurement and security with an AI vendor checklist.
- No owner or measurable outcome ({{b8.low}}): return with what is needed to be scored.
- What reaches the build queue: {{b8.afterRoute}} requests ({{b8.build}} automations and {{b8.risk}} decisions about customers or staff, the latter through governance review first).

## Model answer

### Stage 1

- The rubric has no risk term, so {{b8.draftTopId}}, which would deny claims automatically, ranks first at {{b8.draftTopScore}}.
- Units score their own requests; a review group should score against written scales.
- R-007 and R-017 duplicate R-006 and R-003 and would be built twice.

### Stage 2

- Corrected score: 2 × value + feasibility − risk penalty (0, 1, 4); high risk goes to governance review first.
- Top five: {{b8.topIds}}: {{b8.topPw}} pod-weeks, inside one quarter's {{b8.capacityPw}}.
- R-001 ({{b8.draftTopFixed}} after the penalty), R-008 and R-016 go to review before any build.

### Stage 3

- Self-service for {{b8.self}} drafting requests; merge {{b8.dup}} duplicates; {{b8.vendor}} tool purchases to procurement and security; {{b8.low}} without an owner go back with a checklist.
- {{b8.afterRoute}} remain for scoring: {{b8.build}} automations and {{b8.risk}} high-risk decisions for governance review.

### Stage 4

- "R-014 scores 2 for value and 2 for feasibility, so it is below this quarter's line. It would rise with a measured outcome, such as win rate for coached reps against others, and a named owner in Sales. Send those and we will rescore it at the next council. Your meeting-notes tool request (R-005) goes to procurement this week."

## Grading notes

- A strong hand-back catches R-001 first and explains why a risk term or a review route is needed.
- The top five and pod-weeks match the key, and duplicates are merged rather than ranked.
- The routing rules cover every category, and the reply to Sales gives the score and a path to a higher one.
