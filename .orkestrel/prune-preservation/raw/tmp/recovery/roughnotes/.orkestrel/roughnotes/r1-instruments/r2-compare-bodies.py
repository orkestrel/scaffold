# Compares this workspace's `mergeOverride` and `isNamedPlugin` bodies against scaffold's
# committed copies, byte for byte. Reads the scaffold checkout through `git show`, which writes
# nothing there, and writes every extract into this repository's own `tmp/units/`.
# Run from the repository root: python tmp/units/r2-compare-bodies.py
import io
import subprocess
import sys

SCAFFOLD = 'C:/Users/mikes/WebstormProjects/scaffold'
OPEN = 'export function mergeOverride('
CLOSE = '\n}\n'
SECOND = 'function isNamedPlugin('


def extract(text, label):
	start = text.find(OPEN)
	if start < 0:
		sys.exit('no mergeOverride declaration in ' + label)
	second = text.find(SECOND, start)
	if second < 0:
		sys.exit('no isNamedPlugin declaration in ' + label)
	end = text.find(CLOSE, second)
	if end < 0:
		sys.exit('no isNamedPlugin terminator in ' + label)
	return text[start : end + len(CLOSE)]


def read_git(revision):
	result = subprocess.run(
		['git', '-C', SCAFFOLD, 'show', revision + ':vite.config.ts'],
		capture_output=True,
		text=True,
		encoding='utf-8',
		errors='replace',
	)
	if result.returncode != 0:
		sys.exit('git show ' + revision + ' failed: ' + (result.stderr or ''))
	return result.stdout.replace('\r\n', '\n')


local = extract(io.open('vite.config.ts', encoding='utf-8', newline='').read(), 'roughnotes')
io.open('tmp/units/r2-local-bodies.txt', 'w', encoding='utf-8', newline='').write(local)
for revision in ['f83ee063', 'HEAD']:
	committed = extract(read_git(revision), 'scaffold ' + revision)
	io.open(
		'tmp/units/r2-scaffold-' + revision + '-bodies.txt', 'w', encoding='utf-8', newline=''
	).write(committed)
	print(revision, 'identical:', committed == local, 'bytes:', len(committed.encode('utf-8')))

# Control: one altered byte must report a difference, so the comparison is known to discriminate.
altered = local.replace('const taken = new Set<number>()', 'const taken = new Set<string>()', 1)
print('control differs from local:', altered != local)
