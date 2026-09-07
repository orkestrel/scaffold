import re, json, sys
blocks=json.load(open('tmp/d7n-console-converge-fix/blocks.json'))
apply_it='--apply' in sys.argv
texts={}
done=[]; skipped=[]
for b in blocks:
    f=b['file']
    if f not in texts: texts[f]=open(f,encoding='utf8').read()
    joined=' '.join(re.sub(r'^[\t ]*\*[\t ]?','',x) for x in b['minus'])
    tags=re.findall(r"\{@link\s+import\([^)]*\)\.[^}|]*?\s*\}", joined)
    live={l:l for l in b['plus']}   # original plus line -> its current form in the file
    for tag in tags:
        m=re.match(r"\{@link\s+(import\([^)]*\)\.)([^}|]*?)\s*\}", tag)
        module, target = m.group(1), m.group(2)
        span='`'+target+'`'
        canon='{@link '+module+target+'}'
        hit=None
        for orig in b['plus']:
            cur=live[orig]
            if span in cur and texts[f].count(cur)==1:
                hit=(orig,cur); break
        if hit is None:
            skipped.append((f,span)); continue
        orig,cur=hit
        new=cur.replace(span, canon, 1)
        texts[f]=texts[f].replace(cur, new, 1)
        live[orig]=new
        done.append((f,span,canon))
for f,t in texts.items():
    if apply_it: open(f,'w',encoding='utf8').write(t)
print('restored:',len(done),'skipped:',len(skipped))
for s in skipped: print('  SKIP',s)
