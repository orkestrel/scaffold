# Successor of j-w2-resolve-guide.py (2026-09-24, the ScrollSpy landing): resolves only the Compatibility
# table's conflict blocks in guides/veneer.md after Veneer main merges into unit/<unit> — a block whose
# lines on both sides are rows of that table (each begins "|" and none begins "| `", the § Surface
# row shape) — by taking main's side and re-applying the unit's own
# `plugin` row (the row whose Obligation cell begins "<Entity>:"). Every other conflict block (Engine
# prose, § Surface rows, example fences, a row both sides changed) is left with its markers for the
# landing writer to resolve by hand, because the predecessor's rule of taking the unit's side there
# dropped main's Alert and Tab prose silently. The formatter re-pads the table afterwards. Words change
# nowhere. Usage: python j-w2-resolve-guide-2.py <unit> <Entity>
import io, pathlib, sys

unit, entity = sys.argv[1], sys.argv[2]
path = pathlib.Path(f'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/{unit}/guides/veneer.md')
text = io.open(path, encoding='utf-8', newline='').read()
lines = text.split('\n')
out, i, resolved, left, unit_row = [], 0, 0, 0, None
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
        rows = [l for l in ours + theirs if l.strip()]
        compat = bool(rows) and all(l.startswith('|') and not l.startswith('| `') for l in rows)
        if compat:
            resolved += 1
            for l in ours:
                if '| plugin' in l and f'{entity}:' in l:
                    unit_row = l
            merged = list(theirs)
            theirs_keys = {l.split('|')[3].strip()[:40] for l in theirs if '| plugin' in l}
            for l in ours:
                if '| plugin' in l and l.split('|')[3].strip()[:40] not in theirs_keys:
                    merged.append(l)
            out.extend(merged)
        else:
            left += 1
            out.extend(lines[i:k + 1])
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
io.open(path, 'w', encoding='utf-8', newline='').write('\n'.join(out))
print(f'{unit}: resolved {resolved} Compatibility blocks; left {left} blocks with markers; {entity} plugin row re-applied: {unit_row is not None}')
