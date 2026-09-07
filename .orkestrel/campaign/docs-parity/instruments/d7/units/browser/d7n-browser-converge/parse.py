"""Reads a docs worklist into (key, guide, source) triples."""
import json
def read(path):
	dec = json.JSONDecoder()
	rows = []
	for raw in open(path):
		line = raw.rstrip('\n')
		if not line.startswith('guides/browser.md '):
			continue
		head, sep, rest = line.partition(': guide ')
		if sep == '':
			continue
		key = head[len('guides/browser.md '):]
		if rest.startswith('absent'):
			left, rest = None, rest[len('absent'):]
		else:
			left, at = dec.raw_decode(rest)
			rest = rest[at:]
		right = rest[len(' source '):]
		rows.append((key, left, None if right == 'absent' else dec.raw_decode(right)[0]))
	return rows
