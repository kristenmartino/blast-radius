"""Writes data/br8.json: Fernhill Group's AI request queue (fictional), 200 rows. The first 20 are the rows the
BR-8 packet shows for scoring; the other 180 fill each category to its total. Deterministic: run it again and the
file is identical. Fields: id, title, unit, cat, value 1-5, feas 1-5, risk L/M/H, pw (pod-weeks to build, 0 if not
a build), dupOf (id of the request it duplicates, or '')."""
import json, os, sys

SHOWN = [
 # id, title, unit, cat, value, feas, risk, pw, dupOf
 ('R-001', 'Auto-deny low-value claims that match fraud patterns', 'Claims', 'build', 5, 4, 'H', 6, ''),
 ('R-002', 'Draft replies to broker emails', 'Distribution', 'self', 3, 5, 'L', 0, ''),
 ('R-003', 'Extract fields from scanned invoices into the ledger', 'Finance', 'build', 4, 4, 'L', 4, ''),
 ('R-004', 'Summarize board papers for the executive team', 'Office of the CEO', 'self', 2, 5, 'L', 0, ''),
 ('R-005', 'Buy a meeting-notes tool for the sales team', 'Sales', 'vendor', 2, 5, 'M', 0, ''),
 ('R-006', 'Route inbound service emails to the right queue', 'Customer service', 'build', 4, 3, 'L', 4, ''),
 ('R-007', 'Route inbound service emails (Northern region)', 'Customer service', 'dup', 4, 3, 'L', 0, 'R-006'),
 ('R-008', 'Score job applicants from CVs', 'HR', 'risk', 3, 4, 'H', 5, ''),
 ('R-009', 'Chatbot for the staff intranet homepage', 'Communications', 'low', 1, 4, 'L', 3, ''),
 ('R-010', 'Forecast warehouse staffing by week', 'Operations', 'build', 4, 2, 'L', 6, ''),
 ('R-011', 'Write first drafts of policy wording changes', 'Underwriting', 'build', 3, 3, 'M', 5, ''),
 ('R-012', 'Translate customer letters into Spanish', 'Customer service', 'self', 3, 5, 'L', 0, ''),
 ('R-013', 'Buy an AI slide generator for marketing', 'Marketing', 'vendor', 2, 5, 'L', 0, ''),
 ('R-014', 'AI sales-coaching avatar the VP of Sales asked for', 'Sales', 'low', 2, 2, 'L', 6, ''),
 ('R-015', 'Flag late supplier deliveries from email threads', 'Procurement', 'build', 3, 3, 'L', 3, ''),
 ('R-016', 'Set credit limits for new trade customers', 'Finance', 'risk', 4, 3, 'H', 5, ''),
 ('R-017', 'Extract fields from scanned invoices (subsidiary)', 'Finance', 'dup', 4, 4, 'L', 0, 'R-003'),
 ('R-018', 'Summarize call recordings for quality review', 'Customer service', 'build', 4, 4, 'M', 4, ''),
 ('R-019', 'Write job descriptions', 'HR', 'self', 2, 5, 'L', 0, ''),
 ('R-020', 'Answer "where is my order" questions on the website', 'Customer service', 'build', 5, 3, 'M', 5, ''),
]
TOTALS = {'self': 60, 'dup': 40, 'vendor': 35, 'low': 25, 'build': 30, 'risk': 10}
UNITS = ['Finance', 'Sales', 'Operations', 'HR', 'Customer service', 'Marketing', 'Procurement', 'Claims', 'Underwriting', 'IT']
NAMES = {
 'self': 'Drafting or summarizing request', 'dup': 'Duplicate of an earlier request', 'vendor': 'Request to buy an AI tool',
 'low': 'Request with no owner or measurable outcome', 'build': 'Process automation build', 'risk': 'Decision about customers or staff'}

def rows():
    out = [dict(id=r[0], title=r[1], unit=r[2], cat=r[3], value=r[4], feas=r[5], risk=r[6], pw=r[7], dupOf=r[8]) for r in SHOWN]
    have = {k: sum(1 for r in out if r['cat'] == k) for k in TOTALS}
    builds = [r['id'] for r in out if r['cat'] == 'build']
    n = len(out)
    for cat in ['self', 'dup', 'vendor', 'low', 'build', 'risk']:
        for i in range(TOTALS[cat] - have[cat]):
            n += 1
            unit = UNITS[(n * 7) % len(UNITS)]
            if cat == 'self':   v, f, rk, pw, d = 2 + (i % 2), 5, 'L', 0, ''
            elif cat == 'dup':  v, f, rk, pw, d = 3, 4, 'L', 0, builds[i % len(builds)]
            elif cat == 'vendor': v, f, rk, pw, d = 2, 5, 'M' if i % 3 == 0 else 'L', 0, ''
            elif cat == 'low':  v, f, rk, pw, d = 1, 3 + (i % 2), 'L', 3, ''
            elif cat == 'build': v, f, rk, pw, d = 2 + (i % 3), 2 + (i % 3), 'M' if i % 4 == 0 else 'L', 3 + (i % 4), ''
            else:               v, f, rk, pw, d = 3 + (i % 2), 3, 'H', 5, ''
            out.append(dict(id='R-%03d' % n, title=NAMES[cat], unit=unit, cat=cat, value=v, feas=f, risk=rk, pw=pw, dupOf=d))
    return out

if __name__ == '__main__':
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'br8.json')
    data = {'shown': 20, 'rows': rows()}
    assert len(data['rows']) == 200
    with open(path, 'w') as f: json.dump(data, f, indent=1); f.write('\n')
    print('wrote', len(data['rows']), 'rows')
