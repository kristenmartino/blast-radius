// Shared module (Phase 4a): Risk, security and incident leadership. Six lessons and twelve keyed checks (two per lesson).
// Listed in the CIO, AI leadership, Data leadership and CTO lanes (and the CISO lane in Phase 4b) under the same ids.
// Draft until Kristen reviews. Tiers: Read (page opened Nov 24, 2026), Relayed (search-result text, page not opened),
// Inferred (general practice or arithmetic on invented figures). Every figure comes from math/numbers.js (N.rk).
// Disclosure lessons stay at the decision level: who decides, which clock runs, when counsel comes in. Not legal advice.
'use strict';
const { compute, flat, fill } = require('../math/numbers.js');
const F = flat(compute()), t = x => fill(x, F);
const SRC = {
  ir8286: ['NIST IR 8286r1, Integrating Cybersecurity and Enterprise Risk Management (December 2025)', 'https://csrc.nist.gov/pubs/ir/8286/r1/final', 'Read'],
  ir61: ['NIST, Incident Response project page (SP 800-61r3, April 2025)', 'https://csrc.nist.gov/projects/incident-response', 'Read'],
  sec: ['SEC Division of Corporation Finance, Cybersecurity Risk Management, Strategy, Governance, and Incident Disclosure', 'https://www.sec.gov/corpfin/cybersecurity', 'Read'],
  sec801: ['SEC, Erik Gerding statement on disclosing cybersecurity incidents (May 21, 2024; search-result text)', 'https://www.sec.gov/newsroom/speeches-statements/gerding-cybersecurity-incidents-05212024', 'Relayed'],
  gdpr: ['GDPR Article 33, Notification of a personal data breach to the supervisory authority (gdpr-info.eu)', 'https://gdpr-info.eu/art-33-gdpr/', 'Read'],
  soc2: ['AICPA guide, SOC 2 Reporting on an Examination of Controls at a Service Organization (excerpt, chapter 1)', 'https://catalogimages.wiley.com/images/db/pdf/9781945498602.excerpt.pdf', 'Read'],
  iso: ['ISO, ISO/IEC 27001:2022 (search-result text)', 'https://www.iso.org/standard/27001', 'Relayed'],
  nsf: ['NSF, ISO/IEC 27001 certification steps (search-result text)', 'https://www.nsf.org/testing/information-security/iso-iec-27001', 'Relayed'],
  iia: ['The IIA, The IIA’s Three Lines Model: an update of the Three Lines of Defense (July 2020)', 'https://www.theiia.org/globalassets/documents/resources/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense-july-2020/three-lines-model-updated-english.pdf', 'Read'],
  csf: ['NIST, The NIST Cybersecurity Framework (CSF) 2.0, CSWP 29 (February 26, 2024)', 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf', 'Read'],
  owasp: ['OWASP GenAI Security Project, LLM02:2025 Sensitive Information Disclosure', 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/', 'Read']
};
const ALL = ['director', 'vp', 'c-level'];
const lessons = [
  { id: 'rk-1', title: 'Risk appetite and the risk register', levels: ALL,
    body: [
      'NIST defines risk appetite as the amount and type of risk an organization is willing to take, and risk tolerance as its readiness to bear the risk left after responses. Its example pairs an appetite for email availability with a tolerance of five minutes of interruption during core hours. A register entry records an id, priority, description, category, current likelihood and impact, an exposure rating, the response type, its cost and description, an owner and a status (Read, NIST IR 8286r1).',
      'The four responses are accept (the risk is within tolerance; monitor it), transfer (for example insurance, though lost trust often cannot be transferred), mitigate and avoid. Registers from each unit are aggregated, normalized and prioritized into an enterprise register, and the enterprise risk profile is the prioritized subset leaders review (Read, same report).',
      t('Example (invented, $k a year): ransomware at {{rk.rwLik}}% likelihood and {{rk.rwImp}} impact is an expected loss of {{rk.rwExp}}; an ERP vendor outage at {{rk.voLik}}% and {{rk.voImp}} is {{rk.voExp}}; lost laptops at {{rk.lpLik}}% and {{rk.lpImp}} is {{rk.lpExp}}. With a tolerance of {{rk.tol}} for any one risk, ransomware needs a response. Backups the attacker cannot change, at {{rk.mitCost}} a year, cut its impact to {{rk.rwImpAfter}} and the expected loss to {{rk.rwExpAfter}}: {{rk.mitCut}} less for {{rk.mitCost}}, a net {{rk.mitNet}}. (Inferred.)'),
      t('Insurance can sit on top: a premium of {{rk.prem}} that pays losses above a {{rk.ret}} retention would pay {{rk.insPays}} of the {{rk.rwImpAfter}} loss, an expected {{rk.insExp}} a year against the {{rk.prem}} premium. The case for it is the size of the single loss, not the expected value. (Inferred.)')
    ],
    sources: [SRC.ir8286] },
  { id: 'rk-2', title: 'Leading an incident response', levels: ALL,
    body: [
      'NIST SP 800-61 Revision 3 (April 2025) supersedes Revision 2 and is written as a CSF 2.0 Community Profile. Govern, Identify and Protect are preparation and are not part of incident response itself; incident response is Detect, Respond and Recover. Lessons learned from every Function feed the Improvement category within Identify (Read, NIST Incident Response project page).',
      'The executive’s jobs in the first hours: declare the incident and its severity, name one incident commander who runs the response, open a decision log, set an update cadence for leaders, and bring in legal counsel and the insurer as the plan says. Contain before rebuilding, and preserve evidence (disk images, logs) before wiping anything, because the investigation and any notice depend on it. (Inferred.)',
      'Speak only to what is known. A statement that no data was taken, made before the investigation has shown it, often has to be withdrawn. After recovery, a review without blame turns the findings into owned actions with dates, and those actions go into the next quarter’s risk register. (Inferred.)'
    ],
    sources: [SRC.ir61] },
  { id: 'rk-3', title: 'Disclosure and notification clocks', levels: ALL,
    body: [
      'For a US public company, Form 8-K Item 1.05 requires disclosure of the material aspects of a material cybersecurity incident’s nature, scope and timing, and its material impact or reasonably likely impact. The filing is due within four business days of determining that the incident is material, and the determination must be made without unreasonable delay; the deadline is tied to the determination, not to discovery. Item 1.05 does not require technical detail that would impede the response. If the Attorney General finds a substantial risk to national security or public safety, disclosure can be delayed. Item 106 of Regulation S-K adds annual disclosure of how cybersecurity risk is managed and how the board oversees it (Read, SEC Corporation Finance).',
      'The SEC’s Corporation Finance director has encouraged companies that disclose an incident before deciding it is material to use a different item, such as Item 8.01, so investors can tell the two apart (Relayed, SEC statement, search-result text).',
      'Under GDPR Article 33, a controller notifies the supervisory authority of a personal data breach without undue delay and, where feasible, within 72 hours of becoming aware of it, giving reasons if later. No notice is needed if the breach is unlikely to result in a risk to people’s rights and freedoms. A processor must notify its controller without undue delay. Information can be given in phases, and every breach must be documented (Read, GDPR Article 33).',
      t('The clocks start at different events. A materiality determination on {{rk.secDet}} makes the 8-K due by {{rk.secDue}}, counting business days in a week with no public holiday. Awareness of a personal data breach at {{rk.gdprAware}} puts the {{rk.gdprHours}}-hour mark at {{rk.gdprDue}}. The leader’s job is to have the escalation path and the materiality process ready in advance, and to bring counsel in at once; the legal calls are counsel’s. (Inferred.)')
    ],
    sources: [SRC.sec, SRC.sec801, SRC.gdpr] },
  { id: 'rk-4', title: 'Third-party and vendor risk', levels: ALL,
    body: [
      'A SOC 2 report is written for readers who know the service organization and its system: its own staff, user entities, business partners, their practitioners and regulators. Prospective customers who learned about the system through due diligence may also qualify; readers without that knowledge are better served by a SOC 3 report, which is for general use (Read, AICPA SOC 2 guide).',
      'NIST CSF 2.0 puts cybersecurity supply chain risk management under Govern (GV.SC). Its outcomes include identifying suppliers and ranking them by criticality, writing security requirements into contracts, due diligence before a relationship starts, monitoring risk through the relationship, including suppliers in incident planning, response and recovery, and planning for what continues after an agreement ends (Read, NIST CSF 2.0).',
      'For AI vendors, OWASP’s guidance on sensitive information disclosure recommends clear terms of use, letting users opt out of having their data used for training, and documented policies on retention, use and deletion (Read, OWASP LLM02:2025).',
      t('Tier vendors by what they hold and what stops if they fail. Example (invented): of {{rk.vend}} vendors, {{rk.t1}} hold sensitive data or run a critical service and get a full {{rk.t1h}}-hour review each year ({{rk.t1y}} hours); {{rk.t2}} get a {{rk.t2h}}-hour review every two years ({{rk.t2y}} hours a year); {{rk.t3}} get a {{rk.t3h}}-hour check each year ({{rk.t3y}} hours). That is {{rk.tierY}} hours a year, against {{rk.fullY}} for a full review of every vendor. (Inferred.)'),
      'Put the terms that matter in the contract before signing: breach notice to you within a set time, the right to see audit reports, limits on subcontractors, return or deletion of data at exit, and, for AI tools, no training on your inputs. Name an internal owner for every tier 1 vendor. (Inferred.)'
    ],
    sources: [SRC.csf, SRC.soc2, SRC.owasp] },
  { id: 'rk-5', title: 'Audit readiness: SOC 2 and ISO/IEC 27001', levels: ['director', 'vp'],
    body: [
      'A SOC 2 Type 1 report covers the system description and whether controls are suitably designed as of a point in time. A Type 2 report covers a period and adds whether the controls operated effectively throughout it, with the auditor’s tests and results. The trust services categories are security, availability, processing integrity, confidentiality and privacy (Read, AICPA SOC 2 guide).',
      'ISO/IEC 27001:2022 sets requirements for establishing, implementing, maintaining and continually improving an information security management system, and certification is one way to show customers that information is managed securely (Relayed, ISO, search-result text). Certification bodies audit each year of a three-year cycle, with a recertification audit in the third year (Relayed, NSF, search-result text).',
      t('Readiness is evidence collected as the work happens: access reviews, change approvals, backup tests and vendor reviews, each with an owner. A Type 2 report that lists {{rk.exc}} exceptions in {{rk.ctl}} controls tested ({{rk.excPct}}%) is still useful to customers if each exception has an owner, a cause and a fix date. (Inferred.)')
    ],
    sources: [SRC.soc2, SRC.iso, SRC.nsf] },
  { id: 'rk-6', title: 'Compliance programs and who owns them', levels: ALL,
    body: [
      'The IIA’s Three Lines Model gives first-line roles (those delivering products and services, including support functions) ownership of managing risk in their work. Second-line roles add expertise, support, monitoring and challenge on risk, for example in compliance or information security; they are part of management and never fully independent from it. The third line, internal audit, gives independent assurance, is accountable to the governing body and avoids assuring activities it recently ran. The governing body sets direction, including risk appetite, and oversees internal audit. First- and second-line roles may be blended or separated (Read, IIA Three Lines Model).',
      'In practice the control owners in IT, engineering and the business are first line; a compliance or security risk function that sets policy and checks it is second line; internal audit or the external auditor tests the result. A technology leader who both runs the controls and reports on how well they work is grading their own work, so the board report should show who checked it. (Inferred.)',
      'Every regulation or framework the company signs up to (GDPR, SOC 2, ISO/IEC 27001, the EU AI Act for some AI uses) needs one named owner, a map from its requirements to controls, and a calendar of reviews and audits. (Inferred.)'
    ],
    sources: [SRC.iia] }
];
const checks = [
  { id: 'RK-01', lesson: 'rk-1', levels: ALL,
    stem: 'In NIST IR 8286r1, what is the difference between risk appetite and risk tolerance?',
    options: ['They are two names for the same limit, set once a year by the board', 'Appetite is the risk you will take; tolerance is the remaining risk you will bear', 'Appetite applies to operations; tolerance applies only to financial reporting', 'Tolerance is set by the board every year; appetite is set by each control owner'],
    answer: 1, why: 'Appetite is the amount and type of risk an organization is willing to take; tolerance is its readiness to bear the risk left after responses, often stated as a measurable limit.',
    whyNot: { 0: 'NIST defines them separately, with tolerance the more specific limit.', 2: 'Both apply to any objective; the email example is operational.', 3: 'Neither definition assigns them to those owners.' } },
  { id: 'RK-02', lesson: 'rk-1', levels: ALL,
    stem: t('Ransomware has a {{rk.rwLik}}% annual likelihood and a ${{rk.rwImp}}k impact; the board’s tolerance is ${{rk.tol}}k of expected loss for any one risk. Immutable backups at ${{rk.mitCost}}k a year cut the impact to ${{rk.rwImpAfter}}k. What do you recommend?'),
    options: [t('Accept it: a {{rk.rwLik}}% likelihood is low enough to monitor only'), t('Mitigate: expected loss falls from ${{rk.rwExp}}k to ${{rk.rwExpAfter}}k, within tolerance'), t('Transfer all of it to insurance and drop the ${{rk.mitCost}}k backup plan'), 'Avoid it by moving every system to a single cloud provider this year'],
    answer: 1, why: t('{{rk.rwLik}}% × {{rk.rwImp}} = {{rk.rwExp}}, above the {{rk.tol}} tolerance. After the backups, {{rk.rwLik}}% × {{rk.rwImpAfter}} = {{rk.rwExpAfter}}: {{rk.mitCut}} less for {{rk.mitCost}}, inside tolerance.'),
    whyNot: { 0: t('Accepting is for risks within tolerance; {{rk.rwExp}} is above {{rk.tol}}.'), 2: 'Insurance pays above a retention, and NIST notes that lost trust often cannot be transferred.', 3: 'Moving providers does not remove ransomware risk, and the move carries its own.' } },
  { id: 'RK-03', lesson: 'rk-2', levels: ALL,
    stem: 'Under NIST SP 800-61r3, which CSF 2.0 Functions make up incident response itself?',
    options: ['Govern, Identify and Protect', 'Detect, Respond and Recover', 'All six Functions, with equal weight', 'Respond alone; the rest is preparation'],
    answer: 1, why: 'The revision treats Govern, Identify and Protect as preparation and Detect, Respond and Recover as incident response; lessons learned feed Improvement in Identify.',
    whyNot: { 0: 'Those three are preparation.', 2: 'All six support incident response, but only three are incident response.', 3: 'Detect and Recover are part of it too.' } },
  { id: 'RK-04', lesson: 'rk-2', levels: ALL,
    stem: 'Forty minutes into a suspected breach, the CEO wants to tell customers that no data was taken. Forensics has not started. What do you advise?',
    options: ['Say no data was taken; it calms customers, and it can be corrected later', 'Say what is known and when the next update comes; claim nothing unverified', 'Say nothing to anyone until the investigation is complete, however long it takes', 'Publish the technical details of the attack so customers can judge for themselves'],
    answer: 1, why: 'A claim made before the evidence is in often has to be withdrawn, which costs more trust than a plain statement and a set update time.',
    whyNot: { 0: 'Withdrawing the claim later does more damage than not making it.', 2: 'Silence leaves customers to hear it elsewhere, and notice duties may run first.', 3: 'Technical detail can help the attacker and does not answer what customers need.' } },
  { id: 'RK-05', lesson: 'rk-3', levels: ALL,
    stem: t('A US-listed company determines on {{rk.secDet}} that a cyber incident is material. There is no public holiday that week and no Attorney General delay. When is the Item 1.05 Form 8-K due?'),
    options: [t('By {{rk.secDue}}, four business days after the determination'), 'Four business days after the incident was first discovered by the security team', 'Within 72 hours of the determination, including the weekend', 'With the next quarterly report, as part of its risk factors'],
    answer: 0, why: 'The deadline runs four business days from the materiality determination, not from discovery; the determination itself must come without unreasonable delay.',
    whyNot: { 1: 'The SEC says the deadline is tied to the determination, not to discovery.', 2: 'Seventy-two hours is GDPR’s mark for notifying a supervisory authority.', 3: 'A material incident needs the 8-K; the annual Item 106 disclosure is separate.' } },
  { id: 'RK-06', lesson: 'rk-3', levels: ALL,
    stem: 'Your SaaS company processes personal data for its business customers, who are the controllers. You discover a breach of that data. Under GDPR Article 33, whom do you notify first?',
    options: ['The supervisory authority directly, within 72 hours of finding it', 'Each affected customer (the controller), without undue delay', 'Nobody until the investigation has confirmed every record involved', 'Only the individuals whose data was exposed, by email'],
    answer: 1, why: 'Article 33 makes the processor notify its controller without undue delay; the controller decides on notice to the authority, and information can follow in phases.',
    whyNot: { 0: 'The 72-hour duty to the authority sits with the controller.', 2: 'Information can be given in phases; waiting for completeness is not required.', 3: 'Telling individuals is a separate duty (Article 34) that the controller assesses.' } },
  { id: 'RK-07', lesson: 'rk-4', levels: ALL,
    stem: 'A prospective vendor sends its SOC 3 report and declines to share SOC 2. What does the difference mean for your review?',
    options: ['Nothing: the SOC 3 contains the same tests, just shorter', 'SOC 3 is for general use; ask for the SOC 2 under NDA to see the detail', 'SOC 3 means the vendor failed its SOC 2 and should be rejected', 'SOC 2 applies only to financial reporting, so SOC 3 is the right report'],
    answer: 1, why: 'SOC 2 is for readers who know the system, including user entities and prospective customers who learned it in due diligence; SOC 3 is the general-use summary.',
    whyNot: { 0: 'The SOC 2 carries the detail a reviewer needs.', 2: 'A SOC 3 says nothing of the kind; it is a different audience.', 3: 'SOC 2 covers security, availability, processing integrity, confidentiality and privacy.' } },
  { id: 'RK-08', lesson: 'rk-4', levels: ['director', 'vp'],
    stem: t('You have {{rk.vend}} vendors and one analyst: {{rk.t1}} hold sensitive data or run critical services, {{rk.t2}} matter less, and {{rk.t3}} are low risk. A full review takes {{rk.t1h}} hours; a lighter one {{rk.t2h}} hours every two years; a basic check {{rk.t3h}} hours a year. How do you plan the year?'),
    options: [t('Full reviews of all {{rk.vend}} each year: {{rk.fullY}} hours'), t('Tier them: {{rk.t1}} full reviews, lighter for the rest, {{rk.tierY}} hours'), 'Review vendors only when they report a breach to you', 'Send every vendor the same questionnaire and file the answers'],
    answer: 1, why: t('{{rk.t1}} × {{rk.t1h}} + {{rk.t2}} × {{rk.t2h}} ÷ 2 + {{rk.t3}} × {{rk.t3h}} = {{rk.tierY}} hours, about a fifth of one analyst’s year, with the effort on the vendors that hold data or run critical services.'),
    whyNot: { 0: t('{{rk.fullY}} hours is about a year for one person with nothing left for follow-up.'), 2: 'Waiting for a breach finds problems after the damage.', 3: 'The same questionnaire for everyone spends the most time where the risk is least.' } },
  { id: 'RK-09', lesson: 'rk-5', levels: ['director', 'vp'],
    stem: 'A customer asks whether your controls actually worked last year, not just whether they were designed well. Which report answers that?',
    options: ['A SOC 2 Type 1 report', 'A SOC 2 Type 2 report', 'An ISO/IEC 27001 certificate alone', 'Your internal security policy'],
    answer: 1, why: 'Type 2 covers a period and tests whether controls operated effectively throughout it; Type 1 is design at a point in time.',
    whyNot: { 0: 'Type 1 covers design as of a point in time.', 2: 'A certificate shows the management system meets the standard; it is not a test report on each control’s operation.', 3: 'A policy states intent and tests nothing.' } },
  { id: 'RK-10', lesson: 'rk-5', levels: ['director', 'vp'],
    stem: t('Your Type 2 report lists {{rk.exc}} exceptions in {{rk.ctl}} controls tested. Sales wants the report kept from a large prospect. What do you do?'),
    options: ['Withhold it and send a summary that leaves the exceptions out', 'Share it with each exception’s owner, cause and dated fix', 'Ask the auditor to remove the exceptions from the report', 'Delay sharing until next year’s report, which should be clean'],
    answer: 1, why: t('{{rk.exc}} of {{rk.ctl}} is {{rk.excPct}}%. Prospects expect some exceptions; a named owner and a fix date show the controls are managed.'),
    whyNot: { 0: 'A summary that hides findings is found out in due diligence.', 2: 'The auditor reports what it found.', 3: 'The prospect buys now; a year’s delay loses the deal and the trust.' } },
  { id: 'RK-11', lesson: 'rk-6', levels: ALL,
    stem: 'In the IIA Three Lines Model, which statement about second-line roles is right?',
    options: ['They are fully independent of management, reporting only to the governing body', 'They are part of management and give expertise, monitoring and challenge', 'They report only to the external auditor, never to management', 'They own the risks in day-to-day operations and deliver the services'],
    answer: 1, why: 'Second-line roles assist management with risk and are never fully independent from it; independence is the mark of the third line.',
    whyNot: { 0: 'The model says second-line roles are never fully independent from management.', 2: 'Internal audit, the third line, is accountable to the governing body.', 3: 'First-line roles own risk management in their work.' } },
  { id: 'RK-12', lesson: 'rk-6', levels: ['vp', 'c-level'],
    stem: 'Your team runs the access controls and also writes the board’s report on how well they work. The audit committee asks who checked the report. What should change?',
    options: ['Nothing: the team knows the controls best and the report is accurate', 'A second-line review of the controls, and internal audit tests them', 'Move the access controls to the internal audit team to run', 'Stop reporting on access controls to the board'],
    answer: 1, why: 'The first line owns the controls; a second-line function checks them and internal audit gives independent assurance to the board.',
    whyNot: { 0: 'The team is grading its own work.', 2: 'Internal audit avoids assuring activities it runs; running them breaks its independence.', 3: 'The board oversees risk; removing the report removes the oversight.' } }
];
const { place } = require('./place.js');
const POS = [3, 0, 2, 1, 0, 3, 1, 2, 0, 3, 2, 1];
checks.forEach((c, i) => place(c, POS[i]));
for (const x of lessons.concat(checks)) if (x.status === undefined) x.status = 'Draft';
module.exports = { lessons, checks };
