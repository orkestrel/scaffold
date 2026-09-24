# Applies the FADE wording pass to the scratch copy's guides/veneer.md and tests/setup.ts after the
# edits cf-guide.py applied: every code token takes a noun, and no sentence tallies the partials.
import sys

root = sys.argv[1]


def swap(path, old, new):
    text = open(path).read()
    if text.count(old) != 1:
        raise SystemExit(f'{path}: expected one match for {old[:80]!r}, found {text.count(old)}')
    open(path, 'w').write(text.replace(old, new))


guide = f'{root}/guides/veneer.md'
swap(
    guide,
    '''An element carrying the `fade` class without the `show` class resolves `opacity: 0`. Opacity is the
only property the hidden state writes, so a hidden element keeps its box, its place in the flow, its
pointer target, and its place in the accessible tree.''',
    '''The hidden state writes the `opacity: 0` declaration on an element carrying the `fade` class without
the `show` class. Opacity is the only property the hidden state writes, so a hidden element keeps
its box, its place in the flow, its pointer target, and its place in the accessible tree.''',
)
swap(
    guide,
    '''resolves to the release's `0.15s` value, so `--vn-factor-motion` rescales it. The transition is
written through the `transition` mixin, so the reduced-motion rule the release records beside it is
emitted with it, and the duration resolves to `0s` under that preference.''',
    '''resolves to the release's `0.15s` value, so the `--vn-factor-motion` factor rescales it. The
transition is written through the `transition` mixin, so the reduced-motion rule the release records
beside it is emitted with it, and the duration resolves to the `0s` value under that preference.''',
)
swap(
    guide,
    '''The barrel loads the fade partial ahead of the collapse partial, the order the release's
`transitions` partial writes the two in.''',
    '''The barrel loads the fade partial ahead of the collapse partial, the order in which the release's
`transitions` partial writes the fade rules and the collapse rules.''',
)
swap(
    guide,
    '''  Veneer writes the `opacity var(--vn-motion-feedback) linear` value, which resolves to the same
  value and rescales with `--vn-factor-motion`.''',
    '''  Veneer writes the `opacity var(--vn-motion-feedback) linear` value, which resolves to the same
  value and rescales with the `--vn-factor-motion` factor.''',
)
swap(
    guide,
    '''transition at one specificity, so an element carrying both classes transitions its size, as it does
in the release.''',
    '''transition at one specificity, so an element carrying the `fade` class and the `collapsing` class
transitions its size, as it does in the release.''',
)
swap(
    guide,
    '''motion factor, the collapsing rule's transition on an element carrying both classes, the fade on
each component the release animates, and every state inside a dark island.''',
    '''motion factor, the collapsing rule's transition on an element carrying the fade and collapsing
classes, the fade on each component the release animates, and every state inside a dark island.''',
)

setup = f'{root}/tests/setup.ts'
swap(
    setup,
    ''' * A key whose recorded rule resolves `opacity: 0` at rest names the wrapper that reserves the
 * element's box through a `:has()` selector over that element, and reads the wrapper's `height`
 * property: the transparent element keeps its box, so a region declared on it paints the wrapper's
 * one fill and the frame guard refuses it as a blank, while the wrapper's region carries its header
 * and its edges around the reserved empty box. The fade itself is read in the component's cascade
 * proof.''',
    ''' * A key whose recorded rule writes the `opacity: 0` declaration at rest names the wrapper that
 * reserves the element's box through a `:has()` selector over that element, and reads the
 * wrapper's `height` property: the transparent element keeps its box, so a region declared on it
 * paints the wrapper's one fill and the frame guard refuses it as a blank, while the wrapper's
 * region carries its header and its edges around the reserved empty box. The component's cascade
 * proof reads the transparent element itself.''',
)
