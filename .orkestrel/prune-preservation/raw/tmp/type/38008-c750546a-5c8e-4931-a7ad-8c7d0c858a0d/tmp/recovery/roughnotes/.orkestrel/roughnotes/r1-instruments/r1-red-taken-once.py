# Red for: a base repeating a name keeps its second entry and takes one override entry once
# Mutates the subject in vite.config.ts, runs the conformance project, restores the file, and
# reports the count it measured. Run from the repository root: python tmp/units/r1-red-taken-once.py
import io
import subprocess
import sys

PATH = 'vite.config.ts'
FIND = '\t\t\t\t!taken.has(position) && isNamedPlugin(candidate) && candidate.name === plugin.name,'
REPLACE = '\t\t\t\tisNamedPlugin(candidate) && candidate.name === plugin.name,'

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
io.open('tmp/units/r1-red-taken-once.log.txt', 'w', encoding='utf-8').write(report)
for line in report.splitlines():
	if 'FAIL' in line or 'Tests ' in line or 'Test Files' in line:
		print(line.encode('ascii', 'replace').decode('ascii'))
print('exit:', result.returncode)
