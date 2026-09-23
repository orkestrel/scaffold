#!/usr/bin/env python3
"""Roadmap fold 40: F7b CAPTION-SPECIMEN landed; its carrier row closes and its status row records the landing."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def setcell(item_start, text, col=2):
    global s
    m=re.search(r'^\| '+re.escape(item_start)+r'[^\n]*$', s, re.M); assert m, item_start
    cells=m.group(0).split('|'); assert len(cells)>col+1, item_start
    cells[col]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
setcell("Caption opt-out", f"Closed: F7b CAPTION-SPECIMEN at `{sha}` renders the `Caption at bottom` specimen carrying `caption-bottom` after `Caption at top` and lists it in the section proof (F6 FOUNDATION landed the opt-out, `04114c5`)")
setcell("F7b CAPTION-SPECIMEN", f"landed as `{sha}` (`builder` on Sonnet, verified by `checker`)")
open(p,'w').write(s); print('fold 40 applied with F7b',sha)
