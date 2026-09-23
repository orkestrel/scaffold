#!/usr/bin/env python3
"""Roadmap fold 31: B-FORMS-CONTROL landed; its two carrier rows close and the B-FORMS status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(prefix, text):
    global s
    m=re.search(r'^\| '+re.escape(prefix)+r'[^\n]*$', s, re.M); assert m, prefix
    cells=m.group(0).split('|'); assert len(cells)>=4
    cells[2]=f" Closed: B-FORMS-CONTROL at `{sha}` {text} "
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close("The input-group frames show a grouped control with the browser's own border", "ships the `.form-control` rule, so the input-group frames regenerated at this landing show the grouped control with its own border and the seam paints one column")
close("Floating text-control frames show bare user-agent controls", "ships the `.form-control` rule, so every floating text-control frame regenerated at this landing shows the floated label over the styled control")
old="; CONTROL is under audit (`analyst` on Astra, `reviewer` on Opus 5, `checker`)"
new=f"; CONTROL landed as `{sha}` (three rounds: two on `opus` and the prose round on `builder`, each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`; D40 applied to `.form-control`, D40a carried by B-FORMS-RENAME)"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 31 applied with CONTROL',sha)
