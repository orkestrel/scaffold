#!/usr/bin/env python3
"""Roadmap fold 27: B-FORMS-MIXIN (D40) landed; the B-FORMS row records it."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old="; CONTROL is under audit"
new=f"; B-FORMS-MIXIN landed as `{sha}` (`builder` on Sonnet, D40: `control-type` and `control-border` in `_mixins.scss`, the select and the input-group text routed through them byte-identical); CONTROL is under audit"
assert s.count(old)==1,s.count(old); open(p,'w').write(s.replace(old,new)); print('fold 27 applied with B-FORMS-MIXIN',sha)
