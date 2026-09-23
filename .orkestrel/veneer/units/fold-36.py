#!/usr/bin/env python3
"""Roadmap fold 36: B-FORMS-CLOSE-SPECIMENS landed; its carrier rows close and the B-FORMS status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close('Validation tooltip specimens:', f"Closed: B-FORMS-CLOSE-SPECIMENS at `{sha}` renders `Input group valid tooltip` and `Input group invalid tooltip` as resting element frames over each specimen, whose button-led group is the room the tooltip hangs over, and the journey reads each hanging key's display, room, and stacking through a geometry gate (D6, D31, R1)")
close('Cascade-key prose (the `CASCADE_KEYS` doc block', f"Closed: B-FORMS-CLOSE-SPECIMENS at `{sha}` describes the population by its rule and names no member in the doc block and the rest case title")
m=re.search(r'^\| The later paragraph of the `### Input group classes` section still says[^\n]*$', s, re.M); assert m
cells=m.group(0).split('|')
cells[2]=cells[2].replace("B-FORMS-CLOSE-SPECIMENS rewrites the focus comment to read", f"B-FORMS-CLOSE-SPECIMENS at `{sha}` rewrote the focus comment to read")
assert cells[2].startswith(' Closed') or True
cells[2]=' Closed: '+cells[2].strip()+' '
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
old="FORCED after TABLES,"
new=f"SPECIMENS landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker` in each round); FORCED after TABLES,"
assert s.count(old)==1; s=s.replace(old,new)
open(p,'w').write(s); print('fold 36 applied with SPECIMENS',sha)
