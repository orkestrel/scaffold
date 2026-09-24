# Restores the guide's § Compatibility `util/index.js` row of kind `method` to `main`'s bytes.
import pathlib, subprocess

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers')
PREFIX = '| engine           | method         | util/index.js:'
main = subprocess.run(['git', 'show', 'main:guides/veneer.md'], cwd=ROOT, capture_output=True,
                      check=True).stdout.decode('utf-8')
source = [line for line in main.split('\n') if line.startswith(PREFIX)]
assert len(source) == 1, len(source)
path = ROOT / 'guides/veneer.md'
lines = path.read_text(encoding='utf-8').split('\n')
hits = [index for index, line in enumerate(lines) if line.startswith(PREFIX)]
assert len(hits) == 1, len(hits)
lines[hits[0]] = source[0]
path.write_bytes('\n'.join(lines).encode('utf-8'))
print('restored line', hits[0] + 1)
