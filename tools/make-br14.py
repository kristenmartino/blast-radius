"""Writes data/br14.json: Corrin Freight Systems' application inventory (12 systems), fictional, for packet BR-14
(Modernization plan from a messy system inventory). Fixed values, no random numbers.

Fields: id, name, changes (changes shipped last quarter), interest (engineer-weeks a quarter the owning team estimates it
loses to the system's condition: workarounds, slow builds, incidents), effort (engineer-weeks to modernize: strangle,
replace or retire), critical (High/Medium/Low), diff (the way the company runs this function sets it apart from
competitors), market (a market product covers the function), seam (requests can be intercepted at an API or
message boundary), users.
The classification rule and the plan are in the packet; math/numbers.js and math/numbers.py compute them separately."""
import json, os

SYS = [
 # id, name, changes, interest, effort, critical, diff, market, seam, users
 ('A-01', 'Dispatch and routing', 31, 42, 160, 'High', True, False, True, 380),
 ('A-02', 'Customer portal', 24, 18, 120, 'High', True, False, True, 2600),
 ('A-03', 'Rate quoting', 19, 26, 90, 'High', True, False, True, 210),
 ('A-04', 'General ledger (custom)', 6, 9, 140, 'High', False, True, False, 45),
 ('A-05', 'Payroll (custom)', 4, 7, 70, 'Medium', False, True, False, 30),
 ('A-06', 'Driver mobile app', 14, 12, 150, 'High', True, False, True, 1900),
 ('A-07', 'Fuel card reconciliation', 0, 1, 20, 'Low', False, False, False, 6),
 ('A-08', 'Document scanning', 2, 3, 40, 'Medium', False, True, True, 120),
 ('A-09', 'Claims and damage', 9, 15, 60, 'Medium', True, False, True, 85),
 ('A-10', 'Old EDI gateway', 0, 2, 30, 'Low', False, False, False, 0),
 ('A-11', 'Yard management', 3, 2, 110, 'Medium', True, False, False, 140),
 ('A-12', 'HR intranet', 1, 1, 25, 'Low', False, True, False, 600),
]
OUT = {
 'note': 'Fictional. Written by tools/make-br14.py for packet BR-14; do not edit by hand.',
 'systems': [dict(zip(['id', 'name', 'changes', 'interest', 'effort', 'critical', 'diff', 'market', 'seam', 'users'], s)) for s in SYS],
 'budgetQ': 180, 'quarters': 4,
}
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'br14.json')
with open(path, 'w') as f:
    json.dump(OUT, f, indent=1)
    f.write('\n')
print('wrote', path)
