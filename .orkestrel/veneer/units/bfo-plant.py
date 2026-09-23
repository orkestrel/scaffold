# Usage: plant.py FILE OLD_FILE NEW_FILE  -> replaces exactly one occurrence of OLD text with NEW text
import sys
path, old, new = sys.argv[1], open(sys.argv[2]).read(), open(sys.argv[3]).read()
s = open(path).read()
assert s.count(old) == 1, f'expected one occurrence, found {s.count(old)}'
open(path, 'w').write(s.replace(old, new))
