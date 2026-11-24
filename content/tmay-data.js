// Tell me about yourself, data leadership version. Uses the same five beats and budgets as the CIO-family version
// (content/tmay.js; bank text is never copied in) with a close for each of the six titles. Built hidden: pendingOk,
// because the stressed beats for data roles need Kristen's OK before the screen is shown (Phase 3a proposal item 9).
'use strict';
module.exports = {
  id: 'tmay-data', lane: 'data-leadership', status: 'Draft', pendingOk: true,
  closes: [
    { role: 'Chief Data Officer', text: 'Close by naming the data the board relies on, who owns it today, and the first decision you would take.' },
    { role: 'Chief Analytics Officer', text: 'Close by naming the decisions this company makes from analytics and how you would show the numbers can be trusted.' },
    { role: 'Chief Data Science Officer', text: 'Close by naming the models that would carry the most weight here and how you would keep each one honest after launch.' },
    { role: 'VP Data', text: 'Close by naming the data teams you would lead and the one platform or definition problem you would settle first.' },
    { role: 'Head of Data Science', text: 'Close by naming the first model or experiment you would take responsibility for and how you would measure it.' },
    { role: 'Director of Data Governance', text: 'Close by naming the owners and definitions you would put in place first and how you would keep teams using them.' }
  ]
};
