"""Second, independent computation of every number in math/numbers.js, using exact decimal arithmetic.
Written from the rules in the packet and simulation text, not translated from the JS. build.js runs this and
fails if any value differs from the JS result by more than half a cent. Prints {path: value} as JSON."""
import json
import math
from decimal import Decimal as D, ROUND_HALF_UP

def c(x):  # round to the cent
    return D(x).quantize(D('0.01'), rounding=ROUND_HALF_UP)

def k(x):  # dollars to $k, 2 decimals
    return c(D(x) / 1000)

out = {}
def put(key, v):
    out[key] = float(v) if isinstance(v, D) else v

# ---- BRN-1 renewal simulation (fictional prices)
crm_price, crm_lic, crm_active, crm_inactive = D(1380), 650, 512, 41
crm_right = math.ceil(crm_active * 11 / 10)            # active users plus a 10% buffer, rounded up
for kk, v in [('crmPrice', 1380), ('crmLicensed', crm_lic), ('crmActive', crm_active), ('crmInactive180', crm_inactive), ('crmRight', crm_right)]:
    put(kk, v)
right_save = c((crm_lic - crm_right) * crm_price)
tight_save = c((crm_lic - crm_active) * crm_price)
re_add, re_months = 52, 6
re_add_cost = c(re_add * crm_price * re_months / D(12))
put('crmRightSave', right_save); put('crmTightSave', tight_save); put('reAdd', re_add); put('reAddMonths', re_months); put('reAddCost', re_add_cost)

suite, ent, dep, leavers, months = D(264), 1900, 2014, 96, 5
over, over_clean = dep - ent, dep - leavers - ent
true_up = c(over * suite * months / D(12))
true_up_clean = c(over_clean * suite * months / D(12))
for kk, v in [('suitePrice', 264), ('entitled', ent), ('deployed', dep), ('leavers', leavers), ('monthsLeft', months), ('over', over), ('overClean', over_clean)]:
    put(kk, v)
put('trueUp', true_up); put('trueUpClean', true_up_clean); put('trueUpAvoided', true_up - true_up_clean)

tally, t_seats, t_active, tier_min, migration = D(960), 180, 150, 700, D(38000)
tier = c(crm_price * D('0.88'))
baseline = crm_right * crm_price + t_seats * tally
keep_both = crm_right * crm_price + t_active * tally
cons_seats, cons_all = crm_right + t_active, crm_right + t_seats
cons_cost, cons_all_cost = c(cons_seats * tier), c(cons_all * tier)
for kk, v in [('tallyPrice', 960), ('tallySeats', t_seats), ('tallyActive', t_active), ('tierMin', tier_min), ('tierDiscPct', 12), ('migration', migration),
              ('tierPrice', tier), ('baseline', baseline), ('keepBoth', keep_both), ('consSeats', cons_seats), ('consAllSeats', cons_all),
              ('consCost', cons_cost), ('consAllCost', cons_all_cost), ('keepBothSave', baseline - keep_both), ('consGross', baseline - cons_cost),
              ('consNet', baseline - cons_cost - migration), ('consAllNet', baseline - cons_all_cost - migration)]:
    put(kk, v)

y1 = cons_cost
roll3 = c(y1 + y1 * D('1.07') + y1 * D('1.07') * D('1.07'))
lock3 = c(y1 * 3)
put('upliftPct', 7); put('year1', y1); put('roll3', roll3); put('lock3', lock3); put('termSave', roll3 - lock3)
put('termSaveY2', c(y1 * D('0.07'))); put('termSaveY3', c(y1 * (D('1.07') ** 2 - 1)))
put('flexPct', 5); put('overbuySeats', 800); put('overbuyCost3', c(800 * tier * 3))

prem, power = D(420), 60
put('premium', 420); put('power', power)
put('upsellAll', c(cons_seats * prem)); put('upsellPower', c(power * prem)); put('upsellSwapDisc', c(cons_cost * D('0.02')))

put('startK', 50)
cons_net = baseline - cons_cost - migration
put('bestPathK', c(50 + k(right_save) + k(true_up - true_up_clean) + k(cons_net)))
put('pv.s1.right', k(right_save)); put('pv.s1.tight', k(tight_save)); put('pv.s1.reAdd', -k(re_add_cost))
put('pv.s2.avoided', k(true_up - true_up_clean)); put('pv.s2.cut', k(true_up))
put('pv.s3.cons', k(cons_net)); put('pv.s3.keep', k(baseline - keep_both)); put('pv.s3.allPlanned', k(cons_net)); put('pv.s3.allActual', k(baseline - cons_all_cost - migration))

