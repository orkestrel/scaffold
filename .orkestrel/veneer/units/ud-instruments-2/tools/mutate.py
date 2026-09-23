"""Runs the unit's mutations in the landing copy, one log per run.

Usage: python3 mutate.py STAGE NAME [NAME ...]   (NAME `control` runs the unmutated copy)

Each run applies one named mutation to the landing copy (refusing a mutation that does not apply),
rebuilds the styles cascade, runs the four style proofs under the styles project and the two section
proofs under the app:browser project, and restores every mutated file byte for byte. The log
`logs/STAGE/NAME.log.txt` names the copy, the mutated files with their SHA-256 digests before the
mutation and after the restore, both commands with their exit codes, the test tallies, the red case
titles, and the full runner output.
"""
import difflib, hashlib, os, re, subprocess, sys

ROOT = '/home/user/veneer-ud'
LAND = f'{ROOT}/tmp/probe/land'
LOGS = f'{ROOT}/tmp/units/ud-instruments-2/logs'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])

DISPLAY = 'src/styles/utilities/_display.scss'
FLEX = 'src/styles/utilities/_flex.scss'
ALIGN = 'src/styles/utilities/_vertical-align.scss'
STACKS = 'src/styles/components/_stacks.scss'
MIXINS = 'src/styles/_mixins.scss'
CONSTANTS = 'app/browser/constants.ts'
DISPLAY_SECTION = 'app/browser/sections/DisplaySection.ts'
FLEX_SECTION = 'app/browser/sections/FlexSection.ts'

STYLE_PROOFS = [
    'tests/src/styles/utilities/display.test.ts',
    'tests/src/styles/utilities/flex.test.ts',
    'tests/src/styles/utilities/vertical-align.test.ts',
    'tests/src/styles/components/stacks.test.ts',
]
SECTION_PROOFS = [
    'tests/app/browser/sections/DisplaySection.test.ts',
    'tests/app/browser/sections/FlexSection.test.ts',
]
STYLE_COMMAND = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=verbose', *STYLE_PROOFS]
SECTION_COMMAND = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'app:browser', *SECTION_PROOFS]

PRINT_BLOCK = """	@media print {
		@include utility(d, display, $values, '-print', true);
	}
"""
WALK = """	@include breakpoint-each using ($infix, $_boundary) {
		@include utility(d, display, $values, $infix, true);
	}
"""
REVERSED_WALK = """	@each $name in (xxl, xl, lg, md, sm, xs) {
		@include breakpoint-up($name) {
			$infix: '';
			@if $name != xs {
				$infix: '-#{$name}';
			}
			@include utility(d, display, $values, $infix, true);
		}
	}
"""
# A dark-mode rule the partial must never carry: it moves one display value inside a dark island.
MODE_OVERRIDE = """	[data-bs-theme='dark'] .d-inline-flex {
		display: block !important;
	}
"""


def flex_per_entry(text):
    # Walks the breakpoints once per entry instead of once for every entry.
    start = text.index('\t@include breakpoint-each')
    end = text.rindex('\n\t}\n') + len('\n\t}\n')
    calls = re.findall(r'\t\t@include utility\((?:.|\n)*?\);\n', text[start:end])
    walks = ''.join('\t@include breakpoint-each using ($infix, $_boundary) {\n' + call + '\t}\n' for call in calls)
    return text[:start] + walks + text[end:]


def flex_shrink_before_flex(text):
    # Moves the `flex-shrink` entry ahead of the `flex` shorthand entry.
    shrink = text[text.index('\t\t@include utility(\n\t\t\tflex,\n\t\t\tflex-shrink,'):text.index('\t\t@include utility(flex, flex-wrap')]
    head = '\t\t@include utility(\n\t\t\tflex,\n\t\t\tflex,\n'
    return text.replace(shrink, '').replace(head, shrink + head)


