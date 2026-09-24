#!/usr/bin/env python3
"""Applies the round-2 guide edits (T-b and T-d) on top of the round-1 guide in the validation copy."""
p = '/home/user/veneer-ut/tmp/probe/base/guides/veneer.md'
s = open(p).read()
def swap(a, b, count=1):
    global s
    assert s.count(a) == count, (a[:90], s.count(a))
    s = s.replace(a, b)
# T-d: the Files rows.
swap("| The color-and-background pairs, the text color, opacity, and emphasis utilities, and the link opacity, offset, and underline utilities in the utilities layer.",
     "| The text color, opacity, and emphasis utilities, and the link opacity, offset, and underline utilities in the utilities layer.")
lines = s.split('\n')
i = [k for k, l in enumerate(lines) if l.startswith('| `src/styles/utilities/_link.scss`')][0]
lines.insert(i, '| `src/styles/utilities/_color-bg.scss` | The color-and-background pairs in the utilities layer, ahead of the colored-link helper. |')
s = '\n'.join(lines)
# T-b: the Text utilities opening.
swap("""The text keys ship whole in the utilities layer from the `src/styles/utilities/_text.scss` partial:
the `.text-start`, `.text-end`, and `.text-center` alignments at every breakpoint infix, the
`.text-decoration-*` lines, the `.text-lowercase`, `.text-uppercase`, and `.text-capitalize`
transforms, the `.text-wrap` and `.text-nowrap` wrapping classes, and the `.text-break` class. The
`.text-truncate` helper ships beside them from the `src/styles/components/_text-truncation.scss`
partial. The font family""", """The text formatting entries of the `text` key ship in the utilities layer from the
`src/styles/utilities/_text.scss` partial: the `.text-start`, `.text-end`, and `.text-center`
alignments at every breakpoint infix, the `.text-decoration-*` lines, the `.text-lowercase`,
`.text-uppercase`, and `.text-capitalize` transforms, the `.text-wrap` and `.text-nowrap` wrapping
classes, and the `.text-break` class. The key's colors, opacity steps, and color-and-background
pairs ship under § Color utilities, and its `.text-truncate` helper ships beside the formatting
entries from the `src/styles/components/_text-truncation.scss` partial. The font family""")
# Re-flow of the truncation paragraph a round-1 edit left long.
swap("""sets the `overflow` property to the `hidden` value, the `text-overflow` property to the `ellipsis`
value, and the `white-space` property to the `nowrap` value. It clips only a box whose width is bounded, such as a grid
column.""", """sets the `overflow` property to the `hidden` value, the `text-overflow` property to the `ellipsis`
value, and the `white-space` property to the `nowrap` value. It clips only a box whose width is
bounded, such as a grid column.""")
# T-d: the Color utilities opening.
swap("""link key ship whole in the utilities layer. The `src/styles/utilities/_color.scss` partial writes
the `.text-bg-*` pairs at its head, then the `.text-*` role, black, white, and body colors beside
the release's `.text-muted`, `.text-black-50`, `.text-white-50`, and `.text-reset` classes and its
body tiers, the `.text-opacity-*` steps, the `.text-*-emphasis` tiers, and the link opacity, offset,
and underline utilities. The `src/styles/utilities/_link.scss` partial writes the colored-link
helper.""", """link key ship whole in the utilities layer. The `src/styles/utilities/_color-bg.scss` partial
writes the `.text-bg-*` pairs, and the `src/styles/utilities/_link.scss` partial writes the
colored-link helper, each ahead of every utility partial, in the release's helper order. The
`src/styles/utilities/_color.scss` partial writes the `.text-*` role, black, white, and body colors
beside the release's `.text-muted`, `.text-black-50`, `.text-white-50`, and `.text-reset` classes
and its body tiers, the `.text-opacity-*` steps, the `.text-*-emphasis` tiers, and the link opacity,
offset, and underline utilities.""")
# T-b: the text-opacity statement, restricted to the color entry.
swap("""A role color reads the release's `--bs-*-rgb` channel alias at the opacity the `--bs-text-opacity`
variable holds, and each color class sets that variable to the `1` value as a normal declaration. The""",
     """A role color reads the release's `--bs-*-rgb` channel alias at the opacity the `--bs-text-opacity`
variable holds, and each class of the release's `color` entry sets that variable to the `1` value as
a normal declaration; the `.text-*-emphasis` classes set the color alone. The""")
# T-d: the pairs' place and precedence.
swap("""opacity the `--bs-bg-opacity` variable holds, the `1` value where nothing sets it, and the foreground the
release records for that role:""", """opacity the `--bs-bg-opacity` variable holds, the `1` value where nothing sets it, and the
foreground the release records for that role:""")
swap("""computing them against Veneer's fills. The release writes the pairs with the `!important` flag and
loads its helpers ahead of its utilities, so the pairs head the partial. No entry the release's map
writes ahead of the color entry sets a color or a background, so there the pairs resolve as they
would ahead of every utility: an element carrying the `.text-bg-primary` and `.text-danger` classes
paints the danger color on the primary fill, and a background utility the map writes later wins the
fill.""", """computing them against Veneer's fills. The release writes the pairs with the `!important` flag and
loads them ahead of the colored-link helper and every utility, so their partial heads the utilities
layer, and on one element a colored link, a text color, or a background utility wins over a pair, as
it does in the release: an element carrying the `.text-bg-light` and `.link-danger` classes paints
the danger link color on the light fill, an element carrying the `.text-bg-primary` and
`.text-danger` classes paints the danger color on the primary fill, and a background utility the map
writes later wins the fill.""")
swap("""The colored-link helper heads the utilities layer for the reason the visually hidden helper does:""",
     """The colored-link helper follows the pairs at the head of the utilities layer for the reason the
visually hidden helper sits there:""")
# T-d: the proofs paragraph.
swap("""The `tests/src/styles/utilities/color.test.ts` proof reads each pair, color, and emphasis tier
against the declaration the release records for it, resolved in the same scope, in each mode, and
the pairs at the opacity a scope sets. It also reads the opacity steps over a color written ahead of
them, a retuned role channel and role fill, a text color and a later background utility winning
over a pair, the priority over a later unlayered rule, and the escape inside the utilities layer.""",
     """The `tests/src/styles/utilities/color-bg.test.ts` proof reads each pair against the declarations
the release records for it, resolved in the same scope, in each mode and at the opacity a scope
sets, and a colored link, a text color, and a later background utility each winning over a pair.
The `tests/src/styles/utilities/color.test.ts` proof reads each color and emphasis tier against the
declaration the release records for it, resolved in the same scope, in each mode. It also reads the
opacity steps over a color written ahead of them, a retuned role channel and role fill, the priority
over a later unlayered rule, and the escape inside the utilities layer.""")
# T-b: the prefixed-decoration bullet, replaced by § Icon links' sentence.
swap("""- **The prefixed decoration color is absent.** The official cascade carries the
  `-webkit-text-decoration-color` property beside the `text-decoration-color` property on every
  link class; Veneer emits the standard property alone, because the managed Chromium and Edge
  receipts this cascade is proved on resolve it and leave the alias redundant.
""", """
The prefixed `-webkit-text-decoration-color` alias is not a departure: the build emits it from the
standard property without the source declaring it.
""")
# T-b: the compatibility rows.
swap("Every official `.text-*` selector ships in the utilities layer: the alignment",
     "Every official `.text-*` selector ships in the utilities layer, except the `.text-truncate` helper, which the `text-truncate` row records: the alignment")
