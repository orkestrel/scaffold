# AP-TYPE failing-first check: puts the five owned source partials back to their 712ae72 bytes, rebuilds,
# runs the owned style proofs, then restores this unit's bytes and checks the digests. Log: /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-baseline-proofs.log.txt
import hashlib, subprocess, pathlib
ROOT = pathlib.Path('/home/user/veneer-apt')
SOURCES = ['src/styles/_mixins.scss', 'src/styles/elements/_heading.scss', 'src/styles/components/_type.scss',
           'src/styles/utilities/_font.scss', 'src/styles/elements/_fieldset.scss']
FILES = ['tests/src/styles/elements/heading.test.ts', 'tests/src/styles/elements/fieldset.test.ts',
         'tests/src/styles/components/type.test.ts', 'tests/src/styles/utilities/font.test.ts',
         'tests/src/styles/mixins.test.ts']
mine = {path: (ROOT / path).read_bytes() for path in SOURCES}
log = ROOT / '/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-baseline-proofs.log.txt'
try:
    for path in SOURCES:
        (ROOT / path).write_bytes(subprocess.run(['git', 'show', f'712ae72:{path}'], cwd=ROOT, capture_output=True, check=True).stdout)
    with open(log, 'w') as out:
        out.write('=== sources at 712ae72: ' + ' '.join(SOURCES) + '\n')
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=ROOT, capture_output=True, text=True)
        out.write(f'=== build exit {build.returncode}\n')
        run = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=verbose', *FILES], cwd=ROOT, capture_output=True, text=True)
        out.write('\n'.join(l for l in (run.stdout + run.stderr).splitlines() if 'externalized' not in l) + f'\n=== vitest exit {run.returncode}\n')
finally:
    for path, data in mine.items():
        (ROOT / path).write_bytes(data)
    with open(log, 'a') as out:
        for path, data in mine.items():
            out.write(f'=== restored {path} identical={hashlib.sha256((ROOT / path).read_bytes()).digest() == hashlib.sha256(data).digest()}\n')
    subprocess.run(['npm', 'run', 'build:src:styles'], cwd=ROOT, capture_output=True)
