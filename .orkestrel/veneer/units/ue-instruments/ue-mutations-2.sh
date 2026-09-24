#!/bin/bash
# UTIL-EFFECT round-2 runs on the validation copy at tmp/probe/base (the base commit, the owned
# files, and the round-2 shared patch). Each run records its site, its command, its exits, its
# summary line, and its failing cases in tmp/units/ue-mutations-2.log.txt, and every planted change
# is reverted before the next run. The copy's cascade is rebuilt at the end.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
W=/home/user/veneer-ue
B=$W/tmp/probe/base
U=$W/tmp/units
LOG=$U/ue-mutations-2.log.txt
CSS=$B/dist/src/styles/index.css
STYLES="tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts"
: > "$LOG"
cd $B
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
record() {
  local name=$1 site=$2 command=$3 build=$4 test=$5 out=$6
  {
    echo "== $name"
    echo "site: $site"
    echo "command: $command"
    echo "build exit: $build; test exit: $test"
    echo "$out" | grep -E "Tests +[0-9]" | tail -n 1 | sed 's/^ *//'
    echo "$out" | grep -E "^ +× " | sed 's/^ *× |[^|]*| //; s/ [0-9]*ms$//'
    echo
  } >> "$LOG"
}
styles() { timeout 600 npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose "$@" 2>&1; }
setup() { timeout 600 npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts 2>&1; }

npm run build:src:styles > /dev/null 2>&1; b=$?
out=$(styles $STYLES); t=$?
record "unmutated styles proofs" "none" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose $STYLES" $b $t "$out"

# E-a: the small shadow written over another step's alias.
cp src/styles/utilities/_shadow.scss $U/../probe/ue-shadow.keep
replace src/styles/utilities/_shadow.scss "sm: var(--bs-box-shadow-sm)," "sm: var(--bs-box-shadow),"
npm run build:src:styles > /dev/null 2>&1; b=$?
out=$(styles $STYLES); t=$?
record "shadow-sm written over the default alias (sm: var(--bs-box-shadow-sm) -> sm: var(--bs-box-shadow))" "src/styles/utilities/_shadow.scss" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose $STYLES" $b $t "$out"
cp $U/../probe/ue-shadow.keep src/styles/utilities/_shadow.scss
npm run build:src:styles > /dev/null 2>&1

# E-a: the cascade reader's negative controls on planted copies of the built cascade.
out=$(node $U/ue-cascade-keys-2.mjs $B 2>&1); t=$?
record "cascade reader over the built cascade" "none" "node tmp/units/ue-cascade-keys-2.mjs tmp/probe/base" - $t "$out"
echo "$out" | tr -d '\n' | sed 's/  */ /g' >> "$LOG"; printf '\n\n' >> "$LOG"
cp $CSS $U/../probe/ue-cascade-extra.css
printf '\n.shadow-xl{box-shadow:var(--bs-box-shadow-lg)!important}\n' >> $U/../probe/ue-cascade-extra.css
out=$(node $U/ue-cascade-keys-2.mjs $B $U/../probe/ue-cascade-extra.css 2>&1); t=$?
record "cascade reader over a copy with an extra .shadow-xl rule planted" "tmp/probe/ue-cascade-extra.css" "node tmp/units/ue-cascade-keys-2.mjs tmp/probe/base tmp/probe/ue-cascade-extra.css" - $t "$out"
echo "$out" | tr -d '\n' | sed 's/  */ /g' >> "$LOG"; printf '\n\n' >> "$LOG"
cp $CSS $U/../probe/ue-cascade-normal.css
replace $U/../probe/ue-cascade-normal.css ".opacity-25{opacity:.25!important}" ".opacity-25{opacity:.25}"
out=$(node $U/ue-cascade-keys-2.mjs $B $U/../probe/ue-cascade-normal.css 2>&1); t=$?
record "cascade reader over a copy with the .opacity-25 importance dropped" "tmp/probe/ue-cascade-normal.css" "node tmp/units/ue-cascade-keys-2.mjs tmp/probe/base tmp/probe/ue-cascade-normal.css" - $t "$out"
echo "$out" | tr -d '\n' | sed 's/  */ /g' >> "$LOG"; printf '\n\n' >> "$LOG"

