# TOKEN-PROOFS round 2 mutation driver, derived from tmp/units/tkp-plant.py. What changed: each plant
# rewrites one named occurrence of its text rather than every occurrence, and the plants are the
# round 2 set. For each plant: back up the partial, rewrite the occurrence, rebuild the styles, run
# the named case alone, log to tmp/units/tkp-2-plant-<name>.log.txt, restore from the backup, and
# confirm the restore with `cmp` and `git diff --stat -- src/styles`.
import os, shutil, subprocess, sys

ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
BACKUP = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/plant-2-backup'

VALID = 'oklab(0.4313 -0.0943551 0.0412221)'
INVALID = 'oklab(0.4159 0.131299 0.0563228)'
BORDER = 'border-color: var(--bs-form-#{$state}-border-color);'
COLOR = 'color: var(--bs-form-#{$state}-color);'
VALIDATION = 'src/styles/components/_validation.scss'
MIXINS = 'src/styles/_mixins.scss'
PLACEMENT = 'holds the validation paint on the rest color under a plain ancestor'
ALIAS = 'inside a plain ancestor that sets the validation aliases'

def only(state, text, planted):
	# Rewrites one state's declaration inside the partial's `@each` loop and leaves the other state's.
	return f"@if $state == '{state}' {{ {planted} }} @else {{ {text} }}"

# name, partial, old text, 1-based occurrence, new text, case title pattern
PLANTS = [
	('link-decoration-hover', 'src/styles/components/_button.scss', 'text-decoration: var(--vn-link-decoration);', 2, 'text-decoration: underline;', 'overrides the link decoration'),
	('placement-plain-valid-border', VALIDATION, BORDER, 1, only('valid', BORDER, 'border-color: var(--vn-form-valid);'), PLACEMENT),
	('placement-plain-valid-feedback', VALIDATION, COLOR, 1, only('valid', COLOR, 'color: var(--vn-form-valid);'), PLACEMENT),
	('placement-plain-invalid-border', VALIDATION, BORDER, 1, only('invalid', BORDER, 'border-color: var(--vn-form-invalid);'), PLACEMENT),
	('placement-plain-invalid-feedback', VALIDATION, COLOR, 1, only('invalid', COLOR, 'color: var(--vn-form-invalid);'), PLACEMENT),
	('placement-mode-valid-border', MIXINS, '--bs-form-valid-border-color: var(--vn-form-valid);', 1, f'--bs-form-valid-border-color: {VALID};', PLACEMENT),
	('placement-mode-valid-feedback', MIXINS, '--bs-form-valid-color: var(--vn-form-valid);', 1, f'--bs-form-valid-color: {VALID};', PLACEMENT),
	('placement-mode-invalid-border', MIXINS, '--bs-form-invalid-border-color: var(--vn-form-invalid);', 1, f'--bs-form-invalid-border-color: {INVALID};', PLACEMENT),
	('placement-mode-invalid-feedback', MIXINS, '--bs-form-invalid-color: var(--vn-form-invalid);', 1, f'--bs-form-invalid-color: {INVALID};', PLACEMENT),
	('alias-border', VALIDATION, BORDER, 1, only('valid', BORDER, f'border-color: {VALID};'), ALIAS),
	('alias-feedback', VALIDATION, COLOR, 1, only('valid', COLOR, f'color: {VALID};'), ALIAS),
]

def run(command, log):
	log.write(f'$ {command}\n')
	log.flush()
	result = subprocess.run(command, shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
	lines = [line for line in result.stdout.splitlines() if 'has been externalized' not in line]
	log.write('\n'.join(lines) + '\n')
	log.write(f'exit={result.returncode}\n\n')
	log.flush()
	return result.returncode

def replace_occurrence(text, old, occurrence, new):
	index = -1
	for _ in range(occurrence):
		index = text.find(old, index + 1)
		if index < 0:
			return None
	return text[:index] + new + text[index + len(old):]

selected = sys.argv[1:]
os.makedirs(BACKUP, exist_ok=True)
for name, partial, old, occurrence, new, title in PLANTS:
	if selected and name not in selected:
		continue
	path = os.path.join(ROOT, partial)
	backup = os.path.join(BACKUP, name + '.scss')
	shutil.copyfile(path, backup)
	with open(os.path.join(ROOT, f'tmp/units/tkp-2-plant-{name}.log.txt'), 'w') as log:
		text = open(path).read()
		planted = replace_occurrence(text, old, occurrence, new)
		log.write(f'plant {name}: {partial}\nold: {old!r} (occurrence {occurrence} of {text.count(old)})\nnew: {new!r}\n\n')
		if planted is None:
			log.write('refused: occurrence not found\n')
			continue
		try:
			open(path, 'w').write(planted)
			run(f'git diff -U1 -- {partial}', log)
			run('npm run build:src:styles', log)
			run(f"npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '{title}'", log)
			run('cat /proc/loadavg', log)
		finally:
			shutil.copyfile(backup, path)
			run(f'cmp {backup} {partial} && echo restored-byte-identical', log)
			run('git diff --stat -- src/styles; echo "diffstat-lines=$(git diff --stat -- src/styles | wc -l)"', log)
	print(name, 'done', flush=True)
with open(os.path.join(ROOT, 'tmp/units/tkp-2-plant-rebuild.log.txt'), 'w') as log:
	run('npm run build:src:styles', log)
print('rebuilt', flush=True)
