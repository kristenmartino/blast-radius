"""Writes data/br13.json: Halyard Software's service inventory (16 services), last quarter's P1 incident log and
the sprint throughput the team reported, all fictional, for packet BR-13 (First 90 days as CTO). Fixed values, no random
numbers, so running this again writes the same file.

Service fields: id, name, team ('' if no owning team), customer (customer-facing), deploys (production deployments last
quarter), fails (deployments that needed immediate intervention), leadDays (median days from commit to production),
eosDays (days until the runtime loses vendor support, -1 = supported), req30 (requests in the last 30 days, thousands),
cost (cloud cost, dollars a month).
Incident fields: id, service, minutes (customer-facing downtime), cause.
Throughput: stories finished in each of the last six two-week sprints, Pellmar backlog size and weeks to the promised date.
The counts the packet asks for are computed in math/numbers.js and again in math/numbers.py."""
import json, os

SVC = [
 # id, name, team, customer, deploys, fails, leadDays, eosDays, req30 (k), cost ($/month)
 ('S-01', 'Web app', 'Storefront', True, 38, 3, 2, -1, 41200, 9800),
 ('S-02', 'Order service', 'Orders', True, 9, 4, 11, -1, 18600, 7400),
 ('S-03', 'Payments gateway', '', True, 3, 1, 19, 45, 6100, 3900),
 ('S-04', 'Search', 'Storefront', True, 22, 1, 3, -1, 23900, 6200),
 ('S-05', 'Catalog API', 'Catalog', True, 17, 2, 4, -1, 15700, 4100),
 ('S-06', 'Pricing engine', 'Catalog', False, 6, 1, 8, -1, 9200, 2800),
 ('S-07', 'Notifications', 'Platform', True, 12, 0, 3, -1, 8800, 1900),
 ('S-08', 'Identity and login', 'Platform', True, 5, 0, 6, 210, 12400, 3300),
 ('S-09', 'Reporting exports', '', False, 1, 0, 25, -1, 140, 2600),
 ('S-10', 'Legacy admin portal', '', False, 0, 0, 0, -1, 0, 3100),
 ('S-11', 'Data pipeline', 'Data', False, 14, 2, 5, -1, 3300, 8700),
 ('S-12', 'Recommendations (pilot)', 'Data', True, 4, 1, 9, -1, 0, 4200),
 ('S-13', 'Billing sync', 'Orders', False, 2, 1, 14, -1, 2100, 1200),
 ('S-14', 'Feature flags', 'Platform', False, 8, 0, 2, -1, 31000, 600),
 ('S-15', 'Old mobile API v1', '', True, 0, 0, 0, -1, 0, 2400),
 ('S-16', 'Internal wiki', 'Platform', False, 3, 0, 1, -1, 260, 300),
]
INC = [
 ('P1-01', 'Order service', 47, 'Database connection pool exhausted during a promotion'),
 ('P1-02', 'Order service', 38, 'Bad deployment rolled back by hand'),
 ('P1-03', 'Payments gateway', 26, 'Certificate expired'),
 ('P1-04', 'Order service', 55, 'Queue backlog after a retry storm'),
 ('P1-05', 'Search', 12, 'Index rebuild ran during business hours'),
 ('P1-06', 'Order service', 31, 'Bad deployment rolled back by hand'),
 ('P1-07', 'Web app', 9, 'Configuration change to the content delivery network'),
 ('P1-08', 'Order service', 43, 'Database connection pool exhausted during a promotion'),
]
OUT = {
 'note': 'Fictional. Written by tools/make-br13.py for packet BR-13; do not edit by hand.',
 'services': [dict(zip(['id', 'name', 'team', 'customer', 'deploys', 'fails', 'leadDays', 'eosDays', 'req30', 'cost'], s)) for s in SVC],
 'incidents': [dict(zip(['id', 'service', 'minutes', 'cause'], i)) for i in INC],
 'sprints': [15, 18, 14, 17, 16, 16],
 'pellmarItems': 140, 'pellmarWeeks': 10, 'quarterDays': 90, 'slo': 99.9,
}
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'br13.json')
with open(path, 'w') as f:
    json.dump(OUT, f, indent=1)
    f.write('\n')
print('wrote', path)
