#!/usr/bin/env bash
# Runs the round-2 validation copy's gates, one log per gate, and records each command and exit.
cd /home/user/veneer-ut/tmp/probe/base || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
L=/home/user/veneer-ut/tmp/units/ut-2-copy
: > "$L-summary.log.txt"
run() {
	local name=$1
	shift
	"$@" > "$L-$name.log.txt" 2>&1
	local code=$?
	local result
	result=$(sed 's/\x1b\[[0-9;]*m//g' "$L-$name.log.txt" | grep -E 'Tests +[0-9]|All matched files|Found [0-9]+ warning|error TS' | tail -1)
	echo "$* | exit $code | $result" | tee -a "$L-summary.log.txt"
}
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run build-src npm run build:src
run styles-owned npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/text.test.ts tests/src/styles/utilities/color.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/text-truncation.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TextSection.test.ts tests/app/browser/sections/ColorSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run setup-styles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
