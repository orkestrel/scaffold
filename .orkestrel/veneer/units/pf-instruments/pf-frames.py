# Reads one variant's manifest and prints the frame readings the report names.
import json, sys
variant = sys.argv[1]
PAGE = {'showcase','primary-focus','valid-control-focus','invalid-control-focus','check-group-focus','range-focus','form-floating-empty-focus','form-select-base-focus','form-control-text-focus','close-control-focus','form-check-box-focus','input-group-button-focus','nav-base-focus','accordion-base-focus','skip-link-focus','navbar-collapsed-focus','default-focus-ring-focus','focus-ring-roles-focus'}
frames = {}
for line in open(f'tmp/capture/{variant}.txt'):
	line = line.strip()
	if not line.startswith('{'): continue
	try: entry = json.loads(line)
	except Exception: continue
	if entry.get('reading') == 'frame': frames[entry['scenario']] = entry
print('frames read back:', len(frames))
for name in ['showcase', 'bottom-offcanvas']:
	e = frames.get(name)
	print(name, e and (e['width'], e['height'], e['region'], round(e['variation'], 4)))
pages = [frames[s] for s in PAGE if s in frames]
print('page frames found:', sorted(s for s in PAGE if s in frames) == sorted(PAGE))
tall = max(pages, key=lambda e: e['height'])
print('tallest page frame', tall['scenario'], tall['width'], tall['height'])
big = max(frames.values(), key=lambda e: e['width'] * e['height'])
print('largest frame', big['scenario'], big['width'], big['height'])
print('least variation', min(frames.values(), key=lambda e: e['variation'])['scenario'], min(e['variation'] for e in frames.values()))
