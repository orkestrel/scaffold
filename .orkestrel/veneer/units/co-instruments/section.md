### Collapse classes

The collapse key and the collapsing key ship whole: the hidden panel, the shown panel, and the
closing box on each axis. Each state is a class set in markup. This section describes what each
class renders, and § Compatibility records the plugin that moves a panel between the classes as an
engine obligation.

A panel carrying the `collapse` class without the `show` class resolves `display: none`, so it
leaves the page and the accessible tree together. Adding the `show` class returns the panel to the
display its own element carries: a panel on a `div` element is a block, and a panel on a `span`
element is inline. No rule writes a display for the shown state, and the `collapse-horizontal` class
changes nothing at rest, because its rule selects it only beside the `collapsing` class.

The `collapsing` class is the box a panel is while it opens or closes. It zeroes the height and
hides the overflow, so the panel clips its content to the height the element carries inline, and a
panel carrying no inline height is a zero-height box. The `collapse-horizontal` class on the same
element turns the clip onto the other axis: the width is zeroed, the height returns to `auto`, and
the panel clips its content to the width the element carries inline. The horizontal rule is a
compound selector, so a horizontal element nested inside a closing panel takes nothing from it.

Each closing box transitions the size it clips, `height` or `width`, over the release's
`0.35s ease` value. No published motion token resolves to `0.35s`, so the value is Bootstrap's
literal rather than a motion token, and `--vn-factor-motion` does not rescale it. The transition is written
through the `transition` mixin, so the reduced-motion rule the release records beside each one is
emitted with it, and the duration resolves to `0s` under that preference. The hiding rule carries no
transition, so a panel shown or hidden by its class changes state at once.

No rule here paints a color, so every state resolves the same in either color mode.

The Collapse region renders the shown and the hidden panel on each axis, each inside a card under
its header. It renders no closing panel: a panel carrying the `collapsing` class rests at zero
height until an engine writes an inline size on it, and no specimen carries an inline style, so a
frame of it would carry nothing. The capture registry declines that frame the way it declines the
grow spinners, and the cascade proof reads the class instead.

`tests/src/styles/components/collapse.test.ts` reads each state in the browser: the written
selectors, the hidden and the shown display, the clip under an inline height with a hit test below
the panel's edge, the zero box under none, the horizontal compound against a nested element, both
transitions at rest and under the staged preference, and every state inside a dark island.
