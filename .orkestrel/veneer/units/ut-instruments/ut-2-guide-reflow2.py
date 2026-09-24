#!/usr/bin/env python3
"""Re-flows, at 100 columns and never inside a code span, each guide paragraph the round's edits touch."""
p = '/home/user/veneer-ut/tmp/probe/base/guides/veneer.md'
s = open(p).read()
STARTS = [
    'The text formatting entries of the `text` key ship',
    'The `.text-truncate` helper clips its element',
    'The `tests/src/styles/utilities/text.test.ts` proof reads every alignment',
    'Each color-and-background pair paints',
    'The font size and the padding are relative',
    'The label color reads `--vn-palette-white-base`',
]
def tokens(text):
    out, cur, code = [], '', False
    for ch in text:
        if ch == '`':
            code = not code
        if ch == ' ' and not code:
            if cur:
                out.append(cur)
            cur = ''
        else:
            cur += ch
    if cur:
        out.append(cur)
    return out
def wrap(text, width=100):
    lines, cur = [], ''
    for word in tokens(text):
        if cur and len(cur) + 1 + len(word) > width:
            lines.append(cur)
            cur = word
        else:
            cur = word if not cur else cur + ' ' + word
    lines.append(cur)
    return '\n'.join(lines)
paragraphs = s.split('\n\n')
hits = 0
for i, para in enumerate(paragraphs):
    if any(para.startswith(start) for start in STARTS):
        paragraphs[i] = wrap(' '.join(para.split('\n')))
        hits += 1
assert hits == len(STARTS), hits
open(p, 'w').write('\n\n'.join(paragraphs))
