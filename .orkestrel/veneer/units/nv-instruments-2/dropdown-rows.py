"""Appends or removes DROPDOWN's Navbar deferral rows (dd-shared.patch, the `.navbar-nav .dropdown-menu` family) in the validation copy's guide.

Usage: python3 dropdown-rows.py <guide> add|remove
"""
import sys
path, action = sys.argv[1], sys.argv[2]
names = ['.navbar-nav .dropdown-menu'] + [f'.navbar-expand{s} .navbar-nav .dropdown-menu' for s in ['-sm', '-md', '-lg', '-xl', '-xxl', '']]
rows = ''.join(f'| `{n}` | Navbar | The owning component supplies this relationship. |\n' for n in names)
text = open(path).read()
anchor = next(l for l in text.splitlines(keepends=True) if l.startswith('| `.navbar-expand .navbar-nav .nav-link`'))
if action == 'add':
    assert rows not in text and text.count(anchor) == 1
    text = text.replace(anchor, anchor + rows)
else:
    assert text.count(rows) == 1
    text = text.replace(rows, '')
open(path, 'w').write(text)
print(action, 'done')
