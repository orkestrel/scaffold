#!/usr/bin/env python3
"""table-merge3.py BASE OURS THEIRS TARGET HEADER-PATTERN [KEY-CELLS]: three-way merge of one Markdown table keyed by
its first KEY-CELLS cells (default 1; the guide's obligation ledger passes 3: component, kind, and obligation).
Refuses a table the chosen cells do not key. KEY-CELLS 0 merges the rows as a sequence instead (difflib over the
rows' stripped cells: the base rows with ours' and theirs' insertions, deletions, and replacements applied where the
other side left that region equal, ours' insertion first at a shared anchor; refused where both sides change one base
region differently), which suits a ledger whose rows repeat. The table is the block of `|` lines that starts at the first line the regular expression HEADER-PATTERN
matches at its start in each file; name enough of the header row to reach one table, because a guide carries
several tables whose first column is `Name`.
Each side's edit against BASE is read as a set of added, deleted, and changed keys: the result is OURS' rows in
OURS' order, minus every key THEIRS deleted (present in BASE, absent in THEIRS), with a row both sides carry taken
from THEIRS where OURS left BASE's cells and THEIRS changed them (cells compared without their padding), plus every key THEIRS added (absent in BASE and in
OURS), each placed after the THEIRS row that precedes it when that row is in the result and appended otherwise.
Writes TARGET with its own table (found by the same prefix) replaced; the formatter re-pads. Prints the keys THEIRS
deleted, the keys THEIRS added, and the keys taken from THEIRS. A union that keeps OURS' rows and appends THEIRS'
absent rows drops THEIRS' deletions, which is the defect this script exists for."""
import difflib, re, sys
base_p, ours_p, theirs_p, target_p, prefix = sys.argv[1:6]
key_cells = int(sys.argv[6]) if len(sys.argv) > 6 else 1
def table(path):
	lines = open(path).read().split('\n')
	start = next(i for i, l in enumerate(lines) if re.match(prefix, l))
	end = start
	while end < len(lines) and lines[end].startswith('|'):
		end += 1
	return lines, start, end
def key(l):
	return ' | '.join(c.strip() for c in l.strip().strip('|').split('|')[:key_cells])
def cells(l):
	return tuple(c.strip() for c in l.strip().strip('|').split('|'))
def rows(path):
	lines, s, e = table(path)
	return [(key(l), l) for l in lines[s + 2:e]]
base, ours, theirs = rows(base_p), rows(ours_p), rows(theirs_p)
def sequence(b, o, t):
	co = [(i1, i2, o[j1:j2]) for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, b, o, autojunk=False).get_opcodes() if tag != 'equal']
	ct = [(i1, i2, t[j1:j2]) for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, b, t, autojunk=False).get_opcodes() if tag != 'equal']
	for a1, a2, _ in co:
		for b1, b2, _ in ct:
			if a1 == a2 and b1 == b2:
				continue
			if (a1 < b2 and b1 < a2) or (a1 == a2 and b1 < a1 < b2) or (b1 == b2 and a1 < b1 < a2):
				sys.exit(f'row collision: ours changes base rows {a1}:{a2} and theirs {b1}:{b2}')
	out, pos = [], 0
	for i1, i2, r, side in sorted([(i1, i2, r, 0) for i1, i2, r in co] + [(i1, i2, r, 1) for i1, i2, r in ct], key=lambda x: (x[0], x[3])):
		out += b[pos:i1]
		out += r
		pos = max(pos, i2)
	out += b[pos:]
	return out, [r for _, _, r in co], [r for _, _, r in ct]
if key_cells == 0:
	lines, s, e = table(target_p)
	cb, cο, ct = [cells(l) for _, l in base], [cells(l) for _, l in ours], [cells(l) for _, l in theirs]
	merged, ours_changes, theirs_changes = sequence(cb, cο, ct)
	text = {cells(l): l for _, l in theirs}
	text.update({cells(l): l for _, l in ours})
	out = lines[:s + 2] + [text[c] for c in merged] + lines[e:]
	open(target_p, 'w').write('\n'.join(out))
	print('ours changed regions:', len(ours_changes), '| theirs changed regions:', len(theirs_changes))
	print('rows theirs inserted:', ' / '.join(' | '.join(c[:2]) for r in theirs_changes for c in r) or 'none')
	print('rows theirs removed:', ' / '.join(' | '.join(c[:2]) for c in cb if c not in ct) or 'none')
	sys.exit(0)
for name, side in (('base', base), ('ours', ours), ('theirs', theirs)):
	keys = [k for k, _ in side]
	dupes = sorted({k for k in keys if keys.count(k) > 1})
	if dupes:
		sys.exit(f'{name} table: the first {key_cells} cell(s) do not key it; repeated: ' + '; '.join(dupes[:5]))
bk, ok, tk = dict(base), dict(ours), dict(theirs)
deleted = [k for k, _ in base if k not in tk]
added = [k for k, _ in theirs if k not in bk and k not in ok]
taken = [k for k, l in theirs if k in bk and k in ok and cells(ok[k]) == cells(bk[k]) and cells(l) != cells(bk[k])]
result = [(k, tk[k] if k in taken else l) for k, l in ours if k not in deleted]
for k in added:
	i = [x for x, _ in theirs].index(k)
	prev = [x for x, _ in theirs][i - 1] if i > 0 else None
	keys = [x for x, _ in result]
	if prev in keys:
		result.insert(keys.index(prev) + 1, (k, tk[k]))
	else:
		result.append((k, tk[k]))
lines, s, e = table(target_p)
out = lines[:s + 2] + [l for _, l in result] + lines[e:]
open(target_p, 'w').write('\n'.join(out))
print('deleted by theirs:', ' '.join(deleted) or 'none')
print('added by theirs:', ' '.join(added) or 'none')
print('taken from theirs:', ' '.join(taken) or 'none')
