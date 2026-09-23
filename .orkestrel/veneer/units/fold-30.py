#!/usr/bin/env python3
"""Roadmap fold 30: F8d IMPORTANCE-LONGHANDS landed; its carrier row closes and the F8 status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| `collectImportantNames` and the shared-name equality in the consumer proof[^\n]*$', s, re.M); assert m
cells=m.group(0).split('|'); assert len(cells)>=4
cells[2]=f" Closed: F8d IMPORTANCE-LONGHANDS at `{sha}` computes a shared name's importance over the longhands Tailwind's rule declares (`collectRuleLonghands` reads them as Chromium expands the rule, `collectImportantNames` reports a name only where every one carries `!important`), `LonghandRule` is the expanded rule's one declaration, and the consumer proof's branch case guards its reading "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
old="; F8d IMPORTANCE-LONGHANDS follows"
new=f"; F8d IMPORTANCE-LONGHANDS landed as `{sha}` (two rounds on `opus` on Opus 5 and the prose and guard round on `builder`, each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`)"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 30 applied with F8d',sha)
