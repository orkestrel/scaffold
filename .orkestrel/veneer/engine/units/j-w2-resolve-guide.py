# Resolves the merge conflict a W2 unit's landing meets in guides/veneer.md when Veneer main merges into
# unit/<unit>: for every conflict block whose lines on both sides are table rows (the Compatibility
# table both sides re-padded), main's side is taken and the unit's own `plugin` row (the row whose
# Obligation cell begins "<Entity>:") is then re-applied from the unit's side; every other conflict
# block (Engine prose) takes the unit's side. The formatter re-pads the table afterwards. Words change
# nowhere; only which side's lines survive. Usage: python w2-resolve-guide.py <unit> <Entity>
import io, pathlib, sys

unit, entity = sys.argv[1], sys.argv[2]
path = pathlib.Path(f'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/{unit}/guides/veneer.md')
text = io.open(path, encoding='utf-8', newline='').read()
lines = text.split('\n')
out, i, blocks, unit_row = [], 0, 0, None
while i < len(lines):
    line = lines[i]
    if line.startswith('<<<<<<< '):
        j = i + 1
        ours = []
        while not lines[j].startswith('======='):
            ours.append(lines[j]); j += 1
        k = j + 1
        theirs = []
        while not lines[k].startswith('>>>>>>> '):
            theirs.append(lines[k]); k += 1
        blocks += 1
        table = all(l.startswith('|') for l in ours + theirs if l.strip())
        if table:
            for l in ours:
                if l.startswith('| engine') and '| plugin' in l and f'{entity}:' in l:
                    unit_row = l
            merged = list(theirs)
            # Rows the unit added that main lacks (a plugin row main never had) are kept from ours.
            theirs_keys = {l.split('|')[3].strip()[:40] for l in theirs if l.startswith('| engine') and '| plugin' in l}
            for l in ours:
                if l.startswith('| engine') and '| plugin' in l and l.split('|')[3].strip()[:40] not in theirs_keys:
                    merged.append(l)
            out.extend(merged)
        else:
            out.extend(ours)
        i = k + 1
        continue
    out.append(line)
    i += 1
if unit_row is not None:
    replaced = 0
    for n, l in enumerate(out):
        if l.startswith('| engine') and '| plugin' in l and f'{entity}:' in l:
            out[n] = unit_row
            replaced += 1
    assert replaced == 1, f'expected one {entity} plugin row, found {replaced}'
assert not any(l.startswith(('<<<<<<< ', '=======', '>>>>>>> ')) for l in out), 'markers remain'
io.open(path, 'w', encoding='utf-8', newline='').write('\n'.join(out))
print(f'{unit}: resolved {blocks} conflict blocks; {entity} plugin row re-applied: {unit_row is not None}')
