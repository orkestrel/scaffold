#!/usr/bin/env python3
"""Roadmap fold 39: B-PASSIVE-CLOSE-B landed; its carrier row closes and the B-PASSIVE status sentence records it."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(item_start, text):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>=4, item_start
    cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close("`.page-link:focus` and `.btn-close:focus` write `outline: 0`", f"Closed: B-PASSIVE-CLOSE-B at `{sha}` includes `forced-ring` in both rules, reads each outline under `stageMedia({{ forced: true }})` by its style and width, and lands the guide sentences and the two Additions rows (D37, R10)")
old="and B-PASSIVE-CLOSE-B follows the forms family"
new=f"and B-PASSIVE-CLOSE-B landed as `{sha}` (audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`)"
assert s.count(old)==1, 'status sentence'; s=s.replace(old,new)
open(p,'w').write(s); print('fold 39 applied with CLOSE-B',sha)