def plant_style(text):
    # Adds an inline style attribute to one specimen element of each section's table.
    return text.replace(
        '<div class="d-block">Block</div>', '<div class="d-block" style="width: 40px">Block</div>', 1
    ).replace(
        '<div class="vstack gap-2 col-6">', '<div class="vstack gap-2 col-6" style="width: 40px">', 1
    )


def leave_residue(text):
    # Appends an element the section never releases, after the region the base class mounts.
    return text.replace(
        '_SPECIMENS)\n\t}', "_SPECIMENS)\n\t\thost.append(document.createElement('hr'))\n\t}", 1
    )


# Each mutation: a list of (file, edit) pairs.
MUTATIONS = {
    'print-omitted': [(DISPLAY, lambda t: t.replace(PRINT_BLOCK, ''))],
    'print-screen': [(DISPLAY, lambda t: t.replace('@media print {', '@media screen {'))],
    'print-before-walk': [(DISPLAY, lambda t: t.replace(WALK, '').replace(PRINT_BLOCK, PRINT_BLOCK + WALK))],
    'display-value-omitted': [(DISPLAY, lambda t: t.replace(' inline-grid,', ''))],
    'display-breakpoint-omitted': [(DISPLAY, lambda t: t.replace("\t\t@include utility(d, display, $values, $infix, true);", "\t\t@if $infix != '-lg' {\n\t\t\t@include utility(d, display, $values, $infix, true);\n\t\t}"))],
    'display-walk-reversed': [(DISPLAY, lambda t: t.replace(WALK, REVERSED_WALK))],
    'display-important-dropped': [(MIXINS, lambda t: t.replace('#{$property}: $value !important;', '#{$property}: $value;'))],
    'display-mode-override': [(DISPLAY, lambda t: t.replace(PRINT_BLOCK, PRINT_BLOCK + MODE_OVERRIDE))],
    'flex-initial-value': [(FLEX, lambda t: t.replace('(row, column, row-reverse, column-reverse)', '(row: row, column: row, row-reverse: row-reverse, column-reverse: column-reverse)'))],
    'flex-justify-initial': [(FLEX, lambda t: t.replace('end: flex-end,\n\t\t\t\tcenter: center,\n\t\t\t\tbetween', 'end: normal,\n\t\t\t\tcenter: center,\n\t\t\t\tbetween', 1))],
    'flex-per-entry': [(FLEX, flex_per_entry)],
    'flex-shrink-before-flex': [(FLEX, flex_shrink_before_flex)],
    'align-initial-value': [(ALIGN, lambda t: t.replace('(baseline, top, middle, bottom, text-bottom, text-top)', '(baseline: baseline, top: top, middle: baseline, bottom: bottom, text-bottom: text-bottom, text-top: text-top)'))],
    'align-responsive': [(ALIGN, lambda t: t.replace('\t\t\t$infix\n\t\t);', '\t\t\t$infix,\n\t\t\ttrue\n\t\t);'))],
    'stack-display-dropped': [(STACKS, lambda t: t.replace('\t.hstack {\n\t\tdisplay: flex;\n', '\t.hstack {\n'))],
    'stack-important': [(STACKS, lambda t: re.sub(r'(\t\t[a-z-]+: [^;]+);', r'\1 !important;', t))],
    'stack-utilities-layer': [(STACKS, lambda t: t.replace('@layer components {', '@layer utilities {'))],
    'vstack-direction-dropped': [(STACKS, lambda t: t.replace('\t\tflex: 1 1 auto;\n\t\tflex-direction: column;\n', '\t\tflex: 1 1 auto;\n'))],
    'hstack-center-dropped': [(STACKS, lambda t: t.replace('\t\tflex-direction: row;\n\t\talign-items: center;\n', '\t\tflex-direction: row;\n'))],
    'inline-style-added': [(CONSTANTS, plant_style)],
    'section-residue-left': [(DISPLAY_SECTION, leave_residue), (FLEX_SECTION, leave_residue)],
    'label-bare': [(CONSTANTS, lambda t: t.replace('<div class="align-self-${key}">align-self-${key}</div>', '<div class="align-self-${key}">${key}</div>', 1))],
}
# `display-important-dropped` drops the one `!important` the `utility` mixin writes, so it covers the
# flex and alignment properties too; the round-1 names for the same edit read it per proof.
ALIASES = {'flex-important-dropped': 'display-important-dropped', 'align-important-dropped': 'display-important-dropped'}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def run(command):
    result = subprocess.run(command, cwd=LAND, env=ENV, capture_output=True, text=True)
    return result.returncode, re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)


