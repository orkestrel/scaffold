"""Resolves THEME's one landing conflict, in the `tests/setupStyles.ts` TSDoc of the role expression table.

The session head (CLOSE-OUT) reworded the opening clause to name its subject ("The `information` role is");
THEME rewrote the rest of the paragraph (the gray steps and the release's dark secondary). The resolution keeps
both: the head's opening clause and THEME's remainder. The script refuses any conflict it does not recognise.
Usage: python3 ct-resolve.py <veneer checkout>
"""

import re
import sys
from pathlib import Path

path = Path(sys.argv[1]) / 'tests/setupStyles.ts'
text = path.read_text()
blocks = re.findall(r'<<<<<<< [^\n]*\n(.*?)\|\|\|\|\|\|\| [^\n]*\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n', text, re.S)
if len(blocks) != 1:
    sys.exit(f'expected one diff3 block in {path}, found {len(blocks)}')
ours, base, theirs = blocks[0]
if 'The `information` role is the Elements name' not in ours or 'release\'s gray steps' not in theirs:
    sys.exit('the conflict is not the one this script resolves')
resolution = (
    ' * The `information` role is the Elements name of the role Bootstrap calls `info`. The `light` and\n'
    ' * `dark` roles Bootstrap names have no Elements specimen, so no row measures them; their tiers are the\n'
    " * release's gray steps, which the {@link THEME_GRAY_TIERS} constant records. The dark secondary\n"
    " * fill is the release's rather than Elements', because Elements' slate reads about 2.3 to 1 against\n"
    ' * the dark canvas, so no row measures the dark secondary tiers either; the\n'
    ' * `tests/src/styles/theme.test.ts` proof reads that fill against the release\'s own.\n'
)
if resolution.split('the dark canvas')[1] not in theirs:
    sys.exit('THEME\'s remainder differs from the resolution this script writes')
text = re.sub(r'<<<<<<< [^\n]*\n.*?>>>>>>> [^\n]*\n', lambda _: resolution, text, count=1, flags=re.S)
path.write_text(text)
print(f'resolved {path}')
