#!/usr/bin/env bash
# Runs the LEDGER-ADDITIONS acceptance gates one at a time, each into its own log with its exit.
set -u
cd /home/user/veneer-lad
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
gate() {
	local name=$1; shift
	{ echo "load=$(cat /proc/loadavg)"; "$@"; echo "exit=$?"; } > "tmp/units/lad-$name.log.txt" 2>&1
}
gate oxfmt-owned ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts
gate check npm run check
gate lint-check npm run lint:check
gate setup npx vitest run --project setup tests/setupServer.test.ts
gate test-conformance npm run test:conformance
gate test-guides npm run test:guides
gate test-policy npm run test:policy
gate format-check npm run format:check
