// Role-plays (study-kit validateSims). Each entry also carries lane and levels.
// Claude plays the counterpart with the guarded, noCoaching and noUnpromptedOffer rules on (index.src.html).
// People and companies are fictional. Draft until Kristen reviews.
'use strict';
const { compute, flat, fill } = require('./math/numbers.js');
const F = flat(compute()), t = s => fill(s, F);
module.exports = [
  { id: 'BRL-1', status: 'Draft', lane: 'cio', section: 'role-plays', levels: ['vp', 'c-level'], title: 'The CFO cuts the IT budget 15%',
    role: 'Dana Whitfield, CFO',
    brief: t('The CFO has told you IT’s budget for next year ({{$rp.itBudget}}) is down {{rp.cutPct}}%, {{$rp.cut}}, and wants your plan by Friday. Of the budget, {{$rp.opex}} is operating spend (half of it contracted licences and support) and {{$rp.capex}} is capital projects. You need to find out what is really driving the number and agree a cut that protects the order management upgrade and keeps service running. You have up to eight messages before the conversation is scored against four rubric points.'),
    persona: 'Brisk, numbers-first, under pressure from the board; respects people who bring options with figures.',
    hidden: ['The board asked for a visible cost headline, not a specific number from IT', 'She will accept deferring capital projects if operating costs fall this year', 'She has not been told that the order management contract auto-renews for three years unless notice is given within 15 days'],
    walkaway: 'She accepts a smaller operating cut this year if deferred capital spend makes up the 15% headline and the savings are dated.',
    opening: 'I need 15% out of IT next year. I’ve already told the board. What can you give me by Friday?',
    goodOutcome: 'A 15% headline made of dated operating savings plus deferred capital spend, with the order management upgrade protected and the auto-renewal risk raised.',
    rubric: ['Asks what is behind the 15% before offering cuts', 'Brings options with figures and service impact', 'Protects the critical upgrade and raises the order management notice date', 'Confirms the agreed mix, dates and next step'],
    lessons: [] },
  { id: 'BRL-2', status: 'Draft', lane: 'cio', section: 'role-plays', levels: ['director', 'vp'], title: 'A deferred ERP request',
    role: 'Marcus Lee, VP of Distribution',
    brief: 'The intake council deferred Marcus’s request for a new ERP module to next year. He has asked for a meeting and copied the COO. You cannot reopen the council’s ranking alone. You need to find out what he actually needs, keep the relationship, and agree a next step that does not bypass the council. You have up to eight messages before the conversation is scored against four rubric points.',
    persona: 'Frustrated, loyal to his team, assumes IT is slow; calms down when someone engages with his real problem.',
    hidden: ['What he needs before quarter end is one inventory report for his warehouse managers', 'His team spends about 30 hours a month building that report by hand in spreadsheets', 'He would accept a report built on the current system if it arrives before quarter end'],
    walkaway: 'He accepts a report on the current system before quarter end if the module request stays on the council’s list for next year.',
    opening: 'Your council just pushed my module to next year. My team can’t wait that long. Why should Distribution always go last?',
    goodOutcome: 'A report on the current system before quarter end, with the module request kept in the council’s queue for next year.',
    rubric: ['Asks what problem the module solves before defending the decision', 'Acknowledges the cost to his team without reopening the ranking', 'Offers an interim option that fits the rules', 'Confirms what happens, by when, and what stays in the queue'],
    lessons: [] },
  { id: 'BRL-3', status: 'Draft', lane: 'cio', section: 'role-plays', levels: ['director', 'vp', 'c-level'], title: 'The vendor upsell',
    role: 'Jordan Pike, account executive at Pipeline (CRM vendor)',
    brief: t('Pipeline’s account executive wants you to move all {{consSeats}} CRM seats to the premium tier before your renewal. Premium adds {{$premium}} a seat a year at list price. Sales operations says {{power}} people need its forecasting features. You want the features for the people who need them at a price that holds. Find out what room the vendor has and agree terms you can defend to the CFO. You have up to eight messages before the conversation is scored against four rubric points.'),
    persona: 'Friendly, persistent, quotes list price first; moves when given a credible alternative.',
    hidden: ['Jordan’s quarter ends Friday and this deal would close the gap to quota', 'Jordan can give up to 18% off premium without a manager’s approval', 'Pipeline allows premium on a subset of seats, though Jordan leads with all seats', 'Jordan can add a 60-day pilot clause without approval'],
    walkaway: t('Jordan accepts premium for the {{power}} named users at a discount of up to 18%, signed this week, with a 60-day pilot clause.'),
    opening: t('Great news: I can get you premium on all {{consSeats}} seats if we sign this week. Your team will love the forecasting.'),
    goodOutcome: t('Premium for the {{power}} named users with a 60-day pilot clause and a discount of up to 18%, signed within Jordan’s quarter.'),
    rubric: ['Asks questions that surface the vendor’s timing and pricing room', 'Ties the purchase to named users and a measured need', 'Uses the vendor’s deadline without overcommitting', 'Confirms seats, price, pilot terms and the signature date'],
    lessons: [] }
];
