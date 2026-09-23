import json, re, collections, sys
S = sys.argv[1]
base = json.load(open(S + '/base-ruled.json'))
cur = json.load(open(S + '/cur-ruled.json'))
MANUAL = {
    "`` `light`, dark `dark` ``": 'permitted as a table cell (the span quotes the written form of a value cell)',
    "`Role`,": 'permitted as a noun following a token list',
}
def quote(h):
    q = h['quote']
    if h['rule'] == 'link': return q
    return q
def key(h):
    return (h['section'], quote(h))
def ruling(h):
    if h['section'] == '### Reference map' and quote(h) == '`light`,':
        return 'permitted as a table cell (the span quotes the written form of a value cell)'
    if quote(h) == '`Role`,':
        return 'permitted as a noun following a token list'
    return h['ruling']
curq = collections.defaultdict(list)
for h in cur: curq[key(h)].append(h)
rows = []
for h in base:
    k = key(h)
    match = curq[k].pop(0) if curq[k] else None
    r = ruling(h)
    if r is None:
        if match is not None and ruling(match) is None:
            sys.exit(f'unfixed: {k}')
        r = 'fixed'
        if match is not None: r = ruling(match)
    rows.append((h['section'], quote(h), str(h['line']), str(match['line']) if match else '—', r))
for k, left in curq.items():
    for h in left:
        r = ruling(h)
        if r is None: sys.exit(f'unruled new hit: {k}')
        rows.append((h['section'], quote(h), '—', str(h['line']), r))
def cell(s):
    return s.replace('|', '\\|').strip()
out = []
out.append('| Quoted text | Section | Line at `88684bc` | Line after edits | Ruling |')
out.append('| --- | --- | --- | --- | --- |')
for sec, q, bl, cl, r in rows:
    out.append(f'| {cell(q)} | {cell(sec.lstrip("#").strip())} | {bl} | {cl} | {r} |')
counts = collections.Counter(r if not r.startswith('permitted as a table cell') else 'permitted as a table cell' for *_, r in rows)
open(S + '/ledger-rows.md', 'w').write('\n'.join(out) + '\n')
print(len(rows), dict(counts))
remaining = [h for h in cur if ruling(h) is None]
print('unruled after edits:', len(remaining))
