# Folds the APPEARANCE landing into Veneer's ROADMAP.md: closes the palette-and-type carrier row with the landed
# commits, aligns the rulings sentence on the engine session's branch practice, and adds carrier rows for the
# description-list defect (E-IDENTITY) and the fixture lookups (J-FIXTURES). Usage: python3 appearance-fold.py APC_SHA APT_SHA
import sys
apc, apt = sys.argv[1], sys.argv[2]
p = '/home/user/veneer/ROADMAP.md'
s = open(p).read()
def swap(old, new):
    global s
    assert s.count(old) == 1, old[:80]
    s = s.replace(old, new)
swap("From 2026-09-23 the engine runs in a parallel session\n  on its own branch (D43):",
     "From 2026-09-23 the engine runs in a parallel session\n  on `main`, one worktree per unit (D43, E4, E14):")
swap("§ Protocol › The engine session\n  states the branches, the ownership, and the landing discipline.",
     "§ Protocol › The engine session\n  states the worktrees, the ownership, and the landing discipline.")
old_row_start = "| The palette's dark contrast readings"
i = s.index(old_row_start); j = s.index('\n', i)
row = s[i:j]
cells = row.split('|')
cells[2] = f" Closed: AP-COLOR landed P7 as `{apc}` and AP-TYPE landed P8 as `{apt}` (APPEARANCE, E-IDENTITY) "
s = s[:i] + '|'.join(cells) + s[j:]
new_rows = (
    "\n| Bootstrap's horizontal description list (`<dl class=\"row\">` with `.col-*` children) wraps each `dd` under its `dt`, "
    "because the `dl` element rule's `gap` applies to the `.row` flex container (probe of 2026-09-24 at 1280 pixels) "
    "| E-IDENTITY, ruled by its design round |"
    "\n| The fixture lookups `readButton`, `readSpecimen`, `readSubject`, and `readOracleButton` in `tests/setupBrowser.ts` "
    "repeat one shape (the engine session's J-HELPERS design verdict) | J-FIXTURES, in this session |"
)
k = s.index('\n', s.index(old_row_start))
s = s[:k] + new_rows + s[k:]
open(p, 'w').write(s)
print('folded')
