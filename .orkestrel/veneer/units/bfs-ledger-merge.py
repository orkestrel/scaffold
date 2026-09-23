#!/usr/bin/env python3
"""SELECT landing ledger merge: the six `.input-group-{lg,sm} > .form-select` rows attribute to `form-select` now that the key ships (the gate's printed rows); move them from the input-group group to the end of the form-select group with the key cell rewritten."""
import re
p='/home/user/veneer/guides/veneer.md'; lines=open(p).read().split('\n')
pat=re.compile(r"^\| `input-group` +\| `\.input-group-(lg|sm) > \.form-select` +\|")
moved=[i for i,l in enumerate(lines) if pat.match(l)]
assert len(moved)==6, moved
rows=[re.sub(r"^\| `input-group` +\|", "| `form-select`      |", lines[i], count=1) for i in moved]
for i in reversed(moved): del lines[i]
last=max(i for i,l in enumerate(lines) if l.startswith('| `form-select` '))
lines[last+1:last+1]=rows
open(p,'w').write('\n'.join(lines)); print('moved six rows after line', last+1)
