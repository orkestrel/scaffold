import io,re,sys

FILES=['src/core/types.ts','src/server/types.ts','src/browser/types.ts']

def strip_comments(text):
    out=[];i=0;n=len(text)
    while i<n:
        if text.startswith('/*',i):
            j=text.find('*/',i); j=n if j==-1 else j+2
            out.append(' '*(j-i)); i=j
        elif text.startswith('//',i):
            j=text.find('\n',i); j=n if j==-1 else j
            out.append(' '*(j-i)); i=j
        else:
            out.append(text[i]); i+=1
    return ''.join(out)

decls={}
for f in FILES:
    src=strip_comments(io.open(f,encoding='utf8').read())
    for m in re.finditer(r'^export (interface|type) ([A-Za-z0-9_]+)', src, re.M):
        kind, name = m.group(1), m.group(2)
        i=m.end()
        if kind=='interface':
            b=src.find('{', i); depth=0; j=b
            while j<len(src):
                if src[j]=='{': depth+=1
                elif src[j]=='}':
                    depth-=1
                    if depth==0: break
                j+=1
            head=src[i:b].strip(); ext=[]
            em=re.search(r'extends\s+(.+)$', head, re.S)
            if em: ext=[e.strip() for e in em.group(1).split(',')]
            decls[name]={'kind':'interface','body':src[b+1:j],'extends':ext,'file':f}
        else:
            eq=src.find('=', i); j=eq+1; depth=0
            while j<len(src):
                c=src[j]
                if c in '{[(': depth+=1
                elif c in '}])': depth-=1
                elif c=='\n' and depth<=0:
                    k=j+1
                    while k<len(src) and src[k] in ' \t': k+=1
                    if k>=len(src) or src[k]=='\n' or re.match(r'export |declare ', src[k:k+9]): break
                j+=1
            decls[name]={'kind':'alias','value':src[eq+1:j].strip(),'file':f}

LITERAL=re.compile(r"^(?:'[^']*'|true|false|-?\d+(?:\.\d+)?|null|never)(?:\s*\|\s*(?:'[^']*'|true|false|-?\d+(?:\.\d+)?|null|never))*$")
ARROW=re.compile(r'^\((?:[^()]|\([^()]*\))*\)\s*=>')

def split_members(body):
    parts=[];depth=0;start=0;i=0;n=len(body)
    while i<n:
        c=body[i]
        if c in '{[(': depth+=1
        elif c in '}])': depth-=1
        elif (c==';' or c==',' or c=='\n') and depth==0:
            parts.append(body[start:i]); start=i+1
        i+=1
    parts.append(body[start:])
    return [p.strip() for p in parts if p.strip()]

def parse_members(body):
    data=[];calls=[]
    for p in split_members(body):
        m=re.match(r'^(readonly\s+)?(\[[^\]]+\]|\[[A-Za-z.]+\]|[A-Za-z0-9_$]+)(\?)?\s*(\(|:|<)', p)
        if not m:
            continue
        name=m.group(2); opt=m.group(3) or ''
        if m.group(4) in '(<':
            calls.append(name+opt)
        else:
            rest=p[m.end():].strip()
            if ARROW.match(rest):
                calls.append(name+opt)
            else:
                data.append(name+opt+(': '+rest if LITERAL.match(rest) else ''))
    return data, calls

def render_object(inner):
    data,calls=parse_members(inner)
    out='{ '+', '.join(dict.fromkeys(data))+' }' if data else '{}'
    if calls: out+=' plus '+', '.join(dict.fromkeys(calls))
    return out

def render_type(expr):
    out=[];i=0;n=len(expr)
    while i<n:
        if expr[i]=='{':
            depth=0;j=i
            while j<n:
                if expr[j]=='{': depth+=1
                elif expr[j]=='}':
                    depth-=1
                    if depth==0: break
                j+=1
            out.append(render_object(expr[i+1:j])); i=j+1
        else:
            out.append(expr[i]); i+=1
    text=''.join(out)
    text=re.sub(r'\s+',' ',text).strip()
    text=re.sub(r'^\|\s*','',text)
    text=text.replace('|','\\|')
    text=re.sub(r'\(\s*','(',text); text=re.sub(r'\s*\)',')',text)
    return text

def shape(name):
    d=decls.get(name)
    if d is None: return None
    if d['kind']=='interface':
        data,calls=parse_members(d['body'])
        for e in d['extends']:
            b=re.match(r'^([A-Za-z0-9_]+)', e)
            if b and b.group(1) in decls and decls[b.group(1)]['kind']=='interface':
                bd,bc=parse_members(decls[b.group(1)]['body'])
                data=bd+data; calls=bc+calls
        out='{ '+', '.join(dict.fromkeys(data))+' }' if data else '{}'
        if calls: out+=' plus '+', '.join(dict.fromkeys(calls))
        return out.replace('|','\\|')
    return render_type(d['value'])

if __name__=='__main__':
    for n in sys.argv[1:]:
        print(n,'=>',shape(n))
