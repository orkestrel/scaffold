#!/usr/bin/env python3
# Replaces one guide paragraph (located by a unique anchor in its first line) with new text,
# wrapped at 100 columns without breaking inside a backtick code span.
# usage: mmod-2-wrap.py FILE ANCHOR NEWTEXT_FILE
import re, sys
path, anchor, source = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()
new = ' '.join(open(source).read().split())
tokens = re.findall(r'(?:`[^`]*`|[^\s`])+', new)
lines, line = [], ''
for token in tokens:
    candidate = token if not line else line + ' ' + token
    if len(candidate) <= 100 or not line:
        line = candidate
    else:
        lines.append(line); line = token
lines.append(line)
paragraphs = text.split('\n\n')
hits = [i for i, p in enumerate(paragraphs) if anchor in p]
assert len(hits) == 1, f'anchor matched {len(hits)} paragraphs'
paragraphs[hits[0]] = '\n'.join(lines)
open(path, 'w').write('\n\n'.join(paragraphs))
