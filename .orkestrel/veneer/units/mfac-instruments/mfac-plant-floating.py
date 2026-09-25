# Restores the release's literal duration at the floating-label site.
import sys
p = sys.argv[1]
s = open(p).read()
old = 'calc(100ms * var(--vn-factor-motion))'
assert s.count(old) == 2
open(p, 'w').write(s.replace(old, '0.1s'))
