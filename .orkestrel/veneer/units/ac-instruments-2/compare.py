"""Compares each mutation's failing case titles in the round-2 log with the round-1 logs and prints
one line per mutation: the round-2 tally and whether its failing set equals the round-1 set."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
def read(paths):
    rows = {}
    for path in paths:
        for line in open(path):
            line = line.strip()
            if line.startswith('{'):
                row = json.loads(line)
                rows[row['mutation']] = row
    return rows
before = read([os.path.join(HERE, '..', 'ac-instruments', f'mutations-{n}.log.txt') for n in range(1, 5)])
after = read([os.path.join(HERE, 'logs', name) for name in sys.argv[1:]])
for name, row in after.items():
    old = before.get(name)
    same = old is not None and old.get('failed') == row.get('failed')
    print(f"{name} | exit {row.get('exit')} | {row.get('tally')} | same failing set as round 1: {'yes' if same else 'no'}")
