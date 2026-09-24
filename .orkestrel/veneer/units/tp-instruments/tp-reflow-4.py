"""TIP round 4: re-flow the TIP_PLACEMENTS remarks paragraph the sweep fix touched, so no line
passes 100 columns. Ran once on the validation copy after tp-shared-4.py (that script's width check
stopped on this paragraph's pre-existing 101-column line after its edits were written)."""

import pathlib

p = pathlib.Path('/home/user/veneer-tp/tmp/probe/base/tests/setupStyles.ts')
t = p.read_text()
old = (
    " * The `name` field is the suffix the `bs-tooltip-*` and `bs-popover-*` classes carry. The `side`\n"
    " * field is the physical side the placement engine names in the `data-popper-placement` attribute\n"
    " * the automatic class pairs with, and the side of the arrow's triangle that paints. The `edge` field\n"
    " * is the tip edge facing the host, so the arrow's edge facing the tip, on the side the `side` field\n"
    " * names, meets the tip's edge the `edge` field names. The `end` and `start` names are physical, as\n"
    " * the release writes them.\n"
)
new = (
    " * The `name` field is the suffix the `bs-tooltip-*` and `bs-popover-*` classes carry. The `side`\n"
    " * field is the physical side the placement engine names in the `data-popper-placement` attribute\n"
    " * the automatic class pairs with, and the side of the arrow's triangle that paints. The `edge`\n"
    " * field is the tip edge facing the host, so the arrow's edge facing the tip, on the side the `side`\n"
    " * field names, meets the tip's edge the `edge` field names. The `end` and `start` names are\n"
    " * physical, as the release writes them.\n"
)
assert t.count(old) == 1
p.write_text(t.replace(old, new))
print(max(len(line) for line in new.splitlines()))
