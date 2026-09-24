"""TIP round 4: fixes P7, P8, and P9 and the shared sweep fix, applied to the validation copy's
shared files. Each target must match once."""

import pathlib

BASE = pathlib.Path('/home/user/veneer-tp/tmp/probe/base')

EDITS = [
    (
        # P7
        'app/browser/constants.ts',
        ' * Lists the popover specimens the section renders, one per explicit placement, in render order.\n',
        ' * Lists the popover specimens the section renders, a popover at each explicit placement and an\n'
        ' * untitled popover at the bottom placement, in render order.\n',
    ),
    (
        # P8
        'guides/veneer.md',
        "The popover classes are set in markup. The release's Popover plugin builds on the Tooltip plugin and\n"
        'sets the `fade` class and the `show` class, which no popover rule reads; that behavior is the\n'
        "engine's, and § Compatibility records it. The engine writes a popover's position and offset on the\n"
        'element, so the showcase stands in for them with the shipped `position-absolute`, `top-50`,\n'
        '`start-50`, and `translate-middle` utilities on each popover, and the `position-absolute` utility\n'
        'with the `start-50` and `translate-middle-x` utilities, or the `top-50` and `translate-middle-y`\n'
        'utilities, on its arrow.\n',
        "The popover classes are set in markup. The release's Popover plugin builds on the Tooltip plugin and\n"
        'sets the `show` class, and the `fade` class when the popover is animated, and no popover rule reads\n'
        "either; that behavior is the engine's, and § Compatibility records it. The engine writes a\n"
        "popover's position and offset on the element, so the showcase stands in for them with the shipped\n"
        '`position-absolute`, `top-50`, `start-50`, and `translate-middle` utilities on each popover, and\n'
        'the `position-absolute` utility with the `start-50` and `translate-middle-x` utilities, or the\n'
        '`top-50` and `translate-middle-y` utilities, on its arrow.\n',
    ),
    (
        # P9
        'tests/setupStyles.ts',
        ' * A reading of every property on the arrow and on each of its triangles is what separates two\n'
        ' * placements, so an automatic placement resolving the same list as an explicit one resolves the\n'
        ' * same geometry.\n',
        ' * A reading of each of these properties on the arrow and on each of its triangles is what\n'
        ' * separates two placements, so an automatic placement resolving the same list as an explicit one\n'
        ' * resolves the same geometry.\n',
    ),
    (
        # Sweep: the arrow edge the TIP_PLACEMENTS remarks name
        'tests/setupStyles.ts',
        " * the automatic class pairs with, and the side of the arrow's triangle that paints. The `edge` field\n"
        " * is the tip edge facing the host, so the arrow's own edge on that side meets the tip's edge the\n"
        ' * `edge` field names. The `end` and `start` names are physical, as the release writes them.\n',
        " * the automatic class pairs with, and the side of the arrow's triangle that paints. The `edge` field\n"
        " * is the tip edge facing the host, so the arrow's edge facing the tip, on the side the `side` field\n"
        " * names, meets the tip's edge the `edge` field names. The `end` and `start` names are physical, as\n"
        ' * the release writes them.\n',
    ),
]

for path, old, new in EDITS:
    file = BASE / path
    text = file.read_text()
    if text.count(old) != 1:
        raise SystemExit(f'expected one match in {path}: {old[:60]!r}')
    file.write_text(text.replace(old, new))
    print(f'edited {path}')
for path, _, new in EDITS:
    for line in new.splitlines():
        width = len(line.expandtabs(2))
        if width > 100:
            raise SystemExit(f'{path}: line of {width} columns: {line}')
print('every edited line fits 100 columns')
