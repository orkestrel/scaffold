# Applies the BARE-BUTTON prose edits to the scratch copy's guide.
import sys
path = sys.argv[1]
s = open(path, encoding='utf-8').read()

def sub(a, b):
    global s
    assert s.count(a) == 1, a[:70]
    s = s.replace(a, b)

sub("""rules the `Element.matches` method reports across those placements. A rule reaching a tag through
its position reports as a pair. Nothing here parses a selector, and a construct such as the `:has()`
or `:is()` pseudo-class is answered by the engine that ships it.
""", """rules the `Element.matches` method reports across those placements. A rule reaching a tag through
its position reports as a pair. Nothing here parses a selector, and a construct such as the `:has()`
or `:is()` pseudo-class is answered by the engine that ships it.

The calibrated button surface and its states reach a `button` element that carries no `class`
attribute and no `data-bs-target` attribute. Every other button takes the release's reboot alone, at
the release's values: no margin, the parent's font family, size, and line height, square corners,
no text transform, and the button appearance. So a component's button form paints as its anchor
form does, and a disabled `button.nav-link` element reads the same opacity and type as the disabled
`a.nav-link` element beside it. A button carrying a class of your own, a utility class, or an empty
`class` attribute paints as the release paints it. The `data-bs-target` attribute keeps the
release's carousel indicators out as well, because the release gives a resting indicator no class,
and the attribute sits on the tag itself, so the rule still treats the tag by what it carries rather
than by where the markup puts it. Add the `btn` class to a classed button to paint it with the
Button treatment. The elements proof reads a classed button, an empty `class` attribute, and a
`data-bs-target` button resolving the reboot alone beside the bare button's calibrated values; see
[the bare button proof](../tests/src/styles/elements/button.test.ts).
""")

sub("""The order line never changes between profiles. It is the line the `src/styles/_tokens.scss`
file declares, and declaring it ahead of the Tailwind import is what makes Tailwind's own
narrower order merge as a no-op.
""", """The order line never changes between profiles. It is the line the `src/styles/_tokens.scss`
file declares, and declaring it ahead of the Tailwind import is what makes Tailwind's own
narrower order merge as a no-op.

A button styled with utility classes carries a `class` attribute, so it takes the release's reboot
rather than the calibrated bare surface, as § Styles states. Add the `btn` class where that button
needs the Button treatment beneath your utilities.
""")

sub("""constructs a `Delegate` instance beside the showcase. The shell's own stylesheet reaches that button
through the `control` class the showcase sets on it, so no rule of the shell's reaches a specimen
through the element it happens to be. The regions""", """constructs a `Delegate` instance beside the showcase. The shell's own stylesheet reaches that button
through the `data-control` attribute the showcase sets on it, so no rule of the shell's reaches a
specimen through the element it happens to be. The hook is an attribute rather than a class, so the
button carries no class and keeps the published bare treatment the shell's border sits on. The regions""")

open(path, 'w', encoding='utf-8').write(s)
