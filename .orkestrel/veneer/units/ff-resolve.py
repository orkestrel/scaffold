# ff-resolve.py: resolves the FOCUS-FRAME landing's diff3 hunks. Import and test-case lists take both sides; the
# focus-ring journey case takes HEAD (UTIL-FRAMES' audited conversion); each guide hunk applies FOCUS-FRAME's own
# base-to-unit edit onto HEAD's text, found by the words the base and the unit side share at each end. Prints each
# guide result; refuses when the edit's base span is not found exactly once in HEAD's text.
import pathlib, sys
def hunks(L):
    i = 0
    while i < len(L):
        if L[i].startswith('<<<<<<< '):
            b = next(j for j in range(i, len(L)) if L[j].startswith('||||||| '))
            m = next(j for j in range(b, len(L)) if L[j] == '=======')
            e = next(j for j in range(m, len(L)) if L[j].startswith('>>>>>>> '))
            yield i, b, m, e; i = e + 1
        else:
            i += 1
def rebase(ours, base, theirs):
    o, b, t = ' '.join(ours).split(' '), ' '.join(base).split(' '), ' '.join(theirs).split(' ')
    p = 0
    while p < min(len(b), len(t)) and b[p] == t[p]: p += 1
    s = 0
    while s < min(len(b), len(t)) - p and b[-1 - s] == t[-1 - s]: s += 1
    old = b[p:len(b) - s]; new = t[p:len(t) - s]
    # anchor on the preceding words so the span is unique in ours
    ctx = b[max(0, p - 6):p]
    seq = ctx + old
    hits = [k for k in range(len(o) - len(seq) + 1) if o[k:k + len(seq)] == seq]
    if len(hits) != 1: raise SystemExit(f'REFUSED: span {" ".join(seq)!r} found {len(hits)} times')
    k = hits[0] + len(ctx)
    return o[:k] + new + o[k + len(old):]
def wrap(words, width=100):
    lines, cur = [], ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > width: lines.append(cur); cur = w
        else: cur = (cur + ' ' + w) if cur else w
    if cur: lines.append(cur)
    return lines
def resolve(path, pick):
    p = pathlib.Path(path); L = p.read_text().split('\n'); out = []; last = 0
    for n, (i, b, m, e) in enumerate(hunks(L)):
        out += L[last:i]; out += pick(n, L[i+1:b], L[b+1:m], L[m+1:e]); last = e + 1
    out += L[last:]; p.write_text('\n'.join(out))
def guide(n, ours, base, theirs):
    if n == 5:  # the § Tests hunk is reviewed by hand
        return ['<<<<<<< HEAD'] + ours + ['||||||| e4a6d7c'] + base + ['======='] + theirs + ['>>>>>>> unit/ff']
    words = rebase(ours, base, theirs)
    res = wrap(words)
    print(f'--- guide hunk {n}'); print('\n'.join(res))
    return res
def journey(n, ours, base, theirs):
    return ours
def setup(n, ours, base, theirs):
    if n == 0: return sorted(ours + [t for t in theirs if t not in ours], key=lambda l: l.strip().strip("',").lower())
    return ours + [''] + theirs[:-1] if theirs and theirs[-1] == '' else ours + [''] + theirs
resolve('tests/setup.test.ts', setup)
resolve('tests/app/browser/integration.test.ts', journey)
resolve('guides/veneer.md', guide)
