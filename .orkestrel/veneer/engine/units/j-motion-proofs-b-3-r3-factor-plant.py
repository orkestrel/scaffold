"""Plants a shipped motion factor of 2 in the scratch copy's tokens partial, never in the worktree.

Usage: python tmp/j-motion-proofs-b/r3-factor-plant.py <scratch root>

The plant replaces the root's `--vn-factor-motion: 1;` declaration in the theme layer with
`--vn-factor-motion: 2;`, so a factor case that relies on the shipped factor being 1 reads a ratio
of 2 where it expects 4. The script refuses a scratch root outside the worktree's own `tmp` tree,
and an anchor that is absent or repeated.
"""

import pathlib
import sys

scratch = pathlib.Path(sys.argv[1]).resolve()
worktree = pathlib.Path(__file__).resolve().parents[2]
if scratch == worktree or not scratch.is_relative_to(worktree / 'tmp'):
    sys.exit('refusing to plant outside the scratch copy')

anchor = '\t\t--vn-factor-motion: 1;\n'
tokens = scratch / 'src/styles/_tokens.scss'
text = tokens.read_bytes().decode('utf-8')
if text.count(anchor) != 1:
    sys.exit('refusing: the factor anchor is absent or repeated')
tokens.write_bytes(text.replace(anchor, '\t\t--vn-factor-motion: 2;\n').encode('utf-8'))
print('planted a shipped factor of 2 in src/styles/_tokens.scss')
