#!/usr/bin/env python3
"""AP-COLOR round-2 mutation runner, successor to apc-mutate.py: each mutation names the proofs it must redden, and the
runner applies the mutation, rebuilds the styles bundle, runs those proofs in one verbose Vitest run, restores the exact
file bytes, and logs to tmp/units/<prefix>-mutation-<name>.log.txt.
Round 3 split the retune test into four titled cases, so the `retune` proof selects all four by title; it added the
`release record` and `emphasis opacity` proofs and the `emphasis-opacity` mutation, and the optional prefix argument.
Usage: python3 /home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py <name> [prefix, default apc-2]"""
import pathlib, shutil, subprocess, sys, filecmp
ROOT = pathlib.Path('/home/user/veneer-apc')
TIERS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
COLOR = 'tests/src/styles/utilities/color.test.ts'
LINK = 'tests/src/styles/utilities/link.test.ts'
BUTTON = 'tests/src/styles/components/button.test.ts'
VALIDATION = 'tests/src/styles/components/validation.test.ts'
ANCHOR = 'tests/src/styles/elements/a.test.ts'
# Each proof is a file and a substring of its title unique within that file.
PROOFS = {
    'link rest': (LINK, 'on-canvas tier at rest at or above the contrast bar'),
    'link hover': (LINK, 'hover and focus color toward the emphasis text'),
    'outline rest': (BUTTON, 'reads each outline button outside the neutral roles at or above the contrast bar'),
    'feedback and label': (VALIDATION, 'feedback and the checked'),
    'identity': (COLOR, 'and its emphasis class in one color at the default opacity'),
    'retune': (COLOR, 'the role channels or the density factor|to the tier of a fill or body text|to an emphasis token retuned|below the scope declaring'),
    'release record': (COLOR, 'resolves each text color to the value the release records'),
    'emphasis opacity': (COLOR, 'keeps each emphasis class opaque under an opacity step'),
    'anchor identity': (ANCHOR, 'paints the link in the primary text color'),
}
def tier80(s):
    # Every tier role's emphasis token is overridden through `$retuned`: 70% in light, 80% in dark.
    retuned = ''.join(f"\t'--vn-color-{r}-emphasis': '{r}-emphasis',\n" for r in TIERS)
    s = s.replace("$retuned: (\n", "$retuned: (\n" + retuned, 1)
    light = ''.join(f"\t'{r}-emphasis': 'color-mix(in oklab, var(--vn-color-{r}-base) 70%, var(--vn-text-body-base))',\n" for r in TIERS)
    dark = ''.join(f"\t'{r}-emphasis': 'color-mix(in oklab, var(--vn-color-{r}-base) 80%, var(--vn-text-body-base))',\n" for r in TIERS)
    s = s.replace("$light: (\n", "$light: (\n" + light, 1)
    return s.replace("$dark: (\n", "$dark: (\n" + dark, 1)
