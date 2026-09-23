# Applies one named mutation at a time to the stage copy, rebuilds the cascade, runs the proof the
# mutation targets, records the counts, and restores the file byte for byte.
import subprocess, sys, re, os, shutil
STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage'
LOG = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/mutations.log.txt'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
NAVBAR = 'src/styles/components/_navbar.scss'
TOKENS = 'src/styles/_tokens.scss'
STYLES = 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot'
SECTION = 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts'
PROOF = 'tests/src/styles/components/navbar.test.ts'
LOOP = '\t@include breakpoint-each using ($infix, $_boundary) {\n'
MUTATIONS = [
	('expand ramp gated at the neighbouring boundary', NAVBAR, LOOP,
	 "\t@each $step, $neighbour in (xs: xs, sm: md, md: lg, lg: xl, xl: xxl, xxl: sm) {\n\t\t$infix: if($step == xs, '', '-#{$step}');\n\t\t@include breakpoint-up($neighbour) {\n",
	 f'{STYLES} {PROOF} -t "expands the"', 'close-loop'),
	('the no-infix class gated at the sm boundary', NAVBAR, LOOP, LOOP + '\t\t@include breakpoint-up(sm) {\n', f'{STYLES} {PROOF} -t "carrying no infix"', 'close-one'),
	('the dark class dropped from the dark list', NAVBAR, '\t.navbar-dark,\n', '', f'{STYLES} {PROOF} -t "retunes every color"', None),
	('the toggler asset left at theme scope', TOKENS, "\t'accordion-icon': '--bs-accordion-btn-icon',", "\t'toggler-icon': '--bs-navbar-toggler-icon-bg',\n\t'accordion-icon': '--bs-accordion-btn-icon',", f'{STYLES} {PROOF} tests/src/styles/theme.test.ts -t "dark icon|dark icons"', None),
	('the scroll fallback missing', NAVBAR, 'max-height: var(--bs-scroll-height, 75vh);', 'max-height: var(--bs-scroll-height);', f'{STYLES} {PROOF} -t "clamps the scrolling list"', None),
	('the nav link slot reassignment dropped', NAVBAR, '\t\t--bs-nav-link-color: var(--bs-navbar-color);\n\t\t--bs-nav-link-hover-color: var(--bs-navbar-hover-color);\n\t\t--bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);\n', '', f'{STYLES} {PROOF} -t "paints every link inside the list"', None),
	('the expanded offcanvas panel rule dropped', NAVBAR, re.compile(r"\t\t\.navbar-expand#\{\$infix\} \.offcanvas \{.*?\n\t\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "offcanvas panel"', None),
	('the expanded offcanvas header rule dropped', NAVBAR, re.compile(r"\t\t\.navbar-expand#\{\$infix\} \.offcanvas \.offcanvas-header \{.*?\n\t\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "offcanvas panel"', None),
	('the toggler ring dropped', NAVBAR, '\t\tbox-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width);\n', '', f'{STYLES} {PROOF} -t "rings the focused toggler"', None),
	('the toggler forced ring omitted', NAVBAR, '\t\t@include forced-ring;\n', '', f'{STYLES} {PROOF} -t "under forced colors"', None),
	('the toggler transition written bare', NAVBAR, '\t\t@include transition(var(--bs-navbar-toggler-transition));\n', '\t\ttransition: var(--bs-navbar-toggler-transition);\n', f'{STYLES} {PROOF} -t "collapses the toggler transition"', None),
	('the collapsed list menu rule dropped', NAVBAR, '\t.navbar-nav .dropdown-menu {\n\t\tposition: static;\n\t}\n', '', f'{STYLES} {PROOF} -t "opens a menu in the column flow|expands the .sm. bar"', None),
	('a light class rule written', NAVBAR, '\t.navbar-dark,\n', '\t.navbar-light {\n\t\t--bs-navbar-color: inherit;\n\t}\n\n\t.navbar-dark,\n', f'{STYLES} {PROOF} -t "writes no rule for the light class"', None),
	('the brand hover rule dropped', NAVBAR, '\t.navbar-brand:hover,\n\t.navbar-brand:focus {\n\t\tcolor: var(--bs-navbar-brand-hover-color);\n\t}\n', '', f'{STYLES} {PROOF} -t "hover slots"', None),
	('the text link rule dropped', NAVBAR, '\t.navbar-text a,\n\t.navbar-text a:hover,\n\t.navbar-text a:focus {\n\t\tcolor: var(--bs-navbar-active-color);\n\t}\n', '', f'{STYLES} {PROOF} -t "paints every link inside the list|hover slots"', None),
	('the text inset written as a literal', NAVBAR, '\t\tpadding-top: var(--vn-space-4);\n\t\tpadding-bottom: var(--vn-space-4);\n\t\tcolor: var(--bs-navbar-color);', '\t\tpadding-top: 0.5rem;\n\t\tpadding-bottom: var(--vn-space-4);\n\t\tcolor: var(--bs-navbar-color);', f'{STYLES} {PROOF} -t "density factor"', None),
	('the dark icon rule dropped', NAVBAR, re.compile(r"\t\[data-bs-theme='dark'\] \.navbar-toggler-icon \{.*?\n\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "dark icon"', None),
	('the bar padding slot declared on a wrapper scope', NAVBAR, '\t\t--bs-navbar-padding-y: var(--vn-space-4);\n', '', f'{STYLES} {PROOF} -t "--bs-navbar-padding-y"', None),
]
SECTION_MUTATIONS = [
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
