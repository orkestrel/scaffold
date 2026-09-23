# Applies one named mutation at a time to the stage copy, rebuilds the cascade, runs the proof the
# mutation targets, records the counts, and restores the file byte for byte.
import subprocess, sys, re, os, shutil
STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage'
LOG = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/mutations-3.log.txt'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
NAVBAR = 'src/styles/components/_navbar.scss'
TOKENS = 'src/styles/_tokens.scss'
STYLES = 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot'
SECTION = 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts'
PROOF = 'tests/src/styles/components/navbar.test.ts'
LOOP = '\t@include breakpoint-each using ($infix, $_boundary) {\n'
MUTATIONS = [
	('the bar padding slot declared on a wrapper scope', NAVBAR, '\t\t--bs-navbar-padding-y: var(--vn-space-4);\n', '', f'{STYLES} {PROOF} -t "navbar-padding-y. and moves"', None),
]
SECTION_MUTATIONS = []
_UNUSED = [
	('a specimen drops the collapsed class', 'app/browser/constants.ts', 'class="navbar-toggler collapsed" type="button" aria-controls="navbar-collapsed-content"', 'class="navbar-toggler" type="button" aria-controls="navbar-collapsed-content"', SECTION),
	('a specimen drops the opened content show class', 'app/browser/constants.ts', 'class="collapse navbar-collapse show" id="navbar-opened-content"', 'class="collapse navbar-collapse" id="navbar-opened-content"', SECTION),
	('the dark class specimen drops its class', 'app/browser/constants.ts', 'class="navbar navbar-dark"', 'class="navbar"', SECTION),
]

def run(command):
	result = subprocess.run(command, shell=True, cwd=STAGE, env=ENV, capture_output=True, text=True)
	text = re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)
	counts = re.findall(r'^\s+Tests\s+(.*?)$', text, re.M)
	return result.returncode, (counts[-1] if counts else text[-400:]).strip()

def apply(path, old, new, close):
	full = os.path.join(STAGE, path)
	original = open(full).read()
	if isinstance(old, re.Pattern):
		mutated, count = old.subn(new, original, count=1)
	else:
		count = original.count(old)
		mutated = original.replace(old, new, 1)
	if count < 1:
		raise SystemExit(f'Mutation site not found in {path}: {old!r}')
	if close:
		# The wrapper opened around the loop closes before the loop's own closing brace.
		marker = '\t// The dark class and the dark attribute'
		at = mutated.index(marker)
		end = mutated.rindex('\t}\n', 0, at)
		mutated = mutated[:end] + '\t}\n' + mutated[end:]
	open(full, 'w').write(mutated)
	return full, original

with open(LOG, 'w') as log:
	build = 'npm run build:src:styles'
	for name, path, old, new, command, close in MUTATIONS:
		full, original = apply(path, old, new, close)
		try:
			code, built = run(build)
			if code != 0:
				log.write(f'{name} | build failed | {built}\n'); log.flush(); continue
			code, counts = run(command)
			log.write(f'{name} | exit {code} | {counts} | {command}\n'); log.flush()
		finally:
			open(full, 'w').write(original)
	run(build)
	for name, path, old, new, command in SECTION_MUTATIONS:
		full, original = apply(path, old, new, None)
		try:
			code, counts = run(command)
			log.write(f'{name} | exit {code} | {counts} | {command}\n'); log.flush()
		finally:
			open(full, 'w').write(original)
	code, counts = run(f'{STYLES} {PROOF} tests/src/styles/theme.test.ts')
	log.write(f'control, unmutated | exit {code} | {counts}\n')
	code, counts = run(SECTION)
	log.write(f'control, unmutated section | exit {code} | {counts}\n')
