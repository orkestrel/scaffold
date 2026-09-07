import sys, io

def apply(path, pairs):
    with io.open(path, encoding='utf-8', newline='') as fh:
        text = fh.read()
    for old, new in pairs:
        if text.count(old) != 1:
            sys.stderr.write('FAIL %s: %d occurrences of %r\n' % (path, text.count(old), old[:80]))
            sys.exit(1)
        text = text.replace(old, new)
    with io.open(path, 'w', encoding='utf-8', newline='') as fh:
        fh.write(text)
    print('ok %s (%d edits)' % (path, len(pairs)))
