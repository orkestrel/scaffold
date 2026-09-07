import re, json, sys
blocks=json.load(open('tmp/d7n-console-converge-fix/blocks.json'))
apply_it = '--apply' in sys.argv
texts={}
report=[]
for b in blocks:
    f=b['file']
    if f not in texts: texts[f]=open(f,encoding='utf8').read()
    # join minus lines, stripping leading ' * ' / '\t * ' continuation
    joined=' '.join(re.sub(r'^[\t ]*\*[\t ]?','',x) for x in b['minus'])
    tags=re.findall(r"\{@link\s+import\([^)]*\)\.[^}|]*?\s*\}", joined)
    plus_text='\n'.join(b['plus'])
    for tag in tags:
        m=re.match(r"\{@link\s+(import\([^)]*\)\.)([^}|]*?)\s*\}", tag)
        target=m.group(2)
        span='`'+target+'`'
        # canonical single-line tag
        canon="{@link "+m.group(1)+target+"}"
        n=plus_text.count(span)
        report.append((f,span,canon,n,plus_text.count(span)))
        if n==0:
            print(f'NOMATCH-IN-PLUS {f} {span}')
            continue
    b['tags']=tags
json.dump(blocks, open('tmp/d7n-console-converge-fix/blocks.json','w'), indent=1)
