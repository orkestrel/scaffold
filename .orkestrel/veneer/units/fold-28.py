#!/usr/bin/env python3
"""Roadmap fold 28: B-FORMS-ASSETS (D26) landed; its carrier row closes."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| Theme-scope select caret and switch knob +\|[^\n]*$', s, re.M); assert m
row=m.group(0); cells=row.split('|'); assert len(cells)>=4
cells[2]=f" Closed: B-FORMS-ASSETS at `{sha}` removes `select-indicator` and `switch-knob` from `$assets`; the select and check partials declare each on its own dark rule, and `COMPONENT_DARK_ASSETS` names them for the theme and tokens proofs (D26) "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
old="; CONTROL is under audit"
new=f"; B-FORMS-ASSETS landed as `{sha}` (`builder` on Sonnet, D26; verified by `checker`); CONTROL is under audit"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 28 applied with B-FORMS-ASSETS',sha)
