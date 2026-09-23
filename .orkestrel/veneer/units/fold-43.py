#!/usr/bin/env python3
"""Roadmap fold 43: CLOSE-REGISTRY landed; the driven-key lists row closes."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| The per-family driven-key lists[^\n]*$', s, re.M); assert m, 'row'
cells=m.group(0).split('|'); cells[2]=f" Closed: CLOSE-REGISTRY at `{sha}` declares the frozen `DRIVEN_KEYS` table in landing order, fixes the `CAPTURE_KEYS` spread, and selects the journeys' rows through the specimen tables (R2, D20) "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
open(p,'w').write(s); print('fold 43 applied with CLOSE-REGISTRY',sha)
