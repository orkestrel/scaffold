#!/usr/bin/env python3
"""AP-COLOR round-5 mutation runner, successor to apc-mutate-2.py (retained as
/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py).

For one named mutation it copies the source file, applies the mutation, rebuilds the styles bundle with
`npm run build:src:styles`, runs the named proofs of tests/src/styles/utilities/color.test.ts in one verbose Vitest
run filtered by title, restores the exact file bytes, compares them with the saved copy, and logs everything to
tmp/units/apc-5-mutation-<name>.log.txt.

What changed from apc-mutate-2.py:
- Every selector matches a title of the current color proof, and each is anchored on a phrase the round-5 titles keep.
- The runner reads the verbose reporter's per-test lines and refuses a run in which any named proof executed no test:
  it prints `VERDICT: EMPTY SELECTION` and exits 2, so a stale selector can never read as a surviving or a reddened
  mutation.
- It prints `VERDICT: RED` (exit 0) when every named proof ran and at least one of its tests failed, and
  `VERDICT: SURVIVED` (exit 1) when every named proof ran and all passed.
- The `selection-control` entry is the negative control for the empty-selection refusal: it applies a real mutation
  and selects the round-3 emphasis-opacity title, which no current test carries.

Usage: python3 tmp/units/apc-mutate-5.py <name> [log suffix]"""
import filecmp
import pathlib
import re
import shutil
import subprocess
import sys

ROOT = pathlib.Path('/home/user/veneer-apc')
COLOR = 'tests/src/styles/utilities/color.test.ts'
# Each proof is a regular expression over the reporter's full test name, unique to its case in the color proof.
PROOFS = {
    'density and channel': r'the role channels or the density factor are retuned',
    'fill and body': r'to the tier of a fill or body text retuned',
    'stale emphasis opacity': r'keeps each emphasis class opaque under an opacity step',
}
EMPHASIS = "$emphases: map.set($emphases, '#{$role}-emphasis', var(--bs-#{$role}-text-emphasis));"
MUTATIONS = {
    # M1: the emphasis class keeps the tier on the fill, but mixes it with each mode's resting body color, written from
    # the token maps, instead of the live `--vn-text-body-base` token.
    'emphasis-resting-body': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(EMPHASIS, "$emphases: map.set($emphases, '#{$role}-emphasis', color-mix(in oklab, var(--vn-color-#{$role}-base) 70%, light-dark(#{map.get($light, 'text')}, #{map.get($dark, 'text')})));", 1),
        ['fill and body']),
    # M2: the emphasis class reads the role's channel triplet.
    'emphasis-reads-channel': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(EMPHASIS, "$emphases: map.set($emphases, '#{$role}-emphasis', rgb(var(--vn-color-#{$role}-rgb)));", 1),
        ['density and channel']),
    # M3 control: a real mutation selected by a title no current test carries.
    'selection-control': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(EMPHASIS, "$emphases: map.set($emphases, '#{$role}-emphasis', rgb(from var(--bs-#{$role}-text-emphasis) r g b / var(--bs-text-opacity, 1)));", 1),
        ['stale emphasis opacity']),
}
ANSI = re.compile(r'\x1b\[[0-9;]*m')

name = sys.argv[1]
suffix = f'-{sys.argv[2]}' if len(sys.argv) > 2 else ''
path, edit, proofs = MUTATIONS[name]
target = ROOT / path
stem = f'apc-5-mutation-{name}{suffix}'
backup = ROOT / 'tmp/units' / f'{stem}.orig'
log = ROOT / 'tmp/units' / f'{stem}.log.txt'
run = ROOT / 'tmp/units' / f'{stem}-run.log.txt'
shutil.copyfile(target, backup)
original = target.read_text()
mutated = edit(original)
if mutated == original:
    sys.exit(f'mutation {name} did not apply to {path}')
pattern = '|'.join(PROOFS[p] for p in proofs)
verdict, code = 'EMPTY SELECTION', 2
try:
    target.write_text(mutated)
    diff = subprocess.run(['git', 'diff', '--', path], cwd=ROOT, capture_output=True, text=True).stdout
    with open(log, 'w') as out:
        out.write(f'=== mutation {name} on {path}; proofs {proofs}; -t "{pattern}"\n'
                  f'=== file diff against HEAD while mutated:\n{diff}\n')
        out.flush()
        exit_code = subprocess.run(['tmp/units/apc-run.sh', f'{stem}-run', 'bash', '-c',
            f'npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose {COLOR} -t "{pattern}"'],
            cwd=ROOT).returncode
        text = run.read_text()
        out.write(text)
        lines = [ANSI.sub('', line) for line in text.splitlines()]
        executed = [line for line in lines if re.match(r'^\s*[✓×] ', line)]
        counts = {p: [line for line in executed if re.search(PROOFS[p], line)] for p in proofs}
        for p, hits in counts.items():
            failed = sum(1 for line in hits if line.lstrip().startswith('×'))
            out.write(f'=== proof "{p}": executed {len(hits)}, failed {failed}\n')
        if any(len(hits) == 0 for hits in counts.values()):
            verdict, code = 'EMPTY SELECTION', 2
        elif exit_code != 0 and any(line.lstrip().startswith('×') for hits in counts.values() for line in hits):
            verdict, code = 'RED', 0
        elif exit_code == 0:
            verdict, code = 'SURVIVED', 1
        else:
            verdict, code = f'RUN FAILED WITHOUT A FAILING SELECTED TEST (vitest exit {exit_code})', 3
        out.write(f'=== vitest exit={exit_code}\n=== VERDICT: {verdict}\n')
finally:
    shutil.copyfile(backup, target)
    same = filecmp.cmp(backup, target, shallow=False)
    with open(log, 'a') as out:
        out.write(f'=== restored {path}: byte-identical to pre-mutation copy = {same}\n')
    run.unlink(missing_ok=True)
    backup.unlink()
print(name, verdict)
sys.exit(code)
