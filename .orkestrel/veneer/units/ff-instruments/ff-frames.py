# Extracts each focus scenario's frame dimensions and declared region from a journey manifest.
import json, sys
wanted = sys.argv[2].split(',')
for line in open(sys.argv[1]):
    line = line.strip()
    if not line.startswith('{'):
        continue
    try:
        entry = json.loads(line)
    except json.JSONDecodeError:
        continue
    if entry.get('reading') == 'frame' and entry['scenario'] in wanted:
        r = entry['region']
        print(f"{entry['scenario']}: {entry['width']}x{entry['height']} region x={r['x']:.1f} y={r['y']:.1f} w={r['width']:.1f} h={r['height']:.1f} variation={entry['variation']:.3f}")
