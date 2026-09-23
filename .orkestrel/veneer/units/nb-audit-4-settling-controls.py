#!/usr/bin/env python3
"""nb-audit-4-settling-controls.py: the Orchestrator's settling run for the NAVBAR round-4 objective lane's claim 3. The
unit's mutate.py records each deletion control's exit and summary but discards the assertion diagnostics; this run
applies the same three deletions to a stage (a658879 with the owned files, the round-4 shared patch, and the off-limits
patch) and keeps each run's complete output, then runs the unmutated case. Usage: settling-controls.py STAGE LOGDIR.
The control names and their old/new texts are copied from nb-instruments-4/mutate.py."""
import os, subprocess, sys
stage, logs = sys.argv[1], sys.argv[2]
SETUP = os.path.join(stage, 'tests/setupStyles.ts')
CMD = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "binds the navbar selectors"'
CONTROLS = [
	('expand-readings-row-deleted', "\tObject.freeze({ viewport: 1280, expanded: Object.freeze(['sm', 'md', 'lg', 'xl']) }),\n"),
	('dark-consumers-row-deleted', "\tObject.freeze({\n\t\ttarget: 'a[href=\"#plain\"]',\n\t\treads: 'color',\n\t\tproperty: '--bs-navbar-color',\n\t}),\n"),
	('paint-moves-row-deleted', "\tObject.freeze({ selector: '.navbar-dark .navbar-toggler', moves: false }),\n"),
]
original = open(SETUP).read()
def run(name):
	with open(os.path.join(logs, f'settling-{name}.log.txt'), 'w') as log:
		log.write(f'=== {name}: {CMD}\n'); log.flush()
		code = subprocess.run(CMD, shell=True, cwd=stage, stdout=log, stderr=subprocess.STDOUT).returncode
		log.write(f'exit={code}\n')
	text = open(os.path.join(logs, f'settling-{name}.log.txt')).read()
	assertion = [l.strip() for l in text.split('\n') if 'AssertionError' in l or l.strip().startswith(('- Expected', '+ Received', '❯ tests/'))]
	print(name, f'exit={code}', '|', ' | '.join(assertion[:4])[:400])
for name, old in CONTROLS:
	if original.count(old) != 1:
		sys.exit(f'{name}: anchor count {original.count(old)}')
	open(SETUP, 'w').write(original.replace(old, ''))
	try:
		run(name)
	finally:
		open(SETUP, 'w').write(original)
run('unmutated')
