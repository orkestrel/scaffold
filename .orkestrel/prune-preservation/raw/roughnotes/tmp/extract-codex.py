import json,sys,io
p=sys.argv[1]; out=sys.argv[2]
msgs=[]; thread=None; last_err=None
with open(p,encoding='utf-8',errors='replace') as f:
    for line in f:
        line=line.strip()
        if not line or not line.startswith('{'): continue
        try: o=json.loads(line)
        except: continue
        t=o.get('type','')
        if t=='thread.started': thread=o.get('thread_id')
        if t=='error' or 'error' in t: last_err=o
        # agent messages
        if t=='item.completed':
            it=o.get('item',{})
            if it.get('type')=='agent_message' or it.get('item_type')=='agent_message':
                txt=it.get('text') or it.get('content') or ''
                if isinstance(txt,list):
                    txt=''.join(c.get('text','') for c in txt if isinstance(c,dict))
                if txt: msgs.append(txt)
        if t=='turn.completed': pass
with io.open(out,'w',encoding='utf-8') as w:
    w.write('thread_id: %s\n' % thread)
    w.write('agent_messages: %d\n' % len(msgs))
    if last_err: w.write('last_error: %s\n' % json.dumps(last_err)[:500])
    w.write('\n=== FINAL AGENT MESSAGE ===\n')
    w.write(msgs[-1] if msgs else '(none)')
print('thread',thread,'msgs',len(msgs))
