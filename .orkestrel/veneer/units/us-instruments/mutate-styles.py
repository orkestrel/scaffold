# Mutation sweep for the mixins and gap proofs: each mutation edits one source file from a backup,
# rebuilds the styles, runs both proofs, and copies the backup back.
import os, shutil, subprocess, re
root = '/home/user/veneer-us'
os.chdir(root)
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
MIX = 'src/styles/_mixins.scss'
GAP = 'src/styles/utilities/_gap.scss'
mutations = [
  ('utility-normal', MIX, '#{$property}: $value !important;', '#{$property}: $value;'),
  ('variable-important', MIX, '--bs-#{$variable}: #{$value};', '--bs-#{$variable}: #{$value} !important;'),
  ('responsive-always', MIX, '@if $responsive or $infix == \'\' {', '@if true {'),
  ('responsive-never', MIX, '@if $responsive or $infix == \'\' {', '@if $infix == \'\' {'),
  ('dash-always', MIX, """			@if $key != null {
				@if $name != '' {
					$name: $name + '-';
				}
				$name: $name + $key;
			}
			.#{$name} {
				@each $local""", """			$name: $name + '-' + $key;
			.#{$name} {
				@each $local"""),
  ('step-map-reversed', GAP, 'map.set($spacers, $step, var(--vn-gap-#{$step}))', 'map.set($spacers, $step, var(--vn-gap-#{5 - $step}))'),
  ('step-reads-space', GAP, 'map.set($spacers, $step, var(--vn-gap-#{$step}))', 'map.set($spacers, $step, var(--vn-space-#{$step}))'),
  ('density-factor', GAP, 'map.set($spacers, $step, var(--vn-gap-#{$step}))', 'map.set($spacers, $step, calc(var(--vn-gap-#{$step}) * var(--vn-factor-density)))'),
  ('loop-per-entry', GAP, """		@include utility(gap, gap, $spacers, $infix, true);
		@include utility(row-gap, row-gap, $spacers, $infix, true);
		@include utility(column-gap, column-gap, $spacers, $infix, true);
	}""", """	}
	@include breakpoint-each using ($infix, $_boundary) {
		@include utility(gap, gap, $spacers, $infix, true);
	}
	@include breakpoint-each using ($infix, $_boundary) {
		@include utility(row-gap, row-gap, $spacers, $infix, true);
	}
	@include breakpoint-each using ($infix, $_boundary) {
		@include utility(column-gap, column-gap, $spacers, $infix, true);
	}"""),
]
results = []
for name, path, old, new in mutations:
    text = open(path).read()
    assert text.count(old) == 1, name
    shutil.copy(path, f'tmp/probe/{os.path.basename(path)}.bak')
    open(path, 'w').write(text.replace(old, new))
    try:
        b = subprocess.run(['npm', 'run', 'build:src:styles'], capture_output=True, text=True, env=env)
        r = subprocess.run(['npx', 'vitest', 'run', '--config', 'configs/src/vite.styles.config.ts', '--no-cache', '--reporter=dot', 'tests/src/styles/utilities/gap.test.ts', 'tests/src/styles/mixins.test.ts'], capture_output=True, text=True, env=env)
        out = r.stdout + r.stderr
        open(f'tmp/probe/mutation-{name}.log.txt', 'w').write(out)
        fails = sorted(set(re.findall(r'FAIL .*?(tests/src/styles/[^ ]+) > (.*)', out)))
        tally = re.findall(r'Tests +(.*)', out)
        results.append((name, b.returncode, r.returncode, tally, fails))
    finally:
        shutil.copy(f'tmp/probe/{os.path.basename(path)}.bak', path)
subprocess.run(['npm', 'run', 'build:src:styles'], capture_output=True, text=True, env=env)
for name, build, code, tally, fails in results:
    print(f'== {name}: build={build} exit={code} {tally}')
    for f in fails: print('   ', f[0], '>', f[1])
