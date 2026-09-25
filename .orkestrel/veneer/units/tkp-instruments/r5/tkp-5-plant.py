# TOKEN-PROOFS round 5 nested-scope plants, derived from tmp/units/tkp-3-plant-held.py. Each plant
# writes `<name>: inherit` in `_theme.scss`'s mode scope after the `theme-tokens` include, so a mode
# scope takes that property from its parent instead of declaring it again. The `:root` block keeps
# its own declaration because it includes the mixin from `_tokens.scss`. Each plant backs up the
# partial under tmp/units/tkp-5-backup/, rebuilds the styles, runs its case alone, logs to
# tmp/units/tkp-5-plant-<name>.log.txt, restores from the backup, and confirms the restore with `cmp`
# and `git diff --stat -- src`.
import os, shutil, subprocess

ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
PARTIAL = 'src/styles/_theme.scss'
OLD = '\t\t\t@include theme-tokens(tokens.$roles, tokens.$aliased, $values, tokens.$retuned);\n'
LINK = 'repaints a link and a link button inside an ancestor that overrides the link color'
ALIAS = 'recolors the border and the feedback of a valid control inside a plain ancestor that sets the validation aliases'
PLANTS = [
	('link-nested', ['--vn-link-base'], LINK),
	('alias-nested-border', ['--bs-form-valid-border-color'], ALIAS),
	('alias-nested-feedback', ['--bs-form-valid-color'], ALIAS),
]

def run(command, log):
	log.write(f'$ {command}\n')
	log.flush()
	result = subprocess.run(command, shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
	log.write('\n'.join(line for line in result.stdout.splitlines() if 'has been externalized' not in line) + '\n')
	log.write(f'exit={result.returncode}\n\n')
	log.flush()

path = os.path.join(ROOT, PARTIAL)
for name, properties, title in PLANTS:
	backup = os.path.join(ROOT, f'tmp/units/tkp-5-backup/_theme-{name}.scss')
	shutil.copyfile(path, backup)
	new = OLD + ''.join(f'\t\t\t{prop}: inherit;\n' for prop in properties)
	with open(os.path.join(ROOT, f'tmp/units/tkp-5-plant-{name}.log.txt'), 'w') as log:
		text = open(path).read()
		log.write(f'plant {name}: {PARTIAL}\noccurrences of the include line: {text.count(OLD)} (expected 1)\n\n')
		if text.count(OLD) != 1:
			log.write('refused: occurrence count differs\n')
			continue
		try:
			open(path, 'w').write(text.replace(OLD, new))
			run(f'git diff -- {PARTIAL}', log)
			run('npm run build:src:styles', log)
			run(f"npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '{title}'", log)
			run('cat /proc/loadavg', log)
		finally:
			shutil.copyfile(backup, path)
			run(f'cmp {backup} {PARTIAL} && echo restored-byte-identical', log)
			run('git diff --stat -- src; echo "src-diffstat-lines=$(git diff --stat -- src | wc -l)"', log)
	print(name, 'done')

with open(os.path.join(ROOT, 'tmp/units/tkp-5-plant-rebuild.log.txt'), 'w') as log:
	run('npm run build:src:styles', log)
