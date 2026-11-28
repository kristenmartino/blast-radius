// Tell me about yourself, CISO version. Uses the same five beats and budgets as the CIO-family version
// (content/tmay.js; bank text is never copied in) with a close for each of the five CISO-lane titles. Built hidden: pendingOk,
// because the stressed beats for security-leadership roles need Kristen's OK before the screen is shown (as for the CTO version).
'use strict';
module.exports = {
  id: 'tmay-ciso', lane: 'ciso', status: 'Draft', pendingOk: true,
  closes: [
    { role: 'CISO', text: 'Close by naming the risk this company most needs reduced, the measure you would report to the board on it, and who owns it with you.' },
    { role: 'VP Information Security', text: 'Close by naming the program gaps you would close first, how you would fund them, and the measure that would show they are closing.' },
    { role: 'Head of Security', text: 'Close by naming the systems and data the business depends on most and the first exposure you would take off the table.' },
    { role: 'Director of Security Operations', text: 'Close by naming how quickly the team detects and contains incidents today and the first change you would make to shorten both.' },
    { role: 'Director of Governance, Risk and Compliance', text: 'Close by naming the controls and audits you would own, how you would keep exceptions from expiring unseen, and the first report you would give leadership.' }
  ]
};