def summarize(output):
    tests = re.search(r'^\s*Tests\s+.*$', output, re.M)
    files = re.search(r'^\s*Test Files\s+.*$', output, re.M)
    titles = re.findall(r'^\s*[×✗] (.*?)(?: \d+ms)?$', output, re.M)
    red = sorted({re.sub(r'^(\S+?):\d+:\d+', r'\1', re.sub(r'^\|[^|]*\|\s*', '', title)) for title in titles})
    return (files.group(0).strip() if files else '?'), (tests.group(0).strip() if tests else '?'), red


def main(stage, name):
    edits = [] if name == 'control' else MUTATIONS[ALIASES.get(name, name)]
    os.makedirs(f'{LOGS}/{stage}', exist_ok=True)
    lines = [f'run: {name}', f'copy: {LAND}', f'stage: {stage}']
    originals = {}
    try:
        for path, edit in edits:
            full = os.path.join(LAND, path)
            original = originals.get(path) or open(full, 'rb').read()
            originals[path] = original
            current = open(full, 'rb').read().decode()
            mutated = edit(current)
            if mutated == current:
                lines.append(f'MUTATION DID NOT APPLY: {path}')
                open(f'{LOGS}/{stage}/{name}.log.txt', 'w').write('\n'.join(lines) + '\n')
                print(f'{name}: MUTATION DID NOT APPLY ({path})')
                return
            open(full, 'w').write(mutated)
            lines.append(f'mutated: {path} sha256-before={digest(original)}')
        diff = ''.join(
            ''.join(difflib.unified_diff(
                original.decode().splitlines(True), open(os.path.join(LAND, path), 'rb').read().decode().splitlines(True),
                f'a/{path}', f'b/{path}'))
            for path, original in originals.items())
        build_code, build_out = run(['npm', 'run', 'build:src:styles'])
        lines.append(f'build: npm run build:src:styles exit={build_code}')
        if build_code != 0:
            lines += ['', build_out[-3000:]]
            return
        style_code, style_out = run(STYLE_COMMAND)
        section_code, section_out = run(SECTION_COMMAND)
        style_files, style_tests, style_red = summarize(style_out)
        section_files, section_tests, section_red = summarize(section_out)
        lines += [
            f'styles: {" ".join(STYLE_COMMAND)}', f'  exit={style_code} | {style_files} | {style_tests}',
            *[f'  red: {title}' for title in style_red],
            f'sections: {" ".join(SECTION_COMMAND)}', f'  exit={section_code} | {section_files} | {section_tests}',
            *[f'  red: {title}' for title in section_red],
        ]
        print(f'{name}: styles exit={style_code} {style_tests}; sections exit={section_code} {section_tests}')
        for title in style_red + section_red:
            print(f'  red: {title}')
        lines += ['', '--- mutation diff ---', diff, '--- styles output ---', style_out, '--- sections output ---', section_out]
    finally:
        for path, original in originals.items():
            full = os.path.join(LAND, path)
            open(full, 'wb').write(original)
            restored = open(full, 'rb').read()
            lines.insert(3, f'restored: {path} sha256-after={digest(restored)} equal={restored == original}')
        open(f'{LOGS}/{stage}/{name}.log.txt', 'w').write('\n'.join(lines) + '\n')


if __name__ == '__main__':
    stage, names = sys.argv[1], sys.argv[2:]
    for name in names:
        main(stage, name)
    subprocess.run(['npm', 'run', 'build:src:styles'], cwd=LAND, env=ENV, capture_output=True)
