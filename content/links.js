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
  ]
};
