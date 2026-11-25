// CISO lane module (Phase 4b): Security program and board reporting. Six lessons and twelve keyed checks (two per lesson).
// Draft until Kristen reviews. Tiers: Read (page opened), Relayed (search-result text, page not opened), Inferred
// (general practice or arithmetic on invented figures). Every figure comes from math/numbers.js (N.sp).
// Pages opened Nov 25: NIST CSF 2.0 (CSWP 29). Four pages needed approval while nobody was there, so their claims are
// Relayed from search-result text until opened: CISA KEV, NIST SP 800-207, CISA phishing-resistant MFA, NIST SP 800-55v1.
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  csf: ['NIST, The NIST Cybersecurity Framework (CSF) 2.0, CSWP 29 (February 26, 2024)', 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf', 'Read'],
  sec: ['SEC Division of Corporation Finance, Cybersecurity Risk Management, Strategy, Governance, and Incident Disclosure', 'https://www.sec.gov/corpfin/cybersecurity', 'Read'],
  m55: ['NIST SP 800-55 Vol. 1, Measurement Guide for Information Security: Identifying and Selecting Measures (December 2024; search-result text)', 'https://csrc.nist.gov/pubs/sp/800/55/v1/final', 'Relayed'],
  kev: ['CISA, Reducing the Significant Risk of Known Exploited Vulnerabilities (search-result text)', 'https://www.cisa.gov/known-exploited-vulnerabilities', 'Relayed'],
  zt: ['NIST SP 800-207, Zero Trust Architecture (August 2020; search-result text)', 'https://csrc.nist.gov/pubs/sp/800/207/final', 'Relayed'],
  mfa: ['CISA, Implementing Phishing-Resistant MFA (October 2022; search-result text)', 'https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf', 'Relayed'],
  cisamfa: ['CISA, More than a Password (MFA page; search-result text)', 'https://www.cisa.gov/MFA', 'Relayed']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'sp-1', title: 'Designing the program with NIST CSF 2.0', levels: ALL,
    body: [
      'CSF 2.0 has six Functions: Govern, Identify, Protect, Detect, Respond and Recover. An Organizational Profile describes posture in terms of the Core’s outcomes: a Current Profile (the outcomes being achieved and how well) and a Target Profile (the outcomes chosen and ranked for the organization’s risk goals). The framework gives a five-step cycle: scope the profile, gather information, create it, analyze the gaps between Current and Target and build a prioritized action plan (a risk register or a plan of action and milestones), then implement and update (Read, NIST CSF 2.0).',
      'The four Tiers (Partial, Risk Informed, Repeatable, Adaptive) describe the rigor of risk governance and management. They are not mandatory targets: an organization can choose to use them, and moving up is encouraged when risks or mandates are greater or a cost-benefit analysis supports it (Read, NIST CSF 2.0).',
      t('Example (invented): {{sp.scope}} outcomes are in scope and {{sp.atTarget}} meet the Target Profile, leaving {{sp.gaps}} gaps. The program plan is those gaps ranked by risk, each with an owner, a cost and a date, not a list of tools to buy. (Inferred.)')
    ],
    sources: [SRC.csf] },
  { id: 'sp-2', title: 'Accountability, the CISO’s role and the board', levels: ALL,
    body: [
      'CSF 2.0’s Govern Function includes Roles, Responsibilities, and Authorities (GV.RR). Its first outcome states that organizational leadership is responsible and accountable for cybersecurity risk; others call for roles that are established, communicated, understood and enforced, adequate resources allocated to match the risk strategy, and cybersecurity included in human resources practices. Oversight (GV.OV) uses the results of risk activities to adjust strategy (Read, NIST CSF 2.0).',
      'For a US public company, Item 106 of Regulation S-K requires annual disclosure of how cybersecurity risk is assessed and managed, the board’s oversight of it, and management’s role in assessing and managing it (Read, SEC Corporation Finance).',
      'The CISO runs the program; the executive team owns the risk in its own business; the board oversees. A CISO who reports only through the technology line can find their risks weighed against that line’s budget, so many boards also hear from the CISO directly or through a risk committee. Agree in writing who may accept a risk and up to what size. (Inferred.)'
    ],
    sources: [SRC.csf, SRC.sec] },
  { id: 'sp-3', title: 'Security measures a board can use', levels: ALL,
    body: [
      'NIST SP 800-55 Volume 1 (December 2024) gives guidance on developing information security measures to identify the adequacy of in-place security policies, procedures and controls, and on prioritizing and evaluating them. It supersedes Revision 1 from 2008 (Relayed, NIST, search-result text).',
      t('Report outcomes the board can judge against a target, not activity counts. Example (invented, a different company from sp-5): {{sp.kevMet}} of {{sp.kevDue}} known-exploited, internet-facing vulnerabilities fixed within the target time ({{sp.kevPct}}%) and {{sp.admPR}} of {{sp.adm}} administrator accounts on phishing-resistant MFA ({{sp.admPct}}%) say more about exposure than {{sp.trainPct}}% of staff completing training. (Inferred.)'),
      'Show each measure as a trend over at least four quarters, with its target and the risk it tracks. Keep the set small (five to seven), keep the definitions fixed, and say plainly when a number got worse and why. (Inferred.)'
    ],
    sources: [SRC.m55] },
  { id: 'sp-4', title: 'Vulnerability management and exceptions', levels: ['director', 'vp'],
    body: [
      'CISA keeps the Known Exploited Vulnerabilities (KEV) catalog. Binding Operational Directive 22-01 requires federal civilian executive branch agencies to remediate catalog vulnerabilities within set timeframes; other organizations are not bound by it, but CISA strongly recommends that all organizations review the catalog and prioritize remediating the vulnerabilities on it (Relayed, CISA, search-result text).',
      t('Example (invented): {{sp.open}} open findings, of which {{sp.kev}} ({{sp.kevShare}}%) are on the KEV list and {{sp.kevNet}} of those face the internet. Fix those {{sp.kevNet}} first, then the other KEV items, then the {{sp.crit}} critical findings by exposure. Severity scores alone would bury the {{sp.kev}} under hundreds of criticals nobody is exploiting. (Inferred.)'),
      'An exception is a risk acceptance: it needs a business owner with the authority to accept it, a compensating control, and an expiry date that someone checks. An exception that has quietly expired is an open finding with no plan. (Inferred.)'
    ],
    sources: [SRC.kev] },
  { id: 'sp-5', title: 'Identity, zero trust and phishing-resistant MFA', levels: ALL,
    body: [
      'NIST SP 800-207 (August 2020) defines zero trust as granting no implicit trust to assets or user accounts based solely on their physical or network location or on asset ownership; authentication and authorization are discrete functions performed before a session to an enterprise resource is established (Relayed, NIST, search-result text).',
      'CISA calls phishing-resistant MFA the most secure form of MFA and says FIDO/WebAuthn is the only widely available phishing-resistant method; other forms are vulnerable to phishing, push bombing, SS7 and SIM-swap attacks. Where phishing-resistant MFA cannot be used yet, CISA suggests number matching to block push bombardment, and it advises starting with high-value targets such as administrators (Relayed, CISA, search-result text).',
      t('Example (invented): of {{sp.mfaAdm}} administrator accounts, {{sp.mfaPR}} use phishing-resistant MFA, {{sp.mfaPush}} use push approval and {{sp.mfaNone}} have none: {{sp.mfaNot}} ({{sp.mfaNotPct}}%) to move, the {{sp.mfaNone}} with none first. (Inferred.)')
    ],
    sources: [SRC.zt, SRC.mfa, SRC.cisamfa] },
  { id: 'sp-6', title: 'The security budget', levels: ['vp', 'c-level'],
    body: [
      'CSF 2.0 lists adequate resources allocated to match the cybersecurity risk strategy as a Govern outcome (GV.RR-03) (Read, NIST CSF 2.0).',
      t('Fund by risk reduced, using the expected losses from the risk register. Example (invented, $k a year, budget {{sp.bud}}): A costs {{sp.aCost}} and cuts expected loss by {{sp.aCut}}; B costs {{sp.bCost}} and cuts {{sp.bCut}}; C costs {{sp.cCost}} and cuts {{sp.cCut}}; D costs {{sp.dCost}} and cuts {{sp.dCut}}. Ranking by cut per dollar ({{sp.aRatio}}, {{sp.bRatio}}, {{sp.cRatio}}, {{sp.dRatio}}) and funding down the list buys {{sp.greedyIds}}, which cut {{sp.greedyCut}} for a cost of {{sp.greedyCost}}. Checking every combination finds {{sp.bestIds}}, which cut {{sp.bestCut}} for a cost of {{sp.bestCost}}: {{sp.bestGain}} more. (Inferred.)'),
      'Present the budget as the risks it reduces and the ones it leaves, with who accepted the rest. Cutting a duplicate tool is savings; cutting a control is a risk acceptance and should be signed as one. (Inferred.)'
    ],
    sources: [SRC.csf] }
];
const checks = [
  { id: 'SP-01', lesson: 'sp-1', levels: ALL,
    stem: 'In CSF 2.0, what is the difference between a Current Profile and a Target Profile?',
    options: ['Current is what is achieved now; Target is the outcomes chosen for the risk goals', 'Current is the controls a regulator requires; Target is the controls a vendor recommends', 'Current covers the IT department only; Target covers the whole organization', 'Current is Tier 1 and Target is always Tier 4, the highest level of rigor'],
    answer: 0, why: 'The Current Profile records the outcomes being achieved and how well; the Target Profile records the outcomes the organization has chosen and ranked for its risk goals. The gap between them drives the action plan.',
    whyNot: { 1: 'Profiles are written in terms of the Core’s outcomes for the organization’s own goals.', 2: 'Both can cover the same scope.', 3: 'Tiers are not mandatory targets, and profiles are not Tiers.' } },
  { id: 'SP-02', lesson: 'sp-1', levels: ['vp', 'c-level'],
    stem: 'The board asks you to commit to reaching CSF Tier 4 (Adaptive) across the company within a year. What do you say?',
    options: ['Agree: Tier 4 is the framework’s required standard for a well-run company', 'Explain that Tiers are not mandatory targets; propose Target Profile gaps ranked by risk', 'Decline to use CSF at all, since a framework cannot reflect our own business', 'Agree, and ask every team to self-certify in writing that it has reached Tier 4 by year end'],
    answer: 1, why: 'CSF says organizations can choose to use the Tiers, with higher Tiers encouraged when risks, mandates or a cost-benefit analysis support them. Closing ranked profile gaps ties the work to risk.',
    whyNot: { 0: 'The framework does not require Tier 4.', 2: 'CSF is meant to be tailored; profiles express the organization’s own goals.', 3: 'Self-certification against a target nobody chose for a reason measures nothing.' } },
  { id: 'SP-03', lesson: 'sp-2', levels: ALL,
    stem: 'According to CSF 2.0’s GV.RR-01, who is responsible and accountable for cybersecurity risk?',
    options: ['The CISO alone', 'Organizational leadership', 'The external auditor', 'Each employee individually'],
    answer: 1, why: 'GV.RR-01 states that organizational leadership is responsible and accountable for cybersecurity risk, and fosters a risk-aware culture.',
    whyNot: { 0: 'The CISO runs the program; leadership owns the risk.', 2: 'Auditors give assurance; they do not own the risk.', 3: 'Employees have roles (GV.RR-02), but accountability sits with leadership.' } },
  { id: 'SP-04', lesson: 'sp-2', levels: ['vp', 'c-level'],
    stem: 'A business unit head wants to keep an unsupported system for another year. Who should accept that risk?',
    options: ['The CISO, since security risks belong to the security team', 'The business unit head, within an agreed limit, with the CISO’s written view', 'The IT help desk, which already supports the system day to day', 'Nobody: just leave it running quietly and remove it from the risk register for now'],
    answer: 1, why: 'The executive who owns the business process owns its risk; the CISO advises and records the acceptance. An agreed limit says what size of risk each level may accept.',
    whyNot: { 0: 'A CISO who accepts every business risk becomes the owner of decisions they do not control.', 2: 'The help desk has no authority over business risk.', 3: 'Removing it from the register hides the risk from the board.' } },
  { id: 'SP-05', lesson: 'sp-3', levels: ALL,
    stem: 'Which measure tells a board most about exposure to attack?',
    options: [t('{{sp.trainPct}}% of staff completed annual security training'), 'The number of alerts the security operations team handled last quarter', t('{{sp.kevPct}}% of internet-facing known-exploited flaws fixed within target'), 'The number of security tools the company currently licenses'],
    answer: 2, why: t('{{sp.kevMet}} of {{sp.kevDue}} is {{sp.kevPct}}%: an outcome against a target, tied to how attackers get in.'),
    whyNot: { 0: 'Completion counts activity, not whether people resist attacks.', 1: 'Alert volume rises and falls with tuning; it says little about exposure.', 3: 'Tools owned says nothing about coverage or results.' } },
  { id: 'SP-06', lesson: 'sp-3', levels: ['vp', 'c-level'],
    stem: 'One of your board measures got worse this quarter. How do you show it?',
    options: ['Drop it from the pack until it improves next quarter', 'Change its definition so the trend looks steady again', 'Show the trend against target, the cause and the fix date', 'Show only this quarter’s number, without the earlier ones'],
    answer: 2, why: 'A fixed definition, a trend against target and a plain cause keep the board’s trust and let it judge the fix.',
    whyNot: { 0: 'Dropping bad news is found out and costs trust.', 1: 'Changing definitions breaks the trend the board relies on.', 3: 'One quarter alone hides the direction.' } },
  { id: 'SP-07', lesson: 'sp-4', levels: ['director', 'vp'],
    stem: t('You have {{sp.open}} open findings, {{sp.crit}} rated critical. {{sp.kev}} are on CISA’s KEV catalog, {{sp.kevNet}} of those internet-facing. What do you fix first?'),
    options: [t('All {{sp.crit}} critical findings, in order of severity score'), t('The {{sp.kevNet}} internet-facing KEV items, then the rest of the KEV list'), 'The oldest findings first, so that the backlog stops ageing any further', 'Whatever each team decides is easiest to close this month'],
    answer: 1, why: 'CISA recommends that every organization prioritize remediating KEV vulnerabilities, which are being exploited now; internet-facing ones are reachable first.',
    whyNot: { 0: 'Severity alone puts exploited flaws behind hundreds nobody is attacking.', 2: 'Age says nothing about whether a flaw is being exploited.', 3: 'Easy items close counts without cutting exposure.' } },
  { id: 'SP-08', lesson: 'sp-4', levels: ['director', 'vp'],
    stem: 'Three risk exceptions expired last month and nobody renewed or closed them. What is their status?',
    options: ['Still accepted, since they were approved once', 'Open findings with no plan, needing owners now', 'Closed, because the exception period has ended', 'Accepted automatically until the next annual audit'],
    answer: 1, why: 'An exception is a time-limited risk acceptance with an owner; once it expires, the finding is open and nobody has accepted the risk.',
    whyNot: { 0: 'The approval was for a period that has ended.', 2: 'Expiry does not fix the underlying flaw.', 3: 'No rule extends an acceptance automatically.' } },
  { id: 'SP-09', lesson: 'sp-5', levels: ALL,
    stem: 'Which MFA method does CISA describe as the only widely available phishing-resistant option?',
    options: ['Codes sent by text message', 'Push approval on a phone app', 'FIDO/WebAuthn authentication', 'One-time codes from an app'],
    answer: 2, why: 'CISA says FIDO/WebAuthn is the only widely available phishing-resistant authentication; texts, push and one-time codes can be phished or bypassed.',
    whyNot: { 0: 'Text codes are exposed to SIM swap and SS7 attacks.', 1: 'Push approval is open to push bombing.', 3: 'One-time codes can be phished.' } },
  { id: 'SP-10', lesson: 'sp-5', levels: ['director', 'vp'],
    stem: t('{{sp.mfaNot}} of {{sp.mfaAdm}} administrator accounts lack phishing-resistant MFA: {{sp.mfaPush}} use push approval and {{sp.mfaNone}} have none. The rollout will take a quarter. What do you do this week?'),
    options: [t('Wait and move all {{sp.mfaNot}} together when the full rollout starts'), t('Move the {{sp.mfaNone}} with none first; turn on number matching for the {{sp.mfaPush}} on push'), 'Start with general staff, who are the largest group, and do administrators last', 'Disable every administrator account until all of them have security keys'],
    answer: 1, why: 'CISA advises starting with high-value targets and using number matching where phishing-resistant MFA is not yet possible; accounts with no MFA are the worst exposure.',
    whyNot: { 0: 'A quarter of waiting leaves the riskiest accounts open.', 2: 'Administrators are the high-value targets CISA says to start with.', 3: 'Disabling every admin account stops operations.' } },
  { id: 'SP-11', lesson: 'sp-6', levels: ['vp', 'c-level'],
    stem: t('With ${{sp.bud}}k, A costs {{sp.aCost}} and cuts expected loss {{sp.aCut}}; B costs {{sp.bCost}}, cuts {{sp.bCut}}; C costs {{sp.cCost}}, cuts {{sp.cCut}}; D costs {{sp.dCost}}, cuts {{sp.dCut}}. Which set cuts most?'),
    options: [t('{{sp.greedyIds}}, the two best ratios, cutting {{sp.greedyCut}}'), t('{{sp.bestIds}}, cutting {{sp.bestCut}} for {{sp.bestCost}}'), t('D alone, the biggest project, cutting {{sp.dCut}}'), t('A, B and C together, cutting the most of any set')],
    answer: 1, why: t('Checking every set within {{sp.bud}}: {{sp.bestIds}} cuts {{sp.bestCut}} for {{sp.bestCost}}, {{sp.bestGain}} more than funding down the ratio list.'),
    whyNot: { 0: t('Funding by ratio alone stops at {{sp.greedyCut}}; B no longer fits after C.'), 2: 'D has the lowest ratio and cuts the least.', 3: t('A, B and C cost {{sp.aCost}} + {{sp.bCost}} + {{sp.cCost}}, more than {{sp.bud}}.') } },
  { id: 'SP-12', lesson: 'sp-6', levels: ['vp', 'c-level'],
    stem: 'The CFO asks for a 15% cut to the security budget. What do you bring back?',
    options: ['A refusal: security spending is not negotiable this year', 'An even 15% cut taken equally from every line in the budget', 'Duplicate tools to cut, and risks someone must accept', 'A larger request, to show that the risks are understated'],
    answer: 2, why: 'Removing duplicates is savings; cutting a control raises a risk that an executive should accept in writing.',
    whyNot: { 0: 'A flat refusal ends the conversation without showing the trade.', 1: 'An even cut ignores which controls reduce the most risk.', 3: 'A counter-request without the trade answers nothing the CFO asked.' } }
];
const { place } = require('./place.js');
const POS = [2, 0, 3, 1, 0, 2, 1, 3, 2, 0, 3, 1];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
