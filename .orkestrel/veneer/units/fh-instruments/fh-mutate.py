# FRAME-HELPERS mutation instrument: applies one named mutation to its owned file, or reverts it.
# Usage: python3 fh-mutate.py NAME apply|revert
import sys

ROOT = '/home/user/veneer-fh/'
MUTATIONS = {
    # The helper's crop reading dropped: no edge is ever reported.
    'crop': (
        'tests/setupBrowser.ts',
        "\t\t\tconst cropped = sides.filter((side) => crossed.includes(side))\n",
        "\t\t\tconst cropped = sides.filter((side) => crossed.includes(side) && false)\n",
    ),
    # The helper's pixel guard dropped: no outline is ever read.
    'guard': (
        'tests/setupBrowser.ts',
        "\t\t\t\treadStyle(ring, 'outline-style') === 'none'\n",
        "\t\t\t\treadStyle(ring, 'outline-style') !== '' || ring === ring\n",
    ),
    # The helper's drive reverted to a scripted focus with a key press after it.
    'drive': (
        'tests/setupBrowser.ts',
        "\t\t\twrapper.focus()\n\t\t\tawait driveTraversal(() => target, readName(target))\n",
        "\t\t\ttarget.focus()\n\t\t\tawait pressKeys('{ArrowRight}')\n",
    ),
    # The helper's pointer park dropped: the pointer a dark run's mode switch leaves stays put.
    'park': (
        'tests/setupBrowser.ts',
        "\t\tawait releasePointer()\n\t\tconst entered: string[] = []\n",
        "\t\tconst entered: string[] = []\n",
    ),
}

name, action = sys.argv[1], sys.argv[2]
path, before, after = MUTATIONS[name]
text = open(ROOT + path).read()
source, target = (before, after) if action == 'apply' else (after, before)
if text.count(source) != 1:
    raise SystemExit(f'{name} {action}: expected one match in {path}, found {text.count(source)}')
open(ROOT + path, 'w').write(text.replace(source, target))
print(f'{name} {action}: {path}')
