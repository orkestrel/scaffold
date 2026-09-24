#!/usr/bin/env python3
"""AP-COLOR mutation runner: applies one named source mutation, rebuilds the styles bundle, runs the named proof,
restores the exact file bytes, and logs to /home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-<name>.log.txt.
Usage: python3 /home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutate.py <name>"""
import pathlib, shutil, subprocess, sys, filecmp
ROOT = pathlib.Path('/home/user/veneer-apc')
TIERS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
def tier80(s):
    # The tier at 80 percent in dark: each tier role's emphasis token is replaced through `$retuned`, 70% in light and 80% in dark.
    retuned = ''.join(f"\t'--vn-color-{r}-emphasis': '{r}-emphasis',\n" for r in TIERS)
    s = s.replace("$retuned: (\n", "$retuned: (\n" + retuned, 1)
    light = ''.join(f"\t'{r}-emphasis': 'color-mix(in oklab, var(--vn-color-{r}-base) 70%, var(--vn-text-body-base))',\n" for r in TIERS)
    dark = ''.join(f"\t'{r}-emphasis': 'color-mix(in oklab, var(--vn-color-{r}-base) 80%, var(--vn-text-body-base))',\n" for r in TIERS)
    s = s.replace("$light: (\n", "$light: (\n" + light, 1)
    s = s.replace("$dark: (\n", "$dark: (\n" + dark, 1)
    return s
MUTATIONS = {
    'tier-80-dark': ('src/styles/_tokens.scss', tier80,
        'tests/src/styles/utilities/color.test.ts', 'reads each role color outside the neutral roles at or above the contrast bar'),
    'danger-channel': ('src/styles/utilities/_color.scss',
        lambda s: s.replace("@if list.index($aliased, $name) and not list.index($neutrals, $name) {", "@if list.index($aliased, $name) and not list.index($neutrals, $name) and $name != danger {", 1),
        'tests/src/styles/utilities/color.test.ts', 'reads each role color outside the neutral roles at or above the contrast bar'),
    'bare-mix': ('src/styles/utilities/_color.scss',
        lambda s: s.replace("$color: rgb(from var(--bs-#{$name}-text-emphasis) r g b / var(--bs-text-opacity));", "$color: color-mix(in oklab, var(--vn-color-#{$name}-base) 70%, var(--vn-text-body-base));", 1),
        'tests/src/styles/utilities/color.test.ts', 'paints each opacity step as the on-canvas tier'),
    'neutrals-empty': ('src/styles/_tokens.scss',
        lambda s: s.replace("$neutrals: light, dark;", "$neutrals: ();", 1),
        'tests/src/styles/utilities/color.test.ts', 'keeps the neutral roles on their own channels'),
    'valid-fill': ('src/styles/_tokens.scss',
        lambda s: s.replace("\t'valid': 'var(--vn-color-success-emphasis)',\n\t'invalid': 'var(--vn-color-danger-emphasis)',\n\t'close-filter': '',", "\t'valid': 'var(--vn-color-success-base)',\n\t'invalid': 'var(--vn-color-danger-emphasis)',\n\t'close-filter': '',", 1),
        'tests/src/styles/components/validation.test.ts', 'on-canvas tier, in both modes'),
}
name = sys.argv[1]
path, edit, proof, title = MUTATIONS[name]
target = ROOT / path
backup = ROOT / 'tmp/units' / f'apc-mutation-{name}.orig'
shutil.copyfile(target, backup)
original = target.read_text()
mutated = edit(original)
assert mutated != original, 'mutation did not apply'
log = ROOT / 'tmp/units' / f'apc-mutation-{name}.log.txt'
try:
    target.write_text(mutated)
    diff = subprocess.run(['git', 'diff', '--', path], cwd=ROOT, capture_output=True, text=True).stdout
    with open(log, 'w') as out:
        out.write(f'=== mutation {name} on {path}; proof {proof} -t "{title}"\n=== file diff against HEAD while mutated:\n{diff}\n')
        out.flush()
        code = subprocess.run(['/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh', f'apc-mutation-{name}-run', 'bash', '-c',
            f'npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose {proof} -t "{title}"'],
            cwd=ROOT).returncode
        out.write((ROOT / 'tmp/units' / f'apc-mutation-{name}-run.log.txt').read_text())
        out.write(f'\n=== proof exit={code} (non-zero means the proof reddened)\n')
finally:
    shutil.copyfile(backup, target)
    same = filecmp.cmp(backup, target, shallow=False)
    with open(log, 'a') as out:
        out.write(f'=== restored {path}: byte-identical to pre-mutation copy = {same}\n')
    (ROOT / 'tmp/units' / f'apc-mutation-{name}-run.log.txt').unlink(missing_ok=True)
    backup.unlink()
print(name, 'done')
