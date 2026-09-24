# Rewraps the FADE guide section in the scratch copy's guides/veneer.md after the wording pass in
# cf-guide-2.py, and folds the hidden-state paragraph into one statement of what the state writes.
import sys

path = sys.argv[1]
text = open(path).read()
start = text.index('### Fade classes\n')
end = text.index('### Collapse classes\n')
section = '''### Fade classes

The transition key ships whole. The fade partial writes the `.fade` rule and its hidden state, each
state a class set in markup. The release records the dialog, modal backdrop, and offcanvas backdrop
compounds under the same key, and the modal and offcanvas partials write those beside the rules
they compound; § Modal classes and § Offcanvas classes give them. § Compatibility records the
plugins that move an element between the classes as engine obligations.

The hidden state writes the `opacity: 0` declaration, and no other, on an element carrying the
`fade` class without the `show` class. A hidden element therefore keeps its box, its place in the
flow, its pointer target, and its place in the accessible tree. Adding the `show` class returns the
element to the opacity its own rules give it: no rule writes an opacity for the shown state.

The `.fade` rule transitions the opacity linearly over the `--vn-motion-feedback` token, which
resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor rescales it. The
transition is written through the `transition` mixin, so the reduced-motion rule the release
records beside it is emitted with it, and the duration resolves to the `0s` value under that
preference. The hidden state carries no transition of its own.

The barrel loads the fade partial ahead of the collapse partial, the order in which the release's
`transitions` partial writes the fade rules and the collapse rules. The `.fade` rule and the
`.collapsing` rule each write a transition at one specificity, so an element carrying the `fade`
class and the `collapsing` class transitions its size, as it does in the release.

No rule here paints a color, so every state resolves the same in either color mode.

These are the key's recorded departures.

- **The duration reads the motion token.** The release writes the `opacity 0.15s linear` value;
  Veneer writes the `opacity var(--vn-motion-feedback) linear` value, which resolves to the same
  value and rescales with the `--vn-factor-motion` factor.

The Fade region renders a shown and a hidden card body, each under its card's header. The card
reserves the body's box, so the hidden frame is the card with its header over an empty body. The
hidden body carries the `aria-hidden` attribute, because the hidden state leaves its text in the
accessible tree.

The `tests/src/styles/components/fade.test.ts` proof reads each state in the browser: the written
selectors and declarations, the hidden and the shown opacity with the box and the pointer target a
hidden element keeps, the transition at rest, under the staged preference, and under a doubled
motion factor, the collapsing rule's transition on an element carrying the fade and collapsing
classes, the fade on each component the release animates, and every state inside a dark island.

'''
text = text[:start] + section + text[end:]
open(path, 'w').write(text)