TEXT_TIER = "$color: rgb(from var(--bs-#{$name}-text-emphasis) r g b / var(--bs-text-opacity));"
TEXT_IF = "@if list.index($aliased, $name) and not list.index($neutrals, $name) {"
MUTATIONS = {
    'tier-80-dark': ('src/styles/_tokens.scss', tier80, ['link rest', 'link hover', 'outline rest', 'feedback and label']),
    'danger-channel': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(TEXT_IF, TEXT_IF[:-2] + " and $name != danger {", 1), ['identity']),
    'primary-channel': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(TEXT_IF, TEXT_IF[:-2] + " and $name != primary {", 1), ['retune']),
    'danger-channel-record': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(TEXT_IF, TEXT_IF[:-2] + " and $name != danger {", 1), ['release record']),
    # Gives the emphasis class the text opacity variable, as the role class reads it.
    'emphasis-opacity': ('src/styles/utilities/_color.scss',
        lambda s: s.replace("$emphases: map.set($emphases, '#{$role}-emphasis', var(--bs-#{$role}-text-emphasis));", "$emphases: map.set($emphases, '#{$role}-emphasis', rgb(from var(--bs-#{$role}-text-emphasis) r g b / var(--bs-text-opacity, 1)));", 1),
        ['emphasis opacity']),
    'dark-link-80': ('src/styles/_tokens.scss',
        lambda s: s.replace("\t'link': 'var(--vn-color-primary-emphasis)',\n\t'link-rgb': '103, 191, 238',", "\t'link': 'color-mix(in oklab, var(--vn-color-primary-base) 80%, var(--vn-text-body-base))',\n\t'link-rgb': '103, 191, 238',", 1),
        ['anchor identity']),
    'hover-oklab': ('src/styles/utilities/_link.scss',
        lambda s: s.replace("in srgb,\n\t\t\tvar(--vn-text-emphasis-base) #{$shift},", "in oklab,\n\t\t\tvar(--vn-text-emphasis-base) #{$shift},", 1),
        ['link hover']),
    # Removes the emphasis-token and alias paths: the class inlines the tier's own mix.
    'text-inline-tier': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(TEXT_TIER, "$color: rgb(from color-mix(in oklab, var(--vn-color-#{$name}-base) 70%, var(--vn-text-body-base)) r g b / var(--bs-text-opacity));", 1),
        ['retune']),
    # Removes the alias path and the substitution at the theme scope: the class reads the token directly.
    'text-reads-token': ('src/styles/utilities/_color.scss',
        lambda s: s.replace(TEXT_TIER, "$color: rgb(from var(--vn-color-#{$name}-emphasis) r g b / var(--bs-text-opacity));", 1),
        ['retune']),
    # Removes the colored link's direct token read: the link reads the alias the theme scope substituted.
    'link-reads-alias': ('src/styles/utilities/_link.scss',
        lambda s: s.replace("from var(--vn-color-#{$role}-emphasis) r g b / var(--bs-link-opacity, 1)", "from var(--bs-#{$role}-text-emphasis) r g b / var(--bs-link-opacity, 1)", 1),
        ['retune']),
}
name = sys.argv[1]
prefix = sys.argv[2] if len(sys.argv) > 2 else 'apc-2'
path, edit, proofs = MUTATIONS[name]
target = ROOT / path
backup = ROOT / 'tmp/units' / f'{prefix}-mutation-{name}.orig'
shutil.copyfile(target, backup)
original = target.read_text()
mutated = edit(original)
assert mutated != original, 'mutation did not apply'
files = sorted({PROOFS[p][0] for p in proofs})
pattern = '|'.join(PROOFS[p][1] for p in proofs)
log = ROOT / 'tmp/units' / f'{prefix}-mutation-{name}.log.txt'
run = ROOT / 'tmp/units' / f'{prefix}-mutation-{name}-run.log.txt'
try:
    target.write_text(mutated)
    diff = subprocess.run(['git', 'diff', '--', path], cwd=ROOT, capture_output=True, text=True).stdout
    with open(log, 'w') as out:
        out.write(f'=== mutation {name} on {path}; proofs {proofs}; files {files}; -t "{pattern}"\n=== file diff against HEAD while mutated:\n{diff}\n')
        out.flush()
        code = subprocess.run(['/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh', f'{prefix}-mutation-{name}-run', 'bash', '-c',
            f'npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose {" ".join(files)} -t "{pattern}"'],
            cwd=ROOT).returncode
        out.write(run.read_text())
        out.write(f'\n=== proof exit={code} (non-zero means a selected proof reddened)\n')
finally:
    shutil.copyfile(backup, target)
    same = filecmp.cmp(backup, target, shallow=False)
    with open(log, 'a') as out:
        out.write(f'=== restored {path}: byte-identical to pre-mutation copy = {same}\n')
    run.unlink(missing_ok=True)
    backup.unlink()
print(name, 'done')
