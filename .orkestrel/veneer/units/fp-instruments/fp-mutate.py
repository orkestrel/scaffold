# fp mutation driver: applies one named mutation to an owned file, runs the proof that names it,
# records the site, the command, the exit, the summary line, and the failing case names, and restores
# the file byte for byte before the next mutation. Every mutation site is an owned file.
import os
import re
import subprocess
import sys

ROOT = '/home/user/veneer-fp'
LOG = f'{ROOT}/tmp/units/fp-mutations.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'

APP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser']
JOURNEY = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.journey.config.ts', '--no-cache', '--reporter=verbose', '--project', 'journey:light-1280*']
SETUP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'setup', 'tests/setup.test.ts']

MUTATIONS = [
	('M1 a disabled fieldset that is no longer disabled', 'app/browser/constants.ts',
	 '<fieldset disabled>', '<fieldset>',
	 APP + ['tests/app/browser/sections/ButtonGroupSection.test.ts']),
	('M2 pressed hosts without the active class', 'app/browser/constants.ts',
	 'class="${classes} active" aria-pressed="true"', 'class="${classes}" aria-pressed="true"',
	 APP + ['tests/app/browser/sections/ButtonGroupSection.test.ts']),
	('M3 the step pair aligned at its bottom edge', 'app/browser/constants.ts',
	 'align-items-start gap-2 pb-2 fs-1', 'align-items-end gap-2 pb-2 fs-1',
	 APP + ['tests/app/browser/sections/PlaceholderSection.test.ts']),
	('M4 selected role rows without the active class', 'app/browser/constants.ts',
	 'list-group-item-${role} active" aria-current="true"', 'list-group-item-${role}" aria-current="true"',
	 APP + ['tests/app/browser/sections/ListGroupSection.test.ts']),
	('M5 pressed twins painting a disabled face', 'app/browser/constants.ts',
	 'aria-pressed="true">Pressed', 'aria-pressed="true" disabled>Pressed',
	 JOURNEY + ['-t', 'repaints each role beyond']),
	('M6 a role hover row dropped from the registry', 'tests/setup.ts',
	 "\tObject.freeze({ scenario: 'secondary-hover', subject: 'Secondary' }),\n", '',
	 JOURNEY + ['-t', 'repaints each role beyond']),
	('M7 the link lifted into a wrapper with no padding', 'tests/app/browser/integration.test.ts',
	 "const marker = document.createComment('Link')\n\t\thost.before(marker)\n\t\tconst lifted = build('div', { classes: 'p-2' })",
	 "const marker = document.createComment('Link')\n\t\thost.before(marker)\n\t\tconst lifted = build('div', { classes: '' })",
	 JOURNEY + ['-t', 'drives the link button']),
	('M8 the grow spinner held at its first step', 'tests/app/browser/integration.test.ts',
	 'running.currentTime = whole.computedOffset * duration', 'running.currentTime = 0',
	 JOURNEY + ['-t', 'holds each grow spinner']),
	('M9 every role action row carrying the primary role', 'app/browser/constants.ts',
	 'list-group-item-action list-group-item-${role}" href', 'list-group-item-action list-group-item-primary" href',
	 JOURNEY + ['-t', 'drives every role action']),
	('M11 the role press taken in the fitted layout', 'tests/app/browser/integration.test.ts',
	 "\t\t\t\tawait stagePane(window.innerWidth, window.innerHeight)\n\t\t\t\tawait holdAccessible('link', name)",
	 "\t\t\t\tawait holdAccessible('link', name)",
	 JOURNEY + ['-t', 'drives every role action']),
	('M10 the Link subject dropped from the driven-row exemption', 'tests/setup.test.ts',
	 "\t\t\t'Link',\n", '',
	 SETUP),
]

selected = sys.argv[1:]
with open(LOG, 'a') as log:
	for name, path, old, new, command in MUTATIONS:
		if selected and name.split(' ')[0] not in selected:
			continue
		target = f'{ROOT}/{path}'
		with open(target) as handle:
			original = handle.read()
		if original.count(old) != 1:
			raise SystemExit(f'{name}: the site occurs {original.count(old)} times in {path}')
		with open(target, 'w') as handle:
			handle.write(original.replace(old, new))
		try:
			run = subprocess.run(command, cwd=ROOT, env=ENV, capture_output=True, text=True)
		finally:
			with open(target, 'w') as handle:
				handle.write(original)
		with open(target) as handle:
			restored = handle.read() == original
		output = re.sub(r'\x1b\[[0-9;]*m', '', run.stdout + run.stderr)
		summary = [line.strip() for line in output.splitlines() if re.match(r'\s*(Tests|Test Files)\s', line)]
		failing = sorted({line.strip() for line in output.splitlines() if line.strip().startswith('×')})
		log.write(f'== {name}\n')
		log.write(f'site: {path}\n')
		log.write(f'mutation: {old!r} -> {new!r}\n')
		log.write(f'command: {" ".join(command)}\n')
		log.write('build: not run (no stylesheet is mutated)\n')
		log.write(f'test exit: {run.returncode}\n')
		for line in summary:
			log.write(f'summary: {line}\n')
		for line in failing:
			log.write(f'failing: {line}\n')
		log.write(f'restored: {restored}\n\n')
		log.flush()
		print(name, run.returncode, summary, restored, flush=True)
