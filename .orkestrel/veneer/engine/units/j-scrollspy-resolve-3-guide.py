# J-SCROLLSPY round 3: resolves the four conflict blocks of guides/veneer.md by keeping both units,
# then rewrites the `Delegate` § Surface row and the `DelegateInterface` Methods row to the merged
# summaries. The Compatibility table was resolved by the Orchestrator and is left alone.
import re
import sys
import textwrap

PATH = 'guides/veneer.md'
text = open(PATH, encoding='utf-8').read()
BLOCK = re.compile(r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>> main\n', re.S)
blocks = BLOCK.findall(text)
if len(blocks) != 4:
    sys.exit(f'{len(blocks)} blocks')
SUMMARY = ("Activates data-attribute hosts through a root's delegated click and key listeners and a "
           "scan at construction.")
DESTROY = ('Releases the click and key listeners and destroys every engine it owns, the scrollspies its '
           'construction scan acquired included.')


def surface(head, main):
    # main's rows, with the Delegate row carrying the merged summary
    lines = []
    for line in main.splitlines():
        if line.startswith('| `Delegate` '):
            cells = line.split('|')
            assert len(SUMMARY) + 2 <= len(cells[3])
            cells[3] = ' ' + SUMMARY.ljust(len(cells[3]) - 2) + ' '
            line = '|'.join(cells)
        lines.append(line)
    return '\n'.join(lines) + '\n'


def fences(head, main):
    return main + '\n' + head


def delegation(head, main):
    merged = ("released and restored. When a click route serves it, its next delegated click acquires it "
              "again with a fresh engine; a host the delegate acquired by its construction scan stays "
              "released. A click that reaches a delegate while a host is being restored, such as one a "
              "custom element's attribute reaction sends, finds no owner, and the first live delegate whose "
              "root contains the host to reach it acquires a fresh engine at once; that engine's snapshot "
              "takes the values the restoration has still to write back. At each click and each delivery "
              "the delegate also drops every engine you destroyed directly, and it stops observing when it "
              "owns none. Destruction removes the listeners and the observer and restores every host the "
              "delegate still owns; an engine you constructed stays yours.")
    return '\n'.join(textwrap.wrap(merged, width=100, break_long_words=False, break_on_hyphens=False)) + '\n'


def sections(head, main):
    return main + '\n' + head


resolutions = iter([surface, fences, delegation, sections])
text = BLOCK.sub(lambda match: next(resolutions)(match.group(1), match.group(2)), text)

old = """| Method    | Summary                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `destroy` | Releases the click and key listeners and destroys every engine it owns. |
"""
assert text.count(old) == 1
width = len(DESTROY)
text = text.replace(old, '| Method    | ' + 'Summary'.ljust(width) + ' |\n| --------- | ' + '-' * width
                    + ' |\n| `destroy` | ' + DESTROY + ' |\n')
assert '<<<<<<<' not in text and '>>>>>>>' not in text
open(PATH, 'w', encoding='utf-8', newline='\n').write(text)
print('guide resolved')
