#!/usr/bin/env python3
"""Resolve a one-hunk conflict in a Markdown table (the guide's § Files table) by taking HEAD's block and
folding in the other side's row-level changes: a row whose File cell HEAD lacks is inserted after the row
that precedes it on the other side (or appended); a row whose File cell HEAD has but whose text differs
(whitespace collapsed) replaces HEAD's row. Usage: resolve-files-table.py <path>. Repad with oxfmt after."""
import re, sys
path = sys.argv[1]
text = open(path).read()
m = re.search(r'^<<<<<<< [^\n]*\n(.*?)^=======\n(.*?)^>>>>>>> [^\n]*\n', text, re.S | re.M)
if not m: sys.exit('no single conflict hunk')
head, other = m.group(1).split('\n'), m.group(2).split('\n')
def key(line):
    cells = [c.strip() for c in line.strip().strip('|').split('|')]
    return cells[0] if cells else ''
def norm(line): return re.sub(r'\s+', ' ', line.strip())
head_keys = {key(l): i for i, l in enumerate(head) if l.startswith('| `')}
other_rows = [l for l in other if l.startswith('| `')]
head_norm = {norm(l) for l in head}
result = list(head)
inserted, replaced = [], []
prev_key = None
for line in other_rows:
    k = key(line)
    if k in head_keys:
        i = next(i for i, l in enumerate(result) if l.startswith('| `') and key(l) == k)
        if norm(result[i]) != norm(line):
            # replace only if HEAD's row equals the base's role text; here we trust the other side's edit
            result[i] = line; replaced.append(k)
    else:
        if prev_key is not None and any(l.startswith('| `') and key(l) == prev_key for l in result):
            i = next(i for i, l in enumerate(result) if l.startswith('| `') and key(l) == prev_key)
            result.insert(i + 1, line)
        else:
            last = max(i for i, l in enumerate(result) if l.startswith('| `'))
            result.insert(last + 1, line)
        inserted.append(k)
    prev_key = k
merged = text[:m.start()] + '\n'.join(result) + text[m.end():]
open(path, 'w').write(merged)
print('inserted', inserted); print('replaced', replaced)
