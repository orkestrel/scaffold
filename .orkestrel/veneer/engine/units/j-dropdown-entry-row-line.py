# Applies the retargeted entry-selector mutation alone, runs its named case, prints the failing
# assertion's location, and restores the bytes with a digest check.
import hashlib, pathlib, re, subprocess

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown')
d = ROOT / 'src/browser/Delegate.ts'
orig = d.read_bytes()
text = orig.decode('utf-8')
old = '`:is(${this.#dropdown.selectors.entry}):not('
assert text.count(old) == 1
d.write_bytes(text.replace(old, '`:is(${DROPDOWN_SELECTORS.entry}):not(').encode('utf-8'))
try:
    run = subprocess.run(['node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
                          '--project', 'src:browser', 'tests/src/browser/Delegate.test.ts',
                          '-t', 'routes dropdown clicks by a replaced trigger selector'],
                         cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=300)
    out = re.sub(r'\x1b\[[0-9;]*m', '', run.stdout + run.stderr)
    lines = [line for line in out.splitlines()
             if 'AssertionError' in line or 'Delegate.test.ts:' in line or re.match(r'\s*\S?\s*\d+\|', line)]
    (ROOT / 'tmp/j-dropdown/entry-row-line.log.txt').write_text('\n'.join(lines) + '\n', encoding='utf-8')
finally:
    d.write_bytes(orig)
print('restored byte for byte' if hashlib.sha256(d.read_bytes()).digest() == hashlib.sha256(orig).digest() else 'MISMATCH')
