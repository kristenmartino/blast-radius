"""Writes data/br16.json: Calloway Software's security measures for the last four quarters and next year's candidate
security investments, all fictional, for packet BR-16 (Quarterly board security briefing from raw data). Fixed values.

Quarter fields: q, kevDue (internet-facing KEV findings due in the quarter), kevMet (fixed within the 14-day target),
mttdH (median hours from compromise to detection, from incident reviews), mttcH (median hours from detection to
containment), admins and adminsPR (privileged accounts, and those on phishing-resistant MFA), critVendors and critReviewed
(critical vendors, and those reviewed in the last 12 months), sev1 and sev2 (incidents by severity), sent and clicked
(phishing-test emails), planK and spentK (security budget and spend, $k).
Investment fields: id, name, costK (first-year cost, $k), cutK (reduction in expected annual loss, $k, from the risk register).
The best set within the budget is found by checking every combination, in math/numbers.js and again in math/numbers.py."""
import json, os

Q = [
 # q, kevDue, kevMet, mttdH, mttcH, admins, adminsPR, critVendors, critReviewed, sev1, sev2, sent, clicked, planK, spentK
 ('Q1', 30, 18, 52, 30, 118, 60, 9, 3, 2, 6, 1400, 99, 1050, 980),
 ('Q2', 31, 22, 41, 26, 120, 74, 9, 5, 1, 5, 1400, 90, 1050, 1010),
 ('Q3', 32, 27, 30, 19, 121, 98, 10, 7, 1, 7, 1420, 71, 1050, 1060),
 ('Q4', 37, 35, 22, 14, 122, 116, 10, 9, 0, 4, 1430, 60, 1050, 1040),
]
INV = [
 ('I-1', 'Phishing-resistant MFA for all staff', 300, 520),
 ('I-2', 'Endpoint detection on the remaining 35% of devices', 400, 450),
 ('I-3', 'Isolated, tested backups', 250, 380),
 ('I-4', 'Replace the security event monitoring tool', 600, 300),
 ('I-5', 'Data loss prevention, full rollout', 350, 140),
 ('I-6', 'Third-party review analyst', 150, 160),
]
OUT = {
 'note': 'Fictional. Written by tools/make-br16.py for packet BR-16; do not edit by hand.',
 'quarters': [dict(zip(['q', 'kevDue', 'kevMet', 'mttdH', 'mttcH', 'admins', 'adminsPR', 'critVendors', 'critReviewed', 'sev1', 'sev2', 'sent', 'clicked', 'planK', 'spentK'], q)) for q in Q],
 'investments': [dict(zip(['id', 'name', 'costK', 'cutK'], i)) for i in INV],
 'budgetK': 1000,
}
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'br16.json')
with open(path, 'w') as f: json.dump(OUT, f, indent=1); f.write('\n')
print('wrote', path)
