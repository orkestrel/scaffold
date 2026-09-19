# Red for: `createNamedEntry` answers a distinct entry on every call, so a caller compares entries
# by reference. Applies the memoizing rival — one entry per name, cached — runs the `setup`
# project, restores the file, and reports the count it measured. Run from the repository root:
# python tmp/units/r3-red-setup-named-entry.py
import io
import subprocess
import sys

PATH = 'tests/setup.ts'
FIND = """export function createNamedEntry(name: string): Plugin {
	return { name }
}"""
REPLACE = """const built = new Map<string, Plugin>()
export function createNamedEntry(name: string): Plugin {
	const existing = built.get(name)
	if (existing !== undefined) return existing
	const created: Plugin = { name }
	built.set(name, created)
	return created
}"""

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
io.open('tmp/units/r3-red-setup-named-entry.log.txt', 'w', encoding='utf-8').write(report)
for line in report.splitlines():
	if 'FAIL' in line or 'Tests ' in line or 'Test Files' in line:
		print(line.encode('ascii', 'replace').decode('ascii'))
print('exit:', result.returncode)
