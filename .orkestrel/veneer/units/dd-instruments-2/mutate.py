"""Applies one named mutation to the validation copy, runs the proof that names it, and restores.

Usage: python3 mutate.py NAME [TAG]
Writes logs/mutations/NAME[-TAG].log.txt and prints the exit code, the count line, and each failing
case. Every edit asserts that its target text is present, so a mutation that no longer matches the
source stops rather than running unmutated. The control mutation 'control' edits nothing.
"""
import os
import re
import subprocess
import sys

W = '/home/user/veneer-dd'
C = os.path.join(W, 'tmp/probe/base')
OUT = os.path.join(W, 'tmp/units/dd-instruments-2/logs/mutations')
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
PARTIAL = 'src/styles/components/_dropdown.scss'
INDEX = 'src/styles/index.scss'
CONSTANTS = 'app/browser/constants.ts'
TABLES = 'tests/setupStyles.ts'
TABLE_PROOF = 'tests/setupStyles.test.ts'
GUIDE = 'guides/veneer.md'
CSS = 'dist/src/styles/index.css'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=verbose', 'tests/src/styles/components/dropdown.test.ts']
SECTION = ['npx', 'vitest', 'run', '--config', 'configs/app/vite.browser.config.ts', '--no-cache', '--reporter=verbose', 'tests/app/browser/sections/DropdownSection.test.ts']
SETUP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=verbose', '--project', 'setup', 'tests/setupStyles.test.ts', '-t', 'dropdown case tables']


def sub(path, old, new, count=1):
    def edit(text):
        assert old in text, f'{old!r} not in {path}'
        return text.replace(old, new) if count == 0 else text.replace(old, new, count)
    return (path, edit)


def regex(path, pattern, new):
    def edit(text):
        result, n = re.subn(pattern, new, text, flags=re.S | re.M)
        assert n == 1, f'{pattern!r} matched {n} times in {path}'
        return result
    return (path, edit)


def drop(path, block):
    return sub(path, block, '')


def swap(path, first, second):
    def edit(text):
        assert first in text and second in text, f'{first!r} or {second!r} not in {path}'
        return text.replace(first, '\0').replace(second, first).replace('\0', second)
    return (path, edit)


NAV_ROW = re.compile(r'^\| `\.nav-tabs \.dropdown-menu` +\| Nav +\|[^\n]*\n', re.M)
NARROW_PREDICATE = regex(TABLE_PROOF, r" \|\|\n\t*selector\.startsWith\('\.nav-tabs'\)", '')

