#!/usr/bin/env python3
"""Roadmap fold 24: B-FORMS-FLOATING landed with FLOOR."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old="; FLOATING and SELECT are in their fix rounds and land in that order; CONTROL implements in `/home/user/veneer-bfo`; CLOSE follows"
new=f"; FLOATING landed as `{sha}` with FLOOR (D32; its fix round audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its prose and proof round on `builder`; D34, D35, D38); SELECT lands next; CONTROL is under audit (`analyst` on Astra, `reviewer` on Opus 5, `checker`); CLOSE follows"
assert s.count(old)==1,s.count(old); open(p,'w').write(s.replace(old,new)); print('fold 24 applied with FLOATING',sha)
