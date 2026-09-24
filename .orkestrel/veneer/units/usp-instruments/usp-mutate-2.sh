#!/usr/bin/env bash
# Round 2 mutation runs on the validation copy. For each auto-margin member, the auto margin is
# written as zero by a later important rule in the utilities layer, and the auto-margin section case
# runs alone; then the setup binding case runs under its table mutations. Every mutated file is
# restored byte for byte, and each run's output stays under tmp/units.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp/tmp/probe/base
# The setup proofs read the built cascade, so the copy is built before any run.
npm run build:src > /dev/null 2>&1; echo "build:src exit $?"
OUT=/home/user/veneer-usp/tmp/units/usp-mutate-2-run.log.txt
S=src/styles/utilities/_spacing.scss
CASE="pushes each auto-margin card to the end, the start, or the middle of its line"
report() { echo "test exit $1"; grep -E "^\s+Tests " "$OUT"; grep -E "^ FAIL " "$OUT" | sed 's/|app:browser (chromium)| //; s/|setup| //'; grep -E "AssertionError" "$OUT" | head -3; }
while read -r name props; do
	echo "== the .${name} auto margin written as zero"
	cp "$S" "$S.usp-keep"
	rule="@layer utilities { .${name} {"
	for p in ${props//,/ }; do rule="$rule ${p}: 0 !important;"; done
	rule="$rule } }"
	echo "$rule" >> "$S"
	echo "site: $S, appended: $rule"
	echo "command: npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts -t \"$CASE\""
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts -t "$CASE" > "$OUT" 2>&1
	report $?
	mv "$S.usp-keep" "$S"
done <<'LIST'
m-auto margin
mx-auto margin-right,margin-left
my-auto margin-top,margin-bottom
mt-auto margin-top
me-auto margin-right
mb-auto margin-bottom
ms-auto margin-left
LIST
echo "== restored: the case unmutated"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts -t "$CASE" > "$OUT" 2>&1
report $?
T=tests/setupStyles.ts
for pair in "the margin row's prefix written as p|property: 'margin', prefix: 'm'|property: 'margin', prefix: 'p'" "step 3 naming the --vn-space-6 token|pixels: 16, token: TOKEN_NAMES.space[8]|pixels: 16, token: TOKEN_NAMES.space[6]" "the end suffix naming the left side|suffix: 'e', sides: Object.freeze(['right'])|suffix: 'e', sides: Object.freeze(['left'])"; do
	IFS='|' read -r label old new <<< "$pair"
	echo "== setup table: $label"
	cp "$T" "$T.usp-keep"
	python3 -c "import sys;p,o,n=sys.argv[1:];s=open(p).read();assert s.count(o)==1,o;open(p,'w').write(s.replace(o,n))" "$T" "$old" "$new"
	echo "site: $T, $old -> $new"
	echo "command: npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts > "$OUT" 2>&1
	report $?
	mv "$T.usp-keep" "$T"
done
echo "== restored: the setup proof unmutated"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts > "$OUT" 2>&1
report $?
echo "== the cascade census and its negative controls"
/home/user/veneer-usp/tmp/units/usp-cascade-controls-2.sh