# ---- BR-1
per_user, acq_users, acq_erp, mig, integ, integ_run, syn = D(1200), 260, D(310000), D(1400000), D(220000), D(40000), D(450000)
ext_cost = c(acq_erp * D('1.15'))
users23 = c(acq_users * per_user * 2)
opt_a = mig + users23 + ext_cost
opt_b = acq_erp * 3 + integ + integ_run * 3
for kk, v in [('perUser', per_user), ('acqUsers', acq_users), ('acqErp', acq_erp), ('migErp', mig), ('extPct', 15), ('integ', integ), ('integRun', integ_run),
              ('synergy', syn), ('extCost', ext_cost), ('usersY23', users23), ('noticeMonths', 1), ('optA', opt_a), ('optB', opt_b),
              ('synergy2', syn * 2), ('optANet', opt_a - syn * 2), ('gap', opt_a - syn * 2 - opt_b), ('breakEvenSynergy', c((opt_a - opt_b) / 2))]:
    put('b1.' + kk, v)

# ---- BR-2
p_seat, a_seat, a_seats, a_acc, overlap = D(150), D(96), 95, 6800, 1240
a_cost, add_cost = a_seat * a_seats * 12, p_seat * a_seats * 12
for kk, v in [('pSeat', p_seat), ('aSeat', a_seat), ('aSeats', a_seats), ('aAccounts', a_acc), ('overlap', overlap), ('aCost', a_cost), ('addCost', add_cost),
              ('dupPct', float(D(overlap * 100) / a_acc).__round__(1)), ('delta', add_cost - a_cost)]:
    put('b2.' + kk, v)

# ---- BR-3
host, arch_once, arch_year = D(14000), D(38000), D(6000)
for kk, v in [('host', host), ('archOnce', arch_once), ('archYear', arch_year), ('hostYear', host * 12), ('archMonth', arch_year / 12),
              ('paybackMonths', (arch_once / (host - arch_year / 12)).quantize(D('0.01'), rounding=ROUND_HALF_UP)),
              ('firstYearSave', host * 12 - arch_once - arch_year)]:
    put('b3.' + kk, v)

# ---- BR-4
lic = D(5000000)
for kk, v in [('lic', lic), ('maintPct', 22), ('extPts', 2), ('maint', lic * D('0.22')), ('extYear', lic * D('0.02')), ('ext3', lic * D('0.02') * 3), ('maintExt', lic * D('0.24'))]:
    put('b4.' + kk, v)

# ---- BR-5
fields = 1140
for kk, v in [('fields', fields), ('deadPct', 61), ('breaks', 9), ('hoursRelease', 120), ('releases', 2), ('rate', 95),
              ('deadFields', int((D(fields) * D('0.61')).quantize(D(1), rounding=ROUND_HALF_UP))), ('hoursYear', 240), ('costYear', D(240) * 95)]:
    put('b5.' + kk, v)

# ---- BR-6: TIME quadrant from business value (functional fit) and technical fit, 3 or above counts as high
apps = [('Order hub', 5, 4, 420000), ('Field service app', 4, 2, 185000), ('Old intranet', 1, 2, 64000), ('Expense tool', 2, 4, 38000),
        ('Payroll bridge', 2, 1, 51000), ('Quote builder A', 3, 3, 72000), ('Quote builder B', 2, 2, 69000), ('Data warehouse', 5, 3, 310000),
        ('Shipping labels', 4, 1, 47000), ('Survey tool', 1, 4, 12000)]
def quad(v, f):
    hi_v, hi_f = v >= 3, f >= 3
    return {(True, True): 'Invest', (True, False): 'Migrate', (False, True): 'Tolerate', (False, False): 'Eliminate'}[(hi_v, hi_f)]
by = {}
for i, (n, v, f, cost) in enumerate(apps):
    q = quad(v, f)
    for kk, val in [('name', n), ('value', v), ('fit', f), ('cost', cost), ('quad', q)]:
        put('b6.apps.%d.%s' % (i, kk), val)
    by[q] = by.get(q, 0) + cost
for q, v in by.items():
    put('b6.byQuad.' + q, v)
put('b6.total', sum(a[3] for a in apps))

print(json.dumps(out, indent=1))
