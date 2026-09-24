"""TIP round 4, sweep fixes in the owned files (worktree): comments that claim more than their
assertions read. Each target must match once."""

import pathlib

ROOT = pathlib.Path('/home/user/veneer-tp')

EDITS = [
    (
        'tests/src/styles/components/tooltip.test.ts',
        "\t\t\t// The arrow lies wholly outside the tip, its own host-side edge on the tip's facing edge.\n",
        "\t\t\t// The arrow lies wholly outside the tip, its edge facing the tip on the tip's edge facing\n"
        '\t\t\t// the host.\n',
    ),
    (
        'tests/src/styles/components/popover.test.ts',
        "\t\t\t// The arrow lies wholly outside the popover's border box, its own host-side edge on the\n"
        "\t\t\t// popover's facing outer edge.\n",
        "\t\t\t// The arrow lies wholly outside the popover's border box, its edge facing the popover on\n"
        "\t\t\t// the popover's outer edge facing the host.\n",
    ),
    (
        'tests/app/browser/sections/PopoverSection.test.ts',
        "\t\t\t// Each specimen is the shell's frame holding one popover and nothing else, in the placement\n"
        '\t\t\t// order the table pins, and each popover stands in for the placement the engine would write\n'
        '\t\t\t// with the shipped position utilities on the popover and on its arrow. Each carries the\n'
        "\t\t\t// release's template order: the arrow, the `h3` header, and the body.\n",
        "\t\t\t// Each placement specimen is the shell's frame holding one popover and nothing else, in the\n"
        '\t\t\t// placement order the table pins, and each popover stands in for the placement the engine\n'
        '\t\t\t// would write with the shipped position utilities on the popover and on its arrow. Each\n'
        "\t\t\t// carries the release's template order: the arrow, the `h3` header, and the body.\n",
    ),
]

for path, old, new in EDITS:
    file = ROOT / path
    text = file.read_text()
    if text.count(old) != 1:
        raise SystemExit(f'expected one match in {path}')
    file.write_text(text.replace(old, new))
    print(f'edited {path}')
