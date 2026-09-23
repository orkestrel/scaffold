#!/usr/bin/env python3
"""D22 regroup for the A landing: move the `.btn-close` departure rows out of the `btn` table of the
A worktree's ledger into their own `#### \`btn-close\`` table placed after the `btn` table, with the
key column rewritten, so the merged guide attributes each row to its most specific key."""
import re
p='/home/user/veneer-ba/guides/ledger/departures.md'
lines=open(p).read().split('\n')
out=[]; moved=[]; key=None; btn_end=None
for i,l in enumerate(lines):
    m=re.match(r'^#### `([^`]+)`', l)
    if m: key=m.group(1)
    if l.startswith('### ') : key=None
    if key=='btn' and l.startswith('| `btn`') and re.match(r"^\| `btn`\s+\| `\.btn-close", l):
        moved.append(re.sub(r'^\| `btn`(\s+)\|', lambda mm: '| `btn-close`'+mm.group(1)[:-len('-close')]+'|' if len(mm.group(1))>len('-close') else '| `btn-close` |', l, count=1))
        continue
    out.append(l)
# find the end of the btn table in `out`: the line before the next `#### ` after `#### `btn``
start=next(i for i,l in enumerate(out) if l.startswith('#### `btn`'))
end=next(i for i in range(start+1,len(out)) if out[i].startswith('#### ') or out[i].startswith('### '))
header=[l for l in out[start+1:end] if l.startswith('| ') and not l.startswith('| `')]  # the header and separator rows
while end>start and out[end-1].strip()=='' : end-=1
block=['', '#### `btn-close`', '']+header+moved
out[end:end]=block
open(p,'w').write('\n'.join(out))
print('moved', len(moved), 'rows; header rows', len(header))
for r in moved[:3]: print(r[:100])
