"""Plants a reduced-motion twin that keeps a box-shadow transition on the range thumb, runs the
transition case, and restores the partial byte for byte from a backup inside tmp/units.

Usage: python3 tmp/units/sts-2-plant.py
Writes tmp/units/sts-2-plant-twin-other.log.txt.
"""

import os
import shutil
import subprocess

ROOT = '/home/user/veneer-sts'
SOURCE = 'src/styles/components/_form-range.scss'
BACKUP = os.path.join(ROOT, 'tmp/units/sts-2-plant-twin-other.backup.scss')
LOG = os.path.join(ROOT, 'tmp/units/sts-2-plant-twin-other.log.txt')
TEST = 'tests/src/styles/components/form-range.test.ts'
TITLE = 'runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion'

OLD = """			@include transition(
				(
					background-color var(--vn-motion-feedback) var(--vn-ease-standard),
					border-color var(--vn-motion-feedback) var(--vn-ease-standard),
					box-shadow var(--vn-motion-feedback) var(--vn-ease-standard)
				)
			);
"""
NEW = """			transition:
				background-color var(--vn-motion-feedback) var(--vn-ease-standard),
				border-color var(--vn-motion-feedback) var(--vn-ease-standard),
				box-shadow var(--vn-motion-feedback) var(--vn-ease-standard);
			@include reduced-motion {
				transition: box-shadow 7.5s ease;
			}
"""


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
	path = os.path.join(ROOT, SOURCE)
	shutil.copyfile(path, BACKUP)
	with open(LOG, 'w') as log:
		text = open(path).read()
		if text.count(OLD) != 1:
			log.write(f'plant anchor found {text.count(OLD)} times; refused\n')
			raise SystemExit(1)
		try:
			open(path, 'w').write(text.replace(OLD, NEW))
			log.write(f'plant twin-other in {SOURCE}\n')
			subprocess.run(['git', 'diff', '--', SOURCE], cwd=ROOT, stdout=log, stderr=subprocess.STDOUT)
			log.flush()
			run(['npm', 'run', 'build:src:styles'], log)
			run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', TEST, '-t', TITLE], log)
		finally:
			shutil.copyfile(BACKUP, path)
			run(['cmp', BACKUP, SOURCE], log)
			run(['git', 'diff', '--stat', '--', 'src'], log)
			run(['npm', 'run', 'build:src:styles'], log)


main()
