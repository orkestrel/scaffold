#!/usr/bin/env bash
# Runs round 2's scoped gates in order, keeping each run's whole output and a summary with its exit.
cd /home/user/veneer-bcf || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=tmp/units/bcf-gates-2.log.txt
: > "$OUT"
step=0
run() {
	step=$((step + 1))
	full="tmp/units/bcf-gates-2-$step.log.txt"
	echo "== $*" >> "$OUT"
	"$@" > "$full" 2>&1
	code=$?
	sed 's/\x1b\[[0-9;]*m//g' "$full" | grep -E "Tests |Test Files|matched files|Format issues|Found [0-9]+ |FAIL" | tail -6 >> "$OUT"
	echo "exit $code (whole output: $full)" >> "$OUT"
}
run npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts
run npm run lint:check
run npm run check
run npm run test:setup
run npm run test:setup:browser
run npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts
