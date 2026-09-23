"""Applies one named mutation to the probe copy, rebuilds the cascade, runs the named proof, and
restores the mutated file byte for byte. Prints the failing count and the red case titles."""
import os, re, subprocess, sys

TREE = '/home/user/veneer-ud/tmp/probe/tree'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])

DISPLAY = 'src/styles/utilities/_display.scss'
FLEX = 'src/styles/utilities/_flex.scss'
ALIGN = 'src/styles/utilities/_vertical-align.scss'
STACKS = 'src/styles/components/_stacks.scss'
MIXINS = 'src/styles/_mixins.scss'
PRINT_BLOCK = """	@media print {
		@include utility(d, display, $values, '-print', true);
	}
"""
WALK = """	@include breakpoint-each using ($infix, $_boundary) {
		@include utility(d, display, $values, $infix, true);
	}
"""

def flex_per_entry(text):
    # Walks the breakpoints once per entry instead of once for every entry.
    start = text.index('\t@include breakpoint-each')
    end = text.rindex('\n\t}\n') + len('\n\t}\n')
    calls = re.findall(r'\t\t@include utility\((?:.|\n)*?\);\n', text[start:end])
    walks = ''.join('\t@include breakpoint-each using ($infix, $_boundary) {\n' + call + '\t}\n' for call in calls)
    return text[:start] + walks + text[end:]

MUTATIONS = {
    'print-omitted': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace(PRINT_BLOCK, '')),
    'print-screen': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace('@media print {', '@media screen {')),
    'print-before-walk': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace(WALK, '').replace(PRINT_BLOCK, PRINT_BLOCK + WALK)),
    'display-value-omitted': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace(' inline-grid,', '')),
    'display-breakpoint-omitted': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace("\t\t@include utility(d, display, $values, $infix, true);", "\t\t@if $infix != '-lg' {\n\t\t\t@include utility(d, display, $values, $infix, true);\n\t\t}")),
    'display-walk-reversed': (DISPLAY, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace(WALK, """	@each $name in (xxl, xl, lg, md, sm, xs) {
		@include breakpoint-up($name) {
			$infix: '';
			@if $name != xs {
				$infix: '-#{$name}';
			}
			@include utility(d, display, $values, $infix, true);
		}
	}
""")),
    'display-important-dropped': (MIXINS, 'tests/src/styles/utilities/display.test.ts', lambda t: t.replace('#{$property}: $value !important;', '#{$property}: $value;')),
    'flex-initial-value': (FLEX, 'tests/src/styles/utilities/flex.test.ts', lambda t: t.replace('(row, column, row-reverse, column-reverse)', '(row: row, column: row, row-reverse: row-reverse, column-reverse: column-reverse)')),
    'flex-justify-initial': (FLEX, 'tests/src/styles/utilities/flex.test.ts', lambda t: t.replace('end: flex-end,\n\t\t\t\tcenter: center,\n\t\t\t\tbetween', 'end: normal,\n\t\t\t\tcenter: center,\n\t\t\t\tbetween', 1)),
    'flex-per-entry': (FLEX, 'tests/src/styles/utilities/flex.test.ts', flex_per_entry),
    'flex-shrink-before-flex': (FLEX, 'tests/src/styles/utilities/flex.test.ts', lambda t: (lambda shrink: t.replace(shrink, '').replace('\t\t@include utility(\n\t\t\tflex,\n\t\t\tflex,\n', shrink + '\t\t@include utility(\n\t\t\tflex,\n\t\t\tflex,\n'))(t[t.index('\t\t@include utility(\n\t\t\tflex,\n\t\t\tflex-shrink,'):t.index('\t\t@include utility(flex, flex-wrap')])),
    'flex-important-dropped': (MIXINS, 'tests/src/styles/utilities/flex.test.ts', lambda t: t.replace('#{$property}: $value !important;', '#{$property}: $value;')),
    'align-initial-value': (ALIGN, 'tests/src/styles/utilities/vertical-align.test.ts', lambda t: t.replace('(baseline, top, middle, bottom, text-bottom, text-top)', '(baseline: baseline, top: top, middle: baseline, bottom: bottom, text-bottom: text-bottom, text-top: text-top)')),
    'align-responsive': (ALIGN, 'tests/src/styles/utilities/vertical-align.test.ts', lambda t: t.replace('\t\t\t$infix\n\t\t);', '\t\t\t$infix,\n\t\t\ttrue\n\t\t);')),
    'align-important-dropped': (MIXINS, 'tests/src/styles/utilities/vertical-align.test.ts', lambda t: t.replace('#{$property}: $value !important;', '#{$property}: $value;')),
    'stack-display-dropped': (STACKS, 'tests/src/styles/components/stacks.test.ts', lambda t: t.replace('\t.hstack {\n\t\tdisplay: flex;\n', '\t.hstack {\n')),
    'stack-important': (STACKS, 'tests/src/styles/components/stacks.test.ts', lambda t: re.sub(r'(\t\t[a-z-]+: [^;]+);', r'\1 !important;', t)),
    'stack-utilities-layer': (STACKS, 'tests/src/styles/components/stacks.test.ts', lambda t: t.replace('@layer components {', '@layer utilities {')),
}

def main(name):
    path, proof, mutate = MUTATIONS[name]
    full = os.path.join(TREE, path)
    original = open(full, 'rb').read()
    mutated = mutate(original.decode())
    if mutated == original.decode():
        print(f'{name}: MUTATION DID NOT APPLY'); return
    try:
        open(full, 'w').write(mutated)
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=TREE, env=ENV, capture_output=True, text=True)
        if build.returncode != 0:
            print(f'{name}: build failed\n{build.stderr[-800:]}'); return
        run = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot', proof], cwd=TREE, env=ENV, capture_output=True, text=True)
        out = re.sub(r'\x1b\[[0-9;]*m', '', run.stdout + run.stderr)
        tests = re.search(r'Tests\s+(.*?)\(\d+\)', out)
        red = sorted(set(re.findall(r'FAIL .*? > (.*)', out)))
        print(f'{name}: exit={run.returncode} tests: {tests.group(0) if tests else "?"}')
        for title in red: print(f'  red: {title}')
    finally:
        open(full, 'wb').write(original)

if __name__ == '__main__':
    for name in sys.argv[1:] or MUTATIONS: main(name)
    subprocess.run(['npm', 'run', 'build:src:styles'], cwd=TREE, env=ENV, capture_output=True)
