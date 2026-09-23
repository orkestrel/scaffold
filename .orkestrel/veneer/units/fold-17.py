#!/usr/bin/env python3
"""Roadmap fold 17: B-FORMS-RANGE landed. Rewrites the B-FORMS row's status clause."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD~0']).decode().strip()
p='/home/user/veneer/ROADMAP.md'
s=open(p).read()
old="VALIDATION landed as `d4f78e5` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`); RANGE launched 2026-09-22 from `3a9202a` and is in its fix round"
new="VALIDATION landed as `d4f78e5` and RANGE as `RANGE_SHA` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, RANGE's fix rounds by `analyst`); GROUP is next"
assert s.count(old)==1, s.count(old)
s=s.replace(old,new.replace('RANGE_SHA',sha))
anchor=next(l for l in s.split('\n') if l.startswith('| The per-family driven-key lists'))
cells=anchor.split('|')
item='The guide\'s § Tests stem table omits the scenarios the VALIDATION, D, B, RANGE, A, and C units registered (only E added its rows)'
carrier='B-PASSIVE-CLOSE adds every registered stem once, or derives the table from the registry under a parity check in `tests/guides/`'
row='| '+item.ljust(len(cells[1])-2)+' | '+carrier.ljust(len(cells[2])-2)+' |'
s=s.replace(anchor, anchor+'\n'+row)
open(p,'w').write(s)
print('fold 17 applied with', sha)
