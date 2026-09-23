#!/usr/bin/env python3
"""Roadmap fold 19: B-PASSIVE-A landed; the passive family's units are all on main."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'
s=open(p).read()
old_start=s.index("| B-PASSIVE                | units A to E on `opus`")
old_end=s.index("\n", old_start)
row=s[old_start:old_end]
cells=row.split('|')
status=cells[2]
i=status.index('D landed as')
new_status=status[:i]+"landed: D as `bcf938c`, B as `7b922b6`, E as `70a7487`, C as `C_SHA`, and A as `A_SHA` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix rounds by `analyst`); B-SWEEP landed as `71b7388` under D15; B-PASSIVE-CLOSE carries the family's cross-cutting rows"
cells[2]=new_status
s=s[:old_start]+'|'.join(cells)+s[old_end:]
import re
c=re.search(r"and C as `([0-9a-f]+)`", status)
s=s.replace('C_SHA', c.group(1) if c else 'unknown').replace('A_SHA', sha)
open(p,'w').write(s)
print('fold 19 applied with A', sha)
