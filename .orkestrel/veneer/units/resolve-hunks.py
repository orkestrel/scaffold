#!/usr/bin/env python3
"""Resolve cherry-pick conflict hunks in a file where both sides appended at the same place.
For each hunk: a hunk whose two sides are Markdown table rows is merged the way resolve-files-table.py
merges (HEAD's rows, the other side's new rows inserted after their predecessor, changed rows
replaced); any other hunk becomes HEAD's lines followed by the other side's lines that HEAD's block
does not already contain (a union). A hunk where the two sides each hold exactly one differing line
is printed as REWRITE and left for the operator. Usage: resolve-hunks.py <file> [--apply]."""
import re, sys
path = sys.argv[1]; apply = '--apply' in sys.argv
text = open(path).read()
pattern = re.compile(r'^<<<<<<< [^\n]*\n(.*?)^=======\n(.*?)^>>>>>>> [^\n]*\n', re.S | re.M)
def key(line):
    cells = [c.strip() for c in line.strip().strip('|').split('|')]
    return cells[0] if cells else ''
def norm(line): return re.sub(r'\s+', ' ', line.strip())
def merge_table(head, other):
    result = list(head); prev = None
    for line in other:
        if not line.startswith('| `'): prev = None; continue
        k = key(line); idx = [i for i, l in enumerate(result) if l.startswith('| `') and key(l) == k]
        if idx:
            if norm(result[idx[0]]) != norm(line): result[idx[0]] = line
        else:
            if prev is not None:
                pi = [i for i, l in enumerate(result) if l.startswith('| `') and key(l) == prev]
                result.insert(pi[0] + 1, line) if pi else result.append(line)
            else:
                last = max((i for i, l in enumerate(result) if l.startswith('| `')), default=len(result) - 1)
                result.insert(last + 1, line)
        prev = k
    return result
out = []; pos = 0; n = 0; rewrites = []
for m in pattern.finditer(text):
    n += 1
    head = m.group(1).split('\n'); other = m.group(2).split('\n')
    if head and head[-1] == '': head.pop()
    if other and other[-1] == '': other.pop()
    table = sum(l.startswith('| `') for l in head + other) >= max(1, (len(head) + len(other)) // 2)
    if table:
        merged = merge_table(head, other); kind = 'table'
    elif len(head) == 1 and len(other) == 1:
        merged = head + other; kind = 'append-both'; rewrites.append((n, head[0], other[0]))
    else:
        headset = {norm(l) for l in head}
        contained = all(norm(l) in headset for l in other if l.strip() != '')
        merged = head if contained else head + other; kind = 'union' + (' (contained)' if contained else '')
    print(f'hunk {n}: {kind} head={len(head)} other={len(other)} -> {len(merged)}')
    out.append(text[pos:m.start()]); out.append('\n'.join(merged) + '\n'); pos = m.end()
out.append(text[pos:])
if apply: open(path, 'w').write(''.join(out))
for r in rewrites: print('REWRITE', r)
