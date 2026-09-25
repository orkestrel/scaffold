# TOKEN-PROOFS round 6 observation probe for § Customization's alias item. Appends a temporary case to
# the owned tokens.test.ts that sets `data-bs-theme="light"` and an inline `--bs-form-valid-color`
# override on the document element, and throws the value a child reads, because the runner does not
# forward the browser console. Control: the same override on a plain child wrapping a light island,
# read inside the island. Restores the file from tmp/units/tkp-6-backup/tokens.test.round6.ts and
# confirms the restore with `cmp`. Logs to tmp/units/tkp-6-alias-probe.log.txt.
import os, shutil, subprocess
ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
target = f'{ROOT}/tests/src/styles/tokens.test.ts'
backup = f'{ROOT}/tmp/units/tkp-6-backup/tokens.test.round6.ts'
case = (
	"\ndescribe('tkp6 alias probe', () => {\n"
	"\tit('tkp6 reads an alias override on a root carrying a mode', () => {\n"
	"\t\tconst host = scene.mount('<div id=\"child\"></div><div style=\"--bs-form-valid-color: rgb(9, 8, 7)\"><div data-bs-theme=\"light\"><div id=\"island\"></div></div></div>')\n"
	"\t\tconst child = requireValue(host.querySelector('#child'), 'child')\n"
	"\t\tconst island = requireValue(host.querySelector('#island'), 'island')\n"
	"\t\tconst control = readToken(island, '--bs-form-valid-color')\n"
	"\t\tdocument.documentElement.setAttribute('data-bs-theme', 'light')\n"
	"\t\tdocument.documentElement.style.setProperty('--bs-form-valid-color', 'rgb(9, 8, 7)')\n"
	"\t\tconst root = readToken(child, '--bs-form-valid-color')\n"
	"\t\tdocument.documentElement.removeAttribute('data-bs-theme')\n"
	"\t\tdocument.documentElement.style.removeProperty('--bs-form-valid-color')\n"
	"\t\tthrow new Error('TKP6 root-with-mode child=' + root + ' control-island-below-plain-override=' + control)\n"
	"\t})\n"
	"})\n"
)
with open(f'{ROOT}/tmp/units/tkp-6-alias-probe.log.txt', 'w') as log:
	try:
		open(target, 'a').write(case)
		result = subprocess.run("npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t 'tkp6 reads an alias override'", shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
		log.write('\n'.join(line for line in result.stdout.splitlines() if 'has been externalized' not in line) + f'\nexit={result.returncode}\n')
	finally:
		shutil.copyfile(backup, target)
		cmp = subprocess.run(['cmp', backup, target])
		log.write(f'restore cmp exit={cmp.returncode}\n')
