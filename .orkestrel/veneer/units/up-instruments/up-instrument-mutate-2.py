# Runs every round-2 mutation against the validation copy: applies one edit, rebuilds the cascade where
# the command reads it, runs the named command, records the site, the command, the exits, the summary
# lines, and the failing case lines with their file and line, then restores the edited file byte for
# byte. The style mutations repeat round 1's against the shipped round-2 proofs; the rest cover the
# tables, the sections, the ledger, the swatch helper, the page-matching swatches, and the profile order.
import subprocess, sys, re, os, json
BASE = '/home/user/veneer-up/tmp/probe/base'
LOG = sys.argv[1]
SELECT = sys.argv[2:]
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
STYLES = 'npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/background.test.ts tests/src/styles/utilities/border.test.ts'
BIND = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "binds the paint"'
SECTIONS = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/helpers.test.ts tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts'
CONF = 'npm run build:src && npm run test:conformance'
SERVICE = 'npm run build:src:styles && npm run test:service'
BG = 'src/styles/utilities/_background.scss'
BD = 'src/styles/utilities/_border.scss'
MX = 'src/styles/_mixins.scss'
MUTATIONS = [
 ('tertiary-emitted', BG, "@each $role in tokens.$aliased {\n\t\t$fills", "@each $role in tokens.$roles {\n\t\t$fills", STYLES),
 ('literal-role-fill', BG, "$fills: map.set($fills, $role, rgba(var(--bs-#{$role}-rgb), var(--bs-bg-opacity)));", "$fills: map.set($fills, $role, rgba(0, 130, 54, var(--bs-bg-opacity)));", STYLES),
 ('bg-opacity-before-fill', BG, None, 'swap-bg-opacity', STYLES),
 ('local-important', MX, "--bs-#{$local}: #{$setting};", "--bs-#{$local}: #{$setting} !important;", STYLES),
 ('subtle-light-literal', BG, "var(--bs-#{$role}-bg-subtle)", "rgb(207, 226, 255)", STYLES),
 ('border-subtle-light-literal', BD, "var(--bs-#{$role}-border-subtle)", "rgb(158, 197, 254)", STYLES),
 ('gradient-literal', BG, "gradient: var(--bs-gradient),", "gradient: linear-gradient(rgb(255, 255, 255), rgb(0, 0, 0)),", STYLES),
 ('opacity-unguarded', BG, "@if $infix == '' {\n\t\t\t@include utility-variable(bg-opacity", "@if true {\n\t\t\t@include utility-variable(bg-opacity", STYLES),
 ('fill-responsive', BG, "\t\t\t$fills,\n\t\t\t$infix,\n", "\t\t\t$fills,\n\t\t\t$infix,\n\t\t\ttrue,\n", STYLES),
 ('sides-before-border', BD, None, 'swap-sides', STYLES),
 ('border-width-literal', BD, "null: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color),", "null: 1px var(--bs-border-style) var(--bs-border-color),", STYLES),
 ('radius-literal', BD, "2: var(--bs-border-radius),", "2: 0.375rem,", STYLES),
 ('rounded-sides-before-rounded', BD, None, 'swap-rounded', STYLES),
 ('border-literal-role', BD, "$colors: map.set($colors, $role, rgba(var(--bs-#{$role}-rgb), var(--bs-border-opacity)));", "$colors: map.set($colors, $role, rgba(0, 130, 54, var(--bs-border-opacity)));", STYLES),
 ('border-opacity-before-color', BD, None, 'swap-border-opacity', STYLES),
 ('properties-normal', MX, "#{$property}: $value !important;", "#{$property}: $value;", STYLES),
 ('partial-unlayered', BG, "@layer utilities {", "@layer utilities {} @media all {", STYLES),
 ('fill-table-wrong-alias', 'tests/setupStyles.ts', "Object.freeze({ key: 'body-secondary', alias: '--bs-secondary-bg-rgb' }),", "Object.freeze({ key: 'body-secondary', alias: '--bs-tertiary-bg-rgb' }),", BIND),
 ('radius-side-corners-reordered', 'tests/setupStyles.ts', "Object.freeze({ name: 'end', corners: Object.freeze(['top-right', 'bottom-right']) }),", "Object.freeze({ name: 'end', corners: Object.freeze(['bottom-right', 'top-right']) }),", BIND),
 ('opacity-table-step-dropped', 'tests/setupStyles.ts', "\tObject.freeze({ step: '10', alpha: 0.1 }),\n", "", BIND),
 ('caption-other-string', 'app/browser/helpers.ts', '<figcaption class="figure-caption">${classes}</figcaption>', "<figcaption class=\"figure-caption\">${classes.replace('bg-', 'fill-')}</figcaption>", SECTIONS),
 ('opacity-specimen-step-dropped', 'app/browser/constants.ts', "\t\t\t'bg-success bg-opacity-10 border',\n", "", SECTIONS),
 ('bg-white-unbordered', 'app/browser/constants.ts', "\t\t\t'bg-white border',\n", "\t\t\t'bg-white',\n", SECTIONS),
 ('bg-black-unbordered', 'app/browser/constants.ts', "\t\t\t'bg-black border',\n", "\t\t\t'bg-black',\n", SECTIONS),
 ('border-white-unfilled', 'app/browser/constants.ts', "'border border-3 border-white bg-dark',", "'border border-3 border-white',", SECTIONS),
 ('border-black-unfilled', 'app/browser/constants.ts', "'border border-3 border-black bg-light',", "'border border-3 border-black',", SECTIONS),
 ('rounded-circle-ledger', BD, "circle: 50%,", "circle: 49%,", CONF),
 ('vendor-layer-ahead', 'tests/setup.css', "@layer theme, reset, base, elements, components, utilities;", "@layer vendor;\n@layer theme, reset, base, elements, components, utilities;", SERVICE),
]
def special(text, kind):
    if kind == 'swap-bg-opacity':
        block = "\t\t@if $infix == '' {\n\t\t\t@include utility-variable(bg-opacity, bg-opacity, $opacities);\n\t\t}\n"
        assert block in text
        text = text.replace(block, '')
        anchor = "\t@include breakpoint-each using ($infix, $_boundary) {\n"
        return text.replace(anchor, anchor + block, 1)
    if kind == 'swap-border-opacity':
        block = "\t\t@if $infix == '' {\n\t\t\t@include utility-variable(border-opacity, border-opacity, $opacities);\n\t\t}\n"
        assert block in text
        text = text.replace(block, '')
        anchor = "\t@include breakpoint-each using ($infix, $_boundary) {\n"
        return text.replace(anchor, anchor + block, 1)
    if kind == 'swap-sides':
        line = "\t\t@include utility(border, border, $edges, $infix);\n"
        assert line in text
        text = text.replace(line, '')
        anchor = "\t\t@include utility(border-start, border-left, $edges, $infix);\n"
        return text.replace(anchor, anchor + line, 1)
    if kind == 'swap-rounded':
        line = "\t\t@include utility(rounded, border-radius, $radii, $infix);\n"
        assert line in text
        text = text.replace(line, '')
        return text.rstrip('\n').rstrip('}').rstrip().rstrip('}') + '\n' + line + '\t}\n}\n'
    raise ValueError(kind)
