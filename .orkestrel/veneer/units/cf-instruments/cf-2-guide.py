# Applies the FADE round-2 guide edits to a guides/veneer.md carrying cf-shared.patch: the § Nav
# tab-pane clause and the § Fade classes Tests sentence naming the components the fade proof reads.
import sys

path = sys.argv[1]
text = open(path).read()


def swap(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match for {old[:80]!r}, found {text.count(old)}')
    text = text.replace(old, new)


swap(
    '''differing widths, and a justified row grows every item from a zero basis, so the items share the row
equally. A tab pane stays hidden until it carries the `active` class.
''',
    '''differing widths, and a justified row grows every item from a zero basis, so the items share the row
equally. A tab pane stays hidden until it carries the `active` class, and a pane carrying the `fade`
class stays transparent until the `show` class joins it.
''',
)
swap(
    '''motion factor, the collapsing rule's transition on an element carrying the fade and collapsing
classes, the fade on each component the release animates, and every state inside a dark island.
''',
    '''motion factor, the collapsing rule's transition on an element carrying the fade and collapsing
classes, the fade on the alert, toast, tooltip, popover, tab pane, and modal, and every state inside
a dark island.
''',
)
open(path, 'w').write(text)
