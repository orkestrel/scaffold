#!/usr/bin/env python3
"""Runs each named mutation on the validation copy: edit, rebuild, run the named proofs, record, restore."""
import subprocess, sys, os, shutil, re

BASE = '/home/user/veneer-ut/tmp/probe/base'
LOG = '/home/user/veneer-ut/tmp/units/ut-mutations.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot']
APP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser']

def sub(path, old, new, count=1):
    def edit():
        full = os.path.join(BASE, path)
        text = open(full).read()
        assert text.count(old) >= 1, f'{path}: anchor missing: {old[:60]}'
        open(full, 'w').write(text.replace(old, new, count))
    return (path, edit)

MUTATIONS = [
    ('pair foreground swapped: info reads white', [sub('src/styles/utilities/_color.scss', '$dark-labels: info, warning, light;', '$dark-labels: warning, light;')], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('pair background swapped: every pair reads the primary channels', [sub('src/styles/utilities/_color.scss', 'RGBA(var(--bs-#{$role}-rgb), var(--bs-bg-opacity, 1))', 'RGBA(var(--bs-primary-rgb), var(--bs-bg-opacity, 1))')], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('pair opacity fallback dropped', [sub('src/styles/utilities/_color.scss', 'var(--bs-bg-opacity, 1)', 'var(--bs-bg-opacity)')], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('pairs written in the components layer', [sub('src/styles/utilities/_color.scss', "\t@each $role in $aliased {\n\t\t$foreground: 'white';", "\t@layer components {\n\t@each $role in $aliased {\n\t\t$foreground: 'white';"), sub('src/styles/utilities/_color.scss', "\t\t\tbackground-color: RGBA(var(--bs-#{$role}-rgb), var(--bs-bg-opacity, 1)) !important;\n\t\t}\n\t}\n", "\t\t\tbackground-color: RGBA(var(--bs-#{$role}-rgb), var(--bs-bg-opacity, 1)) !important;\n\t\t}\n\t}\n\t}\n")], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('link partial left in components', [sub('src/styles/utilities/_link.scss', '@layer utilities {', '@layer components {')], True,
     [STYLES + ['tests/src/styles/utilities/link.test.ts']]),
    ('link partial loaded from its old components position', [sub('src/styles/index.scss', "@use 'utilities/link';\n", ''), sub('src/styles/index.scss', "@use 'components/image';\n", "@use 'components/image';\n@use 'utilities/link' as link-component;\n")], True,
     [['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'conformance']]),
    ('link underline entry written in the link partial at the head', [sub('src/styles/utilities/_color.scss', "\t\t@include utility(\n\t\t\tlink-underline,", "\t\t@include utility(\n\t\t\tvn-moved-underline,"), sub('src/styles/utilities/_link.scss', "\t.link-body-emphasis {", "\t@each $role in $aliased {\n\t\t.link-underline-#{$role} {\n\t\t\t--bs-link-underline-opacity: 1;\n\t\t\ttext-decoration-color: rgba(var(--vn-color-#{$role}-rgb), var(--bs-link-underline-opacity)) !important;\n\t\t}\n\t}\n\n\t.link-body-emphasis {")], True,
     [STYLES + ['tests/src/styles/utilities/link.test.ts']]),
    ('alignment breakpoint loop run per value', [sub('src/styles/utilities/_text.scss', "\t@include breakpoint-each using ($infix, $_boundary) {\n\t\t@include utility(\n\t\t\ttext,\n\t\t\ttext-align,\n\t\t\t(\n\t\t\t\tstart: left,\n\t\t\t\tend: right,\n\t\t\t\tcenter: center,\n\t\t\t),\n\t\t\t$infix,\n\t\t\ttrue\n\t\t);", "\t@each $key, $side in (start: left, end: right, center: center) {\n\t\t@include breakpoint-each using ($infix, $_boundary) {\n\t\t\t@include utility(text, text-align, ($key: $side), $infix, true);\n\t\t}\n\t}\n\t@include breakpoint-each using ($infix, $_boundary) {")], True,
     [STYLES + ['tests/src/styles/utilities/text.test.ts']]),
    ('truncation white-space dropped', [sub('src/styles/components/_text-truncation.scss', '\t\twhite-space: nowrap;\n', '')], True,
     [STYLES + ['tests/src/styles/components/text-truncation.test.ts']]),
    ('emphasis tier written as the light mode mix', [sub('src/styles/utilities/_color.scss', "var(--bs-#{$role}-text-emphasis)", "color-mix(in oklab, var(--vn-color-#{$role}-base) 70%, oklch(0.208 0.042 265.755))")], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('opacity entry written ahead of the color entry', [sub('src/styles/utilities/_color.scss', "\t@include breakpoint-each using ($infix, $_boundary) {\n\t\t@include utility(\n\t\t\ttext,\n\t\t\tcolor,\n\t\t\t$colors,", "\t@include utility-variable(text-opacity, text-opacity, (25: 0.25, 50: 0.5, 75: 0.75, 100: 1));\n\t@include breakpoint-each using ($infix, $_boundary) {\n\t\t@include utility(\n\t\t\ttext,\n\t\t\tcolor,\n\t\t\t$colors,"), sub('src/styles/utilities/_color.scss', "\t\t\t@include utility-variable(\n\t\t\t\ttext-opacity,", "\t\t\t@include utility-variable(\n\t\t\t\tvn-moved-opacity,")], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('role color written as a literal channel triplet', [sub('src/styles/utilities/_color.scss', "rgba(var(--bs-#{$name}-rgb), var(--bs-text-opacity))", "rgba(8, 65, 234, var(--bs-text-opacity))")], True,
     [STYLES + ['tests/src/styles/utilities/color.test.ts']]),
    ('utility priority dropped in the mixin', [sub('src/styles/_mixins.scss', '#{$property}: $value !important;', '#{$property}: $value;')], True,
     [STYLES + ['tests/src/styles/utilities/text.test.ts', 'tests/src/styles/utilities/color.test.ts', 'tests/src/styles/utilities/link.test.ts']]),
    ('text partial written outside every layer', [sub('src/styles/utilities/_text.scss', '@layer utilities {', '@media all {')], True,
     [STYLES + ['tests/src/styles/utilities/text.test.ts']]),
    ('truncated specimen without the helper', [sub('app/browser/constants.ts', '<div class="row"><div class="col-4 text-truncate">', '<div class="row"><div class="col-4">')], False,
     [APP + ['tests/app/browser/sections/TextSection.test.ts']]),
    ('responsive alignment specimen at the sm boundary', [sub('app/browser/constants.ts', '<p class="text-center text-md-start">text-center text-md-start</p>', '<p class="text-center text-sm-start">text-center text-md-start</p>')], False,
     [APP + ['tests/app/browser/sections/TextSection.test.ts']]),
    ('pair badge specimen without its pair', [sub('app/browser/constants.ts', '`<span class="badge text-bg-${role}">text-bg-${role}</span>`', '`<span class="badge">text-bg-${role}</span>`')], False,
     [APP + ['tests/app/browser/sections/ColorSection.test.ts']]),
]

def run(cmd):
    proc = subprocess.run(cmd, cwd=BASE, env=ENV, capture_output=True, text=True)
    out = proc.stdout + proc.stderr
    summary = [l.strip() for l in out.splitlines() if re.search(r'Tests\s+\d', l)]
    failed = [l.strip() for l in out.splitlines() if l.strip().startswith('FAIL ') or l.strip().startswith('×')]
    return proc.returncode, summary, failed

only = sys.argv[1:]
with open(LOG, 'a') as log:
    for name, edits, build, commands in MUTATIONS:
        if only and name not in only:
            continue
        paths = sorted({p for p, _ in edits})
        backups = {p: open(os.path.join(BASE, p)).read() for p in paths}
        try:
            for _, edit in edits:
                edit()
            log.write(f'\n## {name}\nsites: {", ".join(paths)}\n')
            if build:
                code = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True).returncode
                log.write(f'build: npm run build:src:styles exit {code}\n')
            for cmd in commands:
                code, summary, failed = run(cmd)
                log.write(f'command: {" ".join(cmd)}\nexit: {code}\nsummary: {" | ".join(summary)}\nfailing:\n' + ''.join(f'  {f}\n' for f in failed))
            log.flush()
        finally:
            for p, text in backups.items():
                open(os.path.join(BASE, p), 'w').write(text)
    code = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True).returncode
    log.write(f'\nrestored: npm run build:src:styles exit {code}\n')
