import json, sys, re
sys.path.insert(0, sys.argv[1])
from rule import rule_hit
hits = json.load(open(sys.argv[2]))
for h in hits:
    ctx = h['context']
    i = ctx.find(re.match(r'(``[^`]+``|`[^`]+`|\[)', h['quote']).group(0)) if h['rule']=='token' else -1
    tok = re.match(r'(``[^`]+``|`[^`]+`)', h['quote']).group(0) if h['rule']=='token' else ''
    after = ctx[i+len(tok):] if i >= 0 else ''
    h['ruling'] = rule_hit(h, after)
json.dump(hits, open(sys.argv[3], 'w'), indent=0)
un = [h for h in hits if h['ruling'] is None]
print(len(hits), 'unresolved', len(un))
for h in un: print(h['line'], h['rule'], '|', h['context'][25:150])
