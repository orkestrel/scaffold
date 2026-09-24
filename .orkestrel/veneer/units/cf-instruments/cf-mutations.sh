#!/usr/bin/env bash
# Runs each named FADE mutation on the scratch copy tmp/probe/cf-copy, one at a time, and restores
# the mutated file from its saved original after each run. Output: tmp/units/cf-mutations.log.txt.
set -u
ROOT=/home/user/veneer-cf/tmp/probe/cf-copy
LOG=/home/user/veneer-cf/tmp/units/cf-mutations.log.txt
SAVE=/home/user/veneer-cf/tmp/probe/cf-save
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
TEST='npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts'
mkdir -p "$SAVE"
: > "$LOG"
cd "$ROOT"
cp src/styles/components/_fade.scss "$SAVE/_fade.scss"
cp src/styles/index.scss "$SAVE/index.scss"

record() {
	local name="$1" site="$2"
	{
		echo "=== $name"
		echo "site: $site"
		echo "diff:"
		diff -u "$3" "$4" | sed -n '3,$p'
	} >> "$LOG"
	npm run build:src > "$SAVE/build.txt" 2>&1
	local build=$?
	$TEST > "$SAVE/test.txt" 2>&1
	local test=$?
	{
		echo "command: npm run build:src && $TEST"
		echo "build exit: $build"
		echo "test exit: $test"
		echo "summary: $(grep -E '^ +Tests ' "$SAVE/test.txt" | sed 's/^ *//')"
		echo "failing cases:"
		grep -E '^ FAIL ' "$SAVE/test.txt" | sed -E 's/^ FAIL .*> fade classes > /  - /'
	} >> "$LOG"
	if [ "${5:-}" = conformance ]; then
		npm run test:conformance > "$SAVE/conformance.txt" 2>&1
		local conformance=$?
		{
			echo "command: npm run test:conformance"
			echo "conformance exit: $conformance"
			echo "summary: $(grep -E '^ +Tests ' "$SAVE/conformance.txt" | sed 's/^ *//')"
			echo "failing cases:"
			grep -E '^ FAIL ' "$SAVE/conformance.txt" | sed -E 's/^ FAIL  \|conformance\| tests\/conformance.test.ts > /  - /'
		} >> "$LOG"
	fi
	echo >> "$LOG"
}

# M1: the `:not(.show)` state dropped.
python3 - <<'PY'
p='src/styles/components/_fade.scss'
s=open(p).read()
old="\n\t.fade:not(.show) {\n\t\topacity: 0;\n\t}\n"
assert old in s
open(p,'w').write(s.replace(old,"\n"))
PY
record 'M1 the :not(.show) state dropped' 'src/styles/components/_fade.scss, the .fade:not(.show) rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M2: the duration written as a literal.
sed -i 's/@include transition(opacity var(--vn-motion-feedback) linear);/@include transition(opacity 0.15s linear);/' src/styles/components/_fade.scss
record 'M2 the duration written as a literal' 'src/styles/components/_fade.scss, the .fade rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M3: the reduced-motion twin dropped.
sed -i 's/@include transition(opacity var(--vn-motion-feedback) linear);/transition: opacity var(--vn-motion-feedback) linear;/' src/styles/components/_fade.scss
record 'M3 the reduced-motion twin dropped' 'src/styles/components/_fade.scss, the .fade rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M4: the partial loaded after the collapse partial.
python3 - <<'PY'
p='src/styles/index.scss'
s=open(p).read()
old="@use 'components/fade';\n@use 'components/collapse';\n"
assert old in s
open(p,'w').write(s.replace(old,"@use 'components/collapse';\n@use 'components/fade';\n"))
PY
record 'M4 the partial loaded after collapse' 'src/styles/index.scss, the fade and collapse @use lines' "$SAVE/index.scss" src/styles/index.scss conformance
cp "$SAVE/index.scss" src/styles/index.scss

# Control: the unmutated partial and barrel.
record 'Control, no mutation' 'none' "$SAVE/_fade.scss" src/styles/components/_fade.scss
