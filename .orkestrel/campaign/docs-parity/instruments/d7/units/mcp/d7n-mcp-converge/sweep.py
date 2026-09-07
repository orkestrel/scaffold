import io,re,sys

KEEP = set('''MCP HTTP HTTPS JSON SSE RFC POST GET DELETE PUT PATCH URI URL API TTL IDE ASCII ESM CJS MRTR
WS WSS FEFF SDK GC TLS POSIX XOR MIME PDF CSV WHATWG IP SW DNS EOF HMAC MIT QR IEEE ISO SEP UTF SHA
DOM NDJSON UUID JWT XML HTML CSS TCP OS NPM MUST MAY SHOULD SHALL WARNING'''.split())

TOKEN=re.compile(r'(?<![A-Za-z0-9_\-/])[A-Z]{2,}(?![A-Za-z0-9_\-/])')
FENCE=re.compile(r'^\s*```')

def mask_markdown(lines):
    out=[];infence=False
    for line in lines:
        if FENCE.match(line):
            infence = not infence
            out.append(' '*len(line)); continue
        if infence:
            out.append(' '*len(line)); continue
        m=re.sub(r'`[^`]*`', lambda x:' '*len(x.group(0)), line)
        m=re.sub(r'\]\([^)]*\)', lambda x:' '*len(x.group(0)), m)
        m=re.sub(r'https?://\S+', lambda x:' '*len(x.group(0)), m)
        out.append(m)
    return out

def mask_ts(lines):
    out=[];indoc=False;infence=False
    for line in lines:
        st=line.strip()
        opened = st.startswith('/**')
        if opened: indoc=True
        if indoc:
            if '```' in line:
                infence = not infence
                out.append(' '*len(line))
                if '*/' in st: indoc=False; infence=False
                continue
            if infence:
                out.append(' '*len(line))
                if '*/' in st: indoc=False; infence=False
                continue
            m=re.sub(r'`[^`]*`', lambda x:' '*len(x.group(0)), line)
            m=re.sub(r'\{@link[^}]*\}', lambda x:' '*len(x.group(0)), m)
            m=re.sub(r'https?://\S+', lambda x:' '*len(x.group(0)), m)
            out.append(m)
        else:
            out.append(' '*len(line))
        if '*/' in st: indoc=False; infence=False
    return out

SENT_END=re.compile(r'[.!?]\s*$')

def sweep(path):
    text=io.open(path,encoding='utf8').read()
    lines=text.split('\n')
    masked = mask_markdown(lines) if path.endswith('.md') else mask_ts(lines)
    changed=[]
    new=[]
    prev=''
    for i,(line,mask) in enumerate(zip(lines,masked)):
        edits=[]
        for m in TOKEN.finditer(mask):
            w=m.group(0)
            if w in KEEP: continue
            before=mask[:m.start()].rstrip()
            if w=='NOT' and re.search(r'\b(MUST|SHOULD|MAY|SHALL)$', before): continue
            stripped=re.sub(r'^[\s>*\-|#]+','',before)
            if stripped=='':
                # a line-leading token: the sentence opens here only when the previous
                # prose line ended one, or there is no previous prose line
                tail=re.sub(r'^[\s>*\-|#]+','',prev.rstrip())
                initial = tail=='' or SENT_END.search(prev.rstrip()) is not None
            else:
                initial = SENT_END.search(before) is not None
            rep = w.lower()
            if initial: rep = rep[0].upper()+rep[1:]
            edits.append((m.start(), m.end(), w, rep))
        if edits:
            out=line; 
            for s,e,w,rep in reversed(edits):
                out = out[:s]+rep+out[e:]
            changed.append((i+1, line, out))
            new.append(out)
        else:
            new.append(line)
        prev = mask
    io.open(path,'w',encoding='utf8').write('\n'.join(new))
    return changed

if __name__=='__main__':
    total=0
    for p in sys.argv[1:]:
        ch=sweep(p)
        total+=len(ch)
        for ln, old, out in ch:
            print(f'{p}:{ln}\n- {old}\n+ {out}')
    print('lines changed:', total)
