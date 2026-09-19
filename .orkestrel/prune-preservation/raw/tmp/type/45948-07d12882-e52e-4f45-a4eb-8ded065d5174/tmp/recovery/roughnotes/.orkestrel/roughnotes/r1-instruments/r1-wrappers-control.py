# Control for the wrapper comparison. Mutates the merge's refusal so every factory call returns a
# changed base, captures again, and reports whether the comparison still reads identical. It must
# read False: a comparison that reads True here measures nothing. Run from the repository root.
import io
import json
import os
import subprocess
import sys

PATH = 'vite.config.ts'
FIND = "\tif (override === undefined || ('command' in override && 'mode' in override)) return base"
REPLACE = "\tif (override === undefined || ('command' in override && 'mode' in override))\n\t\treturn { ...base, base: '/control/' }"


def capture(target):
	environment = dict(os.environ, CAPTURE_PATH=target)
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
			'probe',
		],
		capture_output=True,
		text=True,
		encoding='utf-8',
		errors='replace',
		env=environment,
	)
	if result.returncode != 0:
		sys.exit((result.stdout or '') + (result.stderr or ''))
	return json.load(io.open(target, encoding='utf-8'))


original = io.open(PATH, encoding='utf-8', newline='').read()
if FIND not in original:
	sys.exit('the mutation target is absent from ' + PATH)
try:
	ported = capture('tmp/units/r1-wrappers-ported.json')
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original.replace(FIND, REPLACE, 1))
	controlled = capture('tmp/units/r1-wrappers-control.json')
finally:
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original)
print('identical:', ported == controlled)
