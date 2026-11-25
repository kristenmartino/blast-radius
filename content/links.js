// Links out from the AI leadership lane. Law, exams and practitioner cases live in other apps; this app links to
// them and never copies them (claude/study-apps-index.md, Topic homes).
// Route forms Read Nov 24, 2026: Inspect & Adapt index.src.html route() (#deck-<id>, #cards-<id>, #packet-cf-<n>) and
// published-ids.json (decks aigp, aigov, ab731; craft CF-6; cards R-AG-01..06 in aigp, R-AB-01..06 in ab731);
// Dry Run layout/routes.json and app/index.html (#ai, #ai-c-<module>-<nn>, #ai-cards).
'use strict';
const IA = 'https://claude.ai/artifact/QYnRq1waW4tqzRKHHVBD7H';
const DR = 'https://claude.ai/artifact/1kZMmGtxwBPidFEo3Uwfea';
module.exports = {
  'ai-leadership': [
    { group: 'AI law and exams (Inspect & Adapt)', items: [
      { title: 'AIGP: IAPP Artificial Intelligence Governance Professional', url: IA + '#deck-aigp', app: 'Inspect & Adapt', note: 'deck, lessons and timed mock; the governance-lead exam' },
      { title: 'AIGP recall cards', url: IA + '#cards-aigp', app: 'Inspect & Adapt', note: 'cards, including R-AG-01 to R-AG-06' },
      { title: 'AI governance and risk', url: IA + '#deck-aigov', app: 'Inspect & Adapt', note: 'NIST AI RMF, EU AI Act, ISO/IEC 42001, state laws' },
      { title: 'AI governance recall cards', url: IA + '#cards-aigov', app: 'Inspect & Adapt', note: 'cards' },
      { title: 'AB-731: Microsoft AI Transformation Leader', url: IA + '#deck-ab731', app: 'Inspect & Adapt', note: 'deck; the enablement-lead exam' },
      { title: 'AB-731 recall cards', url: IA + '#cards-ab731', app: 'Inspect & Adapt', note: 'cards, including R-AB-01 to R-AB-06' },
      { title: 'Fenwright Software: launching Ask Keyhold', url: IA + '#packet-cf-6', app: 'Inspect & Adapt', note: 'Craft packet CF-6: a chat assistant under EU AI Act Article 50' }
    ] },
    { group: 'Practitioner cases (Dry Run, AI PM lane)', items: [
      { title: 'AI PM lane', url: DR + '#ai', app: 'Dry Run', note: '20 cases and 20 cards at product-manager depth' },
      { title: 'The Copilot rollout at 22% use', url: DR + '#ai-c-en-01', app: 'Dry Run', note: 'AIPM-EN-01; the practitioner side of the rollout sim' },
      { title: 'Picking the first three AI use cases', url: DR + '#ai-c-en-02', app: 'Dry Run', note: 'AIPM-EN-02; use-case selection at PM depth' },
      { title: 'The pilot worked; the rollout didn’t', url: DR + '#ai-c-en-03', app: 'Dry Run', note: 'AIPM-EN-03; pilot-to-production' },
      { title: 'Justifying a $600,000 invoice-coding tool', url: DR + '#ai-c-en-08', app: 'Dry Run', note: 'AIPM-EN-08; the practitioner side of the business case packet' },
      { title: 'Rolling an AI assistant out to 25,000 employees', url: DR + '#ai-c-en-10', app: 'Dry Run', note: 'AIPM-EN-10; rollout planning at PM depth' }
    ] }
  ],
  'data-leadership': [
    { group: 'Data management exams and platform pages (Inspect & Adapt)', items: [
      { title: 'CDMP Data Management Fundamentals', url: IA + '#deck-cdmpdmf', app: 'Inspect & Adapt', note: 'deck, lessons and timed mock; the data-management exam' },
      { title: 'CDMP recall cards', url: IA + '#cards-cdmpdmf', app: 'Inspect & Adapt', note: 'cards' },
      { title: 'The DAMA framework and maturity assessment', url: IA + '#learn-cdmpdmf-1', app: 'Inspect & Adapt', note: 'lesson 1; maturity assessment for the first 90 days' },
      { title: 'Data handling ethics', url: IA + '#learn-cdmpdmf-2', app: 'Inspect & Adapt', note: 'lesson 2' },
      { title: 'Data governance and stewardship', url: IA + '#learn-cdmpdmf-3', app: 'Inspect & Adapt', note: 'lesson 3; owners and stewards' },
      { title: 'Data architecture: blueprints, flows and Zachman', url: IA + '#learn-cdmpdmf-4', app: 'Inspect & Adapt', note: 'lesson 4' },
      { title: 'Reference and master data', url: IA + '#learn-cdmpdmf-10', app: 'Inspect & Adapt', note: 'lesson 10; golden records and hub styles' },
      { title: 'Data warehousing and BI', url: IA + '#learn-cdmpdmf-11', app: 'Inspect & Adapt', note: 'lesson 11; Inmon, Kimball and dimensional design' },
      { title: 'Metadata management', url: IA + '#learn-cdmpdmf-12', app: 'Inspect & Adapt', note: 'lesson 12; types, stores and lineage' },
      { title: 'Data quality', url: IA + '#learn-cdmpdmf-13', app: 'Inspect & Adapt', note: 'lesson 13; dimensions, root causes and the cycle' },
      { title: 'PL-300: Microsoft Power BI Data Analyst', url: IA + '#deck-pl300', app: 'Inspect & Adapt', note: 'deck; the Power BI exam' },
      { title: 'DP-600: Microsoft Fabric Analytics Engineer', url: IA + '#deck-dp600', app: 'Inspect & Adapt', note: 'deck; the Fabric exam' },
      { title: 'SnowPro Core', url: IA + '#deck-snowcore', app: 'Inspect & Adapt', note: 'deck; the Snowflake exam' },
      { title: 'Snowflake access control, governance and cost', url: IA + '#learn-snowcore-2', app: 'Inspect & Adapt', note: 'lesson 2; the cost side of ec-7' },
      { title: 'Databricks Certified Data Analyst Associate', url: IA + '#deck-dbxda', app: 'Inspect & Adapt', note: 'deck; the Databricks exam' }
    ] },
    { group: 'Practitioner cases (Dry Run)', items: [
      { title: 'Data PM lane', url: DR + '#dp', app: 'Dry Run', note: 'cases at product-manager depth' },
      { title: 'Data engineer lane', url: DR + '#de', app: 'Dry Run', note: 'pipeline design cases' },
      { title: 'Data scientist lane', url: DR + '#ds', app: 'Dry Run', note: 'cases and the Python Lab data science set' },
      { title: 'A data contract dispute', url: DR + '#dp-c-02', app: 'Dry Run', note: 'DP-02; ownership of a shared dataset' },
      { title: 'Success metrics for a data product', url: DR + '#dp-c-04', app: 'Dry Run', note: 'DP-04; picking the measure' },
      { title: 'Build or buy a data catalog', url: DR + '#dp-c-05', app: 'Dry Run', note: 'DP-05; the build-or-buy rule at PM depth' },
      { title: 'Data quality SLAs', url: DR + '#dp-c-06', app: 'Dry Run', note: 'DP-06; freshness arithmetic' },
      { title: 'The pipeline that failed silently', url: DR + '#de-c-04', app: 'Dry Run', note: 'DE-04; controls on a pipeline' },
      { title: 'A warehouse bill that tripled', url: DR + '#de-c-07', app: 'Dry Run', note: 'DE-07; scan cost arithmetic, the practitioner side of ec-7' },
      { title: 'Scoping a churn model', url: DR + '#ds-c-01', app: 'Dry Run', note: 'DS-01; scoping and leakage' },
      { title: 'ML and model evaluation room', url: DR + '#ml', app: 'Dry Run', note: 'metrics, labs and cases' },
      { title: 'A churn model that scores too well', url: DR + '#mc-01', app: 'Dry Run', note: 'MC-01; auditing a model whose score is too good' },
      { title: 'Metrics and Case Room', url: DR + '#metrics', app: 'Dry Run', note: 'finance-operations metrics computed from tables' }
    ] }
  ],
  // Phase 3b: CTO lane. Route forms Read Nov 24, 2026: Inspect & Adapt published-ids.json (decks togafea1, itil5f, palebm, pal1)
  // and index.src.html (#learn-<lesson id>; lesson ids in lessons-togafea1.js, lessons-itil5f2.js, lessons-itil5f3.js,
  // lessons-palebm.js, lessons-pal1.js); Dry Run layout/routes.json and app/index.html (#tp, #tpm, #tp-c-NN = TP-NN,
  // #tp-q-NN = TQ-NN, #eng-sd). Which item fits which lesson is Inferred from titles.
  cto: [
    { group: 'Architecture, service management and delivery measures (Inspect & Adapt)', items: [
      { title: 'TOGAF Enterprise Architecture Part 1', url: IA + '#deck-togafea1', app: 'Inspect & Adapt', note: 'deck, lessons and timed mock; the enterprise-architecture exam' },
      { title: 'TOGAF recall cards', url: IA + '#cards-togafea1', app: 'Inspect & Adapt', note: 'cards' },
      { title: 'The Architecture Development Method, phase by phase', url: IA + '#learn-togafea1-2', app: 'Inspect & Adapt', note: 'lesson 2' },
      { title: 'ADM techniques: principles, gaps, stakeholders and risk', url: IA + '#learn-togafea1-3', app: 'Inspect & Adapt', note: 'lesson 3; architecture principles beside ts-3 and ts-4' },
      { title: 'Architecture Governance, the Board, contracts and compliance', url: IA + '#learn-togafea1-5', app: 'Inspect & Adapt', note: 'lesson 5; the formal review board in ts-4' },
      { title: 'ITIL: AI, DevOps and PRINCE2', url: IA + '#learn-itil5f-10', app: 'Inspect & Adapt', note: 'ITIL Foundation lesson 10' },
      { title: 'ITIL: key practices', url: IA + '#learn-itil5f-12', app: 'Inspect & Adapt', note: 'ITIL Foundation lesson 12; change and incident practices' },
      { title: 'Evidence-Based Management (PAL-EBM)', url: IA + '#deck-palebm', app: 'Inspect & Adapt', note: 'deck; value-based measures beside ed-5' },
      { title: 'The four Key Value Areas', url: IA + '#learn-palebm-1', app: 'Inspect & Adapt', note: 'EBM lesson 1' },
      { title: 'Example measures in each area', url: IA + '#learn-palebm-2', app: 'Inspect & Adapt', note: 'EBM lesson 2; includes lead time' },
      { title: 'Culture, safety and structure', url: IA + '#learn-pal1-4', app: 'Inspect & Adapt', note: 'PAL-I lesson 4; leadership and team structure' }
    ] },
    { group: 'Practitioner cases (Dry Run, Technical PM lane)', items: [
      { title: 'Technical PM lane', url: DR + '#tp', app: 'Dry Run', note: '6 platform cases and 15 system design questions at PM depth' },
      { title: 'Technical program manager setting', url: DR + '#tpm', app: 'Dry Run', note: 'the same questions with program topics' },
      { title: 'Tech debt versus features', url: DR + '#tp-c-03', app: 'Dry Run', note: 'TP-03; the practitioner side of the tech-debt sim' },
      { title: 'Build or buy', url: DR + '#tp-c-04', app: 'Dry Run', note: 'TP-04; build or buy at PM depth' },
      { title: 'A platform migration', url: DR + '#tp-c-05', app: 'Dry Run', note: 'TP-05; migration sequencing' },
      { title: 'Explaining a trade-off to an executive', url: DR + '#tp-c-06', app: 'Dry Run', note: 'TP-06' },
      { title: 'SLAs, SLOs and error budgets', url: DR + '#tp-q-10', app: 'Dry Run', note: 'TQ-10; the practitioner side of ed-2' },
      { title: 'Monolith or microservices', url: DR + '#tp-q-11', app: 'Dry Run', note: 'TQ-11' },
      { title: 'Logs, metrics and traces', url: DR + '#tp-q-13', app: 'Dry Run', note: 'TQ-13' },
      { title: 'Feature flags and gradual rollout', url: DR + '#tp-q-14', app: 'Dry Run', note: 'TQ-14' },
      { title: 'System design room', url: DR + '#eng-sd', app: 'Dry Run', note: 'design prompts and estimates (AI engineer lane)' }
    ] }
  ],
  // Phase 4b: CISO lane. Inspect & Adapt lesson ids read in its repo (az900-7, cdmpdmf-7; decks az900, cdmpdmf published);
  // Dry Run item addresses are '#gd-' + the item id, lower case (app/index.html), titles read in gdc/gdc.json. Fit is Inferred
  // from titles. The ISC2 Certified in Cybersecurity deck is planned for Inspect & Adapt and not built yet.
  ciso: [
    { group: 'Identity, data security and AI risk (Inspect & Adapt)', items: [
      { title: 'Entra ID, access control and security models', url: IA + '#learn-az900-7', app: 'Inspect & Adapt', note: 'AZ-900 lesson 7; identity and conditional access beside sp-5' },
      { title: 'AZ-900: Azure Fundamentals', url: IA + '#deck-az900', app: 'Inspect & Adapt', note: 'deck and timed mock' },
      { title: 'Data security: access controls, classification and masking', url: IA + '#learn-cdmpdmf-7', app: 'Inspect & Adapt', note: 'CDMP Data Management Fundamentals lesson 7' },
      { title: 'AIGP: IAPP Artificial Intelligence Governance Professional', url: IA + '#deck-aigp', app: 'Inspect & Adapt', note: 'deck; AI risk and governance beside the shadow AI and model leak sims' }
    ] },
    { group: 'Governance, security and cloud items (Dry Run)', items: [
      { title: 'Governance, Security and QA room', url: DR + '#gdc', app: 'Dry Run', note: 'governance, BI DevOps and cloud primer items' },
      { title: 'Who RLS and OLS don’t restrict', url: DR + '#gd-gv-03', app: 'Dry Run', note: 'GV-03; least privilege in reporting tools' },
      { title: 'Sensitivity labels that follow the data', url: DR + '#gd-gv-06', app: 'Dry Run', note: 'GV-06' },
      { title: 'Who viewed the report', url: DR + '#gd-gv-13', app: 'Dry Run', note: 'GV-13; audit logs' },
      { title: 'Masking versus security', url: DR + '#gd-gv-15', app: 'Dry Run', note: 'GV-15' },
      { title: 'What stays yours in the cloud', url: DR + '#gd-cp-01', app: 'Dry Run', note: 'CP-01; shared responsibility' },
      { title: 'Patching in IaaS and PaaS', url: DR + '#gd-cp-02', app: 'Dry Run', note: 'CP-02; who patches what, beside sp-4' },
      { title: 'Data residency', url: DR + '#gd-cp-11', app: 'Dry Run', note: 'CP-11' }
    ] }
  ]
};
