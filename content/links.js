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
  ]
};
