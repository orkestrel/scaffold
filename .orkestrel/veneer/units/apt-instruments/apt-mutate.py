# AP-TYPE mutation runner: applies one named edit, rebuilds the styles, runs the owned style proofs,
# restores the exact original bytes, and checks the restored digest. Log: /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-<name>.log.txt
import hashlib, subprocess, sys, pathlib
ROOT = pathlib.Path('/home/user/veneer-apt')
MUTATIONS = {
    'literal': [('src/styles/_mixins.scss',
        '@function heading-size($level) {\n\t@return var(--vn-size-#{9 - $level});',
        '@function heading-size($level) {\n\t@if $level == 1 {\n\t\t@return 2.25rem;\n\t}\n\t@return var(--vn-size-#{9 - $level});')],
    'literal-cap': [('src/styles/_mixins.scss',
        '\t@include breakpoint-up(xl) {\n\t\tfont-size: $size;',
        '\t@include breakpoint-up(xl) {\n\t\tfont-size: if($size == heading-size(1), 2.25rem, $size);'),
        ('src/styles/utilities/_font.scss',
        '$caps: map.set($caps, $level, heading-size($level));',
        '$caps: map.set($caps, $level, if($level == 1, 2.25rem, heading-size($level)));')],
    'cap': [('src/styles/_mixins.scss',
        '\tfont-size: fluid($size);\n\t@include breakpoint-up(xl) {\n\t\tfont-size: $size;\n\t}\n',
        '\tfont-size: fluid($size);\n')],
    'xxl': [('src/styles/_mixins.scss', '(1 - 100vw / #{breakpoint(xl)})', '(1 - 100vw / #{breakpoint(xxl)})'),
            ('src/styles/_mixins.scss', '\t@include breakpoint-up(xl) {\n\t\tfont-size: $size;', '\t@include breakpoint-up(xxl) {\n\t\tfont-size: $size;'),
            ('src/styles/utilities/_font.scss', '@include breakpoint-up(xl) {\n\t\t@include utility(fs', '@include breakpoint-up(xxl) {\n\t\t@include utility(fs')],
    'xxl-cap': [('src/styles/_mixins.scss', '\t@include breakpoint-up(xl) {\n\t\tfont-size: $size;', '\t@include breakpoint-up(xxl) {\n\t\tfont-size: $size;'),
            ('src/styles/utilities/_font.scss', '@include breakpoint-up(xl) {\n\t\t@include utility(fs', '@include breakpoint-up(xxl) {\n\t\t@include utility(fs')],
    'guard': [('src/styles/_mixins.scss', 'max($size * 0.9 - 1.125rem, 0px)', '($size * 0.9 - 1.125rem)')],
    'important': [('src/styles/utilities/_font.scss',
        '\t\t@include utility(fs, font-size, $caps);\n',
        '\t\t@each $level, $cap in $caps {\n\t\t\t.fs-#{$level} {\n\t\t\t\tfont-size: $cap;\n\t\t\t}\n\t\t}\n')],
}
FILES = ['tests/src/styles/elements/heading.test.ts', 'tests/src/styles/elements/fieldset.test.ts',
         'tests/src/styles/components/type.test.ts', 'tests/src/styles/utilities/font.test.ts',
         'tests/src/styles/mixins.test.ts']
name = sys.argv[1]
log = ROOT / f'/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-mutation-{name}.log.txt'
originals = {}
for path, old, new in MUTATIONS[name]:
    target = ROOT / path
    originals.setdefault(path, target.read_bytes())
    text = target.read_text()
    assert text.count(old) == 1, (path, old)
    target.write_text(text.replace(old, new))
try:
    with open(log, 'w') as out:
        out.write(f'=== mutation {name}\n')
        out.write(subprocess.run(['git', 'diff', '--', *originals], cwd=ROOT, capture_output=True, text=True).stdout)
        build = subprocess.run(['npm', 'run', 'build:src:styles'], cwd=ROOT, capture_output=True, text=True)
        out.write(f'=== build exit {build.returncode}\n')
        run = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=verbose', *FILES], cwd=ROOT, capture_output=True, text=True)
        lines = [l for l in (run.stdout + run.stderr).splitlines() if 'externalized' not in l]
        out.write('\n'.join(lines) + f'\n=== vitest exit {run.returncode}\n')
finally:
    for path, data in originals.items():
        (ROOT / path).write_bytes(data)
    with open(log, 'a') as out:
        for path, data in originals.items():
            same = hashlib.sha256((ROOT / path).read_bytes()).hexdigest() == hashlib.sha256(data).hexdigest()
            out.write(f'=== restored {path} identical={same}\n')
