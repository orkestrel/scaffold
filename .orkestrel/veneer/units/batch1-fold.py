# batch1-fold.py: fold the first wave-2/3 landing batch into Veneer's ROADMAP.md — the landing commits in the
# B-MODAL and B-UTILITIES rows, and the findings the landed units' verdicts routed to later units as rows of
# § Carriers — so the scaffold records of those units can be pruned. Run from the Veneer checkout root with
# the landing commits as arguments: ue ufl md tp uf.
import pathlib, sys
ue, ufl, md, tp, uf = sys.argv[1:6]
p = pathlib.Path('ROADMAP.md'); s = p.read_text()
def once(old, new):
    global s
    assert s.count(old) == 1, (old[:60], s.count(old))
    s = s.replace(old, new)
once("the fix rounds by `analyst` on Astra and `checker`)",
     "the fix rounds by `analyst` on Astra and `checker`); MODAL landed as `%s` (the modal key with the "
     "Modal region after Toast, the overlay-backdrop mixin, and the dialog stack bindings; three rounds on "
     "`opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the second by "
     "`analyst` on Astra and `checker`, the third, a prose round, by `checker`); TIP landed as `%s` (the "
     "tooltip and popover keys with the Tooltip and Popover regions after Modal and the reset-text mixin; four "
     "rounds on `opus`, the first audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the "
     "second and third by `analyst` on Astra and `checker`, the fourth, a prose round, by `checker`)" % (md, tp))
anchor = "each frame-holding specimen ends on the band `5d7f3b9` adds below its frame)"
once(anchor, anchor + "; UTIL-EFFECT landed as `%s` (the shadow, opacity, and focus-ring keys with the "
     "Shadow, Opacity, and Focus ring regions; two rounds on `opus`, accepted with the report's defects on "
     "the record); UTIL-FLOW landed as `%s` (the float, clearfix, overflow, object-fit, and stretched-link "
     "keys with the Float, Object fit, and Overflow regions and the cover-block mixin; three rounds on "
     "`opus`); UTIL-FONT landed as `%s` (the font, font-size, font-style, font-weight, and line-height keys "
     "in the Type region; three rounds on `opus`); each first round audited by `analyst` on Astra, "
     "`reviewer` on Opus 5.5, and `checker`, each fix round by `analyst` on Astra and `checker`, and each "
     "prose round by `checker`" % (ue, ufl, uf))
rows = [
    ("The § Toast classes sentence \"The engine also sets the `fade` class, which no Veneer rule reads\" goes false when the `.fade` rule ships (the TOAST round-1 audit)",
     "FADE rewrites the sentence with the rules it ships"),
    ("The landed `### Alert classes` and `### Carousel classes` sections write code tokens without their nouns (the TOAST round-1 audit)",
     "CLOSE-OUT's token-noun sweep gives each token its noun"),
    ("The landed section proofs `CarouselSection.test.ts` and `AccordionSection.test.ts` iterate inline specimen-name lists, the form TOAST's proof moved to a derivation (the TOAST round-1 audit)",
     "CLOSE-OUT derives the carousel proof's names from its specimens; BCF derives the accordion proof's"),
    ("The down-direction breakpoint walk is written out in `_modal.scss` (the fullscreen ramp), `_table.scss` (`.table-responsive`), and the offcanvas panel ramp (the MODAL round-1 audit)",
     "RAMP-DOWN, after MODAL and OFFCANVAS land: a down-direction twin of the `breakpoint-each` mixin with its fixture case, through which each partial writes its down-walk once, the built cascade byte-equal before and after"),
    ("The heading element, the `.hN` classes, and the `.fs-N` classes each write the `9 - $level` size mapping (the UTIL-FONT round-1 audit)",
     "CLOSE-OUT states the mapping once in a function the three sites call"),
    ("The wave-3 regions, their `### … utilities` guide sections, and their § Tests links sit in landing order, where the family record's showcase ruling asks for barrel order and the landed Display, Flex, Position, and Sizing regions follow neither (the first wave-2/3 landing batch)",
     "CLOSE-OUT states one order rule for the utility regions, their guide sections, and their links, and applies it once every B-UTILITIES unit has landed"),
    ("The `TYPE_SPECIMENS` remark says the line-height paragraphs sit in columns narrow enough to wrap at every width; the `line-heights` frames show every paragraph wrapping at the 390 and 1280 journey widths, and the fluid container sets no cap that proves the wider widths (the UTIL-FONT round-1 audit, read at the first wave-2/3 landing batch)",
     "CLOSE-OUT narrows the remark to the 390 and 1280 journey widths the frames prove"),
    ("A mechanical three-way merge of `guides/veneer.md` duplicates a paragraph's sentences or detaches a table row when two units edit the same paragraph (the first wave-2/3 landing batch: the § Showcase grouping sentence, the viewport-frame paragraph, the Tailwind paragraph, the § Tests link list, and the deferral table's closing row, each repaired at the landing)",
     "Closed at the landing: each paragraph rewritten to carry every unit's clause, and the landing's `land-sort.py` check scans for detached table rows before each later landing"),
]
table_end = s.index("\n## Decisions")
before = s[:table_end].rstrip('\n')
add = '\n'.join(f"| {a} | {b} |" for a, b in rows)
s = before + '\n' + add + '\n' + s[table_end:]
p.write_text(s)
print('folded; carriers added:', len(rows))
