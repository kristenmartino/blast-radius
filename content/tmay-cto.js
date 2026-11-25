// Tell me about yourself, CTO version. Uses the same five beats and budgets as the CIO-family version
// (content/tmay.js; bank text is never copied in) with a close for each of the six CTO-lane titles. Built hidden: pendingOk,
// because the stressed beats for engineering-leadership roles need Kristen's OK before the screen is shown (Phase 3b proposal item 11).
'use strict';
module.exports = {
  id: 'tmay-cto', lane: 'cto', status: 'Draft', pendingOk: true,
  closes: [
    { role: 'CTO', text: 'Close by naming the technology bet this company has to get right and the first measure you would put in front of the board.' },
    { role: 'VP Engineering', text: 'Close by naming the teams you would lead, how you would know delivery is improving, and the first thing you would change.' },
    { role: 'Head of Technology', text: 'Close by naming the systems the business depends on most and the first risk you would take off the table.' },
    { role: 'Director of Engineering', text: 'Close by naming the teams you would run, the delivery measure you would track, and the first problem you would fix with them.' },
    { role: 'Head of Platform Engineering', text: 'Close by naming the work the platform would take off product teams first and how you would know they want to use it.' },
    { role: 'Chief Architect', text: 'Close by naming the decision you would want recorded first and how you would keep architecture decisions moving without a bottleneck.' }
  ]
};
