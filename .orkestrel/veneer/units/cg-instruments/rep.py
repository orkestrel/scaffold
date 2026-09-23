import sys, json
# usage: rep.py FILE SPECFILE ; SPECFILE is JSON list of [old, new]
path, spec = sys.argv[1], sys.argv[2]
text = open(path, encoding='utf8').read()
for old, new in json.load(open(spec, encoding='utf8')):
    n = text.count(old)
    if n != 1:
        sys.exit(f'expected 1 occurrence, found {n}: {old[:80]!r}')
    text = text.replace(old, new)
open(path, 'w', encoding='utf8').write(text)
print('ok')