# Each entry: the source edits, the edits to the built stylesheet after the build, and the proof.
MUTATIONS = {
    'control': ([], [], STYLES),
    'control-section': ([], [], SECTION),
    'control-setup': ([], [], SETUP),
    'baseline-no-partial': ([sub(INDEX, "@use 'components/dropdown';\n", '')], [], STYLES),
    'show-rule-missing': ([drop(PARTIAL, '\t.dropdown-menu.show {\n\t\tdisplay: block;\n\t}\n')], [], STYLES),
    'dropup-copies-top': ([sub(PARTIAL, '\t\ttop: auto;\n\t\tbottom: 100%;', '\t\ttop: 100%;\n\t\tbottom: 100%;')], [], STYLES),
    'spacer-dropped': ([sub(PARTIAL, 'var(--bs-dropdown-spacer)', '0', 0)], [], STYLES),
    'two-carets-on-dropstart': ([drop(PARTIAL, '\t\t\t#{$toggle}::after {\n\t\t\t\tdisplay: none;\n\t\t\t}\n')], [], STYLES),
    'empty-rule-dropped': ([drop(PARTIAL, '\t\t#{$toggle}:empty::after {\n\t\t\tmargin-left: 0;\n\t\t}\n')], [], STYLES),
    'raised-flag-flipped': ([regex(PARTIAL, r"(\t\t'\.dropend',\n.*?\n\t\t\),\n\t\t)false", r'\1true')], [], STYLES),
    'position-omitted': ([drop(PARTIAL, '\t\t\t--bs-position: start;\n'), drop(PARTIAL, '\t\t\t--bs-position: end;\n')], [], STYLES),
    'position-swapped': ([swap(PARTIAL, '--bs-position: start;', '--bs-position: end;')], [], STYLES),
    'end-rule-unconditioned': ([sub(PARTIAL, '.dropdown-menu#{$infix}-end[data-bs-popper] {', '.dropdown-menu#{$infix}-end {')], [], STYLES),
    'wrong-boundary': ([], [regex(CSS, r'@media \(width>=576px\)\{(\.dropdown-menu-sm-start)', r'@media (width>=768px){\1')], STYLES),
    # The `.dropdown-menu-sm-end` rule alone moves to the next boundary; its placement twin stays.
    'sm-end-boundary': ([], [regex(CSS, r'(@media \(width>=576px\)\{\.dropdown-menu-sm-start\{[^}]*\}\.dropdown-menu-sm-start\[data-bs-popper\]\{[^}]*\})(\.dropdown-menu-sm-end\{[^}]*\})(\.dropdown-menu-sm-end\[data-bs-popper\]\{[^}]*\}\})', r'\1\3@media (width>=768px){\2}')], STYLES),
    # The `.dropdown-menu-sm-end` rule and its placement twin move together; the start pair stays.
    'sm-end-pair-boundary': ([], [regex(CSS, r'(@media \(width>=576px\)\{\.dropdown-menu-sm-start\{[^}]*\}\.dropdown-menu-sm-start\[data-bs-popper\]\{[^}]*\})(\.dropdown-menu-sm-end\{[^}]*\})', r'\1}@media (width>=768px){\2')], STYLES),
    'centering-added': ([sub(PARTIAL, '\t}\n}\n', '\t}\n}\n.dropdown-center .dropdown-menu[data-bs-popper]{left:50%;transform:translateX(-50%)}\n')], [], STYLES),
    'literal-hover-background': ([sub(PARTIAL, 'background-color: var(--bs-dropdown-link-hover-bg);', 'background-color: rgb(233, 236, 239);')], [], STYLES),
    'active-rule-dropped': ([drop(PARTIAL, '\t.dropdown-item.active,\n\t.dropdown-item:active {\n\t\tcolor: var(--bs-dropdown-link-active-color);\n\t\ttext-decoration: none;\n\t\tbackground-color: var(--bs-dropdown-link-active-bg);\n\t}\n')], [], STYLES),
    'disabled-rule-dropped': ([drop(PARTIAL, '\t.dropdown-item.disabled,\n\t.dropdown-item:disabled {\n\t\tcolor: var(--bs-dropdown-link-disabled-color);\n\t\tpointer-events: none;\n\t\tbackground-color: transparent;\n\t}\n')], [], STYLES),
    'header-rule-dropped': ([regex(PARTIAL, r'\t\.dropdown-header \{\n.*?\n\t\}\n', '')], [], STYLES),
    'divider-rule-dropped': ([regex(PARTIAL, r'\t\.dropdown-divider \{\n.*?\n\t\}\n', '')], [], STYLES),
    'item-text-rule-dropped': ([regex(PARTIAL, r'\t\.dropdown-item-text \{\n.*?\n\t\}\n', '')], [], STYLES),
    'dark-block-on-menu': ([sub(PARTIAL, '\t.dropdown-menu-dark {', '\t.dropdown-menu {')], [], STYLES),
    'plain-background-fixed': ([sub(PARTIAL, '--bs-dropdown-bg: var(--bs-body-bg);', '--bs-dropdown-bg: var(--vn-palette-white-base);')], [], STYLES),
    'literal-zindex': ([sub(PARTIAL, '--bs-dropdown-zindex: var(--vn-stack-dropdown);', '--bs-dropdown-zindex: 1000;')], [], STYLES),
    'room-dropped': ([sub(CONSTANTS, '.repeat(above)', '.repeat(0)'), sub(CONSTANTS, '.repeat(below)', '.repeat(0)'), sub(CONSTANTS, '.repeat(2)', '.repeat(0)')], [], SECTION),
    'dropend-column-narrowed': ([regex(CONSTANTS, r"(name: 'Dropend',\n\t\t\twrapper: 'btn-group dropend',\n\t\t\tcolumn: )'col-12'", r"\1'col-lg-2 offset-lg-10'")], [], SECTION),
    'specimen-drops-show': ([sub(CONSTANTS, '<ul class="dropdown-menu show${classes}"', '<ul class="dropdown-menu${classes}"')], [], SECTION),
    'raised-column-flipped': ([regex(TABLES, r"(wrapper: 'dropend',\n.*?raised: )false", r'\1true')], [], SETUP),
    'nav-row-dropped': ([regex(GUIDE, NAV_ROW.pattern, '')], [], SETUP),
    'nav-row-dropped-narrow-predicate': ([regex(GUIDE, NAV_ROW.pattern, ''), NARROW_PREDICATE], [], SETUP),
}


def build():
    result = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=C, env=ENV, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stdout[-2000:], result.stderr[-2000:])
        raise SystemExit('build failed')


def main():
    name = sys.argv[1]
    tag = sys.argv[2] if len(sys.argv) > 2 else ''
    edits, built, command = MUTATIONS[name]
    saved = {}
    touched_source = any(path.startswith('src/') for path, _ in edits)
    try:
        for path, edit in edits:
            full = os.path.join(C, path)
            if path not in saved:
                saved[path] = open(full).read()
            mutated = edit(open(full).read())
            open(full, 'w').write(mutated)
        if touched_source or built:
            build()
        for path, edit in built:
            full = os.path.join(C, path)
            mutated = edit(open(full).read())
            open(full, 'w').write(mutated)
        run = subprocess.run(command, cwd=C, env=ENV, capture_output=True, text=True)
        log = run.stdout + run.stderr
        os.makedirs(OUT, exist_ok=True)
        stem = f'{name}-{tag}' if tag else name
        open(os.path.join(OUT, f'{stem}.log.txt'), 'w').write(log)
        failed = sorted(set(re.findall(r'^\s*[×✗]\s+(.*?)(?:\s+\d+ms)?$', log, flags=re.M)))
        counts = re.findall(r'^\s+Tests\s+(.*)$', log, flags=re.M)
        print(f'== {stem}: exit {run.returncode}; {counts[-1].strip() if counts else "no count"}')
        for line in failed:
            print(f'   x {line}')
    finally:
        for path, text in saved.items():
            open(os.path.join(C, path), 'w').write(text)
        if touched_source or built:
            build()


main()
