"""Puts round 1's open-menu markup back into the validation copy, runs one command, and restores the file.

Usage: python3 revert-probe.py specimen|markup <log>
  specimen: the `Nav tabs` specimen in app/browser/constants.ts, read by the NavSection proof.
  markup:   the tabs strip in NAV_MARKUP in tests/setupStyles.ts, read by `nav case tables`.
"""
import os, subprocess, sys
BASE = '/home/user/veneer-nv/tmp/probe/base'
ENV = dict(os.environ, PATH='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + os.environ['PATH'])
CASES = {
    'specimen': ('app/browser/constants.ts',
        '<li class="nav-item show"><a class="nav-link" href="#main">Tabs details</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#main" role="button" aria-expanded="true">Tabs filters</a>',
        '<li class="nav-item dropdown show"><a class="nav-link dropdown-toggle" href="#main" role="button" aria-expanded="true">Tabs filters</a>',
        ['npx', 'vitest', 'run', '--config', 'configs/app/vite.browser.config.ts', '--no-cache', '--reporter=dot', 'tests/app/browser/sections/NavSection.test.ts']),
    'markup': ('tests/setupStyles.ts',
        '<li class="nav-item show"><a class="nav-link" href="#five">Five</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#six" role="button" aria-expanded="true">Six</a><ul class="dropdown-menu show" data-bs-popper="static"><li><a class="dropdown-item" href="#entry">Entry</a></li></ul></li>',
        '<li class="nav-item show"><a class="nav-link" href="#five">Five</a><ul class="dropdown-menu"><li><a href="#six">Six</a></li></ul></li>',
        ['npm', 'run', 'test:setup']),
}
name, log = sys.argv[1], sys.argv[2]
rel, current, previous, cmd = CASES[name]
path = f'{BASE}/{rel}'
pristine = open(path).read()
assert pristine.count(current) == 1
try:
    open(path, 'w').write(pristine.replace(current, previous))
    run = subprocess.run(cmd, cwd=BASE, env=ENV, capture_output=True, text=True)
finally:
    open(path, 'w').write(pristine)
open(log, 'w').write(run.stdout + run.stderr + f'\nexit={run.returncode}\n')
print(name, 'exit', run.returncode)
