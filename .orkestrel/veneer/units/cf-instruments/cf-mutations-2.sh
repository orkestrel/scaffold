#!/usr/bin/env bash
# Runs the further FADE mutations each test comment names, beyond the brief's four, on the scratch
# copy tmp/probe/cf-copy, and appends each run to tmp/units/cf-mutations.log.txt. Each mutated file
# is restored from its saved original after its run.
set -u
ROOT=/home/user/veneer-cf/tmp/probe/cf-copy
LOG=/home/user/veneer-cf/tmp/units/cf-mutations.log.txt
SAVE=/home/user/veneer-cf/tmp/probe/cf-save
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
STYLE='npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts'
SECTION='npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts'
mkdir -p "$SAVE"
cd "$ROOT"
cp src/styles/components/_fade.scss "$SAVE/_fade.scss"
cp app/browser/constants.ts "$SAVE/constants.ts"

record() {
	local name="$1" site="$2" original="$3" mutated="$4" test="$5" build="$6"
	{
		echo "=== $name"
		echo "site: $site"
		echo "diff:"
		diff -u "$original" "$mutated" | sed -n '3,$p'
	} >> "$LOG"
	local built=skipped
	if [ "$build" = yes ]; then
		npm run build:src > "$SAVE/build.txt" 2>&1
		built=$?
	fi
	$test > "$SAVE/test.txt" 2>&1
	local code=$?
	{
		if [ "$build" = yes ]; then echo "command: npm run build:src && $test"; else echo "command: $test"; fi
		echo "build exit: $built"
		echo "test exit: $code"
		echo "summary: $(sed 's/\x1b\[[0-9;]*m//g' "$SAVE/test.txt" | grep -E '^ +Tests ' | sed 's/^ *//')"
		echo "failing cases:"
		sed 's/\x1b\[[0-9;]*m//g' "$SAVE/test.txt" | grep -E '^ FAIL ' | sed -E 's/^ FAIL .*> (fade classes|FadeSection) > /  - /'
		echo
	} >> "$LOG"
}

swap() {
	python3 - "$1" "$2" "$3" <<'PY'
import sys
path, old, new = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(path).read()
assert text.count(old) == 1, (path, old)
open(path, 'w').write(text.replace(old, new))
PY
}

# M5: the hidden state's qualifier dropped, so the rule reaches the shown element.
swap src/styles/components/_fade.scss $'\t.fade:not(.show) {' $'\t.fade {'
record 'M5 the hidden state written as a bare .fade rule' 'src/styles/components/_fade.scss, the .fade:not(.show) rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss "$STYLE" yes
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M6: an added shown-state rule on the fade and show classes.
swap src/styles/components/_fade.scss $'\t.fade:not(.show) {\n\t\topacity: 0;\n\t}\n' $'\t.fade:not(.show) {\n\t\topacity: 0;\n\t}\n\n\t.fade.show {\n\t\topacity: 1;\n\t}\n'
record 'M6 an added .fade.show rule' 'src/styles/components/_fade.scss, after the .fade:not(.show) rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss "$STYLE" yes
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M7: the hidden state taken out of hit testing.
swap src/styles/components/_fade.scss $'\t\topacity: 0;\n' $'\t\topacity: 0;\n\t\tpointer-events: none;\n'
record 'M7 the hidden state taken out of hit testing' 'src/styles/components/_fade.scss, the .fade:not(.show) rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss "$STYLE" yes
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss

# M8: a hidden-state treatment that moves with the color mode.
swap src/styles/components/_fade.scss $'\t.fade:not(.show) {\n\t\topacity: 0;\n\t}\n' $'\t.fade:not(.show) {\n\t\topacity: 0;\n\t}\n\n\t[data-bs-theme=\'dark\'] .fade:not(.show) {\n\t\topacity: 0.5;\n\t}\n'
record 'M8 a dark-mode retune of the hidden state' 'src/styles/components/_fade.scss, after the .fade:not(.show) rule' "$SAVE/_fade.scss" src/styles/components/_fade.scss "$STYLE" yes
cp "$SAVE/_fade.scss" src/styles/components/_fade.scss
npm run build:src > "$SAVE/build.txt" 2>&1

# S1: the shown specimen drops the show class.
swap app/browser/constants.ts 'card-body fade show">The north pier' 'card-body fade">The north pier'
record 'S1 the shown specimen drops the show class' 'app/browser/constants.ts, TRANSITION_SPECIMENS Fade shown' "$SAVE/constants.ts" app/browser/constants.ts "$SECTION" no
cp "$SAVE/constants.ts" app/browser/constants.ts

# S2: the hidden specimen gains the show class.
swap app/browser/constants.ts 'card-body fade" aria-hidden' 'card-body fade show" aria-hidden'
record 'S2 the hidden specimen gains the show class' 'app/browser/constants.ts, TRANSITION_SPECIMENS Fade hidden' "$SAVE/constants.ts" app/browser/constants.ts "$SECTION" no
cp "$SAVE/constants.ts" app/browser/constants.ts

# S3: the hidden body taken out of the flow, so the card stops reserving its box.
swap app/browser/constants.ts 'card-body fade" aria-hidden' 'card-body fade d-none" aria-hidden'
record 'S3 the hidden body taken out of the flow' 'app/browser/constants.ts, TRANSITION_SPECIMENS Fade hidden' "$SAVE/constants.ts" app/browser/constants.ts "$SECTION" no
cp "$SAVE/constants.ts" app/browser/constants.ts

# Control: the section proof on the unmutated table.
record 'Section control, no mutation' 'none' "$SAVE/constants.ts" app/browser/constants.ts "$SECTION" no
