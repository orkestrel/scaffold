#!/usr/bin/env python3
"""Roadmap fold 20: B-FORMS-CHECK landed on the session branch with a green chain; GROUP, FLOATING, and SELECT are in their fix rounds under audit; CONTROL implements."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old="CHECK landed from `/home/user/veneer-bfc` (report `units/b-forms-check-report-3.md`), and GROUP is next"
new=f"CHECK landed as `{sha}` (two rounds; its fix round audited by `analyst` on Astra and `reviewer` on Opus 5); GROUP, FLOATING, and SELECT are in their fix rounds under audit and land in that order; CONTROL implements in `/home/user/veneer-bfo`; CLOSE follows"
assert s.count(old)==1, s.count(old)
s=s.replace(old,new); open(p,'w').write(s); print('fold 20 applied with CHECK', sha)
