# First 90 days as CISO

You start Monday as CISO of Calloway Software (fictional), a business-software company with {{b15.staff}} staff. Your predecessor left an export of open security findings, the security tool list, an account count for administrators and the vendor review log. The CEO wants your plan in two weeks. The company, its systems, vendors and people are invented.

## Packet

### Open security findings (days open; exception days to expiry, negative = expired that many days ago)

{{table:b15.findings}}

"KEV" marks a finding on CISA's Known Exploited Vulnerabilities catalog. The company's target is to fix internet-facing KEV findings within {{b15.sla}} days. A dash under owner means no team owns the system.

### Security tools (cost a year)

{{table:b15.tools}}

### Administrator accounts and vendors

- {{b15.adm}} administrator accounts: {{b15.admPR}} use phishing-resistant MFA (security keys), {{b15.admPush}} use push approval on a phone, {{b15.admNone}} have no MFA.
- {{b15.vend}} vendors on file, {{b15.vCrit}} rated critical; {{b15.vRev}} of the critical ones were reviewed in the last 12 months.

### Note from the CEO

> I keep reading about breaches at companies like ours. Are we exposed, and what do you need?

### Note from the CFO

> Security tools cost ${{b15.toolsK}}k a year. Are we paying for anything twice?

### Note from the head of IT Operations

> The VPN appliance and the file transfer server belong to nobody. We patch what we own.

### Task

Hand back four stages.

1. Triage the findings, tools, accounts and vendors: the counts that matter (KEV findings, internet-facing ones and their owners, findings past the {{b15.sla}}-day target, systems with no owner, expired exceptions, duplicate tools and their cost, administrators without phishing-resistant MFA, critical vendors not reviewed) and what is missing.
2. Name the three most urgent items, ranked by how directly an attacker could use them, with what you do this week.
3. Write a 30/60/90-day plan.
4. Write your first note to the CEO, under 120 words.

Planted: two internet-facing KEV findings on systems nobody owns; administrator accounts with no MFA; expired exceptions nobody noticed; two endpoint detection tools that overlap.

## Key

### Counts

- {{b15.n}} open findings; {{b15.kev}} on the KEV catalog, {{b15.kevNet}} of them internet-facing; {{b15.kevNetNo}} of those have no owner: {{b15.kevNetNoNames}}. {{b15.kevLate}} KEV findings are older than {{b15.sla}} days.
- {{b15.noOwner}} findings sit on systems with no owner: {{b15.noOwnerNames}}.
- {{b15.expired}} exceptions have expired: {{b15.expiredNames}}.
- {{b15.toolsN}} tools costing ${{b15.toolsK}}k a year. {{b15.edrN}} endpoint detection tools cost ${{b15.edrK}}k together; the larger covers {{b15.edrCov}}% of devices, so the smaller (${{b15.dupK}}k) is the candidate to consolidate once coverage moves. {{b15.toolNoOwner}} tools (${{b15.toolNoOwnerK}}k) have no owner.
- {{b15.admNot}} of {{b15.adm}} administrator accounts ({{b15.admNotPct}}%) lack phishing-resistant MFA; {{b15.admNone}} have none.
- {{b15.vUnrev}} of {{b15.vCrit}} critical vendors ({{b15.vUnrevPct}}%) have not been reviewed in 12 months.
- Missing: an asset inventory to say what the scanner does not see, detection and containment times, who may accept a risk and up to what size, and whether backups restore.

### Urgent items

- The {{b15.kevNetNo}} internet-facing KEV findings with no owner ({{b15.kevNetNoNames}}): reachable from the internet and being exploited elsewhere.
- The {{b15.admNone}} administrator accounts with no MFA, then the {{b15.admPush}} on push approval.
- The {{b15.expired}} expired exceptions: nobody has accepted those risks any more.

## Model answer

### Stage 1

- {{b15.n}} findings; {{b15.kev}} KEV, {{b15.kevNet}} internet-facing, {{b15.kevNetNo}} without an owner; {{b15.kevLate}} KEV findings past {{b15.sla}} days.
- {{b15.noOwner}} findings on ownerless systems; {{b15.expired}} expired exceptions.
- ${{b15.toolsK}}k of tools; two endpoint detection tools (${{b15.edrK}}k); {{b15.toolNoOwner}} tools with no owner.
- {{b15.admNot}} of {{b15.adm}} admin accounts without phishing-resistant MFA ({{b15.admNone}} with none).
- {{b15.vUnrev}} of {{b15.vCrit}} critical vendors unreviewed.
- Gaps: asset inventory, detection and containment times, risk acceptance limits, backup restore tests.

### Stage 2

- Name owners for the VPN appliance and the file transfer server today; patch both this week, or take them off the internet until patched.
- Put security keys on the {{b15.admNone}} accounts with no MFA now; turn on number matching for the {{b15.admPush}} on push while keys are issued.
- Put the {{b15.expired}} expired exceptions in front of their business owners this week: renew with a compensating control and a new date, or fix.

### Stage 3

- 30 days: owners for every system with findings; internet-facing KEV findings fixed; admin accounts on security keys; expired exceptions renewed or closed; who may accept what size of risk agreed with the CEO.
- 60 days: a Current and Target Profile against CSF 2.0 with ranked gaps; the four unreviewed critical vendors reviewed; endpoint coverage moved to one tool and the other given notice; backup restores tested.
- 90 days: five board measures with four quarters of history where it exists; a funded plan ranked by risk reduced; a tabletop exercise of the incident plan with the executive team.

### Stage 4

- "We are exposed in three places. {{b15.kevNetNo}} internet-facing systems carry flaws attackers are exploiting today and have no owner; I am assigning owners and they will be patched or taken offline this week. {{b15.admNone}} administrator accounts have no second factor; they get security keys now. {{b15.expired}} risk exceptions expired unnoticed; their owners decide this week. We also pay for two overlapping endpoint tools; I will consolidate within 60 days. In 90 days you will get a ranked plan with costs and the risk each item removes."

## Grading notes

- A strong hand-back finds the two ownerless internet-facing KEV findings, the admin accounts with no MFA and the expired exceptions, and acts on them this week.
- The counts match the key, including the duplicate tool cost and the unreviewed critical vendors.
- The plan separates savings (the duplicate tool) from risk decisions, and the CEO note stays under 120 words with an action and a date for each item.
