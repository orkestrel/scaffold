# batch2-fold.py: fold the second wave-2/3 landing batch into Veneer's ROADMAP.md — the landing commits in
# the B-MODAL, B-UTILITIES, and B-CROSS rows, the B-CROSS units and re-baseline, and the findings the landed
# units' verdicts routed to later units as rows of § Carriers — so the scaffold records of those units can be
# pruned. A successor of batch1-fold.py for UTIL-PAINT, RESIDUE, and OFFCANVAS. Run from the Veneer checkout
# root after batch1-fold.py, with the landing commits as arguments: up dr oc.
import pathlib, re, sys
up, dr, oc = sys.argv[1:4]
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
     "second by `analyst` on Astra and `checker`, the third, a prose round, by `checker`)" % up)
# The B-CROSS row: its units per the design verdict, the re-baseline, and RESIDUE's landing.
row = re.search(r'^\| B-CROSS +\| `opus` on Opus 5\.5 +\|', s, re.M)
assert row, 'B-CROSS row'
cell = ("LEDGER (`cl`), FADE (`cf`), RESIDUE (`dr`), and BARE-BUTTON (`cb`) in wave 1 and THEME (`ct`) in "
        "wave 2 on `opus` on Opus 5.5, RESIDUE on `builder`, per "
        "`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` and its re-baseline; RESIDUE "
        "landed as `%s` (audited by `analyst` on Astra and `checker`); LEDGER and FADE dispatch from the "
        "OFFCANVAS landing, because neither reads a utility key, and merge three-way with the utility "
        "landings that follow" % dr)
old = row.group(0)
s = s.replace(old, '| B-CROSS                  | ' + cell + ' |', 1)
rows = [
    ("The priority case in `tests/conformance.test.ts` compares each sheet's set of priorities for a selector and property, so a priority swapped between the conditions of one pair passes (the OFFCANVAS round-1 audit)",
     "LEDGER keys the comparison by condition over a condition-aware `SheetReader` reading, with the `.offcanvas-sm` swap as its negative control"),
    ("The `readOracleInventory` reader writes each digest into an ordinary object, whose prototype setter swallows a `__proto__` key, so the digest pin cannot see one (the RESIDUE audit)",
     "LEDGER reads the digests into a null-prototype object and proves the key is kept"),
    ("The elements layer's bare `button` rules reach every component's button form, so a disabled `button.nav-link` and a `button.dropdown-item` paint paler and smaller than their anchor forms (the B-COLLAPSE verify verdict V9)",
     "BARE-BUTTON scopes the calibrated surface to a button no component class claims"),
]
table_end = s.index("\n## Decisions")
before = s[:table_end].rstrip('\n')
add = '\n'.join(f"| {a} | {b} |" for a, b in rows)
s = before + '\n' + add + '\n' + s[table_end:]
p.write_text(s)
print('folded; carriers added:', len(rows))
