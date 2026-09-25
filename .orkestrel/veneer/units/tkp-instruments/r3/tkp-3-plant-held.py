# TOKEN-PROOFS round 3 held-island plant, derived from tmp/units/tkp-3-plant.py. Writes
# `--vn-color-primary-base: inherit` in `_theme.scss`'s mode scope after the `theme-tokens` include,
# so a mode scope takes the primary fill from its parent instead of re-declaring it. Backs up the
# partial under tmp/units/tkp-3-backup/, rebuilds the styles, runs the scope case alone, logs to
# tmp/units/tkp-3-plant-held.log.txt, restores from the backup, and confirms the restore with `cmp`
# and `git diff --stat -- src`.
import os, shutil, subprocess

ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
PARTIAL = 'src/styles/_theme.scss'
BACKUP = os.path.join(ROOT, 'tmp/units/tkp-3-backup/_theme-held.scss')
OLD = '\t\t\t@include theme-tokens(tokens.$roles, tokens.$aliased, $values, tokens.$retuned);\n'
NEW = OLD + '\t\t\t--vn-color-primary-base: inherit;\n'
TITLE = 'holds the root-only aliases under a mode scope'

def run(command, log):
	log.write(f'$ {command}\n')
	log.flush()
	result = subprocess.run(command, shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
	log.write('\n'.join(line for line in result.stdout.splitlines() if 'has been externalized' not in line) + '\n')
	log.write(f'exit={result.returncode}\n\n')
	log.flush()

path = os.path.join(ROOT, PARTIAL)
shutil.copyfile(path, BACKUP)
with open(os.path.join(ROOT, 'tmp/units/tkp-3-plant-held.log.txt'), 'w') as log:
	text = open(path).read()
	log.write(f'plant held: {PARTIAL}\noccurrences of the include line: {text.count(OLD)} (expected 1)\n\n')
	if text.count(OLD) == 1:
		try:
			open(path, 'w').write(text.replace(OLD, NEW))
			run(f'git diff -- {PARTIAL}', log)
			run('npm run build:src:styles', log)
			run(f"npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '{TITLE}'", log)
			run('cat /proc/loadavg', log)
		finally:
			shutil.copyfile(BACKUP, path)
			run(f'cmp {BACKUP} {PARTIAL} && echo restored-byte-identical', log)
			run('git diff --stat -- src; echo "src-diffstat-lines=$(git diff --stat -- src | wc -l)"', log)
			run('npm run build:src:styles', log)
	else:
		log.write('refused: occurrence count differs\n')
