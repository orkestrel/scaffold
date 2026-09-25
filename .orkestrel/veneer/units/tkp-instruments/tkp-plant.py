# TOKEN-PROOFS mutation driver. For each plant: back up the partial, write the consumer's
# declaration as a literal equal to its resolved rest value, rebuild the styles, run the named case,
# log it to tmp/units/tkp-plant-<name>.log.txt, restore the partial from the backup, and confirm the
# restore byte-identically with `cmp` and `git diff --stat src/styles`.
import os, shutil, subprocess, sys

ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
BACKUP = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/plant-backup'

LINK = 'color(srgb 0.0510206 0.212902 0.672726)'
HOVER = 'color(srgb 0.0331634 0.138386 0.437272)'
VALID = 'oklab(0.4313 -0.0943551 0.0412221)'
INVALID = 'oklab(0.4159 0.131299 0.0563228)'
MIXER = 'color(srgb 0.00742457 0.0232852 0.0925134)'
HOVER_BG = '--bs-btn-hover-bg: color-mix(\n\t\t\tin srgb,\n\t\t\tvar(--vn-state-mixer) var(--vn-state-hover),'
ACTIVE_BG = '--bs-btn-active-bg: color-mix(\n\t\t\tin srgb,\n\t\t\tvar(--vn-state-mixer) var(--vn-state-active),'

# name, partial, old text, new text, expected occurrences, case title pattern
PLANTS = [
	('link-base-anchor', 'src/styles/elements/_a.scss', 'rgb(from var(--vn-link-base) r g b', f'rgb(from {LINK} r g b', 1, 'overrides the link color'),
	('link-base-button', 'src/styles/components/_button.scss', '--bs-btn-color: var(--vn-link-base);', f'--bs-btn-color: {LINK};', 1, 'overrides the link color'),
	('link-hover-anchor', 'src/styles/elements/_a.scss', 'rgb(from var(--vn-link-hover-base) r g b', f'rgb(from {HOVER} r g b', 1, 'overrides the link hover color'),
	('link-hover-button', 'src/styles/components/_button.scss', '--bs-btn-hover-color: var(--vn-link-hover-base);', f'--bs-btn-hover-color: {HOVER};', 1, 'overrides the link hover color'),
	('link-decoration-anchor', 'src/styles/elements/_a.scss', 'text-decoration: var(--vn-link-decoration);', 'text-decoration: underline;', 1, 'overrides the link decoration'),
	('link-decoration-button', 'src/styles/components/_button.scss', 'text-decoration: var(--vn-link-decoration);', 'text-decoration: underline;', 2, 'overrides the link decoration'),
	('form-valid-border', 'src/styles/_mixins.scss', '--bs-form-valid-border-color: var(--vn-form-valid);', f'--bs-form-valid-border-color: {VALID};', 1, 'overrides the valid color'),
	('form-valid-feedback', 'src/styles/_mixins.scss', '--bs-form-valid-color: var(--vn-form-valid);', f'--bs-form-valid-color: {VALID};', 1, 'overrides the valid color'),
	('form-invalid-border', 'src/styles/_mixins.scss', '--bs-form-invalid-border-color: var(--vn-form-invalid);', f'--bs-form-invalid-border-color: {INVALID};', 1, 'overrides the invalid color'),
	('form-invalid-feedback', 'src/styles/_mixins.scss', '--bs-form-invalid-color: var(--vn-form-invalid);', f'--bs-form-invalid-color: {INVALID};', 1, 'overrides the invalid color'),
	('state-hover', 'src/styles/components/_button.scss', HOVER_BG, HOVER_BG.replace('var(--vn-state-hover)', '12%'), 1, 'overrides the hover mix'),
	('state-active', 'src/styles/components/_button.scss', ACTIVE_BG, ACTIVE_BG.replace('var(--vn-state-active)', '22%'), 1, 'overrides the active mix'),
	('state-mixer', 'src/styles/components/_button.scss', HOVER_BG, HOVER_BG.replace('var(--vn-state-mixer)', MIXER), 1, 'overrides the state mixer'),
	('button-opacity', 'src/styles/components/_button.scss', '--bs-btn-disabled-opacity: var(--vn-button-opacity);', '--bs-btn-disabled-opacity: 0.65;', 1, 'overrides the button opacity'),
	('weight-heading', 'src/styles/elements/_dl.scss', 'font-weight: var(--vn-weight-heading);', 'font-weight: 600;', 1, 'overrides the heading weight'),
	('ease-standard', 'src/styles/components/_button.scss', 'var(--vn-ease-standard)', 'ease', 5, 'overrides the standard easing'),
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

selected = sys.argv[1:]
os.makedirs(BACKUP, exist_ok=True)
for name, partial, old, new, occurrences, title in PLANTS:
	if selected and name not in selected:
		continue
	path = os.path.join(ROOT, partial)
	backup = os.path.join(BACKUP, name + '.scss')
	shutil.copyfile(path, backup)
	with open(os.path.join(ROOT, f'tmp/units/tkp-plant-{name}.log.txt'), 'w') as log:
		text = open(path).read()
		found = text.count(old)
		log.write(f'plant {name}: {partial}\nold: {old!r}\nnew: {new!r}\noccurrences: {found} (expected {occurrences})\n\n')
		if found != occurrences:
			log.write('refused: occurrence count differs\n')
			continue
		try:
			open(path, 'w').write(text.replace(old, new))
			run(f'git diff --stat -- {partial}', log)
			run('npm run build:src:styles', log)
			run(f"npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '{title}'", log)
		finally:
			shutil.copyfile(backup, path)
			run(f'cmp {backup} {partial} && echo restored-byte-identical', log)
			run('git diff --stat -- src/styles; echo "diffstat-lines=$(git diff --stat -- src/styles | wc -l)"', log)
	print(name, 'done', flush=True)
# Rebuild the restored cascade so later runs read the shipped styles.
with open(os.path.join(ROOT, 'tmp/units/tkp-plant-rebuild.log.txt'), 'w') as log:
	run('npm run build:src:styles', log)
print('rebuilt', flush=True)
