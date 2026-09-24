# Writes the unit's guide prose into the validation copy: the two utilities sections, the Files rows,
# the Tailwind paragraph, and the Tests links. Each edit is an insertion at a named anchor.
p = 'guides/veneer.md'
s = open(p).read()
def ins_before(s, anchor, text):
    assert s.count(anchor) == 1, anchor
    return s.replace(anchor, text + anchor, 1)
def ins_after(s, anchor, text):
    assert s.count(anchor) == 1, anchor
    return s.replace(anchor, anchor + text, 1)

sections = '''### Spacing utilities

The margin and padding keys ship whole in the utilities layer from the
`src/styles/utilities/_spacing.scss` partial. The `.m-*` classes set the margin on every side, and
the `.mx-*`, `.my-*`, `.mt-*`, `.me-*`, `.mb-*`, and `.ms-*` classes set it on the horizontal sides,
on the vertical sides, or on one side, each at every step from the `0` step to the `5` step, at the
`auto` step, and at every breakpoint infix. The `.p-*` classes and the `.px-*`, `.py-*`, `.pt-*`,
`.pe-*`, `.pb-*`, and `.ps-*` classes set the padding the same way at the numbered steps; the
release gives the padding no `auto` step. No negative margin ships, because the release's own
default writes none.

Each step from the `1` step to the `5` step reads a space token: the `--vn-space-2`,
`--vn-space-4`, `--vn-space-8`, `--vn-space-12`, and `--vn-space-24` tokens, which resolve to the
release's `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, and `3rem` lengths. Those tokens carry the density
factor, as the components' own internal space does, so the `--vn-factor-density` token moves every
margin and padding step with the components, and a retuned `--vn-space-8` token moves the `.m-3`
and `.p-3` classes on every side. The zero step stays the literal `0` value and the `auto` step the
literal `auto` value, which neither the factor nor a retune moves. The gap steps read the separate
`--vn-gap-*` scale, which carries no density factor, so the density factor moves a margin and leaves
a gap.

The end and start entries write the physical sides, as the release's own stylesheet does: the
`.me-*` and `.pe-*` classes set the right side, and the `.ms-*` and `.ps-*` classes set the left
side, so in a right-to-left scope the `.ms-3` class still sets the left margin. An `auto` margin
takes the room left over on its side: in a flex line the `.ms-auto` class pushes a box to the end of
the line, and the `.mx-auto` class centers a box of definite width.

The partial writes every entry through the `utility` mixin that § Styles describes, so each
declaration carries the `!important` flag the release writes. It walks the breakpoints once and
writes every entry inside each infix in the release's map order: the margin entries, then the
padding entries, the shorthand entry of each ahead of its side entries. So at one infix a side
entry beats the shorthand entry on its own sides: an element carrying the `.p-3` and `.px-1`
classes resolves a 4px horizontal padding and a 16px vertical one. A wider infix beats every
narrower one whichever entry each class belongs to: at a 768px viewport, an element carrying the
`.m-md-3` and `.mx-sm-1` classes resolves a 16px left margin. § Styles shows the escape from an
important utility inside the utilities layer.

The `tests/src/styles/utilities/spacing.test.ts` proof reads every side of every step at every
infix at its boundary and one pixel below it, the physical end and start sides in each direction,
the order between entries and between infixes, the density factor and a retuned token on every
side, the absence of a negative margin, a dark island, the priority over a later unlayered rule,
and the escape inside the utilities layer.

These are the keys' recorded departures.

- **The steps read Veneer's space scale.** The release writes each step from the `1` step to the
  `5` step as a literal length; Veneer writes the `var(--vn-space-2)` to `var(--vn-space-24)`
  values, which resolve to the same lengths at the default density and move with the density
  factor.

### Interaction utilities

The user-select key and the release's pointer-events entry ship whole in the utilities layer from
the `src/styles/utilities/_interaction.scss` partial. The `.user-select-all`, `.user-select-auto`,
and `.user-select-none` classes set what a press selects on an element: one press selects the whole
element, a press selects text the ordinary way, or no press selects any of it. The `.pe-none` class
takes an element out of the pointer's reach, so a click passes through it to whatever lies beneath,
and the `.pe-auto` class brings an element back into reach, including inside an element carrying
the `.pe-none` class. The release writes neither the user-select entry nor the pointer-events entry
at a breakpoint, so no interaction class writes a breakpoint infix.

The `pe` key carries the padding-end steps and the pointer-events values together, because the
release names its pointer-events classes with the class its padding-end entry uses, and the `none`
and `auto` keys are what tell the two apart. The `_spacing.scss` partial writes the padding steps
under the key and this partial writes the pointer values, so an element carrying the `.pe-3` and
`.pe-none` classes resolves both.

The `.pe-none` class stops the pointer and leaves the keyboard alone, so a link carrying it still
takes focus and activates from the keyboard. The release's own example gives such a link the
`tabindex="-1"` attribute and the `aria-disabled="true"` attribute as well, and the showcase's
Interaction region does the same.

The partial writes each entry through the `utility` mixin, so every declaration carries the
`!important` flag the release writes, and none reads a token, so neither the density factor nor the
color mode moves a value. § Styles shows the escape from an important utility inside the utilities
layer.

The `tests/src/styles/utilities/interaction.test.ts` proof reads each value, what one press
selects under each selection class, the pointer passing through a `.pe-none` cover to the element
beneath it and stopping on a `.pe-auto` cover, the pointer and padding values under the one class,
the absence of an infixed class, a dark island and the density factor, the priority over a later
unlayered rule, and the escape inside the utilities layer.

These are the key's recorded departures.

- **The prefixed selection properties are absent from the source.** The official cascade writes
  the `-webkit-user-select` and `-moz-user-select` declarations ahead of the `user-select`
  declaration on each class. The partial writes the standard property alone, because the managed
  Chromium and Edge receipts this cascade is proved on resolve it and leave the aliases redundant.
  The build emits the `-webkit-user-select` declaration beside the standard one without the source
  declaring it, and the ledger compares the compile before the build, so it records both aliases as
  dropped.

'''
s = ins_before(s, '### Deferred selectors\n', sections)

