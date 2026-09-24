# Applies the FADE guide edits to the scratch copy's guides/veneer.md: the § Files row, the
# `### Fade classes` section, the rewritten fade sentences, the § Showcase paragraph, and the
# § Tests links. The § Compatibility row and the `#### transition` table are applied separately.
import sys

path = sys.argv[1]
text = open(path).read()


def swap(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match for: {old[:80]!r}, found {text.count(old)}')
    text = text.replace(old, new)


# § Files: a row padded to the collapse row's cell widths.
lines = text.split('\n')
index = next(i for i, line in enumerate(lines) if line.startswith('| `src/styles/components/_collapse.scss`'))
cells = lines[index].split('|')[1:-1]
values = [
    '`src/styles/components/_fade.scss`',
    'The fade class, its hidden state, and its transition in the components layer, read by `tests/src/styles/components/fade.test.ts`.',
]
lines.insert(index, '|' + '|'.join(' ' + v.ljust(len(c) - 1) for v, c in zip(values, cells)) + '|')
text = '\n'.join(lines)

# § Styles: the Fade classes section, ahead of the Collapse classes section.
swap(
    '### Collapse classes\n',
    '''### Fade classes

The transition key ships whole. The fade partial writes the `.fade` rule and its hidden state, each
state a class set in markup. The release records the dialog, modal backdrop, and offcanvas backdrop
compounds under the same key, and the modal and offcanvas partials write those beside the rules
they compound; § Modal classes and § Offcanvas classes give them. § Compatibility records the
plugins that move an element between the classes as engine obligations.

An element carrying the `fade` class without the `show` class resolves `opacity: 0`. Opacity is the
only property the hidden state writes, so a hidden element keeps its box, its place in the flow, its
pointer target, and its place in the accessible tree. Adding the `show` class returns the element to
the opacity its own rules give it: no rule writes an opacity for the shown state.

The `.fade` rule transitions the opacity linearly over the `--vn-motion-feedback` token, which
resolves to the release's `0.15s` value, so `--vn-factor-motion` rescales it. The transition is
written through the `transition` mixin, so the reduced-motion rule the release records beside it is
emitted with it, and the duration resolves to `0s` under that preference. The hidden state carries
no transition of its own.

The barrel loads the fade partial ahead of the collapse partial, the order the release's
`transitions` partial writes the two in. The `.fade` rule and the `.collapsing` rule each write a
transition at one specificity, so an element carrying both classes transitions its size, as it does
in the release.

No rule here paints a color, so every state resolves the same in either color mode.

These are the key's recorded departures.

- **The duration reads the motion token.** The release writes the `opacity 0.15s linear` value;
  Veneer writes the `opacity var(--vn-motion-feedback) linear` value, which resolves to the same
  value and rescales with `--vn-factor-motion`.

The Fade region renders a shown and a hidden card body, each under its card's header. The card
reserves the body's box, so the hidden frame is the card with its header over an empty body. The
hidden body carries the `aria-hidden` attribute, because the hidden state leaves its text in the
accessible tree.

The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser: the written
selectors and declarations, the hidden and the shown opacity with the box and the pointer target a
hidden element keeps, the transition at rest, under the staged preference, and under a doubled
motion factor, the collapsing rule's transition on an element carrying both classes, the fade on
each component the release animates, and every state inside a dark island.

### Collapse classes
''',
)

# § Alert classes.
swap(
    '''after its `fade` transition, is behavior the engine owns, and § Compatibility records it. No
showcase specimen carries the `fade` class or the `show` class, and every alert rule paints the same
without them.''',
    '''after its `fade` transition, is behavior the engine owns, and § Compatibility records it. No alert
rule reads the `fade` class or the `show` class, and no showcase specimen carries either. The `.fade`
rule that § Fade classes describes holds an alert carrying the `fade` class transparent until the
`show` class joins it, so the plugin's dismissal, which removes the `show` class, fades the alert
out before it removes the alert.''',
)

# § Toast classes.
swap(
    '''displayed. The engine also sets the `fade` class, which no Veneer rule reads. § Compatibility
records the Toast plugin that moves a toast between the classes as an engine obligation.''',
    '''displayed. The engine also sets the `fade` class when the toast is animated, and the `.fade` rule
that § Fade classes describes transitions the toast's opacity, so the toast fades out as it gains
the `showing` class and fades in as it loses it. § Compatibility records the Toast plugin that moves
a toast between the classes as an engine obligation.''',
)

# § Tooltip classes.
swap(
    '''records it. No tooltip rule reads the `fade` class the plugin sets on an animated tip. The engine
writes a tip's position''',
    '''records it. No tooltip rule reads the `fade` class the plugin sets on an animated tip; the `.fade`
rule that § Fade classes describes transitions the tip's opacity, so an animated tip fades between
its transparent rest and the opacity the `show` class gives it. The engine writes a tip's position''',
)

# § Popover classes.
swap(
    '''sets the `show` class, and the `fade` class when the popover is animated, and no popover rule reads
either; that behavior is the engine's, and § Compatibility records it. The engine writes a''',
    '''sets the `show` class, and the `fade` class when the popover is animated. No popover rule reads
either class; the `.fade` rule that § Fade classes describes holds an animated popover transparent
until the `show` class joins it and fades it in and out. Setting the classes is the engine's
behavior, and § Compatibility records it. The engine writes a''',
)

# § Outside the ledger, the Elements decision paragraph.
swap(
    '''closed. The popover key ships no motion, because no popover rule the release records reads the
`fade` class or the `show` class, so that asymmetry is recorded as an Elements decision for its
owners: J-ENGINE opens and closes a popover, and CROSS-FADE ships the `.fade` rule.''',
    '''closed. The popover key ships no motion of its own: no popover rule the release records reads the
`fade` class or the `show` class, and the `.fade` rule that § Fade classes describes fades an
animated popover in and out alike. That asymmetry is recorded as an Elements decision for its
owner, J-ENGINE, which opens and closes a popover.''',
)

# § Showcase: the Fade region's frames.
swap(
    '''The Toast region renders no toast carrying the `showing` class,''',
    '''The Fade region's hidden frame is the reserved empty frame: the card keeps the hidden body's box,
and the capture registry reads that frame on the card rather than on the body, because a region the
transparent body declares paints one color and the frame guard refuses it as a blank; see
[fade specimens](../tests/app/browser/sections/FadeSection.test.ts) and
[cascade fade classes](../tests/src/styles/components/fade.test.ts).

The Toast region renders no toast carrying the `showing` class,''',
)

# § Tests: the application link and the style link.
swap(
    '''[display specimens](../tests/app/browser/sections/DisplaySection.test.ts),
''',
    '''[display specimens](../tests/app/browser/sections/DisplaySection.test.ts),
[fade specimens](../tests/app/browser/sections/FadeSection.test.ts),
''',
)
swap(
    '''[the collapse classes](../tests/src/styles/components/collapse.test.ts),
''',
    '''[the fade classes](../tests/src/styles/components/fade.test.ts),
[the collapse classes](../tests/src/styles/components/collapse.test.ts),
''',
)

open(path, 'w').write(text)
