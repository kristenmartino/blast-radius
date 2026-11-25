"""Writes data/br15.json: Calloway Software's open security findings (20), security tool inventory (10), privileged
accounts and critical vendors, all fictional, for packet BR-15 (First 90 days as CISO). Fixed values, no random numbers,
so running this again writes the same file.

Finding fields: id, system, finding, internet (internet-facing), kev (on CISA's Known Exploited Vulnerabilities catalog),
severity, ageDays (days open), owner ('' if no owner), exception (days until a risk exception expires; negative = expired
that many days ago; None = no exception).
Tool fields: id, tool, category, costK ($k a year), coverage (% of in-scope assets covered), owner.
The counts the packet asks for are computed in math/numbers.js and again in math/numbers.py."""
import json, os

FIND = [
 # id, system, finding, internet, kev, severity, ageDays, owner, exception
 ('F-01', 'Remote-access VPN appliance', 'Authentication bypass, vendor patch available', True, True, 'Critical', 41, '', None),
 ('F-02', 'Managed file transfer server', 'Remote code execution, vendor patch available', True, True, 'Critical', 23, '', None),
 ('F-03', 'Customer web app', 'Outdated web framework, remote code execution', True, True, 'Critical', 9, 'Storefront', None),
 ('F-04', 'Build server', 'Outdated automation server plugin', False, True, 'High', 64, 'Platform', -12),
 ('F-05', 'Email gateway', 'Missing security update', True, False, 'High', 17, 'IT Operations', None),
 ('F-06', 'Payroll system', 'Unsupported operating system', False, False, 'High', 210, 'Finance Systems', -30),
 ('F-07', 'Data warehouse', 'Service account with a password that never expires', False, False, 'High', 120, 'Data', 45),
 ('F-08', 'Customer support portal', 'Session tokens do not expire', True, False, 'Medium', 88, 'Support Tools', None),
 ('F-09', 'Office printers', 'Default administrator passwords', False, False, 'Medium', 300, '', None),
 ('F-10', 'HR system', 'Single sign-on not enforced', True, False, 'High', 55, 'People Systems', 20),
 ('F-11', 'Backup servers', 'Backups not tested in 12 months', False, False, 'High', 365, 'IT Operations', None),
 ('F-12', 'Marketing website', 'Outdated content management plugin', True, False, 'Medium', 140, 'Marketing', -60),
 ('F-13', 'Developer laptops', 'Disk encryption missing on 3% of devices', False, False, 'Medium', 70, 'IT Operations', None),
 ('F-14', 'Payments API', 'Weak TLS settings', True, False, 'Medium', 33, 'Payments', None),
 ('F-15', 'Legacy reporting server', 'Unsupported database version', False, False, 'High', 400, '', 90),
 ('F-16', 'Cloud storage', 'One storage bucket readable by anyone with the link', True, False, 'High', 6, 'Data', None),
 ('F-17', 'Domain controllers', 'Known-exploited privilege escalation, patch available', False, True, 'Critical', 28, 'IT Operations', None),
 ('F-18', 'Wi-Fi controllers', 'Firmware two versions behind', False, False, 'Low', 150, 'IT Operations', None),
 ('F-19', 'Source code repositories', 'No branch protection on 4 repositories', False, False, 'Medium', 21, 'Platform', None),
 ('F-20', 'CRM integration', 'API key stored in plain text', False, False, 'High', 48, 'Sales Systems', None),
]
TOOLS = [
 # id, tool, category, costK, coverage, owner
 ('T-01', 'Endpoint detection, vendor A', 'Endpoint detection', 310, 64, 'Security Operations'),
 ('T-02', 'Endpoint detection, vendor B', 'Endpoint detection', 240, 41, 'IT Operations'),
 ('T-03', 'Security event monitoring (SIEM)', 'Monitoring', 420, 70, 'Security Operations'),
 ('T-04', 'Vulnerability scanner', 'Vulnerability management', 95, 82, 'Security Operations'),
 ('T-05', 'Email filtering', 'Email security', 80, 100, 'IT Operations'),
 ('T-06', 'Single sign-on and MFA', 'Identity', 260, 88, 'IT Operations'),
 ('T-07', 'Password vault for admins', 'Identity', 70, 35, ''),
 ('T-08', 'Phishing simulation', 'Awareness', 45, 100, 'Security Operations'),
 ('T-09', 'Cloud posture scanner', 'Cloud security', 150, 58, 'Platform'),
 ('T-10', 'Data loss prevention, pilot', 'Data protection', 120, 5, ''),
]
OUT = {
 'note': 'Fictional. Written by tools/make-br15.py for packet BR-15; do not edit by hand.',
 'findings': [dict(zip(['id', 'system', 'finding', 'internet', 'kev', 'severity', 'ageDays', 'owner', 'exception'], f)) for f in FIND],
 'tools': [dict(zip(['id', 'tool', 'category', 'costK', 'coverage', 'owner'], t)) for t in TOOLS],
 'admins': {'total': 120, 'phishRes': 74, 'pushOnly': 38, 'none': 8},
 'vendors': {'total': 40, 'critical': 9, 'criticalReviewed12m': 5},
 'staff': 1400, 'kevSlaDays': 14,
}
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'br15.json')
with open(path, 'w') as f: json.dump(OUT, f, indent=1); f.write('\n')
print('wrote', path)
