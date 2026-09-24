#!/usr/bin/env bash
# Runs the unit's scoped gates in order and records each command, exit, and result line.
cd /home/user/veneer-bcf || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=tmp/units/bcf-gates.log.txt
: > "$OUT"
run() {
	echo "== $*" >> "$OUT"
	"$@" > tmp/units/bcf-gate-last.log.txt 2>&1
	code=$?
	sed 's/\x1b\[[0-9;]*m//g' tmp/units/bcf-gate-last.log.txt | grep -E "Tests |Test Files|matched files|Format issues|Found [0-9]+ warning|errors?\b|FAIL" | tail -6 >> "$OUT"
	echo "exit $code" >> "$OUT"
}
run npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts
run npm run lint:check
run npm run check
run npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts
run npm run test:setup
rm -f tmp/units/bcf-gate-last.log.txt
