import sys
# usage: reflow.py FILE ANCHOR... ; rewraps each paragraph containing ANCHOR at 100 columns,
# keeping every code span on one line.
WIDTH = 100
path = sys.argv[1]
lines = open(path, encoding='utf8').read().split('\n')
def tokens(text):
    out, cur = [], None
    for word in text.split():
        if cur is None:
            cur = word
        else:
            cur += ' ' + word
        if cur.count('`') % 2 == 0 and cur.count('[') <= cur.count(']'):
            out.append(cur); cur = None
    if cur is not None:
        sys.exit('unbalanced backticks in paragraph')
    return out
for anchor in sys.argv[2:]:
    hits = [i for i, l in enumerate(lines) if anchor in l]
    if len(hits) != 1:
        sys.exit(f'anchor {anchor!r} matched {len(hits)} lines')
    i = hits[0]
    start = i
    while start > 0 and lines[start - 1].strip() and not lines[start].startswith('- '):
        start -= 1
    end = i
    while end + 1 < len(lines) and lines[end + 1].strip() and not lines[end + 1].startswith('- '):
        end += 1
    first = lines[start]
    bullet = first.startswith('- ')
    body = ' '.join(l.strip() for l in lines[start:end + 1])
    if bullet:
        body = body[2:]
    words = tokens(body)
    out, cur = [], ('- ' if bullet else '')
    indent = '  ' if bullet else ''
    empty = True
    for w in words:
        cand = cur + ('' if empty else ' ') + w
        if len(cand) > WIDTH and not empty:
            out.append(cur); cur = indent + w
        else:
            cur = cand
        empty = False
    out.append(cur)
    lines[start:end + 1] = out
open(path, 'w', encoding='utf8').write('\n'.join(lines))
print('ok')
