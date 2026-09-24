# fp round-2 mutation driver: applies one named mutation to an owned file, runs the proof that names it,
# records the site, the command, the exit, the summary line, and the failing case names, and restores
# the file byte for byte before the next mutation. Every mutation site is an owned file.
import os
import re
import subprocess
import sys

ROOT = '/home/user/veneer-fp'
LOG = f'{ROOT}/tmp/units/fp-mutations-2.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'

APP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser']
JOURNEY = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.journey.config.ts', '--no-cache', '--reporter=verbose', '--project', 'journey:light-1280*']
SETUP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'setup', 'tests/setup.test.ts']

DARK = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.journey.config.ts', '--no-cache', '--reporter=verbose', '--project', 'journey:dark-390*']

MUTATIONS = [
	('N1 the pressed faces joined in vertical groups', 'app/browser/constants.ts',
	 'd-flex flex-column align-items-start gap-2', 'btn-group-vertical',
	 APP + ['tests/app/browser/sections/ButtonGroupSection.test.ts']),
	('N2 the disabled check label on the outline variant', 'app/browser/constants.ts',
	 '<label class="btn btn-primary" for="disabled-check">', '<label class="btn btn-outline-primary" for="disabled-check">',
	 APP + ['tests/app/browser/sections/ButtonGroupSection.test.ts']),
	('N3 the pressed list-group frame shot on the dark role row', 'tests/app/browser/integration.test.ts',
	 "'.list-group-item-action.list-group-item-danger'", "'.list-group-item-action.list-group-item-dark'",
	 DARK + ['-t', 'drives every role action']),
	('N4 the Button role list without its outline roles', 'app/browser/constants.ts',
	 "(classes) => /^btn btn-(?:outline-)?[a-z]+$/u.test(classes) && classes !== 'btn btn-link',",
	 "(classes) => /^btn btn-[a-z]+$/u.test(classes) && classes !== 'btn btn-link',",
	 APP + ['tests/app/browser/sections/ButtonGroupSection.test.ts']),
	('N5 the List group role list without its dark role', 'app/browser/constants.ts',
	 "\t'light',\n\t'dark',\n])", "\t'light',\n])",
	 APP + ['tests/app/browser/sections/ListGroupSection.test.ts']),
	('N6 the Link subject dropped from the exemption constant', 'tests/setup.ts',
	 "\t'Link',\n", '',
	 SETUP),
	('N7 the grow spinner held through a style that survives reinsertion', 'tests/app/browser/integration.test.ts',
	 '\t\t\t\trunning.pause()\n',
	 "\t\t\t\trunning.pause()\n\t\t\t\tif (spinner instanceof HTMLElement) spinner.style.animationPlayState = 'paused'\n",
	 JOURNEY + ['-t', 'holds each grow spinner']),
	('N8 the driven contrast bar set under a ratio a contrast reader returns', 'tests/setup.ts',
	 'export const DRIVEN_CONTRAST = 1.2', 'export const DRIVEN_CONTRAST = 0.5',
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
		reasons = [line.strip() for line in output.splitlines() if line.strip().startswith('→')]
		sites = sorted({line.strip() for line in output.splitlines() if re.match(r'\s*❯ tests/.*\.test\.ts:\d+:\d+', line)})
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
		for line in reasons:
			log.write(f'reason: {line}\n')
		for line in sites:
			log.write(f'assertion: {line}\n')
		log.write(f'restored: {restored}\n\n')
		log.flush()
		print(name, run.returncode, summary, restored, flush=True)
