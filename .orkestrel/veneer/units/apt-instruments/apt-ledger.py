# AP-TYPE guide ledger rewrite: replaces each stale departure row the conformance run printed with the
# measured row keyed to it, and adds the measured addition rows. Input: /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-conformance-pre-guide.clean.txt
import re, pathlib
ROOT = pathlib.Path('/home/user/veneer-apt')
log = (ROOT / '/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-conformance-pre-guide.clean.txt').read_text()
def section(title):
    start = log.index(title)
    block = log[start:log.index('❯', start)]
    return [json for json in re.findall(r'^\+\s+"(.*)",?$', block, re.M)]
unrecorded = section('records every measured value difference in the guide ledger')
stale = section('names no departure the compiled cascade no longer carries')
additions = section('records every emitted name the official inventory lacks')
def cells(row):
    return [cell.strip() for cell in row.split(' | ')]
def key(parts):
    component, selector, prop, condition = parts[:4]
    return (component, selector, prop, 'cap' if condition != '—' else '—')
fresh = {key(cells(row)): cells(row) for row in unrecorded}
assert len(fresh) == len(unrecorded)
guide = ROOT / 'guides/veneer.md'
lines = guide.read_text().split('\n')
def code(value):
    return value if value in ('—',) else f'`{value}`'
replaced = 0
for row in stale:
    old = cells(row)
    new = fresh.pop(key(old))
    matches = []
    for index, line in enumerate(lines):
        if not line.startswith('|'):
            continue
        parts = [part.strip() for part in line.strip().strip('|').split('|')]
        if len(parts) != 7:
            continue
        plain = [part[1:-1] if part.startswith('`') and part.endswith('`') else part for part in parts]
        if plain == old:
            matches.append(index)
    assert len(matches) == 1, (row, matches)
    component, selector, prop, condition, bootstrap, veneer, departure = new
    lines[matches[0]] = '| ' + ' | '.join([code(component), code(selector), code(prop), code(condition), code(bootstrap), code(veneer), departure]) + ' |'
    replaced += 1
assert not fresh, fresh
guide.write_text('\n'.join(lines))
print('replaced', replaced, 'additions to place', additions)
