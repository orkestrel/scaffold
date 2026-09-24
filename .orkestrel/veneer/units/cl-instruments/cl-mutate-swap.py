#!/usr/bin/env python3
"""LEDGER (cl) control: holds the C1 `.offcanvas-sm` priority swap in the scratch built cascade while
cl-mutate-2.py runs the 42fd88e set comparison in place of the condition-keyed case, then restores
the built cascade byte for byte. It shows the set comparison passing the swap."""
import json, sys, importlib.util
spec = importlib.util.spec_from_file_location('mutate', '/home/user/veneer-cl/tmp/units/cl-mutate-2.py')
mutate = importlib.util.module_from_spec(spec); spec.loader.exec_module(mutate)
plan = json.load(open(sys.argv[1]))
swap, case = plan['swap'], plan['case']
target = f"{swap['root']}/{swap['path']}"
original = open(target, 'rb').read()
text = original.decode()
for old, new in zip(swap['old'], swap['new']):
    assert text.count(old) == 1
    text = text.replace(old, new)
open(target, 'w').write(text)
try:
    mutate.run(case['label'].replace('over the unmodified cascade', 'with the C1 swap held in the built cascade'), case['root'], case['path'], case['old'], case['new'], case['script'])
finally:
    open(target, 'wb').write(original)
assert open(target, 'rb').read() == original
