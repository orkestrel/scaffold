"""Compares every non-Summary cell of the guide against the committed baseline."""
import re, sys

CELL = re.compile(r'(?<!\\)\|')

def rows(path):
	out = {}
	order = []
	for line in open(path).read().split('\n'):
		if not line.startswith('|') or set(line.replace('|', '').replace(' ', '')) <= {'-'}:
			continue
		cells = [c.strip() for c in CELL.split(line)[1:-1]]
		if len(cells) < 2:
			continue
		key = cells[0]
		out.setdefault(key, []).append(cells)
		order.append(key)
	return out, order

base, base_order = rows(sys.argv[1])
now, now_order = rows(sys.argv[2])

print('rows in baseline:', len(base_order), 'rows now:', len(now_order))
missing = [k for k in base_order if k not in now]
added = [k for k in now_order if k not in base]
print('keys missing now:', missing)
print('keys added now:', added)

moved = []
for key, entries in now.items():
	before = base.get(key)
	if before is None:
		continue
	for one, two in zip(entries, before):
		if one[0] != two[0]:
			moved.append((key, 'column 1', two[0], one[0]))
		if len(one) > 1 and len(two) > 1 and one[1] != two[1]:
			moved.append((key, 'column 2', two[1], one[1]))
print('non-Summary cells moved in columns 1 and 2:', len(moved))
for one in moved:
	print('  ', one)
