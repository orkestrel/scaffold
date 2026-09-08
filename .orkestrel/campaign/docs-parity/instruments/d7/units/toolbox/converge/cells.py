import re, sys, subprocess

def tables(text):
	rows = {}
	header = None
	for line in text.split('\n'):
		if not line.startswith('|'):
			header = None
			continue
		cells = [c.strip() for c in re.split(r'(?<!\\)\|', line)[1:-1]]
		if all(set(c) <= set('-: ') and c for c in cells):
			continue
		if header is None:
			header = cells
			continue
		rows[cells[0]] = dict(zip(header, cells))
	return rows

base = tables(open('tmp/d7n-toolbox-converge/guide-base.md').read())
now = tables(open('guides/toolbox.md').read())
ignored = {'Summary', 'Behavior', 'Value', 'Shape'}
changed = 0
missing = 0
for key, cols in base.items():
	if key not in now:
		print('row missing after:', key); missing += 1
		continue
	for h, v in cols.items():
		if h in ignored:
			continue
		after = now[key].get(h)
		if after != v:
			print(f'{key}: [{h}] before {v!r} after {after!r}'); changed += 1
print(f'rows compared: {len(base)}, rows missing after: {missing}, non-compared cells changed: {changed}')
