# Applies one named plant for TAILWIND-RECIPE round 2. Usage: python3 twr-2-plant.py <name>
#   markup           remove the markup `@source` line from the preflight recipe fixture alone
#   markup-consumer  remove the markup `@source` line from the tailwind recipe fixture alone
#   order-paired     delete the order line from the guide's preflight fence and its fixture
import pathlib
import sys

name = sys.argv[1]
guide = pathlib.Path('guides/veneer.md')
preflight = pathlib.Path('tests/fixtures/tailwind/consumer-preflight.css')
consumer = pathlib.Path('tests/fixtures/tailwind/consumer.css')
MARKUP = "@source './markup.html';\n"
ORDER = '@layer theme, reset, base, elements, components, utilities;\n'


def remove_once(text, old):
    assert text.count(old) == 1, (name, old)
    return text.replace(old, '')


def edit_fence(text, old):
    anchor = text.index('The following recipe is the `preflight` profile')
    start = text.index('```css\n', anchor) + len('```css\n')
    end = text.index('```\n', start)
    return text[:start] + remove_once(text[start:end], old) + text[end:]


if name == 'markup':
    preflight.write_text(remove_once(preflight.read_text(), MARKUP))
elif name == 'markup-consumer':
    consumer.write_text(remove_once(consumer.read_text(), MARKUP))
elif name == 'order-paired':
    guide.write_text(edit_fence(guide.read_text(), ORDER))
    preflight.write_text(remove_once(preflight.read_text(), ORDER))
else:
    raise SystemExit(f'unknown plant {name}')
print('planted', name)
