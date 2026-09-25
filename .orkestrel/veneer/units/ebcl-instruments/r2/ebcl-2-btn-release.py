# Reads the reader's .btn maps out of the raw run log and sets each release map's longhand names beside
# the removed fixed list (BUTTON_FORM_DIFFERENCES at 2376710).
import json, re, sys
fixed = {'rest': ['appearance'], 'hovered': ['appearance'], 'pressed': ['appearance'], 'focused': ['appearance', 'outline-offset']}
text = open('tmp/units/ebcl-2-btn-release-raw.log.txt').read()
for line in re.findall(r'EBCL2-BTN (\{.*\})', text):
	row = json.loads(line)
	print(f"## {row['name']}")
	for state, diff in row['release'].items():
		names = sorted(diff)
		verdict = 'equals fixed list' if names == sorted(fixed[state]) else f'DIFFERS from fixed list {fixed[state]}'
		print(f"release {state}: {json.dumps(diff, sort_keys=True)} -> {verdict}")
	print(f"veneer equals release: {row['veneer'] == row['release']}")
