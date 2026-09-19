import io

TEMPLATE = '''# Red for: {title}
# Mutates the subject in vite.config.ts, runs the conformance project, restores the file, and
# reports the count it measured. Run from the repository root: python tmp/units/{name}.py
import io
import subprocess
import sys

PATH = 'vite.config.ts'
FIND = {find!r}
REPLACE = {replace!r}

original = io.open(PATH, encoding='utf-8', newline='').read()
if FIND not in original:
	sys.exit('the mutation target is absent from ' + PATH)
try:
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original.replace(FIND, REPLACE, 1))
	result = subprocess.run(
		[
			'node',
			'node_modules/vitest/vitest.mjs',
			'run',
			'--config',
			'vite.config.ts',
			'--no-cache',
			'--reporter=dot',
			'--project',
			'conformance',
		],
		capture_output=True,
		text=True,
		encoding='utf-8',
		errors='replace',
	)
finally:
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original)
report = (result.stdout or '') + (result.stderr or '')
io.open('tmp/units/{name}.log.txt', 'w', encoding='utf-8').write(report)
for line in report.splitlines():
	if 'FAIL' in line or 'Tests ' in line or 'Test Files' in line:
		print(line.encode('ascii', 'replace').decode('ascii'))
print('exit:', result.returncode)
'''

MUTATIONS = [
	(
		'r1-red-nested',
		'a nested override entry keeps its nesting',
		'\tconst candidates = override.plugins ?? []',
		'\tconst candidates = (override.plugins ?? []).flat()',
	),
	(
		'r1-red-caller-duplicate',
		'two caller entries sharing a name both survive',
		'\tfor (const [index, plugin] of candidates.entries()) {\n\t\tif (!taken.has(index)) selected.push(plugin)\n\t}',
		'\tconst appended = new Set()\n\tfor (const [index, plugin] of candidates.entries()) {\n\t\tif (taken.has(index)) continue\n\t\tconst key = isNamedPlugin(plugin) ? plugin.name : plugin\n\t\tif (appended.has(key)) continue\n\t\tappended.add(key)\n\t\tselected.push(plugin)\n\t}',
	),
	(
		'r1-red-position',
		'a named override entry replaces the base entry in its position',
		'\t\t\tselected.push(replacement)\n\t\t\ttaken.add(index)',
		'\t\t\tselected.push(plugin)\n\t\t\ttaken.add(index)',
	),
	(
		'r1-red-taken-once',
		'a base repeating a name keeps its second entry and takes one override entry once',
		'\t\t\t\t!taken.has(position) && isNamedPlugin(candidate) && candidate.name === plugin.name,',
		'\t\t\t\tisNamedPlugin(candidate) && candidate.name === plugin.name,',
	),
	(
		'r1-red-numbered-name',
		'an entry whose name is not a string is not named',
		"\t\t'name' in plugin &&\n\t\ttypeof plugin.name === 'string'",
		"\t\t'name' in plugin",
	),
	(
		'r1-red-discriminant',
		'command alone merges and command with mode is refused',
		"\tif (override === undefined || ('command' in override && 'mode' in override)) return base",
		"\tif (override === undefined || 'command' in override) return base",
	),
]

for name, title, find, replace in MUTATIONS:
	body = TEMPLATE.format(name=name, title=title, find=find, replace=replace)
	io.open('tmp/units/' + name + '.py', 'w', encoding='utf-8', newline='\n').write(body)
	print('wrote tmp/units/' + name + '.py')
