#!/usr/bin/env python3
"""Resolve diff3-style conflict hunks (from `git merge-file --diff3`) for the campaign's append-heavy
shared files. Rules per hunk: a Markdown-table hunk keeps ours' rows, strikes rows theirs struck from
the base, and inserts theirs' new rows after their predecessor; a hunk whose common closer after it is
`])` (both sides appended rows to one open array) interleaves ours' rows, theirs' rows, the closer,
ours' later declarations, theirs' later declarations; any other hunk keeps ours' lines and appends
theirs' lines that neither the base nor ours carries. Usage: resolve-diff3.py <merged-with-markers> <out>"""
import re, sys
src, out = sys.argv[1], sys.argv[2]
text = open(src).read()
pattern = re.compile(r'^<<<<<<< ours\n(.*?)^\|\|\|\|\|\|\| base\n(.*?)^=======\n(.*?)^>>>>>>> theirs\n', re.S | re.M)
def lines_of(block):
    l = block.split('\n')
    if l and l[-1] == '': l.pop()
    return l
def norm(line): return re.sub(r'\s+', ' ', line.strip())
def is_row(l): return l.startswith('| ') and not l.startswith('| ---') and not l.startswith('| -')
def split_rows(lines):
    for i, l in enumerate(lines):
        if l == '])' and i + 1 < len(lines): return lines[:i], lines[i + 1:]
    return lines, None
res = []; pos = 0
for m in pattern.finditer(text):
    ours, base, theirs = lines_of(m.group(1)), lines_of(m.group(2)), lines_of(m.group(3))
    after = text[m.end():].lstrip('\n')
    rows = sum(is_row(l) for l in ours + theirs)
    if rows >= max(1, (len(ours) + len(theirs)) // 2):
        base_norm = {norm(l) for l in base if is_row(l)}
        struck = {norm(l) for l in base if is_row(l)} - {norm(l) for l in theirs if is_row(l)}
        result = [l for l in ours if not (is_row(l) and norm(l) in struck)]
        have = {norm(l) for l in result if is_row(l)}
        prev = None
        for l in theirs:
            if not is_row(l): prev = None; continue
            if norm(l) in base_norm or norm(l) in have: prev = norm(l); continue
            idx = [i for i, r in enumerate(result) if is_row(r) and norm(r) == prev] if prev else []
            if idx: result.insert(idx[0] + 1, l)
            else:
                last = max((i for i, r in enumerate(result) if is_row(r)), default=len(result) - 1); result.insert(last + 1, l)
            have.add(norm(l)); prev = norm(l)
        merged = result; kind = 'table'
    elif not base and after.startswith('])'):
        o_rows, o_rest = split_rows(ours); t_rows, t_rest = split_rows(theirs)
        if o_rest is not None and t_rest is not None:
            merged = o_rows + t_rows + ['])'] + o_rest + ['])'] + t_rest; kind = 'interleaved'
        elif o_rest is not None:
            # Ours closed the array and went on to later declarations; theirs only appended rows to
            # the same open array, so its rows go before ours' closer, never after ours' later rows.
            merged = o_rows + theirs + ['])'] + o_rest; kind = 'inserted-before-closer'
        elif t_rest is not None:
            merged = ours + t_rows + ['])'] + t_rest; kind = 'appended-then-closed'
        else:
            merged = ours + theirs; kind = 'concatenated'
    elif not base:
        merged = ours + theirs; kind = 'concatenated'
    else:
        base_norm = {norm(l) for l in base}; have = {norm(l) for l in ours}
        added = [l for l in theirs if norm(l) not in base_norm and norm(l) not in have]
        closer = next((i for i, l in enumerate(ours) if l.strip() == '])'), None)
        if closer is not None and not any(l.strip() == '])' for l in added):
            # Ours closed an array inside the hunk; theirs' added rows belong before that closer.
            merged = list(ours[:closer]) + added + list(ours[closer:]); kind = 'base-union-before-closer'
        else:
            merged = list(ours) + added; kind = 'base-union'
    print(f'{kind}: ours={len(ours)} base={len(base)} theirs={len(theirs)} -> {len(merged)}')
    res.append(text[pos:m.start()]); res.append('\n'.join(merged) + '\n'); pos = m.end()
res.append(text[pos:])
open(out, 'w').write(''.join(res))
