#!/usr/bin/env python3
"""Roadmap fold 22: B-FORMS-GROUP landed."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old_re=r"CHECK landed as `43d954c` \(two rounds; its fix round audited by `analyst` on Astra and `reviewer` on Opus 5\); GROUP, FLOATING, and SELECT are in their fix rounds under audit and land in that order; CONTROL implements in `/home/user/veneer-bfo`; CLOSE follows"
new=f"CHECK landed as `43d954c` (two rounds; its fix round audited by `analyst` on Astra and `reviewer` on Opus 5) and GROUP as `{sha}` (three rounds; its fix round audited by `analyst` on Astra and `reviewer` on Opus 5, its prose round by `checker`; `_input-group.scss` loads before `_validation.scss`, the release's order); FLOATING and SELECT are in their fix rounds and land in that order; CONTROL implements in `/home/user/veneer-bfo`; CLOSE follows"
s,n=re.subn(old_re,new,s); assert n==1,n
open(p,'w').write(s); print('fold 22 applied with GROUP',sha)
