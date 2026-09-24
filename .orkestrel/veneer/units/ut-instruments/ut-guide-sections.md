### Text utilities

The text keys ship whole in the utilities layer from the `src/styles/utilities/_text.scss` partial:
the `.text-start`, `.text-end`, and `.text-center` alignments at every breakpoint infix, the
`.text-decoration-*` lines, the `.text-lowercase`, `.text-uppercase`, and `.text-capitalize`
transforms, the `.text-wrap` and `.text-nowrap` wrapping classes, and the `.text-break` class. The
`.text-truncate` helper ships beside them from the `src/styles/components/_text-truncation.scss`
partial. The font family, size, style, weight, and line-height classes that the release documents on
the same page ship under § Font utilities.

The partial writes every entry through the `utility` mixin that § Styles describes and walks the
breakpoints once, in the release's map order. Only the alignment entry is responsive, so no other
text class writes a breakpoint infix, and a wider alignment infix beats every narrower one whatever
order the classes are written in: at a 768px viewport, an element carrying the `.text-md-start` and
`.text-sm-center` classes resolves the `left` alignment. Inside one entry the later value wins, so
an element carrying the `.text-nowrap` and `.text-wrap` classes stays on one line.

Each alignment sets the physical side the release's own stylesheet writes: the `.text-start` class
resolves the `left` value and the `.text-end` class the `right` value, so in a right-to-left scope
the `.text-start` class still aligns a line to the left. The `.text-break` class sets the
`word-break` property and the legacy `word-wrap` property to the `break-word` value, so a word
longer than its box breaks inside the box rather than running past it. Every declaration carries
the `!important` flag the release writes, and none reads a token, so neither the density factor nor
the color mode moves a value. § Styles shows the escape from an important utility inside the
utilities layer.

The `.text-truncate` helper clips its element to one line and ends that line with an ellipsis: it
sets the `overflow` property to the `hidden` value, the `text-overflow` property to the `ellipsis`
value, and the `white-space` property to the `nowrap` value. It clips only a box whose width is bounded, such as a grid
column. The helper sits in the components layer at the release's `_helpers.scss` position, and its
declarations are normal, as the release writes them. So an important wrapping utility on the same
element overrides its `nowrap` value, and so does a rule of your own.

The `tests/src/styles/utilities/text.test.ts` proof reads every alignment at every infix at its
boundary and one pixel below it, the order between infixes, the physical sides in a right-to-left
scope, every decoration, transform, wrapping, and break value, the wrapping and the breaking inside
a constrained box, the order inside an entry, a dark island and the density factor, the priority
over a later unlayered rule, and the escape inside the utilities layer. The
`tests/src/styles/components/text-truncation.test.ts` proof reads the ellipsis on a constrained
box, a wrapping utility and a later rule of your own overriding the helper, its layer, a dark island,
and the density factor. The alignment, decoration, transform, wrapping, break, and truncation
classes carry no recorded departure.

### Color utilities

The text colors, their opacity steps and emphasis tiers, the color-and-background pairs, and the
link key ship whole in the utilities layer. The `src/styles/utilities/_color.scss` partial writes
the `.text-bg-*` pairs at its head, then the `.text-*` role, black, white, and body colors beside
the release's `.text-muted`, `.text-black-50`, `.text-white-50`, and `.text-reset` classes and its
body tiers, the `.text-opacity-*` steps, the `.text-*-emphasis` tiers, and the link opacity, offset,
and underline utilities. The `src/styles/utilities/_link.scss` partial writes the colored-link
helper.

A role color reads the release's `--bs-*-rgb` channel alias at the opacity the `--bs-text-opacity`
variable holds, and each color class sets that variable to the `1` value as a normal declaration. The
`.text-opacity-*` steps follow the colors in the release's map, so on one element the step wins: an
element carrying the `.text-primary` and `.text-opacity-50` classes paints the primary role at half
opacity. The `.text-body-secondary`, `.text-body-tertiary`, and `.text-body-emphasis` tiers read the
`--bs-secondary-color`, `--bs-tertiary-color`, and `--bs-emphasis-color` aliases, and each
`.text-*-emphasis` class reads its role's `--bs-*-text-emphasis` alias. The theme re-declares each
of those aliases per mode, so a dark island paints its own tier. The `.text-reset` class takes its
parent's color.

Each color-and-background pair paints its role's fill from the `--bs-*-rgb` channel alias at the
opacity the `--bs-bg-opacity` variable holds, the `1` value where nothing sets it, and the foreground the
release records for that role: white on the primary, secondary, success, danger, and dark fills,
and black on the info, warning, and light fills. The release chose those foregrounds with its
`color-contrast` function against its own fills, so the pairs ship them as recorded rather than
computing them against Veneer's fills. The release writes the pairs with the `!important` flag and
loads its helpers ahead of its utilities, so the pairs head the partial. No entry the release's map
writes ahead of the color entry sets a color or a background, so there the pairs resolve as they
would ahead of every utility: an element carrying the `.text-bg-primary` and `.text-danger` classes
paints the danger color on the primary fill, and a background utility the map writes later wins the
fill.

The colored-link helper heads the utilities layer for the reason the visually hidden helper does:
the release writes it with the `!important` flag, and in the components layer it would beat every
text color. At the head of the utilities layer, an element carrying the `.link-primary` and
`.text-danger` classes resolves the danger color, as it does in the release. The link opacity,
offset, and underline utilities are entries of the release's map, which writes them after the text
colors, so the color partial writes them after its emphasis tiers through the `utility` and
`utility-variable` mixins, each hover class through the mixins' `$state` argument. So an underline
class wins the underline color that a text-decoration utility's shorthand resets: an element
carrying the `.text-decoration-underline` and `.link-underline-danger` classes draws a danger
underline, as it does in the release.

Every property declaration carries the `!important` flag the release writes, and every custom
property declaration stays normal. None of the classes reads the density factor. § Styles shows the
escape from an important utility inside the utilities layer.

The `tests/src/styles/utilities/color.test.ts` proof reads each pair, color, and emphasis tier
against the declaration the release records for it, resolved in the same scope, in each mode, and
the pairs at the opacity a scope sets. It also reads the opacity steps over a color written ahead of
them, a retuned role channel and role fill, a text color and a later background utility winning
over a pair, the priority over a later unlayered rule, and the escape inside the utilities layer.
The `tests/src/styles/utilities/link.test.ts` proof reads the whole link key: each colored link at
rest, under the pointer, and under focus, the opacity, offset, and underline scales and their hover
classes, a text color winning over a colored link, an underline class winning over a
text-decoration utility, the priority over a later unlayered rule, and the escape.

These are the keys' recorded departures.

- **A literal color reads the palette.** The release writes each pair's white or black foreground
  and the `.text-black-50` and `.text-white-50` colors as literals; Veneer writes the
  `--vn-palette-white-base` and `--vn-palette-black-base` tokens and the `--vn-palette-black-rgb`
  and `--vn-palette-white-rgb` channels, which resolve to the same colors.
- **The link colors read Veneer's role tokens.** Each colored link and each underline class reads
  its role's `--vn-color-*-rgb` channels, and a colored link keeps its resting color under the
  pointer and under focus where the release writes a darker literal.
- **The prefixed decoration color is absent.** The official cascade carries the
  `-webkit-text-decoration-color` property beside the `text-decoration-color` property on every
  link class; Veneer emits the standard property alone, because the managed Chromium and Edge
  receipts this cascade is proved on resolve it and leave the alias redundant.

