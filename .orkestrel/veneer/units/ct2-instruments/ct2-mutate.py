"""Runs each named THEME round-2 mutation in the scratch copy and records its red run.

Each mutation edits one file in tmp/probe/ct2-copy, rebuilds the styles when the file is a
partial, runs the named command, appends the record to tmp/units/ct2-mutations.log.txt, and
restores the file from the bytes it read, checking the restored digest. Usage:
python3 ct2-mutate.py ID [ID ...], or no argument for every mutation in order.
"""

import hashlib
import os
import re
import subprocess
import sys

ROOT = '/home/user/veneer-ct2'
COPY = f'{ROOT}/tmp/probe/ct2-copy'
LOG = f'{ROOT}/tmp/units/ct2-mutations.log.txt'
NPM = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin'
ENV = dict(os.environ, PATH=f"{NPM}:{os.environ['PATH']}", PLAYWRIGHT_BROWSERS_PATH='/opt/pw-browsers')
STYLES = 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose'
PROJECT = 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project'

MUTATIONS = {
    'R1': {
        'site': 'tests/setupServer.ts, collectAdditions: the registry check in the added-selector branch deleted',
        'file': 'tests/setupServer.ts',
        'old': "\t\t\t\tif (registry.includes(property)) continue\n",
        'new': '',
        'build': False,
        'command': f'{PROJECT} setup -t "registry name"',
    },
    'B1': {
        'site': 'src/styles/_tokens.scss: the --bs-breakpoint-* alias written as the compiled width instead of reading the token',
        'file': 'src/styles/_tokens.scss',
        'old': '--bs-breakpoint-#{$name}: var(--vn-breakpoint-#{$name});',
        'new': '--bs-breakpoint-#{$name}: #{map.get(breakpoints(), $name)};',
        'build': True,
        'command': f'{STYLES} tests/src/styles/tokens.test.ts -t "md breakpoint"',
    },
    'M1': {
        'site': "src/styles/_tokens.scss, $dark: the 'secondary' and 'secondary-rgb' entries reverted to the light slate",
        'file': 'src/styles/_tokens.scss',
        'old': "\t'secondary': 'var(--vn-gray-600)',\n\t'secondary-rgb': '108, 117, 125',\n",
        'new': "\t'secondary': 'oklch(0.446 0.043 257.281)',\n\t'secondary-rgb': '69, 85, 108',\n",
        'build': True,
        'command': f'{STYLES} tests/src/styles/theme.test.ts -t "resolves every role tier"',
    },
    'D1': {
        'site': "tests/setupStyles.ts, THEME_DARK_ADDITIONS: the '--bs-secondary' row deleted",
        'file': 'tests/setupStyles.ts',
        'old': "\t'--bs-primary-rgb',\n\t'--bs-secondary',\n\t'--bs-secondary-rgb',\n])",
        'new': "\t'--bs-primary-rgb',\n\t'--bs-secondary-rgb',\n])",
        'build': False,
        'command': f'{STYLES} tests/src/styles/theme.test.ts -t "resolves every role tier"',
    },
    'A1': {
        'site': "src/styles/_tokens.scss, $dark: the 'dark-border' entry set to the gray-700 step the light role's border takes",
        'file': 'src/styles/_tokens.scss',
        'old': "\t'dark-border': 'var(--vn-gray-800)',\n",
        'new': "\t'dark-border': 'var(--vn-gray-700)',\n",
        'build': True,
        'command': f'{STYLES} tests/src/styles/components/alert.test.ts -t "alert from its own role aliases"',
    },
    'C1': {
        'site': 'guides/veneer.md: the theme compatibility row deleted',
        'file': 'guides/veneer.md',
        'pattern': r'^\| theme +\| selector +\|.*\n',
        'build': False,
        'command': f'{PROJECT} conformance -t "dark component rules"',
    },
    'C2': {
        'site': "tests/setupStyles.ts, COMPONENT_DARK_ASSETS: the '--bs-navbar-toggler-icon-bg' row deleted",
        'file': 'tests/setupStyles.ts',
        'old': "\t'--bs-accordion-btn-active-icon',\n\t'--bs-navbar-toggler-icon-bg',\n])",
        'new': "\t'--bs-accordion-btn-active-icon',\n])",
        'build': False,
        'command': f'{PROJECT} conformance -t "dark component rules"',
    },
    'S3': {
        'site': "app/browser/constants.ts, COLOR_MODE_SPECIMENS: the nested island's navbar toggler deleted",
        'file': 'app/browser/constants.ts',
        'old': '<nav class="navbar" aria-label="Nested bar"><button class="navbar-toggler" type="button" aria-label="Toggle the nested bar links"><span class="navbar-toggler-icon"></span></button></nav>',
        'new': '',
        'build': False,
        'command': f'{PROJECT} app:browser tests/app/browser/sections/ColorModeSection.test.ts',
    },
}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def run(command: str) -> subprocess.CompletedProcess:
    return subprocess.run(command, shell=True, cwd=COPY, env=ENV, capture_output=True, text=True, timeout=560)


def build() -> int:
    return run('npm run build:src:styles').returncode


def mutate(key: str) -> None:
    spec = MUTATIONS[key]
    path = f"{COPY}/{spec['file']}"
    original = open(path, 'rb').read()
    text = original.decode()
    if 'pattern' in spec:
        mutated, found = re.subn(spec['pattern'], '', text, count=1, flags=re.M)
    else:
        found = text.count(spec['old'])
        if found != 1:
            raise SystemExit(f'{key}: expected one match, found {found}')
        mutated = text.replace(spec['old'], spec['new'])
    if found != 1 or mutated == text:
        raise SystemExit(f'{key}: the mutation changed nothing')
    lines = [f'=== {key}', f"site: {spec['site']}", f"command: {spec['command']}"]
    try:
        open(path, 'w').write(mutated)
        if spec['build']:
            lines.append(f'build exit: {build()}')
        result = run(spec['command'])
        output = result.stdout + result.stderr
        lines.append(f'test exit: {result.returncode}')
        summary = [line.strip() for line in output.splitlines() if re.search(r'^\s*(Tests|Test Files)\s', line)]
        lines.extend(f'summary: {line}' for line in summary)
        failed = [line.strip() for line in output.splitlines() if re.match(r'^\s*(×|✗|FAIL)\s', line)]
        lines.extend(f'failed: {line}' for line in failed)
        passed = [line.strip() for line in output.splitlines() if re.match(r'^\s*✓\s', line)]
        lines.extend(f'passed: {line}' for line in passed)
        open(f"{ROOT}/tmp/units/ct2-mutation-{key}.log.txt", 'w').write(output)
    finally:
        open(path, 'wb').write(original)
        restored = digest(open(path, 'rb').read()) == digest(original)
        lines.append(f'restored: {restored}')
        if spec['build']:
            lines.append(f'rebuild exit: {build()}')
    with open(LOG, 'a') as log:
        log.write('\n'.join(lines) + '\n\n')
    print('\n'.join(lines))


if __name__ == '__main__':
    for key in sys.argv[1:] or list(MUTATIONS):
        mutate(key)
