# J-ORACLE-FIX-OFFCANVAS round 5 census comparison (successor of compare-3.py, which reads round 2's
# and round 3's folders): reads round 3's census and round 5's, reports the departures each side holds
# that the other lacks, every step whose state differs, and the focus departures round 5 holds, and
# compares every recording byte for byte. `findings.json` carries each plugin's wall-clock `timings`,
# which differ on every run (round 1's and round 2's differ too), so that file is compared as parsed
# JSON with the timings left out. It exits 1 on any other difference, so its exit code alone answers
# whether the census matches round 3's.
import json
import sys

ROOT = 'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/j-oracle-fix-offcanvas'
ROUND2 = 'census-after-3'
ROUND3 = 'census-after-5'
FILES = [
    'departures.json',
    'offcanvas.bootstrap.json',
    'offcanvas.veneer.json',
    'modal.bootstrap.json',
    'modal.veneer.json',
]


def load(folder, name):
    with open(f'{ROOT}/{folder}/{name}', encoding='utf-8') as handle:
        return json.load(handle)


def read_bytes(folder, name):
    with open(f'{ROOT}/{folder}/{name}', 'rb') as handle:
        return handle.read()


def key(departure):
    return json.dumps(departure, sort_keys=True)


differences = 0
second = {key(d) for d in load(ROUND2, 'departures.json')}
third = {key(d) for d in load(ROUND3, 'departures.json')}
print('departures round 3', len(second), 'round 5', len(third))
print('only round 3:', sorted(second - third))
print('only round 5:', sorted(third - second))
differences += len(second ^ third)
print('facets round 5:', sorted({d['facet'] for d in load(ROUND3, 'departures.json')}))
focus = [d for d in load(ROUND3, 'departures.json') if d['facet'] == 'focus']
print('focus departures round 5:', focus)
differences += len(focus)

for plugin in ['offcanvas', 'modal']:
    for library in ['bootstrap', 'veneer']:
        old = load(ROUND2, f'{plugin}.{library}.json')['steps']
        new = load(ROUND3, f'{plugin}.{library}.json')['steps']
        if [s['name'] for s in old] != [s['name'] for s in new]:
            print(plugin, library, 'step names differ')
            differences += 1
            continue
        changed = [a['name'] for a, b in zip(old, new) if a['state'] != b['state']]
        print(plugin, library, 'steps', len(new), 'changed steps:', changed)
        differences += len(changed)

for name in FILES:
    same = read_bytes(ROUND2, name) == read_bytes(ROUND3, name)
    print(name, 'byte-identical' if same else 'DIFFERS')
    differences += 0 if same else 1


def untimed(folder):
    return {name: value for name, value in load(folder, 'findings.json').items() if not name.endswith('.timings')}


same = untimed(ROUND2) == untimed(ROUND3)
print('findings.json without timings', 'identical' if same else 'DIFFERS', untimed(ROUND3))
differences += 0 if same else 1

sys.exit(1 if differences else 0)
