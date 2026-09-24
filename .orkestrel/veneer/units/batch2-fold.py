# batch2-fold.py: fold the second wave-2/3 landing batch into Veneer's ROADMAP.md — the landing commits in
# the B-MODAL, B-UTILITIES, and B-CROSS rows, the B-CROSS units and re-baseline, and the findings the landed
# units' verdicts routed to later units as rows of § Carriers — so the scaffold records of those units can be
# pruned. A successor of batch1-fold.py for UTIL-PAINT, UTIL-TEXT, UTIL-SPACING, RESIDUE, OFFCANVAS,
# BACKGROUND-SIZE, JOURNEY-BUDGET, and BARE-BUTTON. Run from the Veneer checkout root after batch1-fold.py, with
# the landing commits as arguments: up ut usp dr oc bz jb cb.
import pathlib, re, sys
up, ut, usp, dr, oc, bz, jb, cb = sys.argv[1:9]
p = pathlib.Path('ROADMAP.md'); s = p.read_text()
def once(old, new):
    global s
    assert s.count(old) == 1, (old[:60], s.count(old))
    s = s.replace(old, new)
tip = ("the second and third by `analyst` on Astra and `checker`, the fourth, a prose round, by "
       "`checker`)")
once(tip, tip + "; OFFCANVAS landed as `%s` (the offcanvas key with the Offcanvas region after Tooltip "
     "and Popover, the responsive panels, the drawer stack bindings, and the navbar-with-offcanvas "
     "specimen; three rounds on `opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, "
     "and `checker`, the second by `analyst` on Astra and `checker`, the third, a prose round, by "
     "`checker`)" % oc)
font = "and each prose round by `checker`"
once(font, font + "; UTIL-PAINT landed as `%s` (the background, border, and rounded keys with the "
     "Background and Border regions, the swatch helper, and the whole-order Tailwind profiles proof; three "
     "rounds on `opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the "
     "second by `analyst` on Astra and `checker`, the third, a prose round, by `checker`); UTIL-TEXT landed "
     "as `%s` (the text, color, and link keys with the Text and Color regions, the color-and-background pairs "
     "in a partial of their own ahead of the colored-link helper, and the helper moved to the utilities "
     "layer); UTIL-SPACING landed as `%s` (the margin, padding, user-select, and pointer-events keys with the "
     "Spacing and Interaction regions); each of those two over a first round audited by `analyst` on Astra, "
     "`reviewer` on Opus 5.5, and `checker` and a fix round audited by `analyst` on Astra and `checker`, "
     "accepted with its round record's defects on the record" % (up, ut, usp))
# The B-CROSS row: its units per the design verdict, the re-baseline, and RESIDUE's landing.
row = re.search(r'^\| B-CROSS +\| `opus` on Opus 5\.5 +\|', s, re.M)
assert row, 'B-CROSS row'
cell = ("LEDGER (`cl`), FADE (`cf`), RESIDUE (`dr`), and BARE-BUTTON (`cb`) in wave 1 and THEME (`ct`) in "
        "wave 2 on `opus` on Opus 5.5, RESIDUE on `builder`, per "
        "`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` and its re-baseline; RESIDUE "
        "landed as `%s` (audited by `analyst` on Astra and `checker`); BARE-BUTTON landed as `%s` (the "
        "calibrated surface scoped to a button with no class and no data-bs-target attribute, the "
        "showcase control hooked by a data attribute; two rounds on `opus`, the first audited by "
        "`analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the second by `analyst` on Astra and "
        "`checker`); two support units on `builder`, each verified by `checker`: BACKGROUND-SIZE landed as "
        "`%s` (the accordion and navbar background-size readings under D45) and JOURNEY-BUDGET as `%s` "
        "(the resting-key journey case's timeout scaled by the key table); LEDGER and FADE dispatch from the "
        "OFFCANVAS landing, because neither reads a utility key, and merge three-way with the landings "
        "that follow" % (dr, cb, bz, jb))
old = row.group(0)
s = s.replace(old, '| B-CROSS                  | ' + cell + ' |', 1)
rows = [
    ("The priority case in `tests/conformance.test.ts` compares each sheet's set of priorities for a selector and property, so a priority swapped between the conditions of one pair passes (the OFFCANVAS round-1 audit)",
     "LEDGER keys the comparison by condition over a condition-aware `SheetReader` reading, with the `.offcanvas-sm` swap as its negative control"),
    ("The `readOracleInventory` reader writes each digest into an ordinary object, whose prototype setter swallows a `__proto__` key, so the digest pin cannot see one (the RESIDUE audit)",
     "LEDGER reads the digests into a null-prototype object and proves the key is kept"),
]
table_end = s.index("\n## Decisions")
before = s[:table_end].rstrip('\n')
add = '\n'.join(f"| {a} | {b} |" for a, b in rows)
s = before + '\n' + add + '\n' + s[table_end:]
p.write_text(s)
print('folded; carriers added:', len(rows))
