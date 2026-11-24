// Tell me about yourself, CIO-family version. Follows her beat structure: numbered beats, each with a job and a
// time budget, scripted separately, then read straight through, plus a 30-second cut and opener adjustments.
// The words are hers: the five paragraphs of the Master Story Bank's "Career introduction" practice answer. They are
// not copied into this app (Dry Run's rule: bank text is never published with content); the screen links to the
// bank's Short practice answers section. Budgets split 60 to 75 seconds by each paragraph's word count
// (20, 19, 17, 26, 24 words, counted Nov 24 from the bank copy, version 1794287102-8e21), with the two stressed beats
// weighted 1.5 (Dry Run's design, Inferred). Budgets come from math/numbers.js (N.tm), checked in Python.
// pendingOk: the stressed beats need Kristen's OK before the screen is shown (her approval of Phase 2a item 3).
'use strict';
const { compute } = require('../math/numbers.js');
const TM = compute().tm;
module.exports = {
  id: 'tmay-cio', lane: 'cio', status: 'Draft', pendingOk: true,
  bankUrl: 'https://claude.ai/artifact/J5TiiDwLanHF9oMU1UFPJ6#practice',
  bankVersion: '1794287102-8e21 (copy of Nov 10, 2026)',
  targetSec: [60, 75], cutSec: 30,
  beats: [
    { n: 1, cue: 'Towers Watson', job: 'Open with data turned into business recommendations', stressed: false },
    { n: 2, cue: 'Greyhound', job: 'Show pricing and customer behaviour feeding business decisions', stressed: false },
    { n: 3, cue: 'IBM', job: 'Show you have built a customer-facing platform yourself', stressed: true },
    { n: 4, cue: 'RealPage', job: 'Land the enterprise systems ownership: billing and order management, priorities, business and engineering teams', stressed: true },
    { n: 5, cue: 'Your own business', job: 'Bring it to now: deciding what to build, building it, and early user feedback', stressed: false }
  ].map((b, i) => Object.assign(b, { lo: TM.lo[i], hi: TM.hi[i] })),
  cut30: 'One sentence covering beats 1 and 2, then beat 4 in full, then one sentence of beat 5.',
  openers: [
    { q: 'Tell me about yourself.', use: 'All five beats in order, then the close for the role.' },
    { q: 'Walk me through your background in enterprise systems.', use: 'Beat 3 in one line, beat 4 in full, then beat 5.' },
    { q: 'Why are you interested in a CIO-track role?', use: 'Beat 4, then beat 5, then the close.' },
    { q: 'Give me the short version.', use: 'The 30-second cut.' },
    { q: 'What have you been doing since RealPage?', use: 'Start at beat 5, then link back to beat 4 in one line.' }
  ],
  closes: [
    { role: 'CIO', text: 'Close by naming the business systems this company runs on and the decision you would want to make first.' },
    { role: 'Director of IT', text: 'Close by naming the service and project portfolio you would run and how you would show it is working.' },
    { role: 'VP Business Systems', text: 'Close by naming the ERP and CRM decisions this role owns and the one you would take on first.' },
    { role: 'Head of Enterprise Applications', text: 'Close by naming the applications you would own and how you would keep changes to them safe.' }
  ]
};
