"""Summarizes every recording under logs/: per run, each loop report with its case, its render task,
the observer callbacks delivered in that task before it, the observations started in that task after
a callback, and whether any callback in the whole run changed the size of a watched element.
"""

import json
import pathlib

LOGS = pathlib.Path(__file__).resolve().parent / 'logs'

for path in sorted(LOGS.glob('*.json')):
    entries = json.loads(path.read_text(encoding='utf-8'))
    ends = [e for e in entries if e['event'] == 'callback-end']
    changed = sum(1 for e in ends if e['detail']['changed'])
    errors = [e for e in entries if e['event'] == 'error']
    print(f'{path.name}: callbacks {len(ends)}, callbacks changing a watched size {changed}, loop reports {len(errors)}')
    for error in errors:
        render = error.get('render')
        task = [e for e in entries if e.get('render') == render and render is not None]
        delivered = [e['detail']['observer'] for e in task if e['event'] == 'callback']
        first = next((i for i, e in enumerate(task) if e['event'] == 'callback'), None)
        started = [
            f"{e['detail']['observer']}:{e['detail']['target']} in '{e['test'][:60]}'"
            for e in task[first:] if e['event'] == 'observe'
        ] if first is not None else []
        print(f"  report in '{error['test'][:90]}' render task {render}")
        print(f'    delivered in that task: {delivered}')
        print(f'    observations started in that task after a delivery: {started}')
