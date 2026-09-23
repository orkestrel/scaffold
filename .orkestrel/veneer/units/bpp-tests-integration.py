"""bpp § Tests integration edit: the links the B-PASSIVE-PROSE round-2 report returned as its § Tests patch
(the style proofs the row's scope named, and the section proofs beyond Button, Type, and Media)."""
import pathlib, sys
p = pathlib.Path('/home/user/veneer/guides/veneer.md'); s = p.read_text()
def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: sys.exit(f'integration refused: anchor count {n}: {old[:60]!r}')
    s = s.replace(old, new, 1)
styles = [
 ('the card classes', 'card'), ('the button group classes', 'button-group'), ('the pagination classes', 'pagination'),
 ('the placeholder classes', 'placeholder'), ('the progress classes', 'progress'), ('the spinner classes', 'spinner'),
 ('the list group classes', 'list-group'), ('the validation classes', 'validation'),
]
style_lines = ''.join(f'[{t}](../tests/src/styles/components/{f}.test.ts),\n' for t, f in styles)
rep("[the select classes](../tests/src/styles/components/form-select.test.ts),\n",
    "[the select classes](../tests/src/styles/components/form-select.test.ts),\n" + style_lines)
sections = [
 ('badge specimens', 'BadgeSection'), ('breadcrumb specimens', 'BreadcrumbSection'), ('button group specimens', 'ButtonGroupSection'),
 ('card specimens', 'CardSection'), ('close specimens', 'CloseSection'), ('content specimens', 'ContentSection'),
 ('form check specimens', 'FormCheckSection'), ('form control specimens', 'FormControlSection'),
 ('form floating specimens', 'FormFloatingSection'), ('form label specimens', 'FormLabelSection'),
 ('form range specimens', 'FormRangeSection'), ('form select specimens', 'FormSelectSection'),
 ('input group specimens', 'InputGroupSection'), ('layout specimens', 'LayoutSection'), ('link specimens', 'LinkSection'),
 ('list group specimens', 'ListGroupSection'), ('pagination specimens', 'PaginationSection'),
 ('placeholder specimens', 'PlaceholderSection'), ('progress specimens', 'ProgressSection'),
 ('specimen table rendering', 'SpecimenSection'), ('spinner specimens', 'SpinnerSection'), ('table specimens', 'TableSection'),
 ('validation specimens', 'ValidationSection'),
]
section_lines = ''.join(f'[{t}](../tests/app/browser/sections/{f}.test.ts),\n' for t, f in sections)
rep("[media class specimens](../tests/app/browser/sections/MediaSection.test.ts), and\n",
    "[media class specimens](../tests/app/browser/sections/MediaSection.test.ts),\n" + section_lines[:-2] + ", and\n")
p.write_text(s); print('edited')
