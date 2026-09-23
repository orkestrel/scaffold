#!/usr/bin/env python3
"""Round 3 of the TOGGLES unit. Applies one named mutation to a file in the validation copy, rebuilds
the styles when the file is a partial, runs the named proof, records the proof's own result line, and
writes the file's original bytes back. Usage: mutate.py NAME... (or `all`). Logs land in
logs/mutation-<name>.log.txt beside this script.

Changed from the round-2 mutate.py: the log directory, and the added
`dropstart-caret-rule-omitted-empty` mutation, which reads the caret margin on the added empty-pair
case rather than the existing text-bearing case."""
import os, re, subprocess, sys
BASE = '/home/user/veneer-tg/tmp/probe/base'
LOGS = '/home/user/veneer-tg/tmp/units/tg-instruments-3/logs'
PATH = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH']
BG = 'src/styles/components/_button-group.scss'
IG = 'src/styles/components/_input-group.scss'
CONST = 'app/browser/constants.ts'
SETUP = 'tests/setupStyles.ts'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot']
SECTIONS = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.browser.config.ts', '--no-cache', '--reporter=dot']
TABLES = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'setup', 'tests/setupStyles.test.ts']
BGT = 'tests/src/styles/components/button-group.test.ts'
IGT = 'tests/src/styles/components/input-group.test.ts'
PADS = 'pads each split toggle at three quarters'
MUTATIONS = {
	'base-padding-omitted': (BG, "\t.dropdown-toggle-split {\n\t\tpadding-right: calc(var(--vn-space-6) * 0.75);\n\t\tpadding-left: calc(var(--vn-space-6) * 0.75);\n\t}\n", '', STYLES + [BGT, '-t', PADS]),
	'small-button-form-omitted': (BG, "\t\t.btn-#{$size} + .dropdown-toggle-split,\n", '', STYLES + [BGT, '-t', PADS]),
	'small-group-form-omitted': (BG, "\t\t.btn-group-#{$size} > .btn + .dropdown-toggle-split {", "\t\t.btn-group-#{$size} > .btn + .omitted-split {", STYLES + [BGT, '-t', PADS]),
	'large-button-form-omitted': (BG, "\t\t.btn-#{$size} + .dropdown-toggle-split,\n", "\t\t.btn-#{if($size == 'lg', 'omitted', $size)} + .dropdown-toggle-split,\n", STYLES + [BGT, '-t', PADS]),
	'large-group-form-omitted': (BG, "\t\t.btn-group-#{$size} > .btn + .dropdown-toggle-split {", "\t\t.btn-group-#{if($size == 'lg', 'omitted', $size)} > .btn + .dropdown-toggle-split {", STYLES + [BGT, '-t', PADS]),
	'large-step-reads-base': (BG, "$sizes: (('sm', var(--vn-space-4)), ('lg', var(--vn-space-8)));", "$sizes: (('sm', var(--vn-space-4)), ('lg', var(--vn-space-6)));", STYLES + [BGT, '-t', PADS]),
	'padding-literal': (BG, "\t\tpadding-right: calc(var(--vn-space-6) * 0.75);\n\t\tpadding-left: calc(var(--vn-space-6) * 0.75);", "\t\tpadding-right: 0.5625rem;\n\t\tpadding-left: 0.5625rem;", STYLES + [BGT, '-t', 'rescales the split toggle padding']),
	'plain-caret-rule-omitted': (BG, "\t.dropdown-toggle-split::after,\n\t.dropup", "\t.dropup", STYLES + [BGT, '-t', "'btn-group' wrapper"]),
	'dropup-caret-rule-omitted': (BG, "\t.dropup .dropdown-toggle-split::after,\n", '', STYLES + [BGT, '-t', "'btn-group dropup' wrapper"]),
	'dropend-caret-rule-omitted': (BG, ",\n\t.dropend .dropdown-toggle-split::after {", " {", STYLES + [BGT, '-t', "'btn-group dropend' wrapper"]),
	'dropstart-caret-rule-omitted': (BG, "\t.dropstart .dropdown-toggle-split::before {\n\t\tmargin-right: 0;\n\t}\n", '', STYLES + [BGT, '-t', "'btn-group dropstart' wrapper"]),
	'dropstart-caret-rule-omitted-empty': (BG, "\t.dropstart .dropdown-toggle-split::before {\n\t\tmargin-right: 0;\n\t}\n", '', STYLES + [BGT, '-t', 'empty split toggle in a dropstart wrapper']),
	'first-child-selector-dropped': (BG, "\t.btn-group > .btn.dropdown-toggle-split:first-child,\n", '', STYLES + [BGT, '-t', 'squares the trailing corners of a split toggle']),
	'plain-toggle-count-left-out': (IG, "\t.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),\n", '', STYLES + [IGT, '-t', 'squares the trailing corners of a dropdown toggle']),
	'validated-toggle-count-left-out': (IG, "\t.input-group.has-validation > .dropdown-toggle:nth-last-child(n + 4),\n", '', STYLES + [IGT, '-t', 'squares the trailing corners of a dropdown toggle']),
	'dropstart-toggle-after-action': (CONST, '<div class="btn-group dropstart" role="group" aria-label="Split print opening before"><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More print options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#print-choice">Choose print</a></li></ul><button type="button" class="btn btn-outline-secondary">Split print</button></div>', '<div class="btn-group dropstart" role="group" aria-label="Split print opening before"><button type="button" class="btn btn-outline-secondary">Split print</button><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More print options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#print-choice">Choose print</a></li></ul></div>', SECTIONS + ['tests/app/browser/sections/ButtonGroupSection.test.ts', '-t', 'renders each split toggle form']),
	'dropstart-action-removed': (CONST, 'aria-label="More print options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#print-choice">Choose print</a></li></ul><button type="button" class="btn btn-outline-secondary">Split print</button></div>', 'aria-label="More print options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#print-choice">Choose print</a></li></ul></div>', SECTIONS + ['tests/app/browser/sections/ButtonGroupSection.test.ts', '-t', 'renders each split toggle form']),
	'group-size-on-buttons': (CONST, '<button type="button" class="btn btn-outline-secondary">${word} export</button>', '<button type="button" class="btn btn-outline-secondary btn-${size}">${word} export</button>', SECTIONS + ['tests/app/browser/sections/ButtonGroupSection.test.ts', '-t', 'renders each split toggle form']),
	'trailing-toggle-kept-count-broken': (CONST, '<button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Order status</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="#status-open">Open orders</a></li></ul></div>', '<button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Order status</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="#status-open">Open orders</a></li></ul><span class="input-group-text">Tail</span></div>', SECTIONS + ['tests/app/browser/sections/InputGroupSection.test.ts', '-t', 'renders a squared and a kept dropdown toggle']),
}

