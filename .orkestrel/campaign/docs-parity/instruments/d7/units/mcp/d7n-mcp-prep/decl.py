import re, sys
from pathlib import Path

log, only = sys.argv[1], sys.argv[2]
pattern = re.compile(r'^(?P<path>[^:]+):(?P<line>\d+):\d+: error policy\(no-malformed-summary\)')
for raw in Path(log).read_text(encoding='utf8').splitlines():
	m = pattern.match(raw)
	if m is None or m.group('path') != only:
		continue
	path, start = m.group('path'), int(m.group('line'))
	lines = Path(path).read_text(encoding='utf8').splitlines()
	end = start
	while '*/' not in lines[end - 1]:
		end += 1
	block = []
	for n in range(start, end + 1):
		text = re.sub(r'^\s*/?\*+/?', '', lines[n - 1]).strip()
		if text.startswith('@'):
			break
		if text:
			block.append(text)
	decl = lines[end].strip() if end < len(lines) else ''
	print(f'{path}:{start} <<{decl}>>')
	print('    ' + ' '.join(block))
