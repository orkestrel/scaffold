#!/usr/bin/env bash
# Runs each named mutation on the validation copy: applies it, rebuilds the cascade, runs the owned
# styles proofs (or the setup proof for a table mutation), records the summary and the failing case
# names, and restores the mutated file byte for byte.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp/tmp/probe/base
PROOFS="tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts"
run() {
	local label="$1" file="$2" script="$3" project="${4:-styles}"
	echo "== $label"
	echo "site: $file"
	cp "$file" "$file.usp-keep"
	python3 -c "$script" "$file"
	diff "$file.usp-keep" "$file" | cut -c1-300 | head -8
	if [ "$project" = styles ]; then
		npm run build:src:styles > /dev/null 2>&1; echo "build exit $?"
		echo "command: npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $PROOFS"
		npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $PROOFS > /tmp/usp-null 2>&1; echo "test exit $?"
	elif [ "$project" = dist ]; then
		echo "command: npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $PROOFS"
		npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $PROOFS > /tmp/usp-null 2>&1; echo "test exit $?"
	else
		echo "command: npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
		npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts > /tmp/usp-null 2>&1; echo "test exit $?"
	fi
	grep -E "^\s+Tests " /tmp/usp-null
	grep -E "^ FAIL " /tmp/usp-null | sed 's/^/  /'
	mv "$file.usp-keep" "$file"
}
S=src/styles/utilities/_spacing.scss
I=src/styles/utilities/_interaction.scss
sub() { echo "import sys;p=sys.argv[1];s=open(p).read();o=$1;n=$2;assert o in s,o;open(p,'w').write(s.replace(o,n,1))"; }
run "wrong step map: step 3 reads --vn-space-6" $S "$(sub "'3: var(--vn-space-8)'" "'3: var(--vn-space-6)'")"
run "swapped side: the end margin writes the left side" $S "$(sub "'utility(me, margin-right'" "'utility(me, margin-left'")"
run "breakpoint loop run per entry" $S "import sys;p=sys.argv[1];s=open(p).read();a=s.index('@include breakpoint-each');b=s.rindex('}');body=s[a:b];lines=[l.strip() for l in body.splitlines() if l.strip().startswith('@include utility(')];s=s[:a]+'\n'.join('@include breakpoint-each using (\$infix, \$_boundary) { '+l+' }' for l in lines)+'\n'+s[b:];open(p,'w').write(s)"
run "padding-x emitted before padding" $S "import sys;p=sys.argv[1];s=open(p).read();a='@include utility(p, padding, \$spacers, \$infix, true);';b='@include utility(px, padding-right padding-left, \$spacers, \$infix, true);';assert a in s and b in s;s=s.replace(a,'@@A').replace(b,a).replace('@@A',b);open(p,'w').write(s)"
run "a literal in place of the step token" $S "$(sub "'3: var(--vn-space-8)'" "'3: 1rem'")"
run "a negative margin step shipped" $S "$(sub "'auto: auto,'" "'auto: auto, n1: -0.25rem,'")"
run "pointer-events none written as auto" $I "$(sub "'(none, auto)'" "'(none: auto, auto: auto)'")"
run "user-select all written as auto" $I "$(sub "'(all, auto, none)'" "'(all: auto, auto: auto, none: none)'")"
run "user-select none written as auto" $I "$(sub "'(all, auto, none)'" "'(all: all, auto: auto, none: auto)'")"
run "the spacing partial left unlayered" $S "$(sub "'@layer utilities {'" "'@layer utilities {} @media all {'")"
run "the interaction partial left unlayered" $I "$(sub "'@layer utilities {'" "'@layer utilities {} @media all {'")"
run "user-select auto written as none" $I "$(sub "'(all, auto, none)'" "'(all: all, auto: none, none: none)'")"
npm run build:src:styles > /dev/null 2>&1
run "the built .m-3 and .pe-none rules written normal" dist/src/styles/index.css "import sys;p=sys.argv[1];s=open(p).read();o='.m-3{margin:var(--vn-space-8)!important}';o2='.pe-none{pointer-events:none!important}';assert o in s and o2 in s;open(p,'w').write(s.replace(o,'.m-3{margin:var(--vn-space-8)}',1).replace(o2,'.pe-none{pointer-events:none}',1))" dist
run "setup table: step 3 names the --vn-space-6 token" tests/setupStyles.ts "$(sub "'step: 3, value: \\'1rem\\', pixels: 16, token: TOKEN_NAMES.space[8]'" "'step: 3, value: \\'1rem\\', pixels: 16, token: TOKEN_NAMES.space[6]'")" setup
run "setup table: the end suffix names the left side" tests/setupStyles.ts "$(sub "\"suffix: 'e', sides: Object.freeze(['right'])\"" "\"suffix: 'e', sides: Object.freeze(['left'])\"")" setup
npm run build:src:styles > /dev/null 2>&1; echo "restored build exit $?"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $PROOFS 2>&1 | grep -E "^\s+Tests "