def table(name):
	"""Returns the source text of the frozen array constant NAME in tests/setupStyles.ts."""
	text = open(os.path.join(BASE, SETUP)).read()
	start = text.index(f'export const {name} = Object.freeze([')
	return text[start:text.index('\n])\n', start) + 4]

def rows(block):
	"""Splits a frozen table's source into its head, its top-level row blocks, and its tail."""
	parts = re.split(r'(?m)^(?=\tObject\.freeze\(\{$)', block)
	head, body = parts[0], parts[1:]
	last = body[-1]
	cut = last.rindex('\n])')
	return head, body[:-1] + [last[:cut + 1]], last[cut + 1:]

def swap(name, first, second):
	block = table(name)
	head, body, end = rows(block)
	body[first], body[second] = body[second], body[first]
	return (SETUP, block, head + ''.join(body) + end, TABLES)

CONTROLS = {
	'split-cases-reordered': lambda: swap('BUTTON_GROUP_SPLIT_CASES', 1, 2),
	'split-cases-unfrozen': lambda: (SETUP, 'export const BUTTON_GROUP_SPLIT_CASES = Object.freeze([', 'export const BUTTON_GROUP_SPLIT_CASES = ([', TABLES),
	'caret-cases-reordered': lambda: (SETUP, '\tDROPDOWN_DIRECTION_CASES.map(({ wrapper, pseudo }) =>', '\t[...DROPDOWN_DIRECTION_CASES].reverse().map(({ wrapper, pseudo }) =>', TABLES),
	'caret-cases-unfrozen': lambda: (SETUP, '\t\tObject.freeze({\n\t\t\tgroup: wrapper', '\t\t({\n\t\t\tgroup: wrapper', TABLES),
	'toggle-cases-reordered': lambda: swap('INPUT_GROUP_TOGGLE_CASES', 1, 2),
	'toggle-cases-unfrozen': lambda: (SETUP, 'export const INPUT_GROUP_TOGGLE_CASES = Object.freeze([', 'export const INPUT_GROUP_TOGGLE_CASES = ([', TABLES),
	'forms-reordered': lambda: swap('BUTTON_GROUP_SPLIT_FORMS', 1, 2),
	'forms-unfrozen': lambda: (SETUP, "selectors: Object.freeze(['.dropstart > .btn.dropdown-toggle-split:first-child'])", "selectors: ['.dropstart > .btn.dropdown-toggle-split:first-child']", TABLES),
}

def run(cmd, log):
	return subprocess.run(cmd, cwd=BASE, env={**os.environ, 'PATH': PATH}, stdout=log, stderr=subprocess.STDOUT).returncode

def mutate(name):
	path, old, new, proof = CONTROLS[name]() if name in CONTROLS else MUTATIONS[name]
	full = os.path.join(BASE, path)
	original = open(full, 'rb').read()
	text = original.decode()
	if text.count(old) != 1:
		print(f'{name}: anchor count {text.count(old)}, skipped')
		return
	with open(os.path.join(LOGS, f'mutation-{name}.log.txt'), 'w') as log:
		log.write(f'=== mutation {name} on {path}\n')
		log.flush()
		try:
			open(full, 'w').write(text.replace(old, new))
			if path.endswith('.scss'):
				log.write(f'build exit={run(["npm", "run", "build:src:styles"], log)}\n')
				log.flush()
			code = run(proof, log)
			log.write(f'exit={code}\n')
		finally:
			open(full, 'wb').write(original)
	if path.endswith('.scss'):
		with open(os.path.join(LOGS, 'mutation-rebuild.log.txt'), 'a') as log:
			log.write(f'=== rebuild after {name}\n')
			log.flush()
			log.write(f'exit={run(["npm", "run", "build:src:styles"], log)}\n')
	result = [line.strip() for line in open(os.path.join(LOGS, f'mutation-{name}.log.txt')) if 'Tests ' in line or line.startswith('exit=')]
	print(name, ' | '.join(result))

names = sys.argv[1:]
if names == ['all']:
	names = list(MUTATIONS) + list(CONTROLS)
for name in names:
	mutate(name)
