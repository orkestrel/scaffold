#!/usr/bin/env python3
"""table-merge3.py BASE OURS THEIRS TARGET HEADER-PATTERN: three-way merge of one Markdown table keyed by its first
cell. The table is the block of `|` lines that starts at the first line the regular expression HEADER-PATTERN
matches at its start in each file; name enough of the header row to reach one table, because a guide carries
several tables whose first column is `Name`.
Each side's edit against BASE is read as a set of added, deleted, and changed keys: the result is OURS' rows in
OURS' order, minus every key THEIRS deleted (present in BASE, absent in THEIRS), with a row both sides carry taken
from THEIRS where OURS left BASE's cells and THEIRS changed them (cells compared without their padding), plus every key THEIRS added (absent in BASE and in
OURS), each placed after the THEIRS row that precedes it when that row is in the result and appended otherwise.
Writes TARGET with its own table (found by the same prefix) replaced; the formatter re-pads. Prints the keys THEIRS
deleted, the keys THEIRS added, and the keys taken from THEIRS. A union that keeps OURS' rows and appends THEIRS'
absent rows drops THEIRS' deletions, which is the defect this script exists for."""
import re, sys
base_p, ours_p, theirs_p, target_p, prefix = sys.argv[1:6]
def table(path):
	lines = open(path).read().split('\n')
	start = next(i for i, l in enumerate(lines) if re.match(prefix, l))
	end = start
	while end < len(lines) and lines[end].startswith('|'):
		end += 1
	return lines, start, end
def key(l):
	return l.split('|')[1].strip()
def cells(l):
	return tuple(c.strip() for c in l.strip().strip('|').split('|'))
def rows(path):
	lines, s, e = table(path)
	return [(key(l), l) for l in lines[s + 2:e]]
base, ours, theirs = rows(base_p), rows(ours_p), rows(theirs_p)
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
