import re
import subprocess
import sys


def rows(path: str) -> dict:
	text = open(path).read()
	lines = text.split('\n')
	out = {}
	header = None
	for index, line in enumerate(lines):
		if not line.startswith('| '):
			header = None
			continue
		cells = [cell.strip() for cell in line.strip().strip('|').split('|')]
		if index + 1 < len(lines) and lines[index + 1].startswith('| ---'):
			header = cells
			continue
		if header is None or set(line.replace('|', '').replace('-', '').strip()) == set():
			continue
		key = cells[0]
		kept = [
			f'{name}={value}'
			for name, value in zip(header, cells)
			if name not in ('Summary', 'Behavior', 'Purpose', 'Describes', 'Builds')
		]
		out.setdefault(key, []).append(' '.join(kept))
	return out


before = rows('tmp/d7n-probe-converge/baseline.md')
after = rows('guides/probe.md')
for key in sorted(set(before) | set(after)):
	left = before.get(key)
	right = after.get(key)
	if left != right:
		print(f'{key}\n  baseline: {left}\n  now:      {right}')
