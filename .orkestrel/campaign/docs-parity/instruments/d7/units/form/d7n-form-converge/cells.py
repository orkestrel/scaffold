import io, re, sys

SPLIT = re.compile(r'(?<!\\)\|')

def tables(path):
    with io.open(path, encoding='utf-8') as fh:
        lines = fh.read().split('\n')
    rows = {}
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith('|') and i + 1 < len(lines) and set(lines[i + 1].replace('|', '').replace(' ', '').replace(':', '')) == {'-'}:
            header = [c.strip() for c in SPLIT.split(line)[1:-1]]
            j = i + 2
            while j < len(lines) and lines[j].startswith('|'):
                cells = [c.strip() for c in SPLIT.split(lines[j])[1:-1]]
                key = (header[0], cells[0])
                rows[key] = dict(zip(header, cells))
                j += 1
            i = j
            continue
        i += 1
    return rows

before = tables(sys.argv[1])
after = tables(sys.argv[2])
missing = [k for k in before if k not in after]
added = [k for k in after if k not in before]
changed = []
for key, cells in before.items():
    if key not in after:
        continue
    for column, value in cells.items():
        if column == 'Summary':
            continue
        now = after[key].get(column)
        if now != value:
            changed.append((key, column, value, now))
print('rows before: %d, rows after: %d' % (len(before), len(after)))
print('rows missing after: %s' % (missing or 'none'))
print('rows added after: %s' % (added or 'none'))
print('non-Summary cells changed: %d' % len(changed))
for row in changed:
    print('  %s [%s]\n    before: %s\n    after:  %s' % row)
