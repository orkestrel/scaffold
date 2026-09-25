#!/usr/bin/env python3
# E-ID-LAYOUT round 3. Applies each named mutation to one owned partial, runs the owned proofs against the rebuilt
# cascade, records the failing tests, and restores the partial byte for byte. Run: python3 tmp/units/eil-3-mutate.py [name ...]
import filecmp, shutil, subprocess, sys, re
ROOT = '/home/user/veneer-eil'
RUN = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh'
TESTS = ['tests/src/styles/elements/dl.test.ts', 'tests/src/styles/elements/blockquote.test.ts',
         'tests/src/styles/elements/figure.test.ts', 'tests/src/styles/components/quote.test.ts',
         'tests/src/styles/components/image.test.ts']
MUTATIONS = [
    ('classless-grid', 'src/styles/elements/_dl.scss',
     '\tdl {\n\t\tmargin: 0;\n\t\tdisplay: grid;\n',
     '\tdl {\n\t\tmargin: 0;\n\t}\n\tdl:not([class]) {\n\t\tdisplay: grid;\n'),
    ('restored-gap', 'src/styles/elements/_dl.scss',
     '\t\tgrid-template-columns: 1fr 2fr;\n',
     '\t\tgrid-template-columns: 1fr 2fr;\n\t\tgap: var(--vn-space-4) var(--vn-space-8);\n'),
    ('no-term-padding', 'src/styles/elements/_dl.scss', '\t\tpadding-right: var(--vn-space-8);\n', ''),
    ('classless-blockquote', 'src/styles/elements/_blockquote.scss',
     '\t\tmargin: 0 0 var(--vn-space-8);\n',
     '\t\tmargin: 0 0 var(--vn-space-8);\n\t}\n\tblockquote:not([class]) {\n'),
    ('no-quote-resets', 'src/styles/components/_quote.scss',
     '\t\tpadding-left: 0;\n\t\tborder-left: 0;\n\t\tfont-size: var(--vn-size-5);\n\t\tfont-style: normal;\n',
     '\t\tfont-size: var(--vn-size-5);\n'),
    ('restored-figure-gap', 'src/styles/elements/_figure.scss',
     '\t\tflex-direction: column;\n', '\t\tflex-direction: column;\n\t\tgap: var(--vn-space-4);\n'),
    ('no-caption-margin', 'src/styles/elements/_figure.scss', '\t\tmargin-top: var(--vn-space-4);\n', ''),
    ('no-figure-display', 'src/styles/components/_image.scss', '\t.figure {\n\t\tdisplay: inline-block;\n\t}\n\n', ''),
    ('no-caption-reset', 'src/styles/components/_image.scss', '\t\tmargin-top: 0;\n', ''),
]
selected = sys.argv[1:]
for name, path, old, new in MUTATIONS:
    if selected and name not in selected:
        continue
    target = f'{ROOT}/{path}'
    backup = f'/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil3/mutation-backup.scss'
    shutil.copyfile(target, backup)
    text = open(target).read()
    assert text.count(old) == 1, name
    open(target, 'w').write(text.replace(old, new))
    log = f'{ROOT}/tmp/units/eil-3-mutation-{name}.log.txt'
    with open(log, 'w') as handle:
        subprocess.run([RUN, *TESTS], cwd=ROOT, stdout=handle, stderr=subprocess.STDOUT)
    shutil.copyfile(backup, target)
    identical = filecmp.cmp(backup, target, shallow=False)
    lines = open(log).read().splitlines()
    failed = [l.strip() for l in lines if l.strip().startswith('×')]
    readings = [l.strip() for l in lines if 'AssertionError' in l]
    summary = [l.strip() for l in lines if re.match(r'\s*Tests\s', l)]
    print(f'## {name} ({path})')
    print('  summary:', summary)
    for f in failed:
        print('  ', f)
    for r in readings:
        print('    ', r)
    print('  restore byte-identical:', identical)
