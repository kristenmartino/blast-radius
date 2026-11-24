// Lanes and levels. Ids are link ids: once published they never change (published-ids.json).
// Lane names use full titles (naming rule, claude/c-suite-series-plan.md); acronyms appear only in brackets.
'use strict';
module.exports = {
  levels: [
    { id: 'director', name: 'Director', scope: 'Runs the program' },
    { id: 'vp', name: 'VP', scope: 'Owns the budget and the org' },
    { id: 'c-level', name: 'C-level', scope: 'Owns the strategy and the board update' }
  ],
  lanes: [
    { id: 'cio', name: 'Chief Information Officer (CIO)', short: 'CIO', active: true, color: '--s-sky',
      blurb: 'Enterprise and business systems (ERP, CRM), IT operating model, vendors and licences, service management.',
      roles: ['CIO', 'Director of IT', 'VP Business Systems', 'Head of Enterprise Applications'] },
    { id: 'ai-leadership', name: 'AI leadership (Chief AI Officer and AI enablement)', short: 'AI leadership', active: false, color: '--s-lilac',
      blurb: 'AI strategy and portfolio, AI economics, adoption and governance at the executive level.' },
    { id: 'data-leadership', name: 'Data leadership (Chief Data, Chief Analytics and Chief Data Science Officer)', short: 'Data leadership', active: false, color: '--s-mint',
      blurb: 'Data strategy and operating model, governance and quality, data products and platform economics.' },
    { id: 'cto', name: 'Chief Technology Officer (CTO)', short: 'CTO', active: false, color: '--s-orange',
      blurb: 'Technology strategy, architecture and tech-debt governance, engineering org and delivery.' },
    { id: 'ciso', name: 'Chief Information Security Officer (CISO)', short: 'CISO', active: false, color: '--s-coral',
      blurb: 'Security program design, NIST CSF 2.0 at the executive level, board security metrics, security budget.' }
  ],
  // Sections planned for each active lane. Built ones list their content ids; empty ones show "Coming in Phase 1".
  sections: {
    cio: [
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'portfolio-cases', title: 'ERP and CRM portfolio cases', kind: 'Cases', phase: 1 },
      { id: 'renewal-sim', title: 'Vendor and license renewal', kind: 'Simulation', phase: 1 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 1 },
      { id: 'first-90', title: 'First 90 days as CIO', kind: 'Craft packet', phase: 2 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 2 },
      { id: 'tmay', title: 'Tell me about yourself', kind: 'Interview prep', phase: 2 }
    ]
  }
};
