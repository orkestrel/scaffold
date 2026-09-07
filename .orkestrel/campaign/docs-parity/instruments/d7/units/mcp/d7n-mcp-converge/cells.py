import io,re,sys
SPLIT=re.compile(r'(?<!\\)\|')
def tables(path):
    lines=io.open(path,encoding='utf8').read().split('\n')
    out=[]
    i=0
    sec=''
    while i<len(lines):
        l=lines[i]
        if l.startswith('#'): sec=l.strip()
        if l.startswith('| ') and i+1<len(lines) and re.match(r'^\|[\s\-:|]+\|$', lines[i+1]):
            head=[c.strip() for c in SPLIT.split(l)[1:-1]]
            rows=[]
            j=i+2
            while j<len(lines) and lines[j].startswith('|'):
                rows.append([c.strip() for c in SPLIT.split(lines[j])[1:-1]]); j+=1
            out.append((sec, head, rows)); i=j; continue
        i+=1
    return out
def index(path):
    d={}
    for sec, head, rows in tables(path):
        if head[0] not in ('API','Constant','Type','Method','Name','Export'): continue
        for r in rows:
            key=(sec, r[0])
            d.setdefault(key, []).append((head, r))
    return d
a=index(sys.argv[1]); b=index(sys.argv[2])
missing=[k for k in a if k not in b]
added=[k for k in b if k not in a]
print('rows in baseline:', sum(len(v) for v in a.values()))
print('rows now:', sum(len(v) for v in b.values()))
print('keys only in baseline:', missing)
print('keys only now:', added)
diff=0
for k in a:
    if k not in b: continue
    (ha,ra),(hb,rb)=a[k][0],b[k][0]
    # compare every cell except the final Summary column, matched by header name
    ma={h:c for h,c in zip(ha,ra)}
    mb={h:c for h,c in zip(hb,rb)}
    for h in ha:
        if h in ('Summary','Behavior','Value','Shape'): continue
        if ma.get(h)!=mb.get(h):
            diff+=1
            print('DIFF', k, h, '|', ma.get(h), '=>', mb.get(h))
print('non-Summary, non-Shape/Value mismatches:', diff)
