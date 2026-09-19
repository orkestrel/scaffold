# Red for: `readPlugins` refuses a configuration that declares no plugins.
# Applies the surviving mutation the objective lane found — widening the guard with `?? []`, which
# every conformance assertion tolerates — runs the `setup` project, restores the file, and reports
# the count it measured. Run from the repository root:
# python tmp/units/r3-red-setup-read-plugins.py
import io
import subprocess
import sys

PATH = 'tests/setup.ts'
FIND = "\treturn requireValue(config.plugins, 'The configuration carries no plugins')"
REPLACE = "\treturn requireValue(config.plugins ?? [], 'The configuration carries no plugins')"

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
			'setup',
		],
		capture_output=True,
		text=True,
		encoding='utf-8',
		errors='replace',
	)
finally:
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original)
report = (result.stdout or '') + (result.stderr or '')
io.open('tmp/units/r3-red-setup-read-plugins.log.txt', 'w', encoding='utf-8').write(report)
for line in report.splitlines():
	if 'FAIL' in line or 'Tests ' in line or 'Test Files' in line:
		print(line.encode('ascii', 'replace').decode('ascii'))
print('exit:', result.returncode)
