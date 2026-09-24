#!/usr/bin/env python3
"""Runs the barrel and service mutations on the validation copy, appending to the same log."""
import subprocess, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
BASE = '/home/user/veneer-ut/tmp/probe/base'
LOG = '/home/user/veneer-ut/tmp/units/ut-mutations.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot']
CONFORMANCE = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'conformance']
SERVICE = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'service']

def read(path):
    return open(os.path.join(BASE, path)).read()

def write(path, text):
    open(os.path.join(BASE, path), 'w').write(text)

def replace(path, old, new, count=1):
    text = read(path)
    assert text.count(old) >= 1, f'{path}: anchor missing: {old[:60]}'
    write(path, text.replace(old, new, count))

LINE_FILES = ['tests/setup.css', 'tests/fixtures/tailwind/consumer.css', 'tests/fixtures/tailwind/preflight.css', 'guides/veneer.md']

def link_in_components():
    # The partial as it stood: under the components directory, in the components layer, loaded
    # from the barrel's old components position.
    write('src/styles/components/_link.scss', read('src/styles/utilities/_link.scss').replace('@layer utilities {', '@layer components {'))
    os.remove(os.path.join(BASE, 'src/styles/utilities/_link.scss'))
    replace('src/styles/index.scss', "@use 'utilities/link';\n", '')
    replace('src/styles/index.scss', "@use 'components/image';\n", "@use 'components/image';\n@use 'components/link';\n")

def center_on_line():
    for path in LINE_FILES:
        replace(path, 'text-wrap text-nowrap");', 'text-wrap text-nowrap text-center");', 2 if path == 'guides/veneer.md' else 1)

def center_normal():
    replace('src/styles/utilities/_text.scss', '\t\t\t\tcenter: center,\n', '')
    replace('src/styles/utilities/_text.scss', '\t@include breakpoint-each using ($infix, $_boundary) {\n', '\t.text-center {\n\t\ttext-align: center;\n\t}\n\t@include breakpoint-each using ($infix, $_boundary) {\n')

MUTATIONS = [
    ('SKIP link partial left in components, as the base loaded it', ['src/styles/index.scss', 'src/styles/utilities/_link.scss', 'src/styles/components/_link.scss'], link_in_components, True,
     [STYLES + ['tests/src/styles/utilities/link.test.ts'], CONFORMANCE]),
    ('a shipped important shared name written onto every copy of the exclusion line', LINE_FILES, center_on_line, True, [SERVICE]),
    ('SKIP a shipped shared name with its important flag dropped', ['src/styles/utilities/_text.scss'], center_normal, True, [SERVICE]),
]

def run(cmd):
    proc = subprocess.run(cmd, cwd=BASE, env=ENV, capture_output=True, text=True)
    out = proc.stdout + proc.stderr
    summary = [l.strip() for l in out.splitlines() if re.search(r'Tests\s+\d', l)]
    failed = [l.strip() for l in out.splitlines() if l.strip().startswith('FAIL ')]
    return proc.returncode, summary, failed

with open(LOG, 'a') as log:
    for name, paths, mutate, build, commands in MUTATIONS:
        if name.startswith('SKIP') and os.environ.get('UT_ALL') != '1':
            continue
        backups = {p: (read(p) if os.path.exists(os.path.join(BASE, p)) else None) for p in paths}
        try:
            mutate()
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
                full = os.path.join(BASE, p)
                if text is None:
                    if os.path.exists(full):
                        os.remove(full)
                else:
                    write(p, text)
    code = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=BASE, env=ENV, capture_output=True, text=True).returncode
    log.write(f'\nrestored: npm run build:src:styles exit {code}\n')
