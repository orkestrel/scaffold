# batch2-fold-2.py: a successor of batch2-fold.py (never run) that also folds RAMP-DOWN, LEDGER, PAGE-FRAME, and,
# when its commit is given, FADE, which landed on the session branch after the second batch. Fold the second
# wave-2/3 landing batch into Veneer's ROADMAP.md — the landing commits in
# the B-MODAL, B-UTILITIES, and B-CROSS rows, the B-CROSS units and re-baseline, and the findings the landed
# units' verdicts routed to later units as rows of § Carriers — so the scaffold records of those units can be
# pruned. A successor of batch1-fold.py for UTIL-PAINT, UTIL-TEXT, UTIL-SPACING, RESIDUE, OFFCANVAS,
# BACKGROUND-SIZE, JOURNEY-BUDGET, and BARE-BUTTON. Run from the Veneer checkout root after batch1-fold.py, with
# the landing commits as arguments: up ut usp dr oc bz jb cb rd cl pf [cf].
import pathlib, re, sys
up, ut, usp, dr, oc, bz, jb, cb, rd, cl, pf = sys.argv[1:12]
cf = sys.argv[12] if len(sys.argv) > 12 else None
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
        "(the resting-key journey case's timeout scaled by the key table); LEDGER landed as `%s` (the media "
        "condition and keyframes readers and tables, the condition-keyed priority comparison, the "
        "prototype-free inventory maps, and the refusal of any animation no shipped key records; two rounds "
        "on `opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the "
        "second by `analyst` on Astra and `checker`); PAGE-FRAME (`pf`), added by the batch-2 capture's "
        "decode failure and its offcanvas region, landed as `%s` (every placement takes the showcase's other "
        "`main` children out of the layout, reads its region at the shot's geometry, and refuses a frame over "
        "the `FRAME_AREA` constant, per `/home/user/scaffold/.orkestrel/veneer/units/pf-design-verdict.md`; "
        "a design round on `planner` and `analyst`, then rounds on `opus` audited by `analyst` on Astra, "
        "`reviewer` on Opus 5.5, and `checker`)%s" % (dr, cb, bz, jb, cl, pf,
        ("; FADE landed as `%s` (the `transition` key: the `.fade` rule and its hidden state, the Fade "
         "region, and the fade on the alert, toast, tooltip, popover, tab pane, and modal; three rounds on "
         "`opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the second "
         "by `analyst` on Astra and `checker`, the third, a prose round, by `checker`)" % cf) if cf else
        "; FADE merges three-way with the landings that follow"))
old = row.group(0)
s = s.replace(old, '| B-CROSS                  | ' + cell + ' |', 1)
rows = [
    ("The priority case in `tests/conformance.test.ts` compares each sheet's set of priorities for a selector and property, so a priority swapped between the conditions of one pair passes (the OFFCANVAS round-1 audit)",
     "Closed: LEDGER landed as `%s`; the case compares each priority keyed by its media condition, and the `.offcanvas-sm` swap reddens it" % cl),
    ("The `readOracleInventory` reader writes each digest into an ordinary object, whose prototype setter swallows a `__proto__` key, so the digest pin cannot see one (the RESIDUE audit)",
     "Closed: LEDGER landed as `%s`; the reader writes the digests and components into maps with no prototype, and a proof keeps a `__proto__` key" % cl),
    ("Every focus and hover scenario is a page frame, so no lens can find the ring (the B-COLLAPSE VERIFY verdict's row V1); PAGE-FRAME bounds each page frame to the page's opening and one section",
     "FOCUS-FRAME (`ff`), dispatched after PAGE-FRAME lands and scoped then to the focus scenarios whose ring a reader cannot find in the bounded frame, per `pf-design-verdict.md` R7"),
    ("The installed `readFrame` refusal does not name the frame's size, the installed `captureFrame` function stages the content height for an element frame too, and no capture takes a first-screen page frame (the PAGE-FRAME design verdict's R9)",
     "The next `@orkestrel/test` release unit, not yet named; PAGE-FRAME's area guard and bounded placements hold the portfolio readable until then"),
]
once("RAMP-DOWN, after MODAL and OFFCANVAS land: a down-direction twin of the `breakpoint-each` mixin with its fixture case, through which each partial writes its down-walk once, the built cascade byte-equal before and after",
     "Closed: RAMP-DOWN landed as `%s`; the `breakpoint-each-down` mixin writes the modal fullscreen classes and the responsive table wrappers once, the fixture case reads each named entry below, at, and above its boundary, the built cascade is byte-equal, and the offcanvas partial keeps its own walk for the release's order (two rounds on `opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the second by `analyst` on Astra and `checker`)" % rd)
if cf:
    once("FADE rewrites the sentence with the rules it ships",
         "Closed: FADE landed as `%s` and rewrote the sentence with the rules it ships" % cf)
table_end = s.index("\n## Decisions")
before = s[:table_end].rstrip('\n')
add = '\n'.join(f"| {a} | {b} |" for a, b in rows)
s = before + '\n' + add + '\n' + s[table_end:]
p.write_text(s)
print('folded; carriers added:', len(rows))
