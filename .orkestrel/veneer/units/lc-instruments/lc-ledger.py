"""lc-ledger.py: rewrites the guide ledger rows the conformance gate reports.

It reads the rows the `records every measured value difference in the guide ledger` case prints
from a conformance log, and in the shared guide copy under tmp/probe/lc-shared replaces the Veneer
cell of each row keyed by the same component, selector, property, and condition. The Departure
cell is left as written. Usage: python3 lc-ledger.py CONFORMANCE_LOG
"""
import re
import sys
from pathlib import Path

log = re.sub(r'\x1b\[[0-9;]*m', '', Path(sys.argv[1]).read_text())
section = log.split('> records every measured value difference in the guide ledger', 1)[1]
section = section.split('> names no departure the compiled cascade no longer carries', 1)[0]
rows = {}
for match in re.finditer(r'^\+\s+"(.*)",?$', section, re.M):
    cells = [cell.strip() for cell in match.group(1).split(' | ')]
    component, selector, prop, condition, release, veneer, departure = cells
    rows[(component, selector, prop, condition)] = veneer
guide = Path('/home/user/veneer-lc/tmp/probe/lc-shared/guides/veneer.md')
lines = guide.read_text().split('\n')
done = set()
for index, line in enumerate(lines):
    if not line.startswith('| `'):
        continue
    cells = line.split('|')[1:-1]
    if len(cells) != 7:
        continue
    key = tuple(cell.strip().strip('`') for cell in cells[:4])
    if key in rows:
        cells[5] = f' `{rows[key]}` '
        lines[index] = '|' + '|'.join(cells) + '|'
        done.add(key)
guide.write_text('\n'.join(lines))
missing = sorted(set(rows) - done)
print(f'rewrote {len(done)} rows; unmatched: {missing}')
