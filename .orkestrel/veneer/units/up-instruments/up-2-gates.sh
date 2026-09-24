#!/bin/bash
# Runs the round-2 gates on the validation copy and records each command, its exit, and its result
# lines in tmp/units/up-2-gates.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-up/tmp/probe/base || exit 2
LOG=/home/user/veneer-up/tmp/units/up-2-gates.log.txt
: > "$LOG"
run() {
	echo "### $*" >> "$LOG"
	bash -c "$*" > /home/user/veneer-up/tmp/units/up-2-gate-current.log.txt 2>&1
	code=$?
	grep -E "Test Files |Tests |error|Error" /home/user/veneer-up/tmp/units/up-2-gate-current.log.txt | grep -v "externalized" | sed 's/\x1b\[[0-9;]*m//g' | head -12 >> "$LOG"
	echo "exit $code" >> "$LOG"
}
run npm run check
run npm run build:src
run npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/background.test.ts tests/src/styles/utilities/border.test.ts
run npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts tests/app/browser/helpers.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run npm run test:conformance
run "npm run build:src:styles && npm run test:service"
run npm run test:guides
run npm run test:policy
rm -f /home/user/veneer-up/tmp/units/up-2-gate-current.log.txt
