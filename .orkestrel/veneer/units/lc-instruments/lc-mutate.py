"""lc-mutate.py: runs each named mutation against the fixed tree in the scratch copy.

For each mutation it mirrors the worktree into tmp/probe/lc-scratch with the shared patch (through
lc-sync.sh), rewrites exactly one site in one style partial, builds the styles, runs the proofs the
mutation targets, and appends the mutated site, the command, both exits, the summary lines, and the
failing case names to tmp/units/lc-mutations.log.txt. Each full run log is kept as
tmp/units/lc-mutation-<id>.log.txt. The scratch copy is re-mirrored before the next mutation, so no
mutation outlives its own run.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path('/home/user/veneer-lc')
SCRATCH = ROOT / 'tmp/probe/lc-scratch'
LOG = ROOT / 'tmp/units/lc-mutations.log.txt'
BASE = 'ac74459'

MUTATIONS = [
    ('M1', 'the rule tries the candidates in reverse order', 'src/styles/_mixins.scss',
     """	@each $label, $triplet in $candidates {
		$value: ratio($channels, $triplet);""",
     """	$reversed: ();
	@each $label, $triplet in $candidates {
		$reversed: map.merge(($label: $triplet), $reversed);
	}
	@each $label, $triplet in $reversed {
		$value: ratio($channels, $triplet);""",
     ['tests/src/styles/mixins.test.ts']),
    ('M2', 'the rule minimum is raised to 4.6', 'src/styles/_mixins.scss',
     '@function contrast($channels, $candidates, $minimum: 4.5) {',
     '@function contrast($channels, $candidates, $minimum: 4.6) {',
     ['tests/src/styles/mixins.test.ts']),
    ('M3', 'the primary label is pinned to white', 'src/styles/components/_button.scss',
     """		$label: label($triplets, tokens.$candidates);
""",
     """		$label: label($triplets, tokens.$candidates);
		@if $role == 'primary' {
			$label: var(--vn-palette-white-base);
		}
""",
     ['tests/src/styles/components/button.test.ts']),
    ('M4', 'the variants read --vn-state-mixer again', 'src/styles/components/_button.scss',
     '#{$mixer}', 'var(--vn-state-mixer)',
     ['tests/src/styles/components/button.test.ts']),
    ('M5', 'the $dark-labels list is restored', 'src/styles/utilities/_color-bg.scss',
     None, 'ac74459',
     ['tests/src/styles/utilities/color-bg.test.ts']),
    ('M6', 'the dark pick is written for both modes', 'src/styles/_mixins.scss',
     "	@return string.unquote('light-dark(#{$light}, #{$dark})');",
     "	@return string.unquote('#{$dark}');",
     ['tests/src/styles/components/button.test.ts']),
    ('M7', 'the dark veil reads the black palette entry', 'src/styles/_tokens.scss',
     "	'state-mixer': 'var(--vn-palette-white-base)',",
     "	'state-mixer': 'var(--vn-palette-black-base)',",
     ['tests/src/styles/elements/button.test.ts', 'tests/src/styles/components/button.test.ts']),
    ('M8', 'the colored-link hover is written as the resting color', 'src/styles/utilities/_link.scss',
     """				color: rgb(from #{$moved} r g b / var(--bs-link-opacity, 1)) !important;
				text-decoration-color: rgb(
					from #{$moved} r g b / var(--bs-link-underline-opacity, 1)
				) !important;""",
     """				color: rgba(var(--vn-color-#{$role}-rgb), var(--bs-link-opacity, 1)) !important;
				text-decoration-color: rgba(
					var(--vn-color-#{$role}-rgb),
					var(--bs-link-underline-opacity, 1)
				) !important;""",
     ['tests/src/styles/utilities/link.test.ts']),
    ('M9', 'the tooltip label is pinned to black', 'src/styles/components/_validation.scss',
     '			color: #{label(map.get(tokens.$triplets, $role), tokens.$candidates)};',
     '			color: var(--vn-palette-black-base);',
     ['tests/src/styles/components/validation.test.ts']),
    ('M10', 'the scheme function writes a pair even where the modes agree', 'src/styles/_mixins.scss',
     """	@if $light == $dark {
		@return string.unquote('#{$light}');
	}
	@return string.unquote('light-dark""",
     """	@return string.unquote('light-dark""",
     ['tests/src/styles/mixins.test.ts']),
]


def run(command, **kwargs):
    return subprocess.run(command, capture_output=True, text=True, **kwargs)


def main(selected):
    for ident, description, site, old, new, files in MUTATIONS:
        if selected and ident not in selected:
            continue
        sync = run(['bash', str(ROOT / 'tmp/units/lc-sync.sh')])
        if sync.returncode != 0:
            raise SystemExit(f'sync failed: {sync.stderr}')
        target = SCRATCH / site
        if old is None:
            text = run(['git', '-C', str(ROOT), 'show', f'{BASE}:{site}']).stdout
            detail = f'{site} replaced by its {BASE} text'
        else:
            text = target.read_text()
            count = text.count(old)
            if count < 1:
                raise SystemExit(f'{ident}: site not found in {site}')
            text = text.replace(old, new)
            detail = f'{site}: {count} occurrence(s) of the site rewritten'
        target.write_text(text)
        name = f'lc-mutation-{ident}.log.txt'
        run(['bash', str(ROOT / 'tmp/units/lc-run.sh'), name, *files])
        body = (ROOT / 'tmp/units' / name).read_text()
        plain = re.sub(r'\x1b\[[0-9;]*m', '', body)
        summary = [line for line in plain.splitlines() if re.match(r'^# (build|vitest) exit|^ Test Files|^      Tests', line)]
        command = [line for line in plain.splitlines() if line.startswith('# command:')]
        failing = sorted({line.strip() for line in plain.splitlines() if line.lstrip().startswith('FAIL ')})
        with LOG.open('a') as handle:
            handle.write(f'## {ident}: {description}\n')
            handle.write(f'site: {detail}\n')
            handle.write('\n'.join(command + summary) + '\n')
            handle.write('failing cases:\n')
            handle.write('\n'.join(f'  {line}' for line in failing) + '\n')
            handle.write(f'full log: tmp/units/{name}\n\n')
        print(ident, ' | '.join(summary))
    run(['bash', str(ROOT / 'tmp/units/lc-sync.sh')])


if __name__ == '__main__':
    main(set(sys.argv[1:]))
