import re, subprocess, sys

def split_row(line):
    # split on a pipe not preceded by a backslash
    parts = re.split(r'(?<!\\)\|', line)
    return [p.strip() for p in parts[1:-1]]

def tables(text):
    lines = text.split('\n')
    out = {}
    i = 0
    while i < len(lines) - 1:
        if lines[i].startswith('| ') and re.match(r'^\|[\s:-]+\|', lines[i+1]):
            header = split_row(lines[i])
            rows = {}
            j = i + 2
            while j < len(lines) and lines[j].startswith('| '):
                cells = split_row(lines[j])
                if cells:
                    rows[cells[0]] = cells
                j += 1
            out.setdefault(tuple(header), {}).update(rows)
            i = j
        else:
            i += 1
    return out

base = subprocess.run(['git', 'show', 'HEAD:guides/brief.md'], capture_output=True, text=True).stdout
now = open('guides/brief.md').read()
bt, nt = tables(base), tables(now)
# flatten to key -> (header, cells)
def flat(t):
    d = {}
    for h, rows in t.items():
        for k, cells in rows.items():
            d[k] = (h, cells)
    return d
b, n = flat(bt), flat(nt)
print('rows baseline:', len(b), 'rows now:', len(n))
for k in sorted(set(b) | set(n)):
    if k not in b:
        print('ADDED   ', k); continue
    if k not in n:
        print('REMOVED ', k); continue
    bh, bc = b[k]; nh, nc = n[k]
    for idx, name in enumerate(nh):
        if name == 'Summary':
            continue
        bidx = bh.index(name) if name in bh else None
        if bidx is None:
            print(f'NEWCOL  {k}: {name} = {nc[idx]!r}')
            continue
        if bc[bidx] != nc[idx]:
            print(f'CHANGED {k}: {name}\n    base {bc[bidx]!r}\n    now  {nc[idx]!r}')
