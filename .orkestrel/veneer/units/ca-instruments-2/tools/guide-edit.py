"""Applies the round-2 guide edits to the validation copy's guide and rewraps each edited paragraph
at 100 columns. Each edit names a unique phrase inside one paragraph and its replacement."""
import pathlib, textwrap

GUIDE = pathlib.Path('/home/user/veneer-ca/tmp/probe/base/guides/veneer.md')
EDITS = [
    ('The theme scopes declare the three `--bs-carousel-*` variables:',
     'The theme scopes declare the `--bs-carousel-*` variables:'),
    ('Each control is named by its `aria-label` attribute, because the visually hidden label the release\'s markup writes is a utility this cascade does not ship.',
     'Each control is named by its `aria-label` attribute.'),
    ('The `carousel` key measures the same three variables where the `.carousel-dark` class declares them,',
     'The `carousel` key measures the same variables where the `.carousel-dark` class declares them,'),
]

paragraphs = GUIDE.read_text().split('\n\n')
for old, new in EDITS:
    hits = [i for i, p in enumerate(paragraphs) if old in ' '.join(p.split('\n'))]
    assert len(hits) == 1, (old, hits)
    i = hits[0]
    joined = ' '.join(paragraphs[i].split('\n')).replace(old, new)
    paragraphs[i] = '\n'.join(textwrap.wrap(joined, width=100, break_on_hyphens=False, break_long_words=False))
GUIDE.write_text('\n\n'.join(paragraphs))
print('edited')
