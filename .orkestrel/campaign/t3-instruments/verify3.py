#!/usr/bin/env python3
"""Reports, for every T3 mutation pass, how many times each of its edits matches the tree."""

import importlib.util
import io
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

spec = importlib.util.spec_from_file_location('mutate3', os.path.join(HERE, 'mutate3.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

for name, edits in module.PASSES.items():
	for relative, old, _new, expected in edits:
		text = io.open(os.path.join(ROOT, relative), encoding='utf-8', newline='').read()
		found = text.count(old)
		print('%-10s %-38s expected %d found %d%s' % (
			name,
			relative,
			expected,
			found,
			'' if found == expected else '   <-- MISMATCH',
		))
