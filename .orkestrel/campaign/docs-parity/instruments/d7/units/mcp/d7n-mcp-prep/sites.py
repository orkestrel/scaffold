import re, sys
from pathlib import Path

pattern = re.compile(r'^(?P<path>[^:]+):(?P<line>\d+):\d+: error policy\(no-banned-term\): Replace (?P<term>.+?) in this comment')
seen = set()
for raw in Path('tmp/d7n-mcp-prep/lint-before.log.txt').read_text(encoding='utf8').splitlines():
	m = pattern.match(raw)
	if m is None:
		continue
	key = (m.group('path'), m.group('line'), m.group('term'))
	if key in seen:
		continue
	seen.add(key)
	path, start, term = m.group('path'), int(m.group('line')), m.group('term')
	lines = Path(path).read_text(encoding='utf8').splitlines()
	end = start
	body = lines[start - 1]
	if body.strip().startswith('/*'):
		while '*/' not in lines[end - 1]:
			end += 1
	else:
		while end < len(lines) and lines[end].strip().startswith('//'):
			end += 1
	needle = re.compile(re.escape(term), re.IGNORECASE)
	for n in range(start, end + 1):
		if needle.search(lines[n - 1]):
			print(f'{path}:{n} [{term}] {lines[n - 1]}')
