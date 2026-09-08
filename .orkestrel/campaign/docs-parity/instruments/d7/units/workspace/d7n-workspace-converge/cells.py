import re, sys, pathlib
SPLIT = re.compile(r'(?<!\\)\|')
def tables(path):
    lines = pathlib.Path(path).read_text().split('\n')
    out, cur = [], []
    for line in lines:
        if line.startswith('| '):
            cur.append(line)
        else:
            if cur: out.append(cur); cur = []
    if cur: out.append(cur)
    return out
def cells(line):
    parts = SPLIT.split(line)
    return [p.strip() for p in parts[1:-1]]
def rows(path):
    d = {}
    for tbl in tables(path):
        header = cells(tbl[0])
        for line in tbl[2:]:
            c = cells(line)
            key = c[0]
            d.setdefault(key, []).append((tuple(header), tuple(c)))
    return d
a = rows(sys.argv[1]); b = rows(sys.argv[2])
compared = 0; changed = 0; missing = 0
for key, before in a.items():
    after = b.get(key)
    if after is None or len(after) != len(before):
        print(f'ROW MISSING AFTER: {key}'); missing += 1; continue
    for (h0, r0), (h1, r1) in zip(before, after):
        # compare only cells whose header is not the compared column
        keep0 = {h: v for h, v in zip(h0, r0) if h not in ('Summary', 'Behavior', 'Purpose', 'Shape / Purpose')}
        keep1 = {h: v for h, v in zip(h1, r1) if h != 'Summary'}
        for h, v in keep0.items():
            if h in keep1:
                compared += 1
                if keep1[h] != v:
                    print(f'CELL CHANGED {key} [{h}]: {v!r} -> {keep1[h]!r}'); changed += 1
print(f'rows before: {sum(len(v) for v in a.values())}, rows after: {sum(len(v) for v in b.values())}')
print(f'non-Summary cells compared: {compared}, changed: {changed}, rows missing after: {missing}')
