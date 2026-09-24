# Resolves a guides/veneer.md conflict block that holds § Surface table rows (lines beginning "| ") by a
# row-level three-way merge against the merge base (index stage 1): rows are keyed by their first cell;
# a row either side added is kept, a row either side removed while the other left it unchanged is dropped,
# a row one side changed takes that side's text, and a row both sides changed differently stops the
# script. Cells are compared with padding stripped, because both sides re-pad the table. The block keeps
# main's ("theirs") order, and each row only this unit added follows the row that precedes it on the
# unit's side. Words change nowhere; the formatter re-pads afterwards. Usage: python resolve-surface-table.py <worktree>
import io
import pathlib
import subprocess
import sys

tree = pathlib.Path(sys.argv[1])
path = tree / 'guides/veneer.md'


def stage(number):
    out = subprocess.run(['git', '-C', str(tree), 'show', f':{number}:guides/veneer.md'], capture_output=True)
    if out.returncode != 0:
        sys.exit(f'no index stage {number}: {out.stderr.decode()}')
    return out.stdout.decode('utf-8').split('\n')


def key(row):
    return row.split('|')[1].strip()


def norm(row):
    return '|'.join(cell.strip() for cell in row.split('|'))


def is_row(line):
    return line.startswith('| ') and not line.startswith('| Name ') and not line.startswith('| ---')


base_rows = {key(l): norm(l) for l in stage(1) if is_row(l)}
text = io.open(path, encoding='utf-8', newline='').read()
lines = text.split('\n')
out, i, blocks = [], 0, 0
while i < len(lines):
    if not lines[i].startswith('<<<<<<< '):
        out.append(lines[i]); i += 1; continue
    j = i + 1
    ours = []
    while not lines[j].startswith('======='):
        ours.append(lines[j]); j += 1
    k = j + 1
    theirs = []
    while not lines[k].startswith('>>>>>>> '):
        theirs.append(lines[k]); k += 1
    if not all(l.startswith('|') or not l.strip() for l in ours + theirs):
        sys.exit(f'conflict block at line {i + 1} holds lines that are not table rows; resolve it by hand')
    ours_rows = {key(l): l for l in ours if is_row(l)}
    theirs_rows = {key(l): l for l in theirs if is_row(l)}
    merged = []
    for line in theirs:
        if not is_row(line):
            merged.append(line); continue
        name = key(line)
        base = base_rows.get(name)
        mine = ours_rows.get(name)
        if mine is None:
            if base is not None and norm(line) == base:
                continue  # this unit removed it and main left it unchanged
            if base is None:
                merged.append(line); continue  # main added it
            sys.exit(f'row {name}: removed here and changed on main')
        if norm(mine) == norm(line) or norm(mine) == base:
            merged.append(line)
        elif norm(line) == base:
            merged.append(mine)
        else:
            sys.exit(f'row {name}: changed differently on both sides')
    previous = None
    for line in ours:
        if not is_row(line):
            continue
        name = key(line)
        if name not in theirs_rows and name not in base_rows:
            at = next((n for n, l in enumerate(merged) if is_row(l) and key(l) == previous), None)
            merged.insert(len(merged) if at is None else at + 1, line)
        previous = name
    out.extend(merged)
    blocks += 1
    i = k + 1
io.open(path, 'w', encoding='utf-8', newline='').write('\n'.join(out))
print(f'resolved {blocks} block(s)')
