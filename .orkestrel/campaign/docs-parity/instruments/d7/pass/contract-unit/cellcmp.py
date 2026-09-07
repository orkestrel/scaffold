import io,re,subprocess
CELL=re.compile(r'(?<!\\)\|')
def tables(text):
    lines=text.split('\n'); i=0; out=[]
    while i<len(lines):
        if lines[i].startswith('|') and i+1<len(lines) and re.match(r'^\|[\s:-]+\|', lines[i+1]):
            hdr=[c.strip() for c in CELL.split(lines[i])[1:-1]]
            j=i+2; rows=[]
            while j<len(lines) and lines[j].startswith('|'):
                rows.append([c.strip() for c in CELL.split(lines[j])[1:-1]]); j+=1
            out.append((hdr,rows)); i=j
        else: i+=1
    return out
old=tables(subprocess.run(['git','show','HEAD:guides/contract.md'],capture_output=True,text=True).stdout)
new=tables(io.open('guides/contract.md',encoding='utf8').read())
def key(t): return tuple(r[0] for r in t[1])
oldmap={key(t):t for t in old}
bad=0; added=[]
for t in new:
    k=key(t)
    if k not in oldmap:
        added.append((t[0],[r[0] for r in t[1]])); continue
    oh,orow=oldmap[k]; nh,nrow=t
    for r,(o,n) in enumerate(zip(orow,nrow)):
        for c in range(min(len(o),len(n))):
            if nh[c]=='Summary': continue
            if o[c]!=n[c]:
                print(f'row {n[0]} col {c} ({oh[c]}->{nh[c]}): OLD {o[c][:150]!r} NEW {n[c][:150]!r}'); bad+=1
        if len(n)>len(o) and nh[len(o)]!='Summary':
            print(f'row {n[0]}: added non-Summary column'); bad+=1
print('tables in new not in baseline:',added)
print('non-Summary cell differences:',bad)
