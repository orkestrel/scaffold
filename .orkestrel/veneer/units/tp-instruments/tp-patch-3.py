"""TIP round 3: write tp-shared-3.patch as tp-shared-2.patch with its guides/veneer.md section
replaced by the validation copy's guide diff against the pristine 2a3f223 extract."""

import pathlib
import re
import subprocess

UNITS = pathlib.Path('/home/user/veneer-tp/tmp/units')
PROBE = pathlib.Path('/home/user/veneer-tp/tmp/probe')
GUIDE = 'guides/veneer.md'

result = subprocess.run(
    ['git', 'diff', '--no-index', f'tp-orig/{GUIDE}', f'base/{GUIDE}'],
    cwd=PROBE,
    capture_output=True,
    text=True,
)
if result.returncode != 1:
    raise SystemExit(f'git diff exit {result.returncode}: {result.stderr}')
guide = result.stdout.replace(f'a/tp-orig/{GUIDE}', f'a/{GUIDE}').replace(f'b/base/{GUIDE}', f'b/{GUIDE}')

previous = (UNITS / 'tp-shared-2.patch').read_text()
sections = re.split(r'(?m)^(?=diff --git )', previous)
replaced = 0
for index, section in enumerate(sections):
    if section.startswith(f'diff --git a/{GUIDE} b/{GUIDE}\n'):
        sections[index] = guide
        replaced += 1
if replaced != 1:
    raise SystemExit(f'expected one guide section, found {replaced}')
(UNITS / 'tp-shared-3.patch').write_text(''.join(sections))
print('patch written')
