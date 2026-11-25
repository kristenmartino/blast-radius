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
    { id: 'ai-leadership', name: 'AI leadership (Chief AI Officer and AI enablement)', short: 'AI leadership', active: true, color: '--s-lilac',
      blurb: 'AI strategy and portfolio, AI economics, adoption and governance at the executive level.',
      // Level per title (Inferred, approved Nov 24): Director: Director of AI Enablement, AI Program Lead; Director or VP: AI Governance Lead;
      // VP: Head of AI Transformation, VP/SVP Enterprise AI; VP or C-level: Head of AI; C-level: CAIO.
      roles: ['Director of AI Enablement', 'AI Program Lead', 'AI Governance Lead', 'Head of AI Transformation', 'VP/SVP Enterprise AI', 'Head of AI', 'Chief AI Officer (CAIO)'] },
    { id: 'data-leadership', name: 'Data leadership (Chief Data, Chief Analytics and Chief Data Science Officer)', short: 'Data leadership', active: true, color: '--s-mint',
      blurb: 'Data strategy and operating model, governance and quality, data products and platform economics.',
      // Level per title (Inferred, approved Nov 24): Chief Data Officer: C-level; Chief Analytics Officer: VP or C-level;
      // Chief Data Science Officer: C-level; VP Data: VP; Head of Data Science: Director or VP; Director of Data Governance: Director.
      roles: ['Chief Data Officer', 'Chief Analytics Officer', 'Chief Data Science Officer', 'VP Data', 'Head of Data Science', 'Director of Data Governance'] },
    { id: 'cto', name: 'Chief Technology Officer (CTO)', short: 'CTO', active: true, color: '--s-orange',
      blurb: 'Technology strategy, architecture and tech-debt governance, engineering org and delivery.',
      // Level per title (Inferred, approved Nov 24): CTO: C-level; VP Engineering: VP; Head of Technology: VP or C-level;
      // Director of Engineering: Director; Head of Platform Engineering: Director or VP; Chief Architect: VP or C-level.
      roles: ['CTO', 'VP Engineering', 'Head of Technology', 'Director of Engineering', 'Head of Platform Engineering', 'Chief Architect'] },
    { id: 'ciso', name: 'Chief Information Security Officer (CISO)', short: 'CISO', active: true, color: '--s-coral',
      blurb: 'Security program design, NIST CSF 2.0 at the executive level, board security metrics, security budget.',
      // Level per title (Inferred, approved with Phase 4 Nov 24): CISO: C-level; VP Information Security: VP; Head of Security: VP or C-level;
      // Director of Security Operations: Director; Director of Governance, Risk and Compliance: Director.
      roles: ['CISO', 'VP Information Security', 'Head of Security', 'Director of Security Operations', 'Director of Governance, Risk and Compliance'] }
  ],
  // Phase 4a (approved Nov 24): the shared risk module and the incident sims (BRN-7..9) are listed in every active lane;
  // Phase 4b activates the CISO lane, which lists all three runs.
  // Sections for each active lane. Section ids are link ids (lane-section) and never change once published.
  sections: {
    cio: [
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'economics', title: 'Technology economics', kind: 'Shared module', phase: 2 },
      { id: 'risk', title: 'Risk, security and incident leadership', kind: 'Shared module', phase: 4 },
      { id: 'portfolio-cases', title: 'ERP and CRM portfolio cases', kind: 'Cases', phase: 1 },
      { id: 'first-90', title: 'First 90 days as CIO', kind: 'Craft packet', phase: 2 },
      { id: 'renewal-sim', title: 'Vendor and license renewal', kind: 'Simulation', phase: 1 },
      { id: 'cost-sim', title: 'Inference at scale', kind: 'Simulation', phase: 2 },
      { id: 'incident-sim', title: 'Incidents and risk events', kind: 'Simulation', phase: 4 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 2 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 1 },
      { id: 'tmay', title: 'Tell me about yourself', kind: 'Interview prep', phase: 2 }
    ],
    // Phase 2b (approved Nov 24). Shared modules and BRN-2 appear here under their existing ids; nothing is copied.
    'ai-leadership': [
      { id: 'strategy', title: 'AI strategy and portfolio', kind: 'Module', phase: 2 },
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'economics', title: 'Technology economics', kind: 'Shared module', phase: 2 },
      { id: 'risk', title: 'Risk, security and incident leadership', kind: 'Shared module', phase: 4 },
      { id: 'cost-sim', title: 'Inference at scale', kind: 'Simulation', phase: 2 },
      { id: 'rollout-sim', title: 'AI assistant rollout', kind: 'Simulation', phase: 2 },
      { id: 'intake-sim', title: 'Intake queue', kind: 'Simulation', phase: 2 },
      { id: 'incident-sim', title: 'Incidents and risk events', kind: 'Simulation', phase: 4 },
      { id: 'packets', title: 'Craft packets', kind: 'Craft packet', phase: 2 },
      { id: 'first-90', title: 'First 90 days as Chief AI Officer', kind: 'Craft packet', phase: 2 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 2 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 2 },
      { id: 'links', title: 'Law, exams and practitioner cases', kind: 'Links to other apps', phase: 2 }
    ],
    // Phase 3a (approved Nov 24). Shared modules and BRN-2-style reuse follow the AI lane: same lesson ids, nothing copied.
    'data-leadership': [
      { id: 'data-strategy', title: 'Data strategy and governance', kind: 'Module', phase: 3 },
      { id: 'data-products', title: 'Data products and analytics value', kind: 'Module', phase: 3 },
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'economics', title: 'Technology economics', kind: 'Shared module', phase: 2 },
      { id: 'risk', title: 'Risk, security and incident leadership', kind: 'Shared module', phase: 4 },
      { id: 'platform-sim', title: 'Data platform, eight quarters', kind: 'Simulation', phase: 3 },
      { id: 'incident-sim', title: 'Incidents and risk events', kind: 'Simulation', phase: 4 },
      { id: 'first-90', title: 'First 90 days as Chief Data Officer', kind: 'Craft packet', phase: 3 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 3 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 3 },
      { id: 'links', title: 'Certifications, practice and platform pages', kind: 'Links to other apps', phase: 3 },
      { id: 'tmay', title: 'Tell me about yourself', kind: 'Interview prep', phase: 3 }
    ],
    // Phase 3b (approved Nov 24). Shared modules and BRN-2 appear here under their existing ids; nothing is copied.
    cto: [
      { id: 'tech-strategy', title: 'Technology strategy and architecture governance', kind: 'Module', phase: 3 },
      { id: 'engineering-delivery', title: 'Engineering org and delivery', kind: 'Module', phase: 3 },
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'economics', title: 'Technology economics', kind: 'Shared module', phase: 2 },
      { id: 'risk', title: 'Risk, security and incident leadership', kind: 'Shared module', phase: 4 },
      { id: 'debt-sim', title: 'Tech debt vs. features, eight quarters', kind: 'Simulation', phase: 3 },
      { id: 'cost-sim', title: 'Inference at scale', kind: 'Simulation', phase: 2 },
      { id: 'incident-sim', title: 'Incidents and risk events', kind: 'Simulation', phase: 4 },
      { id: 'first-90', title: 'First 90 days as CTO', kind: 'Craft packet', phase: 3 },
      { id: 'packets', title: 'Craft packets', kind: 'Craft packet', phase: 3 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 3 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 3 },
      { id: 'links', title: 'Architecture exams and practitioner cases', kind: 'Links to other apps', phase: 3 },
      { id: 'tmay', title: 'Tell me about yourself', kind: 'Interview prep', phase: 3 }
    ],
    ciso: [
      { id: 'security-program', title: 'Security program and board reporting', kind: 'Module', phase: 4 },
      { id: 'risk', title: 'Risk, security and incident leadership', kind: 'Shared module', phase: 4 },
      { id: 'operating-model', title: 'Operating model', kind: 'Shared module', phase: 1 },
      { id: 'economics', title: 'Technology economics', kind: 'Shared module', phase: 2 },
      { id: 'incident-sim', title: 'Incidents and risk events', kind: 'Simulation', phase: 4 },
      { id: 'first-90', title: 'First 90 days as CISO', kind: 'Craft packet', phase: 4 },
      { id: 'packets', title: 'Craft packets', kind: 'Craft packet', phase: 4 },
      { id: 'role-plays', title: 'Role-plays', kind: 'Role-play', phase: 4 },
      { id: 'behavioral', title: 'Behavioral prompts', kind: 'Interview prep', phase: 4 },
      { id: 'links', title: 'Security exams and practitioner items', kind: 'Links to other apps', phase: 4 },
      { id: 'tmay', title: 'Tell me about yourself', kind: 'Interview prep', phase: 4 }
    ]
  }
};
