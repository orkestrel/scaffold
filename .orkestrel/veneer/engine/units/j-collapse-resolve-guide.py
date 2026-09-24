# Resolves the merge conflict the J-COLLAPSE integration meets in guides/veneer.md when Veneer main
# (carrying the baseline's toast landing, which re-padded the Compatibility table) merges into
# unit/collapse (which re-padded the same table to the width of its Proof cell): for every conflict
# block whose lines on both sides are table rows, main's side is taken (the baseline's rows and
# padding), and the Collapse `plugin` row is then replaced with the collapse branch's row; every
# other conflict block (Engine prose) takes the collapse branch's side. The formatter re-pads the
# table afterwards (collapse-integrate-2.sh). Words change nowhere; only which side's lines survive.
import io, pathlib, re, sys

path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse/guides/veneer.md')
text = io.open(path, encoding='utf-8', newline='').read()
lines = text.split('\n')
out, i, blocks, collapse_row = [], 0, 0, None
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
                if l.startswith('| engine') and '| plugin' in l and 'Collapse:' in l:
                    collapse_row = l
            out.extend(theirs)
        else:
            out.extend(ours)
        i = k + 1
        continue
    out.append(line)
    i += 1
if collapse_row is not None:
    replaced = 0
    for n, l in enumerate(out):
        if l.startswith('| engine') and '| plugin' in l and 'Collapse:' in l:
            out[n] = collapse_row
            replaced += 1
    assert replaced == 1, f'expected one Collapse plugin row, found {replaced}'
assert not any(l.startswith(('<<<<<<< ', '=======', '>>>>>>> ')) for l in out), 'markers remain'
io.open(path, 'w', encoding='utf-8', newline='').write('\n'.join(out))
print(f'resolved {blocks} conflict blocks; collapse plugin row re-applied: {collapse_row is not None}')
