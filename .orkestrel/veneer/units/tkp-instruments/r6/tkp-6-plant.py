# TOKEN-PROOFS round 6 root-with-mode plant, derived from tmp/units/tkp-5-plant.py. The plant appends
# a `:root[data-bs-theme]` rule inside `_theme.scss`'s `@layer theme` block that declares
# `--bs-border-radius` at its resting value, so on a root carrying a mode the alias no longer resolves
# from `--vn-radius-base` and stays frozen. A root without the attribute and every mode scope below
# the root keep the shipped alias, so every earlier assertion in the scope case holds and only the
# root-with-mode override reading fails. The plant backs up the partial under tmp/units/tkp-6-backup/,
# rebuilds the styles, runs the scope case alone, logs to tmp/units/tkp-6-plant-root-mode.log.txt,
# restores from the backup, confirms the restore with `cmp` and `git diff --stat -- src`, and rebuilds.
import os, shutil, subprocess

ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
PARTIAL = 'src/styles/_theme.scss'
OLD = '\t\t\t@include theme-tokens(tokens.$roles, tokens.$aliased, $values, tokens.$retuned);\n\t\t}\n\t}\n'
NEW = OLD + '\n\t:root[data-bs-theme] {\n\t\t--bs-border-radius: calc(0.375rem * var(--vn-factor-radius));\n\t}\n'
TITLE = 'moves a root-only alias from a document element that carries a mode'


def run(command, log):
	log.write(f'$ {command}\n')
	log.flush()
	result = subprocess.run(command, shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
	log.write('\n'.join(line for line in result.stdout.splitlines() if 'has been externalized' not in line) + '\n')
	log.write(f'exit={result.returncode}\n\n')
	log.flush()


path = os.path.join(ROOT, PARTIAL)
backup = os.path.join(ROOT, 'tmp/units/tkp-6-backup/_theme-root-mode.scss')
shutil.copyfile(path, backup)
with open(os.path.join(ROOT, 'tmp/units/tkp-6-plant-root-mode.log.txt'), 'w') as log:
	text = open(path).read()
	log.write(f'plant root-mode: {PARTIAL}\noccurrences of the anchor: {text.count(OLD)} (expected 1)\n\n')
	if text.count(OLD) != 1:
		log.write('refused: occurrence count differs\n')
	else:
		try:
			open(path, 'w').write(text.replace(OLD, NEW))
			run(f'git diff -- {PARTIAL}', log)
			run('npm run build:src:styles', log)
			run("grep -o ':root\\[data-bs-theme\\]{[^}]*}' dist/src/styles/index.css", log)
			run(f"npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '{TITLE}'", log)
			run('cat /proc/loadavg', log)
		finally:
			shutil.copyfile(backup, path)
			run(f'cmp {backup} {PARTIAL} && echo restored-byte-identical', log)
			run('git diff --stat -- src; echo "src-diffstat-lines=$(git diff --stat -- src | wc -l)"', log)
			run('npm run build:src:styles', log)
			run("grep -c ':root\\[data-bs-theme\\]' dist/src/styles/index.css", log)
print('plant done')
