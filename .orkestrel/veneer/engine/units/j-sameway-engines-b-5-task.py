"""Prints every entry of one render task in one recording.

Usage: task.py <recording.json> <render id>
"""

import json
import sys

entries = json.load(open(sys.argv[1], encoding='utf-8'))
render = int(sys.argv[2])
for entry in entries:
    if entry.get('render') != render:
        continue
    detail = json.dumps(entry['detail'])
    print(f"{entry['at']:.1f} | {entry['test'][:60]:60} | {entry['event']:12} | {detail[:240]}")
