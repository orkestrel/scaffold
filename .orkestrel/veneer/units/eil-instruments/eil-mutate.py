#!/usr/bin/env python3
# Applies each named mutation to one owned partial, runs the owned proofs against the rebuilt
# cascade, records the failing tests, and restores the partial byte for byte.
import filecmp, shutil, subprocess, sys, re
ROOT = '/home/user/veneer-eil'
RUN = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh'
TESTS = ['tests/src/styles/elements/dl.test.ts', 'tests/src/styles/elements/blockquote.test.ts',
         'tests/src/styles/elements/figure.test.ts', 'tests/src/styles/components/quote.test.ts']
MUTATIONS = [
    ('unscoped-grid', 'src/styles/elements/_dl.scss',
     '\tdl:not([class]) {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr 2fr;\n\t\tcolumn-gap: var(--vn-space-8);\n\t}',
     '\tdl {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr 2fr;\n\t\tgap: var(--vn-space-4) var(--vn-space-8);\n\t}'),
    ('zero-dd-margin', 'src/styles/elements/_dl.scss',
     '\t\tmargin-bottom: var(--vn-space-4);\n', '\t\tmargin-bottom: 0;\n'),
    ('no-dt-column', 'src/styles/elements/_dl.scss', '\t\tgrid-column: 1;\n', ''),
    ('no-dd-column', 'src/styles/elements/_dl.scss', '\t\tgrid-column: 2;\n', ''),
    ('unscoped-blockquote', 'src/styles/elements/_blockquote.scss',
     'blockquote:not([class]) {', 'blockquote {'),
    ('unscoped-figure', 'src/styles/elements/_figure.scss',
     'figure:not(:has(> .blockquote)) {', 'figure {'),
    ('classless-figure', 'src/styles/elements/_figure.scss',
     'figure:not(:has(> .blockquote)) {', 'figure:not([class]) {'),
]
selected = sys.argv[1:]
for name, path, old, new in MUTATIONS:
    if selected and name not in selected:
        continue
    target = f'{ROOT}/{path}'
    backup = f'{ROOT}/tmp/units/eil-mutation-backup.scss'
    shutil.copyfile(target, backup)
    text = open(target).read()
    assert text.count(old) == 1, name
    open(target, 'w').write(text.replace(old, new))
    log = f'{ROOT}/tmp/units/eil-mutation-{name}.log.txt'
    with open(log, 'w') as handle:
        subprocess.run([RUN, *TESTS], cwd=ROOT, stdout=handle, stderr=subprocess.STDOUT)
    shutil.copyfile(backup, target)
    identical = filecmp.cmp(backup, target, shallow=False)
    subprocess.run(['rm', backup])
    lines = open(log).read().splitlines()
    failed = [l.strip() for l in lines if l.strip().startswith('×')]
    summary = [l.strip() for l in lines if re.match(r'\s*Tests\s', l)]
    diff = subprocess.run(['git', 'diff', '--quiet', 'ca83afb', '--', path], cwd=ROOT).returncode
    print(f'## {name} ({path})')
    print('  summary:', summary)
    for f in failed:
        print('  ', f)
    print('  restore byte-identical:', identical)
