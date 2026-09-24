"""TIP round 4: write tp-shared-4.patch as tp-shared-3.patch with the section of each file this
round edits replaced by the validation copy's diff against the pristine 2a3f223 extract, then
write the interdiff of the two patches."""

import difflib
import pathlib
import re
import subprocess

UNITS = pathlib.Path('/home/user/veneer-tp/tmp/units')
PROBE = pathlib.Path('/home/user/veneer-tp/tmp/probe')
EDITED = ['app/browser/constants.ts', 'guides/veneer.md', 'tests/setupStyles.ts']


def diff_file(path: str) -> str:
    result = subprocess.run(
        ['git', 'diff', '--no-index', f'tp-orig/{path}', f'base/{path}'],
        cwd=PROBE,
        capture_output=True,
        text=True,
    )
    if result.returncode != 1:
        raise SystemExit(f'git diff exit {result.returncode} for {path}: {result.stderr}')
    return result.stdout.replace(f'a/tp-orig/{path}', f'a/{path}').replace(f'b/base/{path}', f'b/{path}')


previous = (UNITS / 'tp-shared-3.patch').read_text()
sections = re.split(r'(?m)^(?=diff --git )', previous)
for path in EDITED:
    header = f'diff --git a/{path} b/{path}\n'
    matches = [index for index, section in enumerate(sections) if section.startswith(header)]
    if len(matches) != 1:
        raise SystemExit(f'expected one section for {path}')
    sections[matches[0]] = diff_file(path)
current = ''.join(sections)
(UNITS / 'tp-shared-4.patch').write_text(current)
interdiff = difflib.unified_diff(
    previous.splitlines(keepends=True),
    current.splitlines(keepends=True),
    fromfile='tp-shared-3.patch',
    tofile='tp-shared-4.patch',
    n=3,
)
(UNITS / 'tp-4-shared-interdiff.txt').write_text(''.join(interdiff))
print('patch and interdiff written')
