# Reflows the comment paragraph containing each marker to 100 columns, keeping its prefix.
import sys, re, textwrap
path = sys.argv[1]
markers = sys.argv[2:]
lines = open(path).read().split('\n')
for marker in markers:
    idx = [i for i, l in enumerate(lines) if marker in l]
    assert idx, marker
    i = idx[0]
    m = re.match(r'^(\s*(?://|\*) ?)', lines[i])
    prefix = m.group(1)
    if not prefix.endswith(' '):
        prefix += ' '
    def same(l):
        return l.startswith(prefix) and l[len(prefix):].strip() != '' and not l[len(prefix):].startswith('@')
    a = i
    while a - 1 >= 0 and same(lines[a - 1]):
        a -= 1
    b = i
    while b + 1 < len(lines) and same(lines[b + 1]):
        b += 1
    text = ' '.join(l[len(prefix):].strip() for l in lines[a:b + 1])
    width = 100 - len(prefix.expandtabs(4))
    new = [prefix + w for w in textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)]
    lines[a:b + 1] = new
open(path, 'w').write('\n'.join(lines))
