# Writes each lane's return from a workflow journal to <unit>-audit[-<round>]-<lane>-verdict.md.
# Usage: python3 wf-verdicts.py <journal.jsonl> <label>=<file> [<label>=<file> ...]
# A label is the workflow node's label, such as reviewer:ufl; the file is relative to units/.
import json, pathlib, sys

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
want = dict(arg.split('=', 1) for arg in sys.argv[2:])
found = {}
labels = {}
for line in open(sys.argv[1]):
    o = json.loads(line)
    if o.get('type') == 'started':
        labels[o['agentId']] = o.get('label')
    elif o.get('type') == 'result' and labels.get(o.get('agentId')) in want:
        found[labels[o['agentId']]] = o['result'] if isinstance(o['result'], str) else json.dumps(o['result'])
for label, name in want.items():
    text = found.get(label)
    if text is None:
        print('MISSING', label)
        continue
    (U / name).write_text(text.rstrip() + '\n')
    last = [l for l in text.splitlines() if l.startswith('VERDICT:')]
    print(label, '->', name, '|', last[-1] if last else 'NO TERMINAL LINE')
