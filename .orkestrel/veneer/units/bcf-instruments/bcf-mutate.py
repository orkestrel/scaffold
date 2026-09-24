#!/usr/bin/env python3
"""Applies one named mutation to an owned file, runs one command, restores the file, and logs the run.

Usage: bcf-mutate.py NAME
Each mutation replaces one exact text once; the file is restored byte for byte afterwards.
"""
import os, subprocess, sys, re, datetime

ROOT = '/home/user/veneer-bcf'
LOG = f'{ROOT}/tmp/units/bcf-mutations.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
SECTIONS = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser',
	'tests/app/browser/sections/AccordionSection.test.ts', 'tests/app/browser/sections/DropdownSection.test.ts',
	'tests/app/browser/sections/NavSection.test.ts', 'tests/app/browser/sections/NavbarSection.test.ts',
	'tests/app/browser/Showcase.test.ts']
def journey(variant, title):
	return ['npx', 'vitest', 'run', '--config', 'configs/app/vite.journey.config.ts', '--no-cache', '--reporter=dot',
		'--project', f'journey:{variant}*', '-t', title]
RESTING = 'reads every resting cascade key'
UNDERLINE = 'drives an underline link to hover and to focus'
INT = 'tests/app/browser/integration.test.ts'
CONST = 'app/browser/constants.ts'
SETUP = 'tests/setup.ts'
RELEASE = "\t\t\t\tawait releasePointer()\n\t\t\t\tfor (const key of CASCADE_KEYS) {"
LIFT = "const lifted = build('div', { classes: 'pt-5' })\n\t\t\t\t\tlifted.append(specimen.cloneNode(true))"
MUTATIONS = {
	'v2-unfixed': ([(INT, RELEASE, "\t\t\t\tfor (const key of CASCADE_KEYS) {"), (INT, LIFT, "const lifted = build('div')\n\t\t\t\t\tlifted.append(specimen.cloneNode(true))")], journey('dark-390', RESTING), True),
	'v2-unfixed-nocapture': ([(INT, RELEASE, "\t\t\t\tfor (const key of CASCADE_KEYS) {"), (INT, LIFT, "const lifted = build('div')\n\t\t\t\t\tlifted.append(specimen.cloneNode(true))")], journey('dark-390', RESTING), False),
	'v2-release-only': ([(INT, LIFT, "const lifted = build('div')\n\t\t\t\t\tlifted.append(specimen.cloneNode(true))")], journey('dark-390', RESTING), True),
	'v2-padding-only': ([(INT, RELEASE, "\t\t\t\tfor (const key of CASCADE_KEYS) {")], journey('dark-390', RESTING), True),
	'v6-underline-unregistered': ([(SETUP, "\tObject.freeze({ scenario: 'nav-underline-hover', subject: 'Nav underline' }),\n\tObject.freeze({ scenario: 'nav-underline-focus', subject: 'Nav underline' }),\n", '')], journey('dark-390', UNDERLINE), False),
	'accordion-specimen-added': ([(CONST, "\tObject.freeze({\n\t\tname: 'Accordion flush',", "\tObject.freeze({\n\t\tname: 'Accordion flush copy',\n\t\tmarkup: '<div class=\"accordion accordion-flush\"></div>',\n\t}),\n\tObject.freeze({\n\t\tname: 'Accordion flush',")], SECTIONS, False),
	'v4-toggle-at-rest': ([(CONST, 'class="btn btn-secondary dropdown-toggle show" aria-expanded="true">${label}', 'class="btn btn-secondary dropdown-toggle" aria-expanded="true">${label}')], SECTIONS, False),
	'v5-long-labels': ([(CONST, 'aria-expanded="true">${edge} from ${step}</button>', 'aria-expanded="true">To the ${edge} from ${step}</button>')], SECTIONS, False),
	'v3-short-pane': ([(CONST, '<p>The pane runs on under the menu, so the whole menu lies over it.</p><p>The last line keeps the room below the menu at every width.</p>', '')], SECTIONS, False),
	'v3-menu-tab-third': ([(CONST, '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#main" role="button" aria-expanded="true">Tabs filters</a><ul class="dropdown-menu show" data-bs-popper="static"><li><a class="dropdown-item" href="#main">Tabs by date</a></li><li><a class="dropdown-item" href="#main">Tabs by owner</a></li></ul></li><li class="nav-item show"><a class="nav-link" href="#main">Tabs details</a></li>', '<li class="nav-item show"><a class="nav-link" href="#main">Tabs details</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#main" role="button" aria-expanded="true">Tabs filters</a><ul class="dropdown-menu show" data-bs-popper="static"><li><a class="dropdown-item" href="#main">Tabs by date</a></li><li><a class="dropdown-item" href="#main">Tabs by owner</a></li></ul></li>')], SECTIONS, False),
	'v6-navbar-no-room': ([(CONST, '<div class="card-body"><p>The open menu hangs from the bar over this card.</p><p>The bar keeps its links in one row, so the menu leaves the flow.</p><p>This body is the room the menu lies over.</p></div>', '')], SECTIONS, False),
	'v6-navbar-collapsed-bar': ([(CONST, '<nav class="navbar navbar-expand" aria-label="Open menu bar">', '<nav class="navbar" aria-label="Open menu bar">')], SECTIONS, False),
	'v6-accordion-last-collapsed': ([(CONST, '<button class="accordion-button" type="button" aria-expanded="true" aria-controls="accordion-claims">Damage claims</button></h2><div class="accordion-collapse collapse show" id="accordion-claims">', '<button class="accordion-button collapsed" type="button" aria-expanded="false" aria-controls="accordion-claims">Damage claims</button></h2><div class="accordion-collapse collapse" id="accordion-claims">')], SECTIONS, False),
}

def main():
	name = sys.argv[1]
	edits, command, capture = MUTATIONS[name]
	originals = {}
	for path, old, new in edits:
		full = f'{ROOT}/{path}'
		text = originals.get(path) or open(full).read()
		originals.setdefault(path, text)
		current = open(full).read()
		if current.count(old) != 1:
			raise SystemExit(f'{name}: the site in {path} does not occur exactly once')
		open(full, 'w').write(current.replace(old, new))
	env = dict(ENV)
	if capture: env['CAPTURE'] = '1'
	try:
		run = subprocess.run(command, cwd=ROOT, env=env, capture_output=True, text=True, timeout=1500)
		output = run.stdout + run.stderr
		code = run.returncode
	finally:
		for path, text in originals.items():
			open(f'{ROOT}/{path}', 'w').write(text)
	plain = re.sub(r'\x1b\[[0-9;]*m', '', output)
	summary = [line.strip() for line in plain.splitlines() if re.match(r'\s*(Tests|Test Files)\s', line)]
	failing = sorted({line.strip() for line in plain.splitlines() if line.strip().startswith('FAIL ')})
	with open(LOG, 'a') as log:
		log.write(f"== {name} ({datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')})\n")
		for path, old, new in edits:
			log.write(f"site: {path}: replaced {old[:140]!r} with {new[:140]!r}\n")
		log.write(f"command: {'CAPTURE=1 ' if capture else ''}{' '.join(repr(part) if ' ' in part else part for part in command)}\n")
		log.write(f"exit: {code}\n")
		for line in summary: log.write(f"summary: {line}\n")
		for line in failing: log.write(f"failing: {line}\n")
		log.write('\n')
	with open(f'{ROOT}/tmp/units/bcf-mutation-{name}.log.txt', 'w') as full:
		full.write(plain)
	print(name, 'exit', code, summary, *failing, sep='\n')

main()
