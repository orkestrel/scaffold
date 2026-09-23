import sys, pathlib
T = pathlib.Path('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/ca/tools')
src = pathlib.Path(sys.argv[1]).read_text()
dst = pathlib.Path(sys.argv[2])
rows = (T / 'rows.txt').read_text().splitlines()
parts = {p.name[:-3]: p.read_text() for p in (T / 'guide').glob('*.md')} if (T / 'guide').exists() else {}

def after_line(text, anchor, insert):
    i = text.index(anchor)
    j = text.index('\n', i) + 1
    return text[:j] + insert + text[j:]

def before(text, anchor, insert):
    i = text.index(anchor)
    return text[:i] + insert + text[i:]

out = src
out = after_line(out, '| pagination       | variable       |', rows[0] + '\n' + rows[1] + '\n')
out = after_line(out, "| engine           | initialization | util/index.js:", rows[2] + '\n')
if 'plugin-sentence' in parts:
    out = after_line(out, rows[2], '\n' + parts['plugin-sentence'].rstrip('\n') + '\n')
if 'files-row' in parts:
    out = after_line(out, '| `src/styles/components/_close.scss`', parts['files-row'].rstrip('\n') + '\n')
if 'classes' in parts:
    out = before(out, '### Spinner classes\n', parts['classes'].rstrip('\n') + '\n\n')
if 'departures' in parts:
    out = before(out, '#### `placeholder`\n', parts['departures'].rstrip('\n') + '\n\n')
if 'additions' in parts:
    out = after_line(out, '| `btn-close`    | `.btn-close:focus { outline }`', parts['additions'].rstrip('\n') + '\n')
for key in ['retained-old', 'outside-old', 'showcase-old']:
    pass
if 'retained' in parts:
    old = ('`--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and\n'
           '`--bs-carousel-control-icon-filter` paint a component Veneer does not own yet, and no shipped\n'
           'component claims them, so no ledger row measures them. Each carries the release\'s own light and dark\n'
           'values, written through a palette token where the release writes a literal, until the component that\n'
           'paints it lands its canonical token. A data URI cannot read a custom property, so the forward path\n'
           'for each is a `mask-image` treatment in the unit that owns the component. `--bs-btn-close-filter`\n'
           'belongs to the `btn` vocabulary instead, so § Departures measures it, and its rows there record the\n'
           'empty light-scope declaration this cascade writes against the filter the release records.\n')
    assert old in out, 'retained paragraph moved'
    out = out.replace(old, parts['retained'].rstrip('\n') + '\n')
if 'outside' in parts:
    old = ('The retained `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and\n'
           '`--bs-carousel-control-icon-filter` declarations paint components no shipped key claims, so\n'
           '§ Bootstrap variables Veneer retains records them.\n')
    assert old in out, 'outside sentence moved'
    out = out.replace(old, parts['outside'].rstrip('\n') + '\n')
if 'showcase' in parts:
    out = before(out, '## Tests\n', parts['showcase'].rstrip('\n') + '\n\n')
out = after_line(out, '[card specimens](../tests/app/browser/sections/CardSection.test.ts),',
                 '[carousel specimens](../tests/app/browser/sections/CarouselSection.test.ts),\n')
out = after_line(out, '[the close classes](../tests/src/styles/components/close.test.ts),',
                 '[the carousel classes](../tests/src/styles/components/carousel.test.ts),\n')
dst.write_text(out)
