# TOKEN-PROOFS round 6 browser cross-check of the scope reading. Appends a temporary case to the
# owned tokens.test.ts that reads every name the mode scopes declare, computed on the document element,
# on a light island, and on a dark island, and prints the names whose three readings are equal. Runs
# the case alone, which throws its reading as the error message because the runner does not forward
# the browser console,, logs to tmp/units/tkp-6-browser-probe.log.txt, and restores the file from
# tmp/units/tkp-6-backup/tokens.test.ts, confirming the restore with `cmp`.
import json, os, re, shutil, subprocess
ROOT = '/home/user/veneer-tkp'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
css = open(f'{ROOT}/dist/src/styles/index.css').read()
block = re.search(r'\[data-bs-theme=dark\]\{([^{}]*)\}', css).group(1)
names = sorted(set(re.findall(r'(--[\w-]+)\s*:', block)))
target = f'{ROOT}/tests/src/styles/tokens.test.ts'
backup = f'{ROOT}/tmp/units/tkp-6-backup/tokens.test.ts'
case = (
	"\ndescribe('tkp6 scope probe', () => {\n"
	"\tit('tkp6 reads the mode-scope names', () => {\n"
	"\t\tconst host = scene.mount('<div data-bs-theme=\"light\" id=\"l\"></div><div data-bs-theme=\"dark\" id=\"d\"></div>')\n"
	"\t\tconst light = requireValue(host.querySelector('#l'), 'light')\n"
	"\t\tconst dark = requireValue(host.querySelector('#d'), 'dark')\n"
	f"\t\tconst names = {json.dumps(names)}\n"
	"\t\tconst read = (element: Element, name: string) => getComputedStyle(element).getPropertyValue(name).trim()\n"
	"\t\tconst same = names.filter((name) => read(document.documentElement, name) === read(light, name) && read(light, name) === read(dark, name))\n"
	"\t\tconst lightDiffers = names.filter((name) => read(document.documentElement, name) !== read(light, name))\n"
	"\t\tthrow new Error('TKP6 names=' + names.length + ' same=' + JSON.stringify(same.map((name) => name + '=' + read(dark, name))) + ' light-differs-from-root=' + JSON.stringify(lightDiffers))\n"
	"\t\texpect(names.length).toBeGreaterThan(0)\n"
	"\t})\n"
	"})\n"
)
with open(f'{ROOT}/tmp/units/tkp-6-browser-probe.log.txt', 'w') as log:
	try:
		open(target, 'a').write(case)
		result = subprocess.run("npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t 'tkp6 reads the mode-scope names'", shell=True, cwd=ROOT, env=ENV, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
		log.write('\n'.join(line for line in result.stdout.splitlines() if 'has been externalized' not in line) + f'\nexit={result.returncode}\n')
	finally:
		shutil.copyfile(backup, target)
		cmp = subprocess.run(['cmp', backup, target])
		log.write(f'restore cmp exit={cmp.returncode}\n')
