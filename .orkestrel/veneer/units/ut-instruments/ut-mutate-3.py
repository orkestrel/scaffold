#!/usr/bin/env python3
"""Runs the round-2 mutations on the validation copy: edit, rebuild, read the pair's layer, run, record, restore."""
import subprocess, os, re
BASE = '/home/user/veneer-ut/tmp/probe/base'
LOG = '/home/user/veneer-ut/tmp/units/ut-mutations-2.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot']
APP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser']
CONFORMANCE = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'conformance']
# Reads the layer path enclosing the first `.text-bg-primary` rule of the expanded compile, so the
# log records which layer a mutation put the pairs in.
LAYER = ['node', '-e', """
const { compile } = require('sass')
const postcss = require('postcss')
const css = compile('src/styles/index.scss', { loadPaths: ['src/styles'], style: 'expanded' }).css
let found
postcss.parse(css).walkRules((rule) => {
	if (found !== undefined || rule.selector !== '.text-bg-primary') return
	const names = []
	for (let node = rule.parent; node && node.type !== 'root'; node = node.parent)
		if (node.type === 'atrule' && node.name === 'layer') names.unshift(node.params)
	found = names.join('.')
})
console.log(`the .text-bg-primary rule sits in the layer: ${found}`)
"""]

def sub(path, old, new):
    def edit():
        full = os.path.join(BASE, path)
        text = open(full).read()
        assert text.count(old) == 1, f'{path}: anchor count {text.count(old)}: {old[:60]}'
        open(full, 'w').write(text.replace(old, new))
    return (path, edit)

MUTATIONS = [
    ('T-a: pairs moved into the top-level components layer',
     [sub('src/styles/utilities/_color-bg.scss', '@layer utilities {', '@layer components {')],
     [STYLES + ['tests/src/styles/utilities/color-bg.test.ts', 'tests/src/styles/utilities/color.test.ts']]),
    ('T-d: pairs loaded after the colored-link helper',
     [sub('src/styles/index.scss', "@use 'utilities/color-bg';\n@use 'utilities/link';\n", "@use 'utilities/link';\n@use 'utilities/color-bg';\n")],
     [STYLES + ['tests/src/styles/utilities/color-bg.test.ts'], CONFORMANCE]),
    ('moved pair case: foreground swapped, info reads white',
     [sub('src/styles/utilities/_color-bg.scss', '$dark-labels: info, warning, light;', '$dark-labels: warning, light;')],
     [STYLES + ['tests/src/styles/utilities/color-bg.test.ts']]),
    ('moved pair case: background swapped, every pair reads the primary channels',
     [sub('src/styles/utilities/_color-bg.scss', 'RGBA(var(--bs-#{$role}-rgb), var(--bs-bg-opacity, 1))', 'RGBA(var(--bs-primary-rgb), var(--bs-bg-opacity, 1))')],
     [STYLES + ['tests/src/styles/utilities/color-bg.test.ts']]),
    ('moved pair case: opacity fallback dropped',
     [sub('src/styles/utilities/_color-bg.scss', 'var(--bs-bg-opacity, 1)', 'var(--bs-bg-opacity)')],
     [STYLES + ['tests/src/styles/utilities/color-bg.test.ts']]),
    ('T-e: text-dark specimen off the light pair',
     [sub('app/browser/constants.ts', "return '<p class=\"text-bg-light\"><span class=\"text-dark\">text-dark</span></p>'", "return '<p class=\"text-dark\">text-dark</p>'")],
     [APP + ['tests/app/browser/sections/ColorSection.test.ts']]),
]

def run(cmd):
    proc = subprocess.run(cmd, cwd=BASE, env=ENV, capture_output=True, text=True)
    out = re.sub(r'\x1b\[[0-9;]*m', '', proc.stdout + proc.stderr)
    summary = [l.strip() for l in out.splitlines() if re.search(r'Tests\s+\d', l)]
    failed = [l.strip() for l in out.splitlines() if l.strip().startswith('FAIL ')]
    return proc.returncode, summary, failed, out

with open(LOG, 'w') as log:
    for name, edits, commands in MUTATIONS:
        paths = sorted({p for p, _ in edits})
        backups = {p: open(os.path.join(BASE, p)).read() for p in paths}
        try:
            for _, edit in edits:
                edit()
            log.write(f'\n## {name}\nsites: {", ".join(paths)}\n')
            code, _, _, out = run(LAYER)
            log.write(f'layer reading: exit {code}: {out.strip()}\n')
            build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True).returncode
            log.write(f'build: npm run build:src:styles exit {build}\n')
            for cmd in commands:
                code, summary, failed, _ = run(cmd)
                log.write(f'command: {" ".join(cmd)}\nexit: {code}\nsummary: {" | ".join(summary)}\nfailing:\n' + ''.join(f'  {f}\n' for f in failed))
            log.flush()
        finally:
            for p, text in backups.items():
                open(os.path.join(BASE, p), 'w').write(text)
    code, _, _, out = run(LAYER)
    log.write(f'\nrestored layer reading: exit {code}: {out.strip()}\n')
    build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True).returncode
    log.write(f'restored: npm run build:src:styles exit {build}\n')