# E-c: the readings behind the opacity and shadow sentences, through a throwaway probe proof.
cp $U/ue-probe-2.test.ts tests/src/styles/utilities/ue-probe-2.test.ts
out=$(styles tests/src/styles/utilities/ue-probe-2.test.ts); t=$?
record "guide readings over the built cascade" "tests/src/styles/utilities/ue-probe-2.test.ts (probe, deleted after)" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/ue-probe-2.test.ts" - $t "$out"
echo "$out" | grep -E '^\{"resting"|✓' | sed 's/^ *//' >> "$LOG"; echo >> "$LOG"
replace $CSS ".opacity-25{opacity:.25!important}" ".opacity-25{opacity:.25}"
out=$(styles tests/src/styles/utilities/ue-probe-2.test.ts); t=$?
record "guide readings with the .opacity-25 importance dropped from the built cascade" "dist/src/styles/index.css (.opacity-25{opacity:.25!important} -> .opacity-25{opacity:.25})" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/utilities/ue-probe-2.test.ts" - $t "$out"
echo "$out" | grep -E '✓' | sed 's/^ *//' >> "$LOG"; echo >> "$LOG"
npm run build:src:styles > /dev/null 2>&1
rm tests/src/styles/utilities/ue-probe-2.test.ts

# E-c: the focus-ring case the edited comment annotates, under the helper written important and
# under the utility's importance dropped.
replace $CSS ".shadow-none{box-shadow:none!important}" ".shadow-none{box-shadow:none}"
out=$(styles tests/src/styles/components/focus-ring.test.ts); t=$?
record "focus-ring proof with the .shadow-none importance dropped from the built cascade" "dist/src/styles/index.css" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/focus-ring.test.ts" - $t "$out"
npm run build:src:styles > /dev/null 2>&1
cp src/styles/components/_focus-ring.scss $U/../probe/ue-focus-ring.keep
replace src/styles/components/_focus-ring.scss "var(--bs-focus-ring-width) var(--bs-focus-ring-color);" "var(--bs-focus-ring-width) var(--bs-focus-ring-color) !important;"
npm run build:src:styles > /dev/null 2>&1; b=$?
out=$(styles tests/src/styles/components/focus-ring.test.ts); t=$?
record "focus-ring proof with the helper's box-shadow written important" "src/styles/components/_focus-ring.scss" "npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/focus-ring.test.ts" $b $t "$out"
cp $U/../probe/ue-focus-ring.keep src/styles/components/_focus-ring.scss
npm run build:src:styles > /dev/null 2>&1

# E-b: the registry proof over the dropped resting row and the exemption that replaces it.
out=$(setup); t=$?
record "registry proof, round-2 registry" "none" "npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts" - $t "$out"
cp tests/setup.test.ts $U/../probe/ue-setup-test.keep
replace tests/setup.test.ts "			'Default focus ring',
		])" "		])"
out=$(setup); t=$?
record "registry proof with the Default focus ring exemption removed" "tests/setup.test.ts" "npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts" - $t "$out"
cp $U/../probe/ue-setup-test.keep tests/setup.test.ts
cp tests/setup.ts $U/../probe/ue-setup.keep
replace tests/setup.ts "	Object.freeze({
		scenario: 'focus-ring-roles',
		subject: 'Focus ring roles'," "	Object.freeze({
		scenario: 'default-focus-ring',
		subject: 'Default focus ring',
		selector: '.focus-ring',
		property: 'box-shadow',
	}),
	Object.freeze({
		scenario: 'focus-ring-roles',
		subject: 'Focus ring roles',"
out=$(setup); t=$?
record "registry proof with the default-focus-ring resting row restored beside the exemption" "tests/setup.ts" "npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts" - $t "$out"
cp $U/../probe/ue-setup.keep tests/setup.ts
rm -f $U/../probe/ue-shadow.keep $U/../probe/ue-focus-ring.keep $U/../probe/ue-setup-test.keep $U/../probe/ue-setup.keep $U/../probe/ue-cascade-extra.css $U/../probe/ue-cascade-normal.css
npm run build:src:styles > /dev/null 2>&1
echo "restored; styles rebuilt: exit $?" >> "$LOG"
