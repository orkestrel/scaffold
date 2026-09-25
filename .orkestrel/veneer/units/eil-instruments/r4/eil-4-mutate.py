#!/usr/bin/env python3
# E-ID-LAYOUT round 4. Applies each named mutation to one owned partial, runs the owned proofs against the rebuilt
# cascade, restores the partial byte for byte, and appends the restore check to the mutation's log.
# Run: python3 tmp/units/eil-4-mutate.py [name ...]
import filecmp, shutil, subprocess, sys, re
ROOT = '/home/user/veneer-eil'
RUN = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh'
BACKUP = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil4/mutation-backup.scss'
TESTS = ['tests/src/styles/elements/dl.test.ts', 'tests/src/styles/elements/blockquote.test.ts',
         'tests/src/styles/elements/figure.test.ts', 'tests/src/styles/components/quote.test.ts',
         'tests/src/styles/components/image.test.ts']
MUTATIONS = [
    ('restored-flex', 'src/styles/elements/_figure.scss',
     '\tfigure {\n\t\tmargin: 0;\n',
     '\tfigure {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmargin: 0;\n'),
    ('no-caption-margin', 'src/styles/elements/_figure.scss', '\t\tmargin-top: var(--vn-space-4);\n', ''),
    ('no-figure-display', 'src/styles/components/_image.scss', '\t.figure {\n\t\tdisplay: inline-block;\n\t}\n\n', ''),
    ('no-caption-reset', 'src/styles/components/_image.scss', '\t\tmargin-top: 0;\n', ''),
]
selected = sys.argv[1:]
for name, path, old, new in MUTATIONS:
    if selected and name not in selected:
        continue
    target = f'{ROOT}/{path}'
    shutil.copyfile(target, BACKUP)
    text = open(target).read()
    assert text.count(old) == 1, name
    open(target, 'w').write(text.replace(old, new))
    log = f'{ROOT}/tmp/units/eil-4-mutation-{name}.log.txt'
    with open(log, 'w') as handle:
        result = subprocess.run([RUN, *TESTS], cwd=ROOT, stdout=handle, stderr=subprocess.STDOUT)
    shutil.copyfile(BACKUP, target)
    identical = filecmp.cmp(BACKUP, target, shallow=False)
    with open(log, 'a') as handle:
        handle.write(f'exit={result.returncode}\n')
        handle.write(f'restore {path} byte-identical to the pre-mutation copy: {identical}\n')
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
