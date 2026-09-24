# pv-tabulate.py: retains one portfolio workflow's return from its task output file as pv-<name>-lenses.json and
# prints each lens's findings, clean list, and the critic's return. Usage: python3 pv-tabulate.py <task output> <name>
import json, sys
d = json.load(open(sys.argv[1]))['result']
json.dump(d, open(f'pv-{sys.argv[2]}-lenses.json', 'w'), indent=1)
for l in d['lenses']:
    print('==', l['slice'], l['lens'], 'reviewed', len(l['reviewed']), '| clean:', ', '.join(l['clean'])[:300])
    for f in l['findings']:
        print(' -', f['severity'], f['confidence'], '|', f['frame'][:90], '|', f['seen'][:260])
print('CRITIC', json.dumps(d['critic'])[:3000])
