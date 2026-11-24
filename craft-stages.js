// Craft packet definitions (study-kit loadCraft). Each entry also carries lane and levels; each stage carries
// the level it practises (shown on the lane screen). Checklist text may use {{placeholders}} from math/numbers.js.
// Markdown sources are in craft-src/; build.js fills the numbers and writes build/craft/.
'use strict';
const FACTS = 'Every fact stated about the company, systems, vendors or people traces to the packet or is labelled an assumption';
module.exports = [
  { id: 'BR-1', file: 'br-1-two-erps.md', status: 'Draft', lane: 'cio', levels: ['vp', 'c-level'], kind: 'Portfolio case', title: 'Two ERPs after an acquisition', role: 'CIO',
    stages: [
      { id: 'BR-1.1', level: 'director', title: 'Facts and the deadline', parts: [1], model: ['Stage 1', 'Deadline'], checklist: ['Lists user counts, contract terms and prices as facts', 'Labels the migration, extension and integration figures as estimates', 'Treats the CFO office’s saving as a claim, not a fact', 'Finds that cancellation notice is due in {{b1.noticeMonths}} month', 'Says what happens if the date is missed: a 3-year auto-renewal', FACTS] },
      { id: 'BR-1.2', level: 'vp', title: 'Three-year cost', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['Option A totals {{$b1.optA}}', 'Option B totals {{$b1.optB}}', 'Counts Marlowe users only in years 2 and 3', 'A net of the claimed saving is {{$b1.optANet}}, {{$b1.gap}} more than B', 'States the break-even saving of {{$b1.breakEvenSynergy}} a year', FACTS], optional: ['A table is optional'] },
      { id: 'BR-1.3', level: 'vp', title: 'What would change the answer', parts: [3], model: ['Stage 3'], checklist: ['Names the saving estimate as the biggest swing factor', 'Says how to test it (which roles merge, and when)', 'Names the 14 EDI customer links as migration risk', 'Notes that option B removes the choice to consolidate for three years', FACTS] },
      { id: 'BR-1.4', level: 'c-level', title: 'Board line', parts: [4], model: ['Stage 4'], checklist: ['Gives a clear recommendation', 'Quotes the cost difference or the break-even saving', 'Names the decision needed this month', 'Fits in two sentences', FACTS] }
    ] },
  { id: 'BR-2', file: 'br-2-two-crms.md', status: 'Draft', lane: 'cio', levels: ['director', 'vp'], kind: 'Portfolio case', title: 'Two CRMs after an acquisition', role: 'VP Business Systems',
    stages: [
      { id: 'BR-2.1', level: 'director', title: 'Decisions before data moves', parts: [1], model: ['Stage 1', 'Ownership'], checklist: ['Names account ownership for the shared accounts as the first decision', 'Says both sales leaders must agree the ownership rule', 'Decides which history migrates and how far back', 'Ties the cutover to Marlowe’s renewal in 5 months', FACTS] },
      { id: 'BR-2.2', level: 'vp', title: 'Overlap and cost', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['Overlap is {{b2.dupPct}}% of Marlowe’s accounts', 'Marlowe costs {{$b2.aCost}} a year today', 'On Kestrel’s CRM the same seats cost {{$b2.addCost}}', 'Licence cost rises by {{$b2.delta}} a year', 'Corrects the claim that consolidation saves money on licences', FACTS] },
      { id: 'BR-2.3', level: 'director', title: 'Cutover', parts: [3], model: ['Stage 3'], checklist: ['De-duplicates the shared accounts after ownership is agreed', 'Migrates open opportunities with their notes', 'Keeps closed history searchable (archive or read-only)', 'Pilots with one team before the full cutover', FACTS] },
      { id: 'BR-2.4', level: 'vp', title: 'Message to the sales director', parts: [4], model: ['Stage 4'], checklist: ['Answers the history worry directly', 'Commits to agreeing ownership with them before migration', 'Is short and plain', 'Makes no promise the plan cannot keep', FACTS] }
    ] },
  { id: 'BR-3', file: 'br-3-sunset.md', status: 'Draft', lane: 'cio', levels: ['director'], kind: 'Portfolio case', title: 'Sunsetting a legacy order system', role: 'Director of IT',
    stages: [
      { id: 'BR-3.1', level: 'director', title: 'Remaining uses', parts: [1], model: ['Stage 1', 'Hidden dependency'], checklist: ['Covers the returns desk, the customer feed and finance', 'Identifies Brennan Hardware’s EDI feed as a live order channel', 'Moves the feed to the ERP and tests it with the customer', 'Gives the archive as the replacement for lookups', FACTS] },
      { id: 'BR-3.2', level: 'director', title: 'Payback', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['Hosting costs {{$b3.hostYear}} a year', 'Payback is {{b3.paybackMonths}} months', 'First-year saving is {{$b3.firstYearSave}}', 'Shows the working', FACTS] },
      { id: 'BR-3.3', level: 'director', title: 'Retention', parts: [3], model: ['Stage 3', 'Retention'], checklist: ['Keeps seven years, per the controller’s policy', 'Asks the auditor to name in writing what they need beyond policy', 'Routes any longer hold through legal', 'Does not accept “keep everything” without scope', FACTS] },
      { id: 'BR-3.4', level: 'director', title: 'Go/no-go criteria', parts: [4], model: ['Stage 4'], checklist: ['Requires the customer feed to run cleanly on the ERP first', 'Requires archive sign-off by the users who depend on it', 'Requires the retention scope agreed in writing', 'Keeps a final export and a rollback window', FACTS] }
    ] },
  { id: 'BR-4', file: 'br-4-upgrade.md', status: 'Draft', lane: 'cio', levels: ['vp', 'c-level'], kind: 'Portfolio case', title: 'When to take a major ERP upgrade', role: 'CIO',
    stages: [
      { id: 'BR-4.1', level: 'vp', title: 'What ends', parts: [1], model: ['Stage 1', 'Support'], checklist: ['Says the system keeps running when mainstream maintenance ends', 'Describes optional extended maintenance for three years at a higher rate', 'Names customer-specific maintenance as what follows', 'Corrects the vendor’s “unsupported” claim', FACTS] },
      { id: 'BR-4.2', level: 'vp', title: 'Cost of the bridge', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['Extended maintenance adds {{$b4.extYear}} a year', 'Three years total {{$b4.ext3}}', 'Maintenance rises to {{$b4.maintExt}} a year', 'Shows the working from the maintenance basis', FACTS] },
      { id: 'BR-4.3', level: 'vp', title: 'Sequence', parts: [3], model: ['Stage 3'], checklist: ['Puts the acquisition integration first', 'Uses extended maintenance as a deliberate bridge', 'Starts selection or design with a small team in parallel', 'Respects the COO’s shared-team constraint', FACTS] },
      { id: 'BR-4.4', level: 'c-level', title: 'CEO recommendation', parts: [4], model: ['Stage 4'], checklist: ['States that the ERP does not stop working', 'Gives the bridge cost', 'Recommends a sequence', 'Names when the next decision comes', 'Fits in three sentences', FACTS] }
    ] },
  { id: 'BR-5', file: 'br-5-customization.md', status: 'Draft', lane: 'cio', levels: ['director', 'vp'], kind: 'Portfolio case', title: 'CRM customization debt', role: 'Head of Enterprise Applications',
    stages: [
      { id: 'BR-5.1', level: 'director', title: 'Diagnosis', parts: [1], model: ['Stage 1'], checklist: ['Names unmanaged change (no owners, no review) as the cause', 'Links it to release breakage and admin time', 'Keeps it to two or three lines', 'Does not blame individual admins', FACTS] },
      { id: 'BR-5.2', level: 'director', title: 'Size of the problem', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['{{b5.deadFields}} near-empty custom fields', '{{b5.hoursYear}} admin hours a year on release breakage', '{{$b5.costYear}} a year at the stated rate', 'Shows the working', FACTS] },
      { id: 'BR-5.3', level: 'vp', title: 'Retirement rule', parts: [3], model: ['Stage 3', 'Safe retirement'], checklist: ['Assigns a business owner who signs off each retirement', 'Checks reports, integrations and automations before removal', 'Checks finance’s commission reports specifically', 'Archives, hides for a cycle, then deletes', FACTS] },
      { id: 'BR-5.4', level: 'vp', title: 'Governance', parts: [4], model: ['Stage 4'], checklist: ['Rejects the blanket freeze', 'Sets up a design authority or review for new customizations', 'Requires an owner and review date on each new item', 'Adds sandbox testing of automations before vendor releases', FACTS] }
    ] },
  { id: 'BR-6', file: 'br-6-portfolio.md', status: 'Draft', lane: 'cio', levels: ['vp', 'c-level'], kind: 'Portfolio case', title: 'Application portfolio review', role: 'CIO',
    stages: [
      { id: 'BR-6.1', level: 'director', title: 'Classify', parts: [1], model: ['Stage 1', 'Classification'], checklist: ['Invest: Order hub, Quote builder A, Data warehouse', 'Migrate: Field service app, Shipping labels', 'Tolerate: Expense tool, Survey tool', 'Eliminate: Old intranet, Payroll bridge, Quote builder B', FACTS] },
      { id: 'BR-6.2', level: 'vp', title: 'Cost by quadrant', parts: [2], model: ['Stage 2', 'Arithmetic'], checklist: ['Invest {{$b6.byQuad.Invest}}', 'Migrate {{$b6.byQuad.Migrate}}', 'Tolerate {{$b6.byQuad.Tolerate}}', 'Eliminate {{$b6.byQuad.Eliminate}}', 'Total {{$b6.total}}', FACTS] },
      { id: 'BR-6.3', level: 'vp', title: 'First three retirements', parts: [3], model: ['Stage 3', 'Traps'], checklist: ['Retires the replaced intranet first', 'Consolidates Quote builder B onto A', 'Catches the payroll bridge’s tax filing and moves it before retirement', 'Gives an order with a reason for each', FACTS] },
      { id: 'BR-6.4', level: 'c-level', title: 'Board line', parts: [4], model: ['Stage 4'], checklist: ['Gives the Eliminate share of the sample cost', 'Names the sequence instead of “cut everything this quarter”', 'Says how the review extends to all 140 applications', 'Is short enough to read aloud', FACTS] }
    ] }
];
