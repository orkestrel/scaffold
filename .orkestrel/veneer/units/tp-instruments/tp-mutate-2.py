# TIP round-2 mutation runner: applies one edit to the validation copy tmp/probe/base, rebuilds the styles
# where the edit is in a stylesheet, runs the named proof, logs the site, command, exits, summary, and
# failing case names, and restores the file byte for byte.
import subprocess, sys, re, os
base = '/home/user/veneer-tp/tmp/probe/base'
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
env['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
STYLES = ['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot']
APP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'app:browser']
SETUP = ['npx', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache', '--reporter=dot', '--project', 'setup']
M = [
 ('P1 T-box inset written as the release literal', 'src/styles/components/_tooltip.scss', '--bs-tooltip-padding-x: var(--vn-space-4);', '--bs-tooltip-padding-x: 0.5rem;', True, STYLES + ['tests/src/styles/components/tooltip.test.ts']),
 ('P1 T-box text size written as the release literal', 'src/styles/components/_tooltip.scss', '--bs-tooltip-font-size: var(--vn-size-2);', '--bs-tooltip-font-size: 0.875rem;', True, STYLES + ['tests/src/styles/components/tooltip.test.ts']),
 ('P1 P-box inset written as the release literal', 'src/styles/components/_popover.scss', '--bs-popover-body-padding-y: var(--vn-space-8);', '--bs-popover-body-padding-y: 1rem;', True, STYLES + ['tests/src/styles/components/popover.test.ts']),
 ('P1 P-box text size written as the release literal', 'src/styles/components/_popover.scss', '--bs-popover-header-font-size: var(--vn-size-3);', '--bs-popover-header-font-size: 1rem;', True, STYLES + ['tests/src/styles/components/popover.test.ts']),
 ('P5 the border-left-color reading dropped from TIP_ARROW_PROPERTIES', 'tests/setupStyles.ts', "\t'border-bottom-color',\n\t'border-left-color',\n])", "\t'border-bottom-color',\n])", False, SETUP + ['tests/setupStyles.test.ts']),
 ('P6 the 390 width assertion inverted', 'tests/app/browser/sections/PopoverSection.test.ts', 'narrow.filter((width) => width >= 276)', 'narrow.filter((width) => width < 276)', False, APP + ['tests/app/browser/sections/PopoverSection.test.ts']),
 ('Retitled tooltip arrow case: the top entry given the bottom side and the top edge', 'src/styles/components/_tooltip.scss', '\ttop: (\n\t\tside: top,\n\t\tedge: bottom,', '\ttop: (\n\t\tside: bottom,\n\t\tedge: top,', True, STYLES + ['tests/src/styles/components/tooltip.test.ts']),
 ('Retitled popover arrow case: the end entry given the left side and the right edge', 'src/styles/components/_popover.scss', '\tend: (\n\t\tside: right,\n\t\tedge: left,', '\tend: (\n\t\tside: left,\n\t\tedge: right,', True, STYLES + ['tests/src/styles/components/popover.test.ts']),
 ('Edited section contract: the untitled popover header written as an h2 element', 'app/browser/constants.ts', '<h3 class="popover-header"></h3>', '<h2 class="popover-header"></h2>', False, APP + ['tests/app/browser/sections/PopoverSection.test.ts']),
 ('Edited section contract: the untitled popover header given a title', 'app/browser/constants.ts', '<h3 class="popover-header"></h3>', '<h3 class="popover-header">Untitled</h3>', False, APP + ['tests/app/browser/sections/PopoverSection.test.ts']),
]
sel = sys.argv[1:]
for i, (name, path, old, new, styles, cmd) in enumerate(M):
    if sel and str(i) not in sel: continue
    p = os.path.join(base, path)
    orig = open(p).read()
    assert orig.count(old) == 1, (name, orig.count(old))
    open(p, 'w').write(orig.replace(old, new))
    try:
        bcode = 'skipped (no stylesheet changed)'
        if styles:
            bcode = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=base, env=env, capture_output=True, text=True).returncode
        r = subprocess.run(cmd, cwd=base, env=env, capture_output=True, text=True)
        out = re.sub(r'\x1b\[[0-9;]*m', '', r.stdout + r.stderr)
        tests = [l.strip() for l in out.splitlines() if re.search(r'^\s*Tests\s', l)]
        fails = sorted(set(re.sub(r'^.*?\| ', '', l.strip()) for l in out.splitlines() if l.strip().startswith('FAIL')))
        print(f'## {i} {name}')
        print(f'   site: {path}')
        print(f'   replaced: {old!r}')
        print(f'   with: {new!r}')
        print('   command: ' + ('npm run build:src:styles && ' if styles else '') + ' '.join(cmd))
        print(f'   build exit {bcode}; vitest exit {r.returncode}; {tests}')
        for f in fails: print('   failing:', f)
    finally:
        open(p, 'w').write(orig)
b = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=base, env=env, capture_output=True, text=True)
print('restored; restoring build exit', b.returncode)
