# J-ORACLE-FIX-OFFCANVAS census comparison: reads the before and after census outputs and reports the
# departures each side holds that the other lacks, and every Veneer step whose state differs apart
# from the offcanvas focus row the fix targets. It also checks the Bootstrap recordings agree.
import json
import sys

ROOT = 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/j-oracle-fix-offcanvas'


def load(side, name):
    with open(f'{ROOT}/census-{side}/{name}', encoding='utf-8') as handle:
        return json.load(handle)


def key(departure):
    return json.dumps(departure, sort_keys=True)


before = {key(d) for d in load('before', 'departures.json')}
after = {key(d) for d in load('after', 'departures.json')}
print('departures before', len(before), 'after', len(after))
print('only before:', sorted(before - after))
print('only after:', sorted(after - before))
print('focus departures after:', [d for d in load('after', 'departures.json') if d['facet'] == 'focus'])

for plugin in ['offcanvas', 'modal']:
    for library in ['bootstrap', 'veneer']:
        old = load('before', f'{plugin}.{library}.json')['steps']
        new = load('after', f'{plugin}.{library}.json')['steps']
        if [s['name'] for s in old] != [s['name'] for s in new]:
            print(plugin, library, 'step names differ')
            sys.exit(1)
        changed = []
        for a, b in zip(old, new):
            if a['state'] == b['state']:
                continue
            fields = [f for f in ('elements', 'focus', 'locked') if a['state'][f] != b['state'][f]]
            changed.append((a['name'], fields, a['state']['focus'], b['state']['focus']))
        print(plugin, library, 'changed steps:', changed)
