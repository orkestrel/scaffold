#!/bin/bash
# UTIL-EFFECT mutation runs. Each run copies the worktree's owned partials into the validation copy
# at tmp/probe/base, applies one mutation there, rebuilds the styles, runs the owned styles proofs,
# and appends the mutated site, the command, the build and test exits, the summary line, and the
# failing case names to tmp/units/ue-mutations.log.txt. The partials are restored after each run and
# the cascade is rebuilt at the end. A `dist:` site mutates the built cascade after the build.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
W=/home/user/veneer-ue
B=$W/tmp/probe/base
LOG=$W/tmp/units/ue-mutations.log.txt
TESTS="tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts"
: > "$LOG"
restore() {
  cp $W/src/styles/utilities/_opacity.scss $W/src/styles/utilities/_shadow.scss $B/src/styles/utilities/
  cp $W/src/styles/components/_focus-ring.scss $B/src/styles/components/
}
replace() {
  python3 - "$1" "$2" "$3" <<'PY'
import sys
p, a, b = sys.argv[1:]
s = open(p).read()
if a not in s:
    sys.exit('pattern missing: ' + a)
open(p, 'w').write(s.replace(a, b, 1))
PY
}
mutate() {
  local name=$1 site=$2 from=$3 to=$4
  restore
  cd $B
  if [[ $site != dist:* ]]; then replace "$B/$site" "$from" "$to" || { echo "== $name: pattern missing" >> "$LOG"; return; }; fi
  npm run build:src:styles > /dev/null 2>&1; local build=$?
  if [[ $site == dist:* ]]; then replace "$B/dist/src/styles/index.css" "$from" "$to" || { echo "== $name: pattern missing" >> "$LOG"; return; }; fi
  local out; out=$(timeout 600 npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose $TESTS 2>&1); local test=$?
  {
    echo "== $name"
    echo "site: $site"
    echo "from: $from"
    echo "to: $to"
    echo "command: npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose $TESTS"
    echo "build exit: $build; test exit: $test"
    echo "$out" | grep -E "Tests +[0-9]" | tail -n 1 | sed 's/^ *//'
    echo "$out" | grep -E "^ +× " | sed 's/^ *× |[^|]*| //; s/ [0-9]*ms$//'
    echo
  } >> "$LOG"
}
S=src/styles/utilities/_shadow.scss; O=src/styles/utilities/_opacity.scss; F=src/styles/components/_focus-ring.scss
mutate "shadow written as a literal" $S "null: var(--bs-box-shadow)," "null: 0 0.5rem 1rem rgba(0, 0, 0, 0.15),"
mutate "shadow-lg reads the default alias" $S "lg: var(--bs-box-shadow-lg)," "lg: var(--bs-box-shadow),"
mutate "shadow written responsive" $S "			\$infix
		);" "			\$infix,
			\$responsive: true
		);"
mutate "shadow order reversed" $S "				null: var(--bs-box-shadow),
				sm: var(--bs-box-shadow-sm),
				lg: var(--bs-box-shadow-lg),
				none: none," "				none: none,
				lg: var(--bs-box-shadow-lg),
				sm: var(--bs-box-shadow-sm),
				null: var(--bs-box-shadow),"
mutate "shadow-none important dropped" dist:index.css ".shadow-none{box-shadow:none!important}" ".shadow-none{box-shadow:none}"
mutate "opacity step mis-valued" $O "25: 0.25," "25: 0.3,"
mutate "opacity written responsive" $O "			\$infix
		);" "			\$infix,
			\$responsive: true
		);"
mutate "opacity order reversed" $O "				0: 0,
				25: 0.25,
				50: 0.5,
				75: 0.75,
				100: 1," "				100: 1,
				75: 0.75,
				50: 0.5,
				25: 0.25,
				0: 0,"
mutate "opacity-50 important dropped" dist:index.css ".opacity-50{opacity:.5!important}" ".opacity-50{opacity:.5}"
mutate "css-var written important" $F "	@include utility-variable(focus-ring, focus-ring-color, \$colors);" "	@each \$role, \$value in \$colors {
		.focus-ring-#{\$role} {
			--bs-focus-ring-color: #{\$value} !important;
		}
	}"
mutate "primary role omitted" $F "	@each \$role in tokens.\$aliased {" "	@each \$role in secondary, success, info, warning, danger, light, dark {"
mutate "role order reversed" $F "	@each \$role in tokens.\$aliased {" "	@each \$role in dark, light, danger, warning, info, success, secondary, primary {"
mutate "forced-ring omitted" $F "		@include forced-ring;" ""
mutate "helper written important" $F "var(--bs-focus-ring-width) var(--bs-focus-ring-color);" "var(--bs-focus-ring-width) var(--bs-focus-ring-color) !important;"
mutate "helper without the focus condition" $F "	.focus-ring:focus {" "	.focus-ring {"
mutate "helper color written as a literal" $F "var(--bs-focus-ring-width) var(--bs-focus-ring-color);" "var(--bs-focus-ring-width) rgba(13, 110, 253, 0.25);"
mutate "helper offsets written without the variables" $F "var(--bs-focus-ring-x, 0) var(--bs-focus-ring-y, 0) var(--bs-focus-ring-blur, 0)" "0 0 0"
restore
cd $B && npm run build:src:styles > /dev/null 2>&1
echo "restored; styles rebuilt: exit $?" >> "$LOG"
