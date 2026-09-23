#!/usr/bin/env python3
"""cr landing integration (the audit's claim 6 and the reviewer's F1): the `rest` token and the table links take their nouns, the cascade doc block and the driven doc block say "drives or reads", and the driven-row case's title holds for every row; each paragraph reflowed at 100 columns. Runs in the tree named by argv[1]."""
import sys, textwrap
root=sys.argv[1]
def reflow_comment(text, anchor, old, new, prefix):
    i=text.index(anchor); start=text.rfind('\n', 0, i)+1
    # walk up and down over lines carrying the prefix and prose (a doc-block paragraph ends at a bare " *" line or a non-prefixed line)
    lines=text.split('\n'); idx=text[:start].count('\n')
    lo=idx
    def prose(l): return l.startswith(prefix) and l.strip()!=prefix.strip() and not l[len(prefix):].lstrip().startswith('@')
    while lo>0 and prose(lines[lo-1]): lo-=1
    hi=idx
    while hi<len(lines) and prose(lines[hi]): hi+=1
    para=' '.join(l[len(prefix):].strip() for l in lines[lo:hi])
    assert para.count(old)==1, (old, para[:80]); para=para.replace(old,new)
    wrapped=[prefix+l for l in textwrap.wrap(para, width=100-len(prefix), break_long_words=False, break_on_hyphens=False)]
    return '\n'.join(lines[:lo]+wrapped+lines[hi:])
p=f'{root}/tests/setup.test.ts'; s=open(p).read()
s=reflow_comment(s, "`rest` is", "A bare stem is the resting frame under a second name, `rest` is the resting table's own state,", "A bare stem is the resting frame under a second name, the `rest` state is the resting table's own,", "\t\t// ")
old_title="it('names each driven row for one state beyond rest on a specimen the resting registry photographs', () => {"
new_title="it(\"names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name\", () => {"
assert s.count(old_title)==1; s=s.replace(old_title,new_title)
open(p,'w').write(s); print('edited tests/setup.test.ts')
p2=f'{root}/tests/setup.ts'; t=open(p2).read()
t=reflow_comment(t, "sits in {@link DRIVEN_KEYS}.", "sits in {@link DRIVEN_KEYS}.", "sits in the {@link DRIVEN_KEYS} table.", " * ")
t=reflow_comment(t, "sit apart from {@link CASCADE_KEYS} because", "sit apart from {@link CASCADE_KEYS} because", "sit apart from the {@link CASCADE_KEYS} table because", " * ")
t=reflow_comment(t, "once for each state its family drives.", "once for each state its family drives.", "once for each state its family drives or reads.", " * ")
t=reflow_comment(t, "rows of {@link DRIVEN_KEYS}, where a journey", "rows of {@link DRIVEN_KEYS}, where a journey drives the state its scenario names before it shoots the frame.", "rows of the {@link DRIVEN_KEYS} table, where a journey drives or reads the state its scenario names before it shoots the frame.", " * ")
open(p2,'w').write(t); print('edited tests/setup.ts')
