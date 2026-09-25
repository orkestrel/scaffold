# ER-MECH planted controls: each plant edits one owned file, runs the named gate through its npm
# script, writes the log to tmp/units/erm-plant-<name>.log.txt, restores the file from a byte copy,
# and records the restore check (SHA-256 before and after) at the log's end.
import hashlib
import os
import shutil
import subprocess
import sys

ROOT = '/home/user/veneer-erm'
SCRATCH = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
GUIDE = os.path.join(ROOT, 'guides/veneer.md')
DISTRIBUTION = os.path.join(ROOT, 'tests/distribution.test.ts')
SETUP = os.path.join(ROOT, 'tests/setupServer.ts')
ENV = dict(os.environ)
ENV['PATH'] = f'{SCRATCH}/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'

RECEIPTS_HEADER = '| ---- | -------- | ------- | ----- | -------- | ------ | ---- | --- | -------- | ------ |\n'
ROW = '| 2026-09-25 | 873f715 | `chromium` | 141.0.7390.37 | `linux` | 6.18.44-fc-v37 | 22.22.2 | 11.19.1 | `test:guides` | Fail |\n'
SURFACE_ANCHOR = '| `TOKEN_NAMES` '


def receipt(*rows):
    return (GUIDE, RECEIPTS_HEADER, RECEIPTS_HEADER + ''.join(rows))


PLANTS = {
    'build': receipt(ROW.replace('141.0.7390.37', '141.0.7390')),
    'date': receipt(ROW.replace('2026-09-25', '2026-02-30')),
    'result': receipt(ROW.replace('| Fail |', '| Passed |')),
    'cell': receipt(ROW.replace('| 6.18.44-fc-v37 |', '| |')),
    'stale': receipt(ROW.replace('| Fail |', '| Pass |')),
    'channel': receipt(ROW.replace('`chromium`', '`firefox`')),
    'floor': receipt(ROW.replace('| 22.22.2 |', '| 20.0.0 |')),
    'script': receipt(ROW.replace('`test:guides`', '`test:nothing`')),
    'repeat': receipt(ROW, ROW),
    'unowned': (GUIDE, '| `chrome`   | —        | ER-CHROME |', '| `chrome`   | —        | —         |'),
    'host': (
        GUIDE,
        '| `chromium` | `win32`  | ER-WIN    |\n',
        '| `chromium` | `win32`  | ER-WIN    |\n| `chromium` | `win32`  | ER-OTHER  |\n',
    ),
    'surface': (GUIDE, SURFACE_ANCHOR, '| `chromium` | const | Plants a name. |\n' + SURFACE_ANCHOR),
    'runtime-node': (SETUP, '		node: process.versions.node,\n', '		node: process.version,\n'),
    'runtime-build': (SETUP, '		build,\n		platform: process.platform,', "		build: build.replace(/\\.\\d+$/u, '.0'),\n		platform: process.platform,"),
    'release': (
        DISTRIBUTION,
        "const RELEASE = import.meta.env.MODE === 'release'",
        'const RELEASE = true',
    ),
}


def digest(path):
    with open(path, 'rb') as handle:
        return hashlib.sha256(handle.read()).hexdigest()


def plant(name):
    path, old, new = PLANTS[name]
    backup = os.path.join(SCRATCH, f'erm-plant-{name}.bak')
    shutil.copyfile(path, backup)
    before = digest(path)
    log = os.path.join(ROOT, f'tmp/units/erm-plant-{name}.log.txt')
    try:
        with open(path, encoding='utf-8') as handle:
            text = handle.read()
        if text.count(old) != 1:
            raise SystemExit(f'{name}: anchor occurs {text.count(old)} times in {path}')
        with open(path, 'w', encoding='utf-8') as handle:
            handle.write(text.replace(old, new))
        if name.startswith('runtime-'):
            command = ['npm', 'run', 'test:setup', '--', 'tests/setupServer.test.ts', '-t', 'readRuntime']
        elif name == 'release':
            command = ['npm', 'run', 'test:distribution', '--', '--reporter=verbose', '-t', 'release host']
        else:
            command = ['npm', 'run', 'test:guides']
        with open(log, 'w', encoding='utf-8') as out:
            out.write(f'plant={name} file={os.path.relpath(path, ROOT)}\n')
            out.write(f'command={" ".join(command)}\n')
            out.flush()
            result = subprocess.run(command, cwd=ROOT, env=ENV, stdout=out, stderr=subprocess.STDOUT)
            out.write(f'exit={result.returncode}\n')
    finally:
        shutil.copyfile(backup, path)
        after = digest(path)
        with open(log, 'a', encoding='utf-8') as out:
            out.write(f'restore before={before} after={after} equal={before == after}\n')
    print(name, 'exit', result.returncode, 'restored', before == after)


for name in sys.argv[1:] or PLANTS:
    plant(name)
