# Observation: does any wrapper or journey project change its effective configuration?
# Captures every factory and the browser wrapper under the ported merge, restores the first-draft
# merge, captures again, and diffs the two. Run from the repository root.
import io
import json
import os
import subprocess
import sys

PATH = 'vite.config.ts'
NEW = io.open('tmp/units/r1-ported-merge.txt', encoding='utf-8', newline='').read()
OLD = io.open('tmp/units/r1-draft-merge.txt', encoding='utf-8', newline='').read()


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
if NEW not in original:
	sys.exit('the ported merge is absent from ' + PATH)
try:
	ported = capture('tmp/units/r1-wrappers-ported.json')
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original.replace(NEW, OLD, 1))
	draft = capture('tmp/units/r1-wrappers-draft.json')
finally:
	io.open(PATH, 'w', encoding='utf-8', newline='').write(original)
print('identical:', ported == draft)
