#!/usr/bin/env python3
"""Roadmap fold 25: B-FORMS-SELECT landed."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old="; SELECT lands next; CONTROL is under audit"
new=f"; SELECT landed as `{sha}` (its fix round audited by `analyst` on Astra and `reviewer` on Opus 5, its prose rounds by `checker` and the Orchestrator; D36, D37); CONTROL is under audit"
assert s.count(old)==1,s.count(old); open(p,'w').write(s.replace(old,new)); print('fold 25 applied with SELECT',sha)