swap("resolved values are proved in the `tests/src/styles/utilities/text.test.ts` and `tests/src/styles/utilities/color.test.ts` proofs.",
     "resolved values are proved in the `tests/src/styles/utilities/text.test.ts`, `tests/src/styles/utilities/color.test.ts`, and `tests/src/styles/utilities/color-bg.test.ts` proofs.")
swap("The `--bs-text-opacity` property is set to the `1` value by every text color class and to its step",
     "The `--bs-text-opacity` property is set to the `1` value by every class of the release's `color` entry and to its step")
swap("the anchor behavior is proved in `tests/src/styles/elements/a.test.ts` and the scale in `tests/src/styles/utilities/link.test.ts`.",
     "the anchor behavior is proved in the `tests/src/styles/elements/a.test.ts` proof and the scale in the `tests/src/styles/utilities/link.test.ts` proof.")
swap("control decoration independently of text, proved in `tests/src/styles/utilities/link.test.ts`.",
     "control decoration independently of text, proved in the `tests/src/styles/utilities/link.test.ts` proof.")
# T-b: the Tailwind paragraph's importance token.
swap("`text-align` or the `color` longhand, which Veneer declares with `!important`, so the `text-start`",
     "`text-align` or the `color` longhand, which Veneer declares with the `!important` flag, so the `text-start`")
# T-d: the § Tests link.
swap("[the color utilities](../tests/src/styles/utilities/color.test.ts), and",
     "[the color utilities](../tests/src/styles/utilities/color.test.ts),\n[the color-and-background pairs](../tests/src/styles/utilities/color-bg.test.ts), and")
open(p, 'w').write(s)
