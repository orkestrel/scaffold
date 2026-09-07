import io,re,sys
sys.path.insert(0,'tmp/d7n-mcp-converge')
from blocks import get
rows=[]
for line in io.open('tmp/d7n-mcp-converge/tables-report.txt',encoding='utf8'):
    parts=line.rstrip('\n').split('\t')
    if len(parts)<5: continue
    ln, what, sh, old, cl = parts
    kind, name = what.split(' ',1)
    clause = cl[len('CLAUSE '):]
    lit = old.split(' ',1)[1] if ' ' in old else ''
    b=get(name)
    doc = b[1] if b else 'MISSING BLOCK'
    rows.append((name, kind, lit, clause, doc))
for name, kind, lit, clause, doc in rows:
    print('#### '+name+'  ('+kind+')')
    print('LIT   : '+lit)
    print('CLAUSE: '+clause)
    print('DOC   : '+doc.replace('\n',' ⏎ '))
    print()
