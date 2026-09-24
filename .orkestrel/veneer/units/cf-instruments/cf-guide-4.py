# Reflows, at 100 columns, each paragraph of the scratch copy's guides/veneer.md that names
# § Fade classes outside the Fade classes section itself, after the rewrites cf-guide.py applied.
import sys
import textwrap

path = sys.argv[1]
text = open(path).read()
start = text.index('### Fade classes\n')
end = text.index('### Collapse classes\n')
head, section, tail = text[:start], text[start:end], text[end:]


def reflow(chunk):
    paragraphs = chunk.split('\n\n')
    out = []
    for paragraph in paragraphs:
        if '§ Fade classes' in paragraph and not paragraph.lstrip().startswith(('|', '-', '#')):
            paragraph = textwrap.fill(
                ' '.join(paragraph.split('\n')),
                width=100,
                break_long_words=False,
                break_on_hyphens=False,
            )
        out.append(paragraph)
    return '\n\n'.join(out)


open(path, 'w').write(reflow(head) + section + reflow(tail))
