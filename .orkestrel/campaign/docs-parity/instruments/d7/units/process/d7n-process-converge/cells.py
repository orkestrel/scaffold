import re, sys

SPLIT = re.compile(r'(?<!\\)\|')

def rows(path):
	out = {}
	lines = open(path, encoding='utf8').read().split('\n')
	i = 0
	table = 0
	while i < len(lines):
		if lines[i].startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s:-]+\|', lines[i + 1]):
			header = [c.strip() for c in SPLIT.split(lines[i])[1:-1]]
			j = i + 2
			table += 1
			while j < len(lines) and lines[j].startswith('|'):
				cells = [c.strip() for c in SPLIT.split(lines[j])[1:-1]]
				key = (table, cells[0])
				out[key] = dict(zip(header, cells))
				j += 1
			i = j
			continue
		i += 1
	return out

before = rows(sys.argv[1])
after = rows(sys.argv[2])
compared = 0
mismatch = 0
missing = 0
for key, cells in before.items():
	if key not in after:
		missing += 1
		print('ROW MISSING AFTER:', key)
		continue
	for header, value in cells.items():
		if header in ('Summary', 'Behavior'):
			continue
		compared += 1
		other = after[key].get(header)
		if other != value:
			mismatch += 1
			print('CELL CHANGED:', key, header, repr(value), '->', repr(other))
added = [k for k in after if k not in before]
print(f'rows before: {len(before)}, rows after: {len(after)}, non-Summary cells compared: {compared}, mismatched: {mismatch}, rows missing after: {missing}, rows added: {len(added)}')
for k in added:
	print('ROW ADDED:', k)
