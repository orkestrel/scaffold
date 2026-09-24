# Writes the unit's `#### <key>` departure tables into the validation copy's guide from the rows the
# ledger gate printed, each table at its sorted heading position in the first ledger block.
import re, sys
log = open('/home/user/veneer-usp/tmp/units/usp-base-conformance-2.log.txt').read()
rows = re.findall(r'^\+\s+"([^"]+ \| (?:tokenized|dropped|declared|aliased|fallback))",?$', log, re.M)
tables = {}
for row in rows:
    cells = [c.strip() for c in row.split(' | ')]
    tables.setdefault(cells[0], []).append(cells)
def code(v):
    return v if v in ('—', '(empty)') else f'`{v}`'
def render(key):
    out = [f'#### `{key}`', '', '| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |', '| --- | --- | --- | --- | --- | --- | --- |']
    for c in tables[key]:
        out.append('| ' + ' | '.join([code(c[0]), code(c[1]), code(c[2]), code(c[3]), code(c[4]), code(c[5]), c[6]]) + ' |')
    return '\n'.join(out) + '\n\n'
p = 'guides/veneer.md'
s = open(p).read()
start = s.index('### Departures\n')
end = s.index('#### `is-invalid`')
headings = [(m.start() + start, m.group(1)) for m in re.finditer(r'^#### `([^`]+)`$', s[start:end], re.M)]
keys = sorted(tables, key=lambda k: [ord(ch) for ch in k])
inserts = []
for key in keys:
    after = [pos for pos, name in headings if [ord(ch) for ch in name] > [ord(ch) for ch in key]]
    at = after[0] if after else end
    inserts.append((at, render(key)))
for at, text in sorted(sorted(inserts, key=lambda x: [ord(ch) for ch in x[1].split('`')[1]], reverse=True), key=lambda x: -x[0]):
    s = s[:at] + text + s[at:]
# stable order for equal positions: re-sort by rebuilding is simpler; insertions at the same position
# are written in reverse, so reverse them back.
open(p, 'w').write(s)
print(len(rows), sorted(tables))
