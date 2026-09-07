import re, sys
from pathlib import Path
log = sys.argv[1]
pattern = re.compile(r'^(?P<path>[^:]+):(?P<line>\d+):\d+: error policy\(no-malformed-summary\)')
for raw in Path(log).read_text(encoding='utf8').splitlines():
	m = pattern.match(raw)
	if m is None:
		continue
	path, start = m.group('path'), int(m.group('line'))
	lines = Path(path).read_text(encoding='utf8').splitlines()
	n = start
	while True:
		text = re.sub(r'^\s*/?\*+/?', '', lines[n - 1]).strip()
		if text:
			break
		n += 1
	print(f'{path}:{n}|{lines[n - 1]}')
