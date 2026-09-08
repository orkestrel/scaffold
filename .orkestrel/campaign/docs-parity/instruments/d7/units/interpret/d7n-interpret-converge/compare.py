import re, pathlib
CELL = re.compile(r'(?<!\\)\|')

def tables(path):
    lines = pathlib.Path(path).read_text(encoding='utf-8').split('\n')
    out, cur = [], None
    for line in lines:
        if line.startswith('| '):
            cells = [c.strip() for c in CELL.split(line)[1:-1]]
            if set(''.join(cells)) <= {'-'} and cells:
                continue
            if cur is None:
                cur = {'header': cells, 'rows': []}
            else:
                cur['rows'].append(cells)
        else:
            if cur is not None:
                out.append(cur); cur = None
    if cur is not None: out.append(cur)
    return out

def index(path):
    d = {}
    for tb in tables(path):
        h = tb['header']
        for row in tb['rows']:
            key = row[0]
            d[key] = dict(zip(h, row))
    return d

base, new = index('tmp/d7n-interpret-converge/base.md'), index('guides/interpret.md')
COMPARED = {'Summary', 'Behavior', 'Narrows to', 'Builds…'}
missing = sorted(set(base) - set(new))
added = sorted(set(new) - set(base))
diffs = []
for key in sorted(set(base) & set(new)):
    b, n = base[key], new[key]
    for col, val in b.items():
        if col in COMPARED: continue
        if col == 'Shape' and 'Shape' in n and n['Shape'] != val:
            diffs.append((key, col, val, n['Shape'])); continue
        if col in n and n[col] != val:
            diffs.append((key, col, val, n[col]))
print('rows only in baseline:', missing)
print('rows only in the new guide:', added)
print('non-Summary cell differences:')
for d in diffs: print('   ', d)
print('headers baseline:', sorted({tuple(t["header"]) for t in tables("tmp/d7n-interpret-converge/base.md")}))
print('headers new     :', sorted({tuple(t["header"]) for t in tables("guides/interpret.md")}))
