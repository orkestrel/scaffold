#!/usr/bin/env python3
"""Roadmap fold 32: the CONTROL rounds 5 and 6 audits' stale-prose findings join the D31 carrier (B-FORMS-CLOSE)."""
import re
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
anchor=re.search(r'^\| The D40 mixins are named `control-type` and `control-border`[^\n]*\n', s, re.M); assert anchor
row=("| The later paragraph of the `### Input group classes` section still says the text control and select classes carry no radius of their own and that the floating wrapper is a plain box; the `INPUT_GROUP_ROUNDING` doc block and the input-group corner proof's comment say the same; and the input-group focus case's comment keeps the outer-column model of a browser-drawn border (the CONTROL round-6 audit) "
     "| B-FORMS-CLOSE retires the fixture (D31) and rewrites each sentence to the shipped radius, border, and floating rules, with the focus comment reading that the button's leading border paints over the shared border until the control is lifted past it |\n")
s=s[:anchor.end()]+row+s[anchor.end():]
open(p,'w').write(s); print('fold 32 applied')
