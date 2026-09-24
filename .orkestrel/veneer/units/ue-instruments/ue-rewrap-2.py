# Rewraps, at 100 columns, each guide paragraph that contains one of the given markers.
import sys, textwrap
p = sys.argv[1]
s = open(p).read()
for marker in sys.argv[2:]:
    i = s.index(marker)
    start = s.rfind('\n\n', 0, i) + 2
    end = s.index('\n\n', i)
    chunk = ' '.join(s[start:end].split('\n'))
    wrapped = '\n'.join(textwrap.wrap(chunk, width=100, break_long_words=False, break_on_hyphens=False))
    s = s[:start] + wrapped + s[end:]
open(p, 'w').write(s)
