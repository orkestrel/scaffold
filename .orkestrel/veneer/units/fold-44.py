#!/usr/bin/env python3
"""Roadmap fold 44: CLOSE-MOTION landed; the reduced-motion literal row closes."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| The reduced-motion query literal[^\n]*$', s, re.M); assert m, 'row'
cells=m.group(0).split('|'); cells[2]=f" Closed: CLOSE-MOTION at `{sha}` exports `REDUCED_MOTION` from the styles setup module, routes every proof's reading and expected condition through it, and routes every selector-list split through `splitTopLevelList` (R3, R9) "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
m2=re.search(r'^\| Bare code tokens that predate the label units[^\n]*$', s, re.M); assert m2, 'prose row'
row=m2.group(0); cells=row.split('|')
cells[1]=cells[1].rstrip()+"; the button-group proof's own `selectorText` splits (two sites, one a multi-line chain) outside CLOSE-MOTION's R9 scope; the bare `{@link}` tokens that predate CLOSE-REGISTRY in `tests/setupStyles.ts` and `tests/setupServer.ts` "
s=s[:m2.start()]+'|'.join(cells)+s[m2.end():]
open(p,'w').write(s); print('fold 44 applied with CLOSE-MOTION',sha)
