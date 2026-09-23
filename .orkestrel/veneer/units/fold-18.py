#!/usr/bin/env python3
"""Roadmap fold 18: B-PASSIVE-C landed. Rewrites the B-PASSIVE row's status clause."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'
s=open(p).read()
old="D landed as `bcf938c`, B as `7b922b6`, and E as `70a7487` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix rounds by `analyst`); A and C returned from their fix rounds and are under audit; B-SWEEP landed as `71b7388` under D15"
new="D landed as `bcf938c`, B as `7b922b6`, E as `70a7487`, and C as `C_SHA` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix rounds by `analyst`); A is audited and lands next; B-SWEEP landed as `71b7388` under D15"
assert s.count(old)==1, s.count(old)
open(p,'w').write(s.replace(old,new.replace('C_SHA',sha)))
print('fold 18 applied with', sha)
