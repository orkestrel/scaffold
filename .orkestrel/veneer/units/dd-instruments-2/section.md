### Dropdown classes

The dropdown key ships in its own partial in the components layer: the direction and centered
wrappers, the toggle and its caret in each direction, the menu and its placement in each direction,
the start and end alignments with their breakpoint ramp, the items and their states, the header, the
divider, the item text, and the legacy dark menu. The input-group and button-group relationships the
key records ship from the partials that write them, and the split-toggle and navigation menu names
are withheld under § Deferred selectors.

Every class is set in markup. A menu shows while it carries the `.show` class, and it takes the
placement its wrapper names while it carries the `data-bs-popper` attribute, which is what a
placement engine writes when it leaves a menu to the stylesheet. No rule opens, closes, or places a
menu on its own. The Dropdown `plugin` row in § Compatibility records the behavior the engine owns.

Every value the partial paints is Bootstrap 5.3.8's own. A length reads the Veneer scale token that
already resolves to it, so the menu padding, the item and header insets, the divider margin, and the
spacer between the toggle and the menu answer to the `--vn-factor-density` factor. The stacking
level reads the `--vn-stack-dropdown` tier, so a retune of that tier moves every menu. A color reads
the compatibility variable Bootstrap names, or the palette or gray token that carries Bootstrap's
literal: the selected item holds the `--vn-palette-blue` fill behind the `--vn-palette-white-base`
text in both color modes, and the header reads the `--vn-gray-600` token. Each slot is declared on
the `.dropdown-menu` class, so a consumer's override lands when it is set on the menu, and the same
override on an ancestor is shadowed.

The caret is drawn from borders on an empty inline box, in one direction per wrapper: down on a
plain toggle, up under the `.dropup` wrapper, towards the end under the `.dropend` wrapper, and
towards the start under the `.dropstart` wrapper, where it moves to the `::before` pseudo-element
and the `::after` caret is hidden, so a toggle paints one caret. Its margin and the sides that draw
it are physical, because this cascade carries no right-to-left twin, and a toggle with no content
drops the margin. The ledger's `declared` rows on the end and start caret sites are the release's
own pairs: Bootstrap writes each of those selectors twice, and the comparison reads the value the
second rule leaves.

The menu opens one `--bs-dropdown-spacer` gap away from its toggle: under it by default, over it
under the `.dropup` wrapper, and beside it under the `.dropend` and `.dropstart` wrappers. The
`.dropdown-menu-end` class aligns the menu to its wrapper's end when the menu carries the
`data-bs-popper` attribute, and publishes the `--bs-position` property alone without it. The
`.dropdown-menu-start` class does the same towards the start, and each breakpoint name switches that
alignment at its boundary. No Veneer rule reads `--bs-position`; a dropdown engine reads it to
choose the menu's placement, as Bootstrap's script does. The `.dropdown-center` and `.dropup-center`
wrappers paint the menu at their start, as the cascade places it, because centering the menu on its
toggle is placement a dropdown engine performs.

The `.dropdown-menu-dark` class is the release's legacy dark menu. It retunes the menu's own slots
on the class rather than under the theme attribute, so a dark menu holds one paint in both color
modes, and it empties the shadow slot the way the release does.

The `tests/src/styles/components/dropdown.test.ts` proof reads each resolved treatment in the
browser: the resting and the shown menu, the placement in each direction against the toggle's box
with the spacer gap, the caret sides on each pseudo-element, the empty toggle, the end alignment
with and without the placement attribute, every step of the ramp at its boundary and one pixel
below it, the published side, the hover, focus, selected, pressed, and disabled item paints, the
density factor, the stacking tier, a consumer's override, the dark menu's slots, and the plain menu
retuning in a dark island while the dark menu holds.
