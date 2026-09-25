# J-ORACLE-FIX-OFFCANVAS round 2 census comparison (successor of compare.py, which reads round 1's
# before and after folders): reads round 1's after census and round 2's census, and reports the
# departures each side holds that the other lacks, every step whose state differs, and the focus
# departures round 2 holds.
import json
import sys

ROOT = 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/j-oracle-fix-offcanvas'
ROUND1 = 'census-after'
ROUND2 = 'census-after-2'


def load(folder, name):
    with open(f'{ROOT}/{folder}/{name}', encoding='utf-8') as handle:
        return json.load(handle)


def key(departure):
    return json.dumps(departure, sort_keys=True)


first = {key(d) for d in load(ROUND1, 'departures.json')}
second = {key(d) for d in load(ROUND2, 'departures.json')}
print('departures round 1', len(first), 'round 2', len(second))
print('only round 1:', sorted(first - second))
print('only round 2:', sorted(second - first))
print('facets round 2:', sorted({d['facet'] for d in load(ROUND2, 'departures.json')}))
print('focus departures round 2:', [d for d in load(ROUND2, 'departures.json') if d['facet'] == 'focus'])

for plugin in ['offcanvas', 'modal']:
    for library in ['bootstrap', 'veneer']:
        old = load(ROUND1, f'{plugin}.{library}.json')['steps']
        new = load(ROUND2, f'{plugin}.{library}.json')['steps']
        if [s['name'] for s in old] != [s['name'] for s in new]:
            print(plugin, library, 'step names differ')
            sys.exit(1)
        changed = [a['name'] for a, b in zip(old, new) if a['state'] != b['state']]
        print(plugin, library, 'steps', len(new), 'changed steps:', changed)
