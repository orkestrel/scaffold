"""Companion to `tmp/units/u15-controls-3.py`, which mutated the subject rather than the controls.

Changed from that file: this one mutates `tests/conformance.test.ts` instead of `vite.config.ts`,
inverting every inline control so each control's own reading runs as an ordinary assertion. A
control whose subject genuinely fails reddens its instrument here; a control whose subject silently
passed would leave its instrument green. Log: `tmp/units/u15-controls-4.log.txt`.
"""

import io
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PATH = 'tests/conformance.test.ts'
OLD = '.toThrow('
NEW = '.not.toThrow('


def run_suite():
    result = subprocess.run(
        ['npm.cmd', 'run', 'test:conformance'],
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )
    output = (result.stdout or '') + (result.stderr or '')
    counts = re.findall(r'(?m)^\s*Tests\s+(.*\(\d+\))\s*$', output)
    failures = re.findall(r'(?m)^\s*(?:×|FAIL).*$', output)
    named = sorted({line.strip() for line in failures})
    return result.returncode, counts[-1].strip() if counts else 'no count', named


def main():
    original = io.open(PATH, encoding='utf-8', newline='').read()
    code, count, _ = run_suite()
    print('BASELINE exit={} | {}'.format(code, count))
    print('CONTROL SITES: {}'.format(original.count(OLD)))
    io.open(PATH, 'w', encoding='utf-8', newline='').write(original.replace(OLD, NEW))
    try:
        code, count, named = run_suite()
    finally:
        io.open(PATH, 'w', encoding='utf-8', newline='').write(original)
    print('C1 every inline control inverted: exit={} | {}'.format(code, count))
    for line in named:
        print('    {}'.format(line))
    code, count, _ = run_suite()
    print('RESTORED exit={} | {}'.format(code, count))
    if io.open(PATH, encoding='utf-8', newline='').read() != original:
        print('RESTORE FAILED')
        sys.exit(1)


main()
