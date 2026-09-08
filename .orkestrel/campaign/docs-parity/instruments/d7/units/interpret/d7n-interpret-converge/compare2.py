import re, pathlib
CELL = re.compile(r'(?<!\\)\|')

def tables(path):
    lines = pathlib.Path(path).read_text(encoding='utf-8').split('\n')
    out, cur = [], None
    for line in lines:
        if line.startswith('| '):
            cells = [c.strip() for c in CELL.split(line)[1:-1]]
            if cells and set(''.join(cells)) <= {'-'}:
                continue
            if cur is None: cur = {'header': cells, 'rows': []}
            else: cur['rows'].append(cells)
        else:
            if cur is not None: out.append(cur); cur = None
    if cur is not None: out.append(cur)
    return out

b, n = tables('tmp/d7n-interpret-converge/base.md'), tables('guides/interpret.md')
print('table count baseline', len(b), 'new', len(n))
COMPARED = {'Summary', 'Behavior', 'Narrows to', 'Builds…'}
bad = []
for i, (tb, tn) in enumerate(zip(b, n)):
    if len(tb['rows']) != len(tn['rows']):
        bad.append((i, 'row count', len(tb['rows']), len(tn['rows']))); continue
    for j, (rb, rn) in enumerate(zip(tb['rows'], tn['rows'])):
        mb = dict(zip(tb['header'], rb))
        mn = dict(zip(tn['header'], rn))
        for col, val in mb.items():
            if col in COMPARED or col == 'Shape':
                continue
            if mn.get(col) != val:
                bad.append((i, j, col, val, mn.get(col)))
print('differences outside Summary and Shape:', bad)
