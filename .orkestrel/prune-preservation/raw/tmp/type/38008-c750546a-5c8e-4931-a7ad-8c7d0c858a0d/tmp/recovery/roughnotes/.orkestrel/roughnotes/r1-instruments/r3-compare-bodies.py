# Compares this workspace's `mergeOverride` and `isNamedPlugin` bodies against scaffold's
# committed copies, byte for byte. Reads the scaffold checkout through `git show`, which writes
# nothing there, and writes every extract into this repository's own `tmp/units/`.
# Run from the repository root: python tmp/units/r3-compare-bodies.py
#
# Supersedes `tmp/units/r2-compare-bodies.py`. One change: the negative control now runs inside
# the revision loop and compares the altered text against the COMMITTED extract, so it exercises
# the same operands, the same extraction on both sides, and the same git read the claim rests on.
# The r2 control compared the altered text against the local extract, which exercised the operator
# and never the comparison it certified. The control's alteration is a type token — `Set<number>`
# to `Set<string>` — rather than the single byte the r2 header claimed.
import io
import subprocess
import sys

SCAFFOLD = 'C:/Users/mikes/WebstormProjects/scaffold'
OPEN = 'export function mergeOverride('
CLOSE = '\n}\n'
SECOND = 'function isNamedPlugin('
ALTER = ('const taken = new Set<number>()', 'const taken = new Set<string>()')


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
io.open('tmp/units/r3-local-bodies.txt', 'w', encoding='utf-8', newline='').write(local)
altered = local.replace(ALTER[0], ALTER[1], 1)
if altered == local:
	sys.exit('the control alteration is absent from the local extract')
for revision in ['f83ee063', 'HEAD']:
	committed = extract(read_git(revision), 'scaffold ' + revision)
	io.open(
		'tmp/units/r3-scaffold-' + revision + '-bodies.txt', 'w', encoding='utf-8', newline=''
	).write(committed)
	# Control: the altered local text read against the SAME committed extract the claim is read
	# against, so the comparison that reports identity is the comparison the control breaks.
	print(
		revision,
		'identical:',
		committed == local,
		'bytes:',
		len(committed.encode('utf-8')),
		'control identical:',
		committed == altered,
	)
