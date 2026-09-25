# Applies one named plant to the preflight fence in the guide and, for the paired plants, to the
# preflight recipe fixture. Usage: python3 twr-plant.py <name>
import pathlib, sys
name = sys.argv[1]
guide = pathlib.Path('guides/veneer.md')
fixture = pathlib.Path('tests/fixtures/tailwind/consumer-preflight.css')
ORDER = '@layer theme, reset, base, elements, components, utilities;\n'
SWAPPED = '@layer theme, reset, elements, base, components, utilities;\n'
IMPORT = "@import '@orkestrel/veneer/styles';\n"

def edit_fence(text, old, new):
    anchor = text.index('The following recipe is the `preflight` profile')
    start = text.index('```css\n', anchor) + len('```css\n')
    end = text.index('```\n', start)
    fence = text[start:end]
    assert fence.count(old) == 1, (name, old)
    return text[:start] + fence.replace(old, new) + text[end:]

def edit_fixture(text, old, new):
    assert text.count(old) == 1, (name, old)
    return text.replace(old, new)

exclusion = next(line + '\n' for line in fixture.read_text().split('\n') if line.startswith('@source not inline('))
edits = {
    'order': (ORDER, ''),
    'swap': (ORDER, SWAPPED),
    'import': (IMPORT, ''),
    'exclusion': (exclusion, ''),
}
kind, _, paired = name.partition('-')
old, new = edits[kind]
guide.write_text(edit_fence(guide.read_text(), old, new))
if paired == 'paired':
    fixture.write_text(edit_fixture(fixture.read_text(), old, new))
print('planted', name)
