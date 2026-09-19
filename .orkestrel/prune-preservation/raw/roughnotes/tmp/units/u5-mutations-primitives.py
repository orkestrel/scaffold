"""Proves each primitive pin can fail.

Each step mutates one load-bearing line in a primitive, runs that primitive's mirrored suite,
records the reading, and restores the line.
"""

import io
import re
import subprocess
import sys

SUITES = [
    'tests/app/browser/components/Frame.test.ts',
    'tests/app/browser/components/Split.test.ts',
    'tests/app/browser/components/Entry.test.ts',
    'tests/app/browser/components/Notice.test.ts',
]

MUTATIONS = [
    (
        'frame refuses a hero',
        'app/browser/components/Frame.vue',
        '<div class="container-xl py-5">',
        '<div class="container-xl py-5 hero">',
    ),
    (
        'frame bounds its lead',
        'app/browser/components/Frame.vue',
        'class="lead text-body-secondary measure mt-3 mb-0"',
        'class="lead text-body-secondary mt-3 mb-0"',
    ),
    (
        'split top alignment',
        'app/browser/components/Split.vue',
        '<div class="row g-4 g-lg-5 align-items-start">',
        '<div class="row g-4 g-lg-5 align-items-stretch">',
    ),
    (
        'split default span',
        'app/browser/components/Split.vue',
        'withDefaults(defineProps<SplitOptions>(), { span: 7 })',
        'withDefaults(defineProps<SplitOptions>(), { span: 8 })',
    ),
    (
        'entry tabular figures',
        'app/browser/components/Entry.vue',
        '<dd class="figures-tabular mb-0">',
        '<dd class="mb-0">',
    ),
    (
        'entry equal height',
        'app/browser/components/Entry.vue',
        '<article class="card lift h-100">',
        '<article class="card lift">',
    ),
    (
        'notice announcement urgency',
        'app/browser/components/Notice.vue',
        ":role=\"urgent ? 'alert' : 'status'\"",
        'role="status"',
    ),
    (
        'notice icon',
        'app/browser/components/Notice.vue',
        'const mark = computed(() => NOTICE_MARKS[props.category])',
        "const mark = computed(() => NOTICE_MARKS.empty)",
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
    io.open(
        'tmp/units/u5-mutations-primitives.log.txt', 'w', encoding='utf-8', newline=''
    ).write(report)
    sys.stdout.write(report)


main()
