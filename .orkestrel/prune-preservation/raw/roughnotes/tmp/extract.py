import json,sys,io
p=sys.argv[1]; out=sys.argv[2]
last=None; sid=None
with open(p,encoding='utf-8',errors='replace') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: o=json.loads(line)
        except: continue
        t=o.get('type')
        if t=='system' and o.get('subtype')=='init': sid=o.get('session_id')
        if t=='result': last=o
with io.open(out,'w',encoding='utf-8') as w:
    w.write('session_id: %s\n---\n' % sid)
    w.write((last or {}).get('result','NO RESULT') or 'EMPTY RESULT')
print('written', out)
