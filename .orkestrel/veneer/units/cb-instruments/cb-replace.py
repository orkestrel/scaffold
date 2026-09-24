# Replaces exactly one occurrence of a site in a file; exits 1 when the site is absent or repeated.
import sys

path, source, target = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path, encoding='utf-8').read()
if text.count(source) != 1:
    sys.exit(1)
open(path, 'w', encoding='utf-8').write(text.replace(source, target))
