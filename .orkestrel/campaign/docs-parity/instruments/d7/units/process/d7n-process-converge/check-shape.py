import re

# Parse interfaces from the two types modules.
decls = {}
for path in ('src/core/types.ts', 'src/server/types.ts'):
	src = open(path, encoding='utf8').read()
	# strip block comments
	stripped = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
	for match in re.finditer(r'export (interface|type) (\w+)\s*(?:=\s*)?\{(.*?)\n\}', stripped, re.S):
		kind, name, body = match.group(1), match.group(2), match.group(3)
		data, calls = [], []
		for line in body.split('\n'):
			line = line.strip()
			m = re.match(r'readonly (\w+)(\??):', line)
			if m:
				data.append(m.group(1) + m.group(2))
				continue
			m = re.match(r'(\w+)(\??)\s*[<(]', line)
			if m:
				calls.append(m.group(1))
		decls[name] = (data, calls)

cells = {}
for line in open('guides/process.md', encoding='utf8'):
	m = re.match(r'\| `(\w+)` +\| (interface|type) +\| `([^`]+)` +\|', line)
	if m:
		cells[m.group(1)] = m.group(3)

bad = 0
for name, cell in cells.items():
	if name not in decls:
		print('NO DECLARATION PARSED:', name, cell)
		continue
	data, calls = decls[name]
	expected = '{ ' + ', '.join(data) + ' }'
	if calls:
		expected += ' plus ' + ', '.join(dict.fromkeys(calls))
	if cell != expected:
		bad += 1
		print('MISMATCH', name)
		print('   cell:', cell)
		print('   decl:', expected)
print('cells checked:', len(cells), 'mismatched:', bad)
