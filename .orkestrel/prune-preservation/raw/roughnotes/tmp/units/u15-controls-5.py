"""Companion to `tmp/units/u15-controls-4.py`, which mutated the conformance proof.

Changed from that file: this one mutates the registration and the script, and runs the vendored
`config` project rather than the conformance project, so the claim under test is that
`tests/config.test.ts` now requires the conformance project and its gate. Each mutation removes one
half of the slot and restores it. Log: `tmp/units/u15-controls-5.log.txt`.
"""

import io
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

MUTATIONS = [
    (
        'R1 registration removed, proof file kept',
        'vite.config.ts',
        '\t\t\tconfig,\n\t\t\tconformance,\n',
        '\t\t\tconfig,\n',
    ),
    (
        'R2 test:conformance script removed, project kept',
        'package.json',
        '\t\t"test:conformance": "vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance",\n',
        '',
    ),
]


def run_suite():
    result = subprocess.run(
        ['npm.cmd', 'run', 'test:config'],
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
    code, count, _ = run_suite()
    print('BASELINE exit={} | {}'.format(code, count))
    for name, path, old, new in MUTATIONS:
        original = io.open(path, encoding='utf-8', newline='').read()
        if original.count(old) != 1:
            print('{}: PATTERN NOT UNIQUE ({} matches)'.format(name, original.count(old)))
            continue
        io.open(path, 'w', encoding='utf-8', newline='').write(original.replace(old, new))
        try:
            code, count, named = run_suite()
        finally:
            io.open(path, 'w', encoding='utf-8', newline='').write(original)
        print('{}: exit={} | {}'.format(name, code, count))
        for line in named:
            print('    {}'.format(line))
        if io.open(path, encoding='utf-8', newline='').read() != original:
            print('RESTORE FAILED: {}'.format(path))
            sys.exit(1)
    code, count, _ = run_suite()
    print('RESTORED exit={} | {}'.format(code, count))


main()
