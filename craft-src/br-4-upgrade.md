# When to take a major ERP upgrade

Ardent Medical Supply (fictional) runs an on-premises ERP whose vendor ends mainstream maintenance in 18 months. The vendor's sales team says to move now. The company also closes an acquisition next quarter. Prices and companies are invented; the support model mirrors how SAP describes its Business Suite 7 maintenance.

## Packet

### Facts

- Licence value (the maintenance basis): {{$b4.lic}}.
- Mainstream maintenance: {{b4.maintPct}}% of the basis a year, {{$b4.maint}}.
- After mainstream ends: optional extended maintenance for three years at {{b4.extPts}} percentage points more on the basis; after that, customer-specific maintenance.
- Moving to the vendor's cloud ERP: about 20 months and {{$b4.lic}}-plus in program cost (vendor estimate).
- The acquisition closes next quarter; integrating it needs the same finance and ERP team for about 12 months.

### Note from the vendor's account executive

> When mainstream maintenance ends, you're unsupported. You need to sign this quarter.

### Note from the COO

> We cannot run the acquisition integration and an ERP replacement with the same people at the same time.

### Task

Hand back four stages.

1. Explain what ends when mainstream maintenance ends, and what does not.
2. Work out the annual cost of extended maintenance and its three-year total.
3. Propose a sequence for the acquisition and the ERP move.
4. Write the recommendation for the CEO in three sentences.

Planted: a vendor claim that overstates the support cliff, and a team conflict with the acquisition.

## Key

### Support

The system does not stop working. Mainstream ends; optional extended maintenance continues support for three more years at a higher rate; customer-specific maintenance follows. (SAP's published model for Business Suite 7: mainstream to end of 2027, optional extended to end of 2030 at a two-point premium, then customer-specific.)

### Arithmetic

- Extended maintenance premium: {{b4.extPts}}% × {{$b4.lic}} = {{$b4.extYear}} a year; {{$b4.ext3}} over three years.
- Maintenance during extended: {{b4.maintPct}} + {{b4.extPts}} = 24% of the basis, {{$b4.maintExt}} a year.

## Model answer

### Stage 1

- Mainstream maintenance ends; the system keeps running.
- Extended maintenance is optional, for three years, at a higher rate. Then customer-specific maintenance.
- "Unsupported" is wrong for the next three years if extended maintenance is bought.

### Stage 2

- {{$b4.extYear}} a year more; {{$b4.ext3}} over three years. Maintenance rises to {{$b4.maintExt}} a year.

### Stage 3

- Integrate the acquisition first (about 12 months) on the current ERP.
- Buy extended maintenance as a bridge.
- Start ERP selection and design in parallel with a small team, and run the migration once the integration team is free.

### Stage 4

- "Mainstream support ending does not stop the ERP; extended maintenance keeps it supported for three more years for about {{$b4.extYear}} a year. We recommend integrating the acquisition first, buying extended maintenance as a bridge, and starting the ERP move once the integration team is free. We'll bring a vendor and timeline decision within six months."

## Grading notes

- A strong hand-back corrects the "unsupported" claim from the support model.
- The arithmetic matches the key.
- The sequence respects the shared team and names extended maintenance as a deliberate bridge, with a date for the next decision.
