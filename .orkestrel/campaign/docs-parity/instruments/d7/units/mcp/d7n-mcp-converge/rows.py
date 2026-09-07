import io,re,sys
p='guides/mcp.md'
lines=io.open(p,encoding='utf8').read().split('\n')
SPLIT=re.compile(r'(?<!\\)\|')
def cells(line):
    parts=SPLIT.split(line)
    assert parts[0].strip()=='' and parts[-1].strip()=='', line
    return [c.strip() for c in parts[1:-1]]
start=int(sys.argv[1]); 
i=start-1
# header row at start
out=[]
j=i+2
while j<len(lines) and lines[j].startswith('|'):
    out.append((j+1,cells(lines[j])))
    j+=1
for n,c in out:
    print(n,'||'.join(c))
