"""Plants one mutation in src/styles, runs its case, and restores the file byte for byte.

Usage: python3 tmp/units/sts-plant.py <name>
Writes tmp/units/sts-plant-<name>.log.txt with the plant, the command, its output, and the restore check.
"""

import filecmp
import os
import shutil
import subprocess
import sys

ROOT = '/home/user/veneer-sts'
SCRATCH = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
RANGE = 'src/styles/components/_form-range.scss'
BUTTON = 'src/styles/components/_button.scss'
RANGE_TEST = 'tests/src/styles/components/form-range.test.ts'
BUTTON_TEST = 'tests/src/styles/components/button.test.ts'

TWIN_OLD = """			@include transition(
				(
					background-color var(--vn-motion-feedback) var(--vn-ease-standard),
					border-color var(--vn-motion-feedback) var(--vn-ease-standard),
					box-shadow var(--vn-motion-feedback) var(--vn-ease-standard)
				)
			);
"""
TWIN_NEW = """			transition:
				background-color var(--vn-motion-feedback) var(--vn-ease-standard),
				border-color var(--vn-motion-feedback) var(--vn-ease-standard),
				box-shadow var(--vn-motion-feedback) var(--vn-ease-standard);
"""

PLANTS = {
	'held-mix': (
		RANGE,
		'var(--vn-palette-blue) 30%,',
		'var(--vn-palette-blue) 60%,',
		RANGE_TEST,
		'paints the held thumb with the blue palette entry mixed three tenths over white',
	),
	'disabled-token': (
		RANGE,
		'.form-range:disabled#{$thumb} {\n\t\t\tbackground-color: var(--bs-secondary-color);',
		'.form-range:disabled#{$thumb} {\n\t\t\tbackground-color: var(--bs-tertiary-color);',
		RANGE_TEST,
		'lets the pointer through the disabled host and paints its thumb with the secondary text color',
	),
	'motion-twin': (
		RANGE,
		TWIN_OLD,
		TWIN_NEW,
		RANGE_TEST,
		'runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion',
	),
	'button-opacity': (
		BUTTON,
		'\t\topacity: var(--bs-btn-disabled-opacity);\n',
		'',
		BUTTON_TEST,
		'dims a disabled link button and its anchor twin to the secondary text and lets the pointer through',
	),
}


def run(command, log):
	log.write(f'$ {" ".join(command)}\n')
	log.flush()
	result = subprocess.run(command, cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
	kept = [line for line in result.stdout.splitlines() if 'externalized for browser compatibility' not in line]
	log.write('\n'.join(kept) + '\n')
	log.write(f'exit={result.returncode}\n')
	log.flush()
	return result.returncode


def main():
	name = sys.argv[1]
	source, old, new, test, title = PLANTS[name]
	path = os.path.join(ROOT, source)
	backup = os.path.join(SCRATCH, f'plant-{name}.orig')
	shutil.copyfile(path, backup)
	with open(os.path.join(ROOT, f'tmp/units/sts-plant-{name}.log.txt'), 'w') as log:
		text = open(path).read()
		if text.count(old) != 1:
			log.write(f'plant anchor found {text.count(old)} times; refused\n')
			sys.exit(1)
		try:
			open(path, 'w').write(text.replace(old, new))
			log.write(f'plant {name} in {source}\n--- replaced\n{old}\n+++ with\n{new}\n')
			subprocess.run(['git', 'diff', '--', source], cwd=ROOT, stdout=log, stderr=subprocess.STDOUT)
			run(['npm', 'run', 'build:src:styles'], log)
			run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', test, '-t', title], log)
		finally:
			shutil.copyfile(backup, path)
			same = filecmp.cmp(backup, path, shallow=False)
			log.write(f'restored byte-identical: {same}\n')
			status = subprocess.run(['git', 'status', '--short', '--', source], cwd=ROOT, stdout=subprocess.PIPE, text=True)
			log.write(f'git status after restore: "{status.stdout.strip()}"\n')
			run(['npm', 'run', 'build:src:styles'], log)


main()
