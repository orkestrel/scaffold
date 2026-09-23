#!/usr/bin/env python3
"""Roadmap fold 42: CLOSE-ID landed; the FORM_CHECK_SPECIMENS carrier row closes."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
m=re.search(r'^\| The `FORM_CHECK_SPECIMENS` doc block[^\n]*$', s, re.M); assert m, 'row'
cells=m.group(0).split('|'); cells[2]=f" Closed: CLOSE-ID at `{sha}` writes the `id` attribute in the block, the form the label specimens' block carries "
s=s[:m.start()]+'|'.join(cells)+s[m.end():]
open(p,'w').write(s); print('fold 42 applied with CLOSE-ID',sha)
