import io, re, sys

SPLIT = re.compile(r'(?<!\\)\|')

def rows(path):
	out = {}
	for line in io.open(path, encoding='utf-8'):
		line = line.rstrip('\n')
		if not line.startswith('| '):
			continue
		cells = [c.strip() for c in SPLIT.split(line)[1:-1]]
		if not cells or set(''.join(cells)) <= set('- :'):
			continue
		key = cells[0]
		out.setdefault(key, []).append(cells)
	return out

before = rows(sys.argv[1])
after = rows(sys.argv[2])
missing = [k for k in before if k not in after]
added = [k for k in after if k not in before]
changed = []
for key, blist in before.items():
	alist = after.get(key)
	if alist is None:
		continue
	for b, a in zip(blist, alist):
		# the last cell of the converged row is its Summary; compare every earlier cell.
		for i in range(min(len(b), len(a) - 1) if len(a) > len(b) else min(len(b) - 1, len(a) - 1)):
			if b[i] != a[i]:
				changed.append((key, i, b[i], a[i]))
print('rows before:', sum(len(v) for v in before.values()))
print('rows after: ', sum(len(v) for v in after.values()))
print('keys only before:', missing)
print('keys only after: ', added)
print('non-Summary cell differences:', len(changed))
for c in changed:
	print('  ', c)
