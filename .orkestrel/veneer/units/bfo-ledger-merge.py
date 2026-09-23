#!/usr/bin/env python3
"""CONTROL landing ledger merge: the four `.input-group-{lg,sm} > .form-control` rows attribute to `form-control` now that the key ships (the gate's printed rows); move them from the input-group group to the end of the form-control group with the key cell rewritten."""
import re
p='/home/user/veneer/guides/veneer.md'; lines=open(p).read().split('\n')
pat=re.compile(r"^\| `input-group` +\| `\.input-group-(lg|sm) > \.form-control` +\|")
moved=[i for i,l in enumerate(lines) if pat.match(l)]
assert len(moved)==4, moved
rows=[re.sub(r"^\| `input-group` +\|", "| `form-control`     |", lines[i], count=1) for i in moved]
for i in reversed(moved): del lines[i]
last=max(i for i,l in enumerate(lines) if l.startswith('| `form-control` '))
lines[last+1:last+1]=rows
open(p,'w').write('\n'.join(lines)); print('moved four rows after line', last+1)
