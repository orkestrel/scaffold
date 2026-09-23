# Applies one named mutation at a time to the stage copy, rebuilds the cascade where the proof reads
# it, runs the proof the mutation targets, records the exit and the counts, and restores the file
# byte for byte, checked by digest. The round-1 set is carried with its labels corrected; the section
# gains the class bar's light attribute, and the setup proof gains the dark-spelling table.
import hashlib, os, re, signal, subprocess, sys
STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage'
LOG = '/home/user/veneer-nb/tmp/units/nb-instruments-2/logs/mutations.log.txt'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
NAVBAR = 'src/styles/components/_navbar.scss'
TOKENS = 'src/styles/_tokens.scss'
CONSTANTS = 'app/browser/constants.ts'
SETUP = 'tests/setupStyles.ts'
STYLES = 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot'
SECTION = 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts'
TABLES = 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts -t "binds the navbar selectors"'
PROOF = 'tests/src/styles/components/navbar.test.ts'
LOOP = '\t@include breakpoint-each using ($infix, $_boundary) {\n'
BUILD = 'npm run build:src:styles'
SPELLINGS = """	Object.freeze({
		name: 'the dark class',
		selector: '.navbar-dark',
		markup: `<nav class="navbar navbar-dark">${NAVBAR_MARKUP}</nav>`,
	}),
	Object.freeze({
		name: "the bar's own dark attribute",
		selector: '.navbar[data-bs-theme=dark]',
		markup: `<nav class="navbar" data-bs-theme="dark">${NAVBAR_MARKUP}</nav>`,
	}),
"""
SWAPPED = """	Object.freeze({
		name: "the bar's own dark attribute",
		selector: '.navbar[data-bs-theme=dark]',
		markup: `<nav class="navbar" data-bs-theme="dark">${NAVBAR_MARKUP}</nav>`,
	}),
	Object.freeze({
		name: 'the dark class',
		selector: '.navbar-dark',
		markup: `<nav class="navbar navbar-dark">${NAVBAR_MARKUP}</nav>`,
	}),
"""
# (label, file, site, replacement, command, rebuild, close)
MUTATIONS = [
	('each expand class gated at its neighbouring boundary', NAVBAR, LOOP,
	 "\t@each $step, $neighbour in (xs: xs, sm: md, md: lg, lg: xl, xl: xxl, xxl: sm) {\n\t\t$infix: if($step == xs, '', '-#{$step}');\n\t\t@include breakpoint-up($neighbour) {\n",
	 f'{STYLES} {PROOF} -t "expands the"', True, 'close-loop'),
	('the whole expand loop wrapped in the sm boundary, which gates the no-infix class there', NAVBAR, LOOP, LOOP + '\t\t@include breakpoint-up(sm) {\n', f'{STYLES} {PROOF} -t "carrying no infix"', True, 'close-one'),
	('.navbar-dark dropped from the dark list', NAVBAR, '\t.navbar-dark,\n', '', f'{STYLES} {PROOF} -t "retunes every color"', True, None),
	('the toggler asset left at theme scope (the $assets row restored)', TOKENS, "\t'accordion-icon': '--bs-accordion-btn-icon',", "\t'toggler-icon': '--bs-navbar-toggler-icon-bg',\n\t'accordion-icon': '--bs-accordion-btn-icon',", f'{STYLES} {PROOF} tests/src/styles/theme.test.ts -t "dark icon|dark icons"', True, None),
	('the 75vh fallback missing', NAVBAR, 'max-height: var(--bs-scroll-height, 75vh);', 'max-height: var(--bs-scroll-height);', f'{STYLES} {PROOF} -t "clamps the scrolling list"', True, None),
	('the --bs-nav-link-* reassignment dropped', NAVBAR, '\t\t--bs-nav-link-color: var(--bs-navbar-color);\n\t\t--bs-nav-link-hover-color: var(--bs-navbar-hover-color);\n\t\t--bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);\n', '', f'{STYLES} {PROOF} -t "paints every link inside the list"', True, None),
	('the current and open link rule dropped', NAVBAR, '\t.navbar-nav .nav-link.active,\n\t.navbar-nav .nav-link.show {\n\t\tcolor: var(--bs-navbar-active-color);\n\t}\n', '', f'{STYLES} {PROOF} -t "paints every link inside the list"', True, None),
	('the expanded .offcanvas rule dropped', NAVBAR, re.compile(r"\t\t\.navbar-expand#\{\$infix\} \.offcanvas \{.*?\n\t\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "offcanvas panel"', True, None),
	('the expanded .offcanvas-header rule dropped', NAVBAR, re.compile(r"\t\t\.navbar-expand#\{\$infix\} \.offcanvas \.offcanvas-header \{.*?\n\t\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "offcanvas panel"', True, None),
	('the toggler ring dropped', NAVBAR, '\t\tbox-shadow: 0 0 0 var(--bs-navbar-toggler-focus-width);\n', '', f'{STYLES} {PROOF} -t "rings the focused toggler"', True, None),
	('the toggler forced-ring include omitted', NAVBAR, '\t\t@include forced-ring;\n', '', f'{STYLES} {PROOF} -t "under forced colors"', True, None),
	('the toggler transition written bare', NAVBAR, '\t\t@include transition(var(--bs-navbar-toggler-transition));\n', '\t\ttransition: var(--bs-navbar-toggler-transition);\n', f'{STYLES} {PROOF} -t "collapses the toggler transition"', True, None),
	("the collapsed list's menu rule dropped", NAVBAR, '\t.navbar-nav .dropdown-menu {\n\t\tposition: static;\n\t}\n', '', f'{STYLES} {PROOF} -t "opens a menu in the column flow|expands the .sm. bar"', True, None),
	('the .navbar-collapse rule dropped', NAVBAR, '\t.navbar-collapse {\n\t\tflex-grow: 1;\n\t\tflex-basis: 100%;\n\t\talign-items: center;\n\t}\n', '', f'{STYLES} {PROOF} -t "opens a menu in the column flow|expands the .md. bar"', True, None),
	('a .navbar-light rule written', NAVBAR, '\t.navbar-dark,\n', '\t.navbar-light {\n\t\t--bs-navbar-color: inherit;\n\t}\n\n\t.navbar-dark,\n', f'{STYLES} {PROOF} -t "writes no rule for the light class"', True, None),
	('the brand hover and focus rule dropped', NAVBAR, '\t.navbar-brand:hover,\n\t.navbar-brand:focus {\n\t\tcolor: var(--bs-navbar-brand-hover-color);\n\t}\n', '', f'{STYLES} {PROOF} -t "hover slots"', True, None),
	('the .navbar-text a rule dropped', NAVBAR, '\t.navbar-text a,\n\t.navbar-text a:hover,\n\t.navbar-text a:focus {\n\t\tcolor: var(--bs-navbar-active-color);\n\t}\n', '', f'{STYLES} {PROOF} -t "paints every link inside the list|hover slots"', True, None),
	('the text inset written as a literal', NAVBAR, '\t\tpadding-top: var(--vn-space-4);\n\t\tpadding-bottom: var(--vn-space-4);\n\t\tcolor: var(--bs-navbar-color);', '\t\tpadding-top: 0.5rem;\n\t\tpadding-bottom: var(--vn-space-4);\n\t\tcolor: var(--bs-navbar-color);', f'{STYLES} {PROOF} -t "density factor"', True, None),
	('the dark icon rule dropped', NAVBAR, re.compile(r"\t\[data-bs-theme='dark'\] \.navbar-toggler-icon \{.*?\n\t\}\n", re.S), '', f'{STYLES} {PROOF} -t "dark icon"', True, None),
	('--bs-navbar-padding-y removed from .navbar', NAVBAR, '\t\t--bs-navbar-padding-y: var(--vn-space-4);\n', '', f'{STYLES} {PROOF} -t "navbar-padding-y. and moves"', True, None),
	("the !important flag dropped from the expanded content's display", NAVBAR, 'display: flex !important;', 'display: flex;', 'npm run test:conformance -- -t "carries the priority"', True, None),
	('the collapsed specimen toggler drops collapsed', CONSTANTS, 'class="navbar-toggler collapsed" type="button" aria-controls="navbar-collapsed-content"', 'class="navbar-toggler" type="button" aria-controls="navbar-collapsed-content"', SECTION, False, None),
	('the opened specimen content drops show', CONSTANTS, 'class="collapse navbar-collapse show" id="navbar-opened-content"', 'class="collapse navbar-collapse" id="navbar-opened-content"', SECTION, False, None),
	('the inverted-class specimen drops navbar-dark', CONSTANTS, 'class="navbar navbar-dark" data-bs-theme="light"', 'class="navbar" data-bs-theme="light"', SECTION, False, None),
	('the inverted-class specimen drops its light attribute', CONSTANTS, 'class="navbar navbar-dark" data-bs-theme="light"', 'class="navbar navbar-dark"', SECTION, False, None),
	('the dark-spelling table left unfrozen', SETUP, 'export const NAVBAR_DARK_SPELLING_CASES = Object.freeze([', 'export const NAVBAR_DARK_SPELLING_CASES = [', TABLES, False, 'close-array'),
	('a dark-spelling row left unfrozen', SETUP, "\tObject.freeze({\n\t\tname: 'the dark class',\n\t\tselector: '.navbar-dark',\n\t\tmarkup: `<nav class=\"navbar navbar-dark\">${NAVBAR_MARKUP}</nav>`,\n\t}),", "\t{\n\t\tname: 'the dark class',\n\t\tselector: '.navbar-dark',\n\t\tmarkup: `<nav class=\"navbar navbar-dark\">${NAVBAR_MARKUP}</nav>`,\n\t},", TABLES, False, None),
	('the dark-spelling rows reordered', SETUP, SPELLINGS, SWAPPED, TABLES, False, None),
	('the dark-spelling rows reordered, read by the browser proof', SETUP, SPELLINGS, SWAPPED, f'{STYLES} {PROOF} -t "retunes every color"', False, None),
]

# A termination signal raises inside the running mutation, so its `finally` restores the file.
def stop(signum, _frame):
	raise SystemExit(f'stopped by signal {signum}')

signal.signal(signal.SIGTERM, stop)
signal.signal(signal.SIGHUP, stop)
# `resume N` skips the mutations before the Nth (counted from zero) and appends to the log.
START = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[1] == 'resume' else 0

def run(command):
	result = subprocess.run(command, shell=True, cwd=STAGE, env=ENV, capture_output=True, text=True)
	text = re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)
	counts = re.findall(r'^\s+Tests\s+(.*?)$', text, re.M)
	failed = re.findall(r'^ FAIL .*?> (.*)$', text, re.M)
	return result.returncode, (counts[-1] if counts else text[-400:]).strip(), failed

def digest(path):
	return hashlib.sha256(open(path, 'rb').read()).hexdigest()

def apply(path, old, new, close):
	full = os.path.join(STAGE, path)
	original = open(full).read()
	if isinstance(old, re.Pattern):
		mutated, count = old.subn(new, original, count=1)
	else:
		count = original.count(old)
		mutated = original.replace(old, new, 1)
	if count != 1:
		raise SystemExit(f'Mutation site found {count} times in {path}: {old!r}')
	if close in ('close-loop', 'close-one'):
		# The wrapper opened around the loop closes before the loop's own closing brace.
		marker = '\t// The dark class and the dark attribute'
		at = mutated.index(marker)
		end = mutated.rindex('\t}\n', 0, at)
		mutated = mutated[:end] + '\t}\n' + mutated[end:]
	if close == 'close-array':
		start = mutated.index('export const NAVBAR_DARK_SPELLING_CASES = [')
		end = mutated.index('\n])', start)
		mutated = mutated[:end] + '\n]' + mutated[end + 3:]
	open(full, 'w').write(mutated)
	return full, original

with open(LOG, 'a' if START else 'w') as log:
	for label, path, old, new, command, rebuild, close in MUTATIONS[START:]:
		full, original = apply(path, old, new, close)
		before = hashlib.sha256(original.encode()).hexdigest()
		try:
			if rebuild:
				code, built, _ = run(BUILD)
				if code != 0:
					log.write(f'{label} | build failed | {built}\n'); log.flush(); continue
			code, counts, failed = run(command)
			log.write(f'{label} | exit {code} | {counts} | failed: {"; ".join(failed) or "none"} | {command}\n'); log.flush()
		finally:
			open(full, 'w').write(original)
			if digest(full) != before:
				raise SystemExit(f'{path} not restored')
	run(BUILD)
	for label, command in [
		('control, unmutated navbar and theme', f'{STYLES} {PROOF} tests/src/styles/theme.test.ts'),
		('control, unmutated section', SECTION),
		('control, unmutated setup proof', 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts'),
	]:
		code, counts, failed = run(command)
		log.write(f'{label} | exit {code} | {counts} | failed: {"; ".join(failed) or "none"} | {command}\n'); log.flush()
	log.write('done: every mutated file restored by digest\n')