s = ins_after(s, "| `src/styles/utilities/_flex.scss`            | The flex, alignment, and order utilities in the utilities layer.", "")
flex_row = [l for l in s.split('\n') if l.startswith('| `src/styles/utilities/_flex.scss`')][0]
s = s.replace(flex_row + '\n', flex_row + '\n| `src/styles/utilities/_spacing.scss` | The margin and padding utilities in the utilities layer. |\n| `src/styles/utilities/_interaction.scss` | The user-select and pointer-events utilities in the utilities layer. |\n', 1)

tail = 'rule also declares normal, and the equality still holds with the `col-1` class on the line.\n'
tailwind = '''
The margin and padding steps split the same way the offsets do. The `m-*`, `mt-*`, `mb-*`, `p-*`,
`pt-*`, and `pb-*` names are shipped names off the line: Tailwind's rule for each declares the
physical margin or padding longhands, and Veneer declares each of those with `!important`. The
`mx-*`, `my-*`, `me-*`, `ms-*`, `px-*`, `py-*`, `pe-*`, and `ps-*` names stay on the line:
Tailwind's rule for each declares logical longhands, such as the `margin-inline-start` or the
`padding-block-end` longhand, and Veneer's important declarations sit on the physical sides, which
do not cover them. The `pe-none`, `pe-auto`, and `user-select-*` names are not shared, because
Tailwind names those utilities `pointer-events-none`, `pointer-events-auto`, and `select-*`.
'''
s = ins_after(s, tail, tailwind)

s = ins_after(s, '[input group specimens](../tests/app/browser/sections/InputGroupSection.test.ts),\n', '[interaction specimens](../tests/app/browser/sections/InteractionSection.test.ts),\n')
s = ins_after(s, '[sizing specimens](../tests/app/browser/sections/SizingSection.test.ts),\n', '[spacing specimens](../tests/app/browser/sections/SpacingSection.test.ts),\n')
s = ins_after(s, '[the visibility utilities](../tests/src/styles/utilities/visibility.test.ts),\n', '[the spacing utilities](../tests/src/styles/utilities/spacing.test.ts),\n[the interaction utilities](../tests/src/styles/utilities/interaction.test.ts),\n')
open(p, 'w').write(s)
print('ok')
