"""Proves each shell pin in the unit 5 suites can fail.

Each step mutates exactly one load-bearing line in a file this unit owns, runs the pinned
suites, records the reading, and restores the line. The final unmutated run proves the tree is
back where it started.
"""

import io
import re
import subprocess
import sys

SUITES = [
    'tests/app/browser/App.test.ts',
    'tests/app/browser/components/Brand.test.ts',
]

MUTATIONS = [
    (
        'monogram class',
        'app/browser/components/Brand.vue',
        '<span class="monogram d-inline-flex',
        '<span class="mark d-inline-flex',
    ),
    (
        'shell href resolution',
        'app/browser/App.vue',
        "return destination.startsWith('/') ? hashHref(destination) : destination",
        'return destination',
    ),
    (
        'footer group heading',
        'app/browser/App.vue',
        '<h2 class="h6 text-uppercase fw-semibold mb-3">{{ group.title }}</h2>',
        '<p class="h6 text-uppercase fw-semibold mb-3">{{ group.title }}</p>',
    ),
    (
        'drawer action rank',
        'app/browser/App.vue',
        '<a class="btn btn-primary align-self-start"',
        '<a class="btn btn-warning align-self-start"',
    ),
    (
        'adjacent focus names',
        'app/browser/App.vue',
        ':aria-label="themeLabel"',
        ':aria-label="COPY.started"',
    ),
]


def swap(path, before, after):
    text = io.open(path, encoding='utf-8', newline='').read()
    if before not in text:
        raise SystemExit('missing text in ' + path + ': ' + before)
    io.open(path, 'w', encoding='utf-8', newline='').write(text.replace(before, after))


def run():
    result = subprocess.run(
        [
            'npx.cmd', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache',
            '--reporter=dot', '--project', 'app:browser', *SUITES,
        ],
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )
    stream = (result.stdout or '') + (result.stderr or '')
    counts = re.findall(r'^\s+Tests\s+(.+)$', stream, re.MULTILINE)
    return (counts[-1].strip() if counts else 'no count') + ' | exit ' + str(result.returncode)


def main():
    lines = ['baseline | unmutated | ' + run()]
    for label, path, before, after in MUTATIONS:
        swap(path, before, after)
        try:
            lines.append(label + ' | mutated | ' + run())
        finally:
            swap(path, after, before)
    lines.append('restored | unmutated | ' + run())
    report = '\n'.join(lines) + '\n'
    io.open('tmp/units/u5-mutations.log.txt', 'w', encoding='utf-8', newline='').write(report)
    sys.stdout.write(report)


main()
