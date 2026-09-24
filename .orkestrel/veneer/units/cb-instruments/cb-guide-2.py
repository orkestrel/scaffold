# Applies the BARE-BUTTON round-2 guide edits (C-b) over the round-1 shared patch's guide.
import sys
path = sys.argv[1]
s = open(path, encoding='utf-8').read()

def sub(a, b):
    global s
    assert s.count(a) == 1, a[:70]
    s = s.replace(a, b)

def render_row(cells, widths):
    return '|' + '|'.join(' ' + c.ljust(w) + ' ' for c, w in zip(cells, widths)) + '|'

# The Files row.
lines = s.split('\n')
row = next(i for i, l in enumerate(lines) if l.startswith('| `src/styles/elements/_button.scss`'))
widths = [len(c) - 2 for c in lines[row].split('|')[1:-1]]
text = "The release's reboot on every button, and the calibrated surface and its states on the bare button, a button with no `class` attribute and no `data-bs-target` attribute, in the elements layer."
assert len(text) <= widths[1]
lines[row] = render_row(['`src/styles/elements/_button.scss`', text], widths)

# The Additions Reasons.
for i, l in enumerate(lines):
    if l.startswith('| `reboot`       | `button:not([class], [data-bs-target])'):
        cells = l.split('|')[1:-1]
        widths = [len(c) - 2 for c in cells]
        values = [c.strip() for c in cells]
        values[4] = values[4].replace('a button no class claims', 'a bare button').replace('a disabled button no class claims', 'a disabled bare button')
        assert 'no class claims' not in values[4], values[4]
        lines[i] = render_row(values, widths)
s = '\n'.join(lines)

# The § Styles paragraph.
start = s.index('The calibrated button surface and its states reach a `button` element')
end = s.index('[the bare button proof](../tests/src/styles/elements/button.test.ts).\n')
s = s[:start] + """A bare button is a `button` element that carries no `class` attribute and no `data-bs-target`
attribute, and the calibrated button surface and its states reach a bare button alone. Every other
button takes the release's reboot alone from the `elements` layer, at the release's values: no
margin, the parent's font family, size, and line height, square corners, no text transform, the
button appearance, the pointer cursor while enabled, and no outline on a focus the browser does not
mark as visible. So the `elements` layer paints no surface of its own on a component's button form,
and a disabled `button.nav-link` element reads the same opacity and type as the disabled
`a.nav-link` element beside it. A button carrying a class of your own, a utility class, or an empty
`class` attribute takes that reboot and nothing more from the `elements` layer. The
`data-bs-target` attribute keeps the release's carousel indicators out as well, because the release
gives a resting indicator no class. The attribute sits on the tag itself, so the rule still treats
the tag by what it carries rather than by where the markup puts it. Add the `btn` class to a classed
button to paint it with the Button treatment. The elements proof reads a classed button, an empty
`class` attribute, and a `data-bs-target` button resolving the reboot alone beside the bare
button's calibrated values; see
""" + s[end:]

# The § Tailwind pointer.
sub("""A button styled with utility classes carries a `class` attribute, so it takes the release's reboot
rather than the calibrated bare surface, as § Styles states. Add the `btn` class where that button
needs the Button treatment; a utility in the `utilities` layer still overrides the `btn` class
declaration it shares a property with.""", """A button styled with utility classes carries a `class` attribute, so it is no bare button and takes
the release's reboot rather than the calibrated surface, as § Styles states. Add the `btn` class
where that button needs the Button treatment; a utility in the `utilities` layer still overrides the
`btn` class declaration it shares a property with.""")

# The § Showcase paragraph, wrapped at 100 columns.
sub("""constructs a `Delegate` instance beside the showcase. The shell's own stylesheet reaches that button
through the `data-control` attribute the showcase sets on it, so no rule of the shell's reaches a
specimen through the element it happens to be. The hook is an attribute rather than a class, so the
button carries no class and keeps the published bare treatment the shell's border sits on. The regions mount into a `main` element the shell carries no
id on: a proof reaches it through the host it mounted the showcase into, and each region through its
accessible name. The application barrel is a workspace implementation surface and is outside this
guide's published API tables.""", """constructs a `Delegate` instance beside the showcase. The shell's own stylesheet reaches that button
through the `data-control` attribute the showcase sets on it, so no rule of the shell's reaches a
specimen through the element it happens to be. The hook is an attribute rather than a class, so the
button stays a bare button and keeps the published treatment the shell's border sits on. The
regions mount into a `main` element the shell carries no id on: a proof reaches it through the host
it mounted the showcase into, and each region through its accessible name. The application barrel
is a workspace implementation surface and is outside this guide's published API tables.""")

open(path, 'w', encoding='utf-8').write(s)
