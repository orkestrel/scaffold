"""Writes one scratch copy per frame-wait site under tmp/probe/, each with that one wait removed.

A site is an `await waitForFrame()` line whose preceding comment block names a ResizeObserver loop.
The sites are found in file order, so the script works on the 3bb9afb sources and on the edited ones.
It also writes a control copy of each file with every wait kept. Every copy has a twin with the
`-rec` suffix that imports the recorder first.
"""

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SOURCES = {
    'Tooltip': ROOT / 'tests/src/browser/Tooltip.test.ts',
    'Popover': ROOT / 'tests/src/browser/Popover.test.ts',
}
# Site name, file, and the site's ordinal in that file's list of loop waits.
SITES = {
    'tooltip-2396': ('Tooltip', 0),
    'tooltip-3147': ('Tooltip', 1),
    'tooltip-3373': ('Tooltip', 2),
    'popover-794': ('Popover', 0),
    'control-tooltip': ('Tooltip', None),
    'control-popover': ('Popover', None),
}


def find_waits(lines: list[str]) -> list[int]:
    waits = []
    for index, line in enumerate(lines):
        if line.strip() != 'await waitForFrame()':
            continue
        cursor = index - 1
        comment = []
        while cursor >= 0 and lines[cursor].strip().startswith('//'):
            comment.append(lines[cursor])
            cursor -= 1
        if 'ResizeObserver loop' in ' '.join(part.strip(' \t/\n') for part in comment):
            waits.append(index)
    return waits


def rewrite(text: str) -> str:
    return text.replace("'../../setupBrowser.js'", "'../../../tests/setupBrowser.js'")


for site, (name, ordinal) in SITES.items():
    lines = SOURCES[name].read_text(encoding='utf-8').splitlines(keepends=True)
    waits = find_waits(lines)
    expected = 3 if name == 'Tooltip' else 1
    if len(waits) != expected:
        raise SystemExit(f'{name}: found loop waits at {[w + 1 for w in waits]}, expected {expected}')
    if ordinal is not None:
        print(f'{site}: removing line {waits[ordinal] + 1}')
        del lines[waits[ordinal]]
    for suffix, head in (('', ''), ('-rec', "import '../recorder.js'\n")):
        target = ROOT / 'tmp/probe' / f'{site}{suffix}' / f'{name}.test.ts'
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(head + rewrite(''.join(lines)), encoding='utf-8', newline='')