def run(cmd):
    p = subprocess.run(cmd, shell=True, cwd=BASE, env=ENV, capture_output=True, text=True)
    return p.returncode, re.sub(r'\x1b\[[0-9;]*m', '', p.stdout + p.stderr)
with open(LOG, 'a') as log:
    for name, path, old, new, cmd in MUTATIONS:
        if SELECT and name not in SELECT:
            continue
        full = os.path.join(BASE, path)
        original = open(full).read()
        if old is None:
            mutated = special(original, new)
        else:
            assert old in original, (name, old)
            mutated = original.replace(old, new, 1)
        assert mutated != original, name
        open(full, 'w').write(mutated)
        try:
            code, out = run(cmd)
        finally:
            open(full, 'w').write(original)
        summary = [l.strip() for l in out.splitlines() if re.match(r'\s*(Tests|Test Files)\s', l)]
        failing = sorted(set(l.strip() for l in out.splitlines() if l.strip().startswith('FAIL ')))
        log.write(json.dumps({'mutation': name, 'site': path, 'command': cmd, 'exit': code, 'summary': summary, 'failing': failing}, indent=1) + '\n')
        log.flush()
        print(name, code, summary)
    code, _ = run('npm run build:src')
    log.write(json.dumps({'restored': True, 'rebuild_exit': code}) + '\n')
