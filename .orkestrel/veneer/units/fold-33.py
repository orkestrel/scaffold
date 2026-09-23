#!/usr/bin/env python3
"""Roadmap fold 33: B-FORMS-RENAME (D40a) landed; its carrier row closes and the B-FORMS status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| The D40 mixins are named `control-type` and `control-border`[^\n]*$', s, re.M); assert m
cells=m.group(0).split('|'); assert len(cells)>=4
cells[2]=f" Closed: B-FORMS-RENAME at `{sha}` names them `input-text` and `input-border` for the release's `$input-*` family, with the compile byte-identical and the `INPUT_GROUP_CASES` remark in the `FORM_CONTROL_CASES` remark's voice (D40a) "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
old="D40a carried by B-FORMS-RENAME)"
new=f"D40a carried by B-FORMS-RENAME); B-FORMS-RENAME landed as `{sha}` (`builder` on Sonnet, D40a; audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`)"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 33 applied with RENAME',sha)
