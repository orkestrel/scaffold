#!/usr/bin/env python3
"""Resolve diff3-style conflict hunks (from `git merge-file --diff3`) where both sides appended blocks
at the same place (empty base). When each side's block closes a top-level array (`])`) and then opens a
new declaration, the merge interleaves: ours rows, theirs rows, the closer, ours' later declarations,
theirs' later declarations. Otherwise the hunk becomes ours followed by theirs.
Usage: resolve-diff3.py <merged-file-with-markers> <out>"""
import re, sys
src, out = sys.argv[1], sys.argv[2]
text = open(src).read()
pattern = re.compile(r'^<<<<<<< ours\n(.*?)^\|\|\|\|\|\|\| base\n(.*?)^=======\n(.*?)^>>>>>>> theirs\n', re.S | re.M)
def split(block):
    lines = block.split('\n')
    if lines and lines[-1] == '': lines.pop()
    for i, l in enumerate(lines):
        if l == '])' and i + 1 < len(lines):
            return lines[:i], lines[i + 1:]
    return lines, None
res = []; pos = 0
for m in pattern.finditer(text):
    ours, base, theirs = m.group(1), m.group(2), m.group(3)
    if base.strip():
        print('NON-EMPTY BASE hunk; concatenating'); merged = ours + theirs
    else:
        o_rows, o_rest = split(ours); t_rows, t_rest = split(theirs)
        if o_rest is not None and t_rest is not None:
            merged = '\n'.join(o_rows + t_rows + ['])'] + o_rest + ['])'] + t_rest) + '\n'
            print('interleaved: rows', len(o_rows), '+', len(t_rows), 'tails', len(o_rest), len(t_rest))
        else:
            merged = ours + theirs; print('concatenated', len(ours.split('\n')), len(theirs.split('\n')))
    res.append(text[pos:m.start()]); res.append(merged); pos = m.end()
res.append(text[pos:])
open(out, 'w').write(''.join(res))
