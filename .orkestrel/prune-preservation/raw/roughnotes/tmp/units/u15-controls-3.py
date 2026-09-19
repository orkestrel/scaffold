"""Successor to `tmp/units/u15-controls-2.py`, whose count regex matched the failure banner.

Changed from that file: the count is read from the runner's own `Tests  N failed | M passed (T)`
line rather than from the first `Tests` token, so each mutation reports both counts. The mutations
and the procedure are unchanged. Log: `tmp/units/u15-controls-3.log.txt`.
"""

import io
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PATH = 'vite.config.ts'

MUTATIONS = [
    (
        'M1 appBrowser ignores its override',
        '\treturn mergeOverride(browser, override)',
        '\treturn mergeOverride(browser, undefined)',
    ),
    (
        'M2 appShowcase restates the browser root',
        "\t\tplugins: [outputBoundary(output)],\n\t\tbuild: { outDir: resolveWorkspacePath(output) },",
        "\t\tplugins: [outputBoundary(output)],\n\t\troot: resolveWorkspacePath('app'),\n\t\tbuild: { outDir: resolveWorkspacePath(output) },",
    ),
    (
        'M3 appShowcase drops its override',
        '\treturn appBrowser(mergeOverride(showcase, override))',
        '\treturn appBrowser(mergeOverride(showcase, undefined))',
    ),
    (
        'M4 mergeOverride skips plugin selection',
        '\tif (merged.plugins === undefined) return merged',
        '\tif (merged.plugins !== undefined) return merged',
    ),
    (
        'M5 mergeOverride drops the invocation guard',
        "\tif (override === undefined || 'command' in override) return base",
        '\tif (override === undefined) return base',
    ),
]


def read_source():
    return io.open(PATH, encoding='utf-8', newline='').read()


def write_source(text):
    io.open(PATH, 'w', encoding='utf-8', newline='').write(text)


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
    original = read_source()
    code, count, _ = run_suite()
    print('BASELINE exit={} | {}'.format(code, count))
    for name, old, new in MUTATIONS:
        if original.count(old) != 1:
            print('{}: PATTERN NOT UNIQUE ({} matches)'.format(name, original.count(old)))
            continue
        write_source(original.replace(old, new))
        try:
            code, count, named = run_suite()
        finally:
            write_source(original)
        print('{}: exit={} | {}'.format(name, code, count))
        for line in named:
            print('    {}'.format(line))
    code, count, _ = run_suite()
    print('RESTORED exit={} | {}'.format(code, count))
    if read_source() != original:
        print('RESTORE FAILED')
        sys.exit(1)


main()
