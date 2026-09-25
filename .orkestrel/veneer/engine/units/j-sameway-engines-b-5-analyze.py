"""Prints the recorder entries around each `error` event in one recording.

Usage: analyze.py <recording.json> [before]
"""

import json
import sys

entries = json.load(open(sys.argv[1], encoding='utf-8'))
before = int(sys.argv[2]) if len(sys.argv) > 2 else 40
errors = [index for index, entry in enumerate(entries) if entry['event'] == 'error']
print(f'entries {len(entries)} errors {len(errors)}')
callbacks = [e for e in entries if e['event'] == 'callback-end']
changed = [e for e in callbacks if e['detail']['changed']]
print(f'callbacks {len(callbacks)} with a watched size change {len(changed)}')
for e in changed:
    print('  CHANGED', e['test'][:80], e['detail'])
for index in errors:
    print('=' * 100)
    for entry in entries[max(0, index - before): index + 3]:
        detail = json.dumps(entry['detail'])
        print(f"{entry['frame']} r{entry.get('render')} {entry.get('at', 0):.1f} | {entry['test'][:70]:70} | {entry['event']:12} | {detail[:600]}")
