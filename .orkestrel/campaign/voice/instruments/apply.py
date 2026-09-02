import sys, json, io, os
def apply(path, pairs):
    with io.open(path, encoding='utf-8') as f:
        text = f.read()
    for old, new in pairs:
        n = text.count(old)
        if n != 1:
            print('FAIL %s: %d occurrences of %r' % (path, n, old[:80]))
            sys.exit(1)
        text = text.replace(old, new)
    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    print('OK %s: %d edits' % (path, len(pairs)))
