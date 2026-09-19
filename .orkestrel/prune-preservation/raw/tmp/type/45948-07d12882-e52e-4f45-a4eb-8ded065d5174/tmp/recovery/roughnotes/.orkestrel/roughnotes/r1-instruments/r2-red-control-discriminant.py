# Red for: the discriminant case's CONTROL, isolated.
# `r1-red-discriminant.py` proves the case reds when the subject is mutated to the rival, but it
# reds on the case's own first assertion, so the control line never executes. This script applies
# the same subject mutation AND removes that first assertion, so the control is the only reading
# left that can fail. It restores both files in a `finally` block.
# Run from the repository root: python tmp/units/r2-red-control-discriminant.py
import io
import subprocess
import sys

CONFIG = 'vite.config.ts'
CONFIG_FIND = "\tif (override === undefined || ('command' in override && 'mode' in override)) return base"
CONFIG_REPLACE = "\tif (override === undefined || 'command' in override) return base"

TEST = 'tests/conformance.test.ts'
TEST_FIND = '\t\texpect(merged.base).toBe(COMMAND_ONLY.base)\n'
TEST_REPLACE = ''

config_original = io.open(CONFIG, encoding='utf-8', newline='').read()
test_original = io.open(TEST, encoding='utf-8', newline='').read()
if CONFIG_FIND not in config_original:
	sys.exit('the subject mutation target is absent from ' + CONFIG)
if TEST_FIND not in test_original:
	sys.exit('the isolated assertion is absent from ' + TEST)
try:
	io.open(CONFIG, 'w', encoding='utf-8', newline='').write(
		config_original.replace(CONFIG_FIND, CONFIG_REPLACE, 1)
	)
	io.open(TEST, 'w', encoding='utf-8', newline='').write(
		test_original.replace(TEST_FIND, TEST_REPLACE, 1)
	)
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
	io.open(CONFIG, 'w', encoding='utf-8', newline='').write(config_original)
	io.open(TEST, 'w', encoding='utf-8', newline='').write(test_original)
report = (result.stdout or '') + (result.stderr or '')
io.open('tmp/units/r2-red-control-discriminant.log.txt', 'w', encoding='utf-8').write(report)
for line in report.splitlines():
	if 'FAIL' in line or 'Tests ' in line or 'Test Files' in line or 'narrowed.base' in line:
		print(line.encode('ascii', 'replace').decode('ascii'))
print('exit:', result.returncode)
