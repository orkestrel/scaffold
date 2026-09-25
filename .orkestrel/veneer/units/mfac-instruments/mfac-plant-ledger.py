# Removes the navbar toggler's departure row from the guide ledger.
import sys
p = sys.argv[1]
lines = open(p).read().split('\n')
hits = [i for i, line in enumerate(lines) if line.startswith('| `navbar`') and '`--bs-navbar-toggler-transition`' in line]
assert len(hits) == 1
del lines[hits[0]]
open(p, 'w').write('\n'.join(lines))
