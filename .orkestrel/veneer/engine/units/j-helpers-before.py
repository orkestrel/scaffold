# Runs the ScrollSpy suite against the `main` copy of `src/browser/ScrollSpy.ts` (the hand-written
# disabled reading) and writes the unit's copy back byte for byte, so the ScrollSpy disabled pins
# read green before the routing through `matchesDisabled` as well as after it.
import hashlib, pathlib, subprocess

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers')
SOURCE = ROOT / 'src/browser/ScrollSpy.ts'
LOG = ROOT / 'tmp/j-helpers/scrollspy-before.log.txt'

unit = SOURCE.read_bytes()
before = hashlib.sha256(unit).hexdigest()
main = subprocess.run(['git', 'show', 'HEAD:src/browser/ScrollSpy.ts'], cwd=ROOT, capture_output=True, check=True).stdout
try:
    SOURCE.write_bytes(main)
    done = subprocess.run(
        ['node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
         '--project', 'src:browser', '--reporter=verbose', 'tests/src/browser/ScrollSpy.test.ts'],
        cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=600)
finally:
    SOURCE.write_bytes(unit)
after = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
lines = [line for line in (done.stdout + done.stderr).splitlines()
         if 'disabled' in line or 'Tests' in line or 'Test Files' in line]
lines.append(f'exit={done.returncode}')
lines.append('receipt: restored byte for byte' if after == before else 'DIGEST MISMATCH')
LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
print('\n'.join(lines))
