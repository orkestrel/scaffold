#!/usr/bin/env python3
"""Applies one named round-4 mutation, runs one command, restores every file byte for byte, and logs the run.

Usage: bcf-mutate-2.py NAME
Each edit replaces an exact text, once or at every occurrence as the edit states. The whole runner
output is kept in tmp/units/bcf-mutation-4-NAME.log.txt beside the summary in bcf-mutations-4.log.txt.
"""
import os, subprocess, sys, re, datetime

ROOT = '/home/user/veneer-bcf'
LOG = f'{ROOT}/tmp/units/bcf-mutations-4.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
SECTIONS = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser',
	'tests/app/browser/sections/AccordionSection.test.ts', 'tests/app/browser/sections/DropdownSection.test.ts',
	'tests/app/browser/sections/NavSection.test.ts', 'tests/app/browser/sections/NavbarSection.test.ts',
	'tests/app/browser/Showcase.test.ts']
SETUP_BROWSER = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'setup:browser']
UNDERLINE = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.journey.config.ts', '--no-cache', '--reporter=dot',
	'--project', 'journey:dark-390*', '-t', 'drives an underline link to hover and to focus']
CONST = 'app/browser/constants.ts'
SETUP = 'tests/setup.ts'
HELPER_TEST = 'tests/setupBrowser.test.ts'
INT = 'tests/app/browser/integration.test.ts'
DROPDOWN_TEST = 'tests/app/browser/sections/DropdownSection.test.ts'
ORDINARY = """	Object.freeze({
		name: 'Accordion flush',"""
ORDINARY_ADDED = """	Object.freeze({
		name: 'Accordion spare',
		markup:
			'<div class="accordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="accordion-spare">Spare terms</button></h2><div class="accordion-collapse collapse" id="accordion-spare"><div class="accordion-body">Spare parts ship with the next run.</div></div></div></div>',
	}),
""" + ORDINARY
RAMP_ANCHOR = """	...['sm', 'md', 'lg', 'xl', 'xxl'].map((step) =>
		Object.freeze({
			name: `Dropdown align ${step}`,"""
RAMP_ADDED = """	Object.freeze({
		name: 'Dropdown align huge',
		markup:
			'<div class="dropdown"><button type="button" class="btn btn-secondary dropdown-toggle show" aria-expanded="true">Start from huge</button><ul class="dropdown-menu show" data-bs-popper="static"><li><span class="dropdown-item-text">Weigh at huge</span></li></ul></div>',
	}),
""" + RAMP_ANCHOR
NAVBAR_TEST = 'tests/app/browser/sections/NavbarSection.test.ts'
MUTATIONS = {
	# (edits: [(path, old, new, every)], command, capture)
	'navbar-infix-added': ([(NAVBAR_TEST, "...['', ...BREAKPOINT_INFIXES.map((step) => `-${step}`)]", "...['', ...[...BREAKPOINT_INFIXES, 'xxxl'].map((step) => `-${step}`)]", False)], SECTIONS, False),
}

def main():
	name = sys.argv[1]
	edits, command, capture = MUTATIONS[name]
	originals = {}
	try:
		for path, old, new, every in edits:
			full = f'{ROOT}/{path}'
			current = open(full).read()
			originals.setdefault(path, current)
			count = current.count(old)
			if count == 0 or (not every and count != 1):
				raise SystemExit(f'{name}: the site in {path} occurs {count} times')
			open(full, 'w').write(current.replace(old, new))
		env = dict(ENV)
		if capture: env['CAPTURE'] = '1'
		run = subprocess.run(command, cwd=ROOT, env=env, capture_output=True, text=True, timeout=1500)
		output = run.stdout + run.stderr
		code = run.returncode
	finally:
		for path, text in originals.items():
			open(f'{ROOT}/{path}', 'w').write(text)
	plain = re.sub(r'\x1b\[[0-9;]*m', '', output)
	with open(f'{ROOT}/tmp/units/bcf-mutation-4-{name}.log.txt', 'w') as whole:
		whole.write(plain)
	summary = [line.strip() for line in plain.splitlines() if re.match(r'\s*(Tests|Test Files)\s', line)]
	failing = sorted({line.strip() for line in plain.splitlines() if line.strip().startswith('FAIL ')})
	with open(LOG, 'a') as log:
		log.write(f"== {name} ({datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')})\n")
		for path, old, new, every in edits:
			log.write(f"site: {path}: replaced {'every' if every else 'one'} {old[:140]!r} with {new[:140]!r}\n")
		if not edits: log.write('site: none (the unmutated tree)\n')
		log.write(f"command: {'CAPTURE=1 ' if capture else ''}{' '.join(repr(part) if ' ' in part else part for part in command)}\n")
		log.write(f"exit: {code}\n")
		for line in summary: log.write(f"summary: {line}\n")
		for line in failing: log.write(f"failing: {line}\n")
		log.write(f"whole output: tmp/units/bcf-mutation-4-{name}.log.txt\n\n")
	print(name, 'exit', code, summary, *failing, sep='\n')

main()
