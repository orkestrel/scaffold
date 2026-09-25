# Restores the release's literal duration at the pagination site.
import sys
p = sys.argv[1]
s = open(p).read()
old = 'var(--vn-motion-feedback) ease-in-out'
assert s.count(old) == 4
open(p, 'w').write(s.replace(old, '0.15s ease-in-out'))
