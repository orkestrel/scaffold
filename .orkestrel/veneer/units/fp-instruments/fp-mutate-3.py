# fp round-3 mutation: gives every host of the Disabled buttons specimen the `btn-primary btn-secondary`
# variant pair, runs the Button group section proof, logs the command, exit, summary, failing case,
# reason, and assertion site, and restores the file byte for byte.
import os, re, subprocess
ROOT = '/home/user/veneer-fp'
PATH = f'{ROOT}/app/browser/constants.ts'
LOG = f'{ROOT}/tmp/units/fp-mutations-3.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
COMMAND = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser', 'tests/app/browser/sections/ButtonGroupSection.test.ts']
original = open(PATH).read()
start = original.index("name: 'Disabled buttons',")
end = original.index("name: 'Pressed roles',")
segment = original[start:end]
assert segment.count('class="btn btn-primary') == 6
mutated = original[:start] + segment.replace('class="btn btn-primary', 'class="btn btn-primary btn-secondary') + original[end:]
open(PATH, 'w').write(mutated)
try:
	run = subprocess.run(COMMAND, cwd=ROOT, env=ENV, capture_output=True, text=True)
finally:
	open(PATH, 'w').write(original)
output = re.sub(r'\x1b\[[0-9;]*m', '', run.stdout + run.stderr)
with open(LOG, 'w') as log:
	log.write('== P1 every disabled-forms host carrying btn-primary btn-secondary\n')
	log.write('site: app/browser/constants.ts, the Disabled buttons specimen body\n')
	log.write('command: ' + ' '.join(COMMAND) + '\n')
	log.write(f'test exit: {run.returncode}\n')
	for line in output.splitlines():
		s = line.strip()
		if re.match(r'(Tests|Test Files)\s', s): log.write(f'summary: {s}\n')
		elif s.startswith('×'): log.write(f'failing: {s}\n')
		elif s.startswith('→'): log.write(f'reason: {s}\n')
		elif re.match(r'❯ tests/.*\.test\.ts:\d+:\d+', s): log.write(f'assertion: {s}\n')
	log.write(f'restored: {open(PATH).read() == original}\n')
print(run.returncode)
