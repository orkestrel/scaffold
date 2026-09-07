import io,re,sys,glob

FENCE=re.compile(r'^\s*```')
def mask_markdown(text):
    """Return the text with code fences, inline code spans, and link targets blanked."""
    out=[]
    infence=False
    for line in text.split('\n'):
        if FENCE.match(line):
            infence = not infence
            out.append(''); continue
        if infence:
            out.append(''); continue
        # blank inline code spans
        masked=re.sub(r'`[^`]*`', lambda m: ' '*len(m.group(0)), line)
        # blank link targets
        masked=re.sub(r'\]\([^)]*\)', lambda m: ' '*len(m.group(0)), masked)
        masked=re.sub(r'https?://\S+', lambda m: ' '*len(m.group(0)), masked)
        out.append(masked)
    return out

def mask_doc(text):
    """Return only the doc-comment lines of a TypeScript file, code spans blanked."""
    out=[]
    indoc=False
    for line in text.split('\n'):
        st=line.strip()
        if st.startswith('/**'): indoc=True
        if indoc:
            masked=re.sub(r'`[^`]*`', lambda m: ' '*len(m.group(0)), line)
            masked=re.sub(r'\{@link[^}]*\}', lambda m: ' '*len(m.group(0)), masked)
            masked=re.sub(r'https?://\S+', lambda m: ' '*len(m.group(0)), masked)
            # inside a doc block a fenced example is code
            out.append(masked)
        else:
            out.append('')
        if '*/' in st: indoc=False
    # blank example fences inside doc blocks
    res=[];infence=False
    for line in out:
        if re.search(r'```', line):
            infence = not infence
            res.append(''); continue
        res.append('' if infence else line)
    return res

TOKEN=re.compile(r'(?<![A-Za-z0-9_-])[A-Z]{2,}(?![A-Za-z0-9_-])')

if __name__=='__main__':
    from collections import Counter
    c=Counter()
    for p in sys.argv[1:]:
        text=io.open(p,encoding='utf8').read()
        lines = mask_markdown(text) if p.endswith('.md') else mask_doc(text)
        for l in lines:
            for m in TOKEN.finditer(l): c[m.group(0)]+=1
    for w,n in c.most_common(): print(n,w)
