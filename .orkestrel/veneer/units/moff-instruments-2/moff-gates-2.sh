#!/usr/bin/env bash
# Successor to moff-gates.sh (round 2): logs carry the -2 suffix. Runs each acceptance gate into its own log, with the command echoed first and the exit and load appended.
cd /home/user/veneer-moff || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
gate() {
	local name=$1; shift
	local log=tmp/units/moff-$name-2.log.txt
	{ echo "\$ $*"; "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
	echo "$name $(grep '^exit=' "$log" | tail -1)"
}
gate format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/styles/components/_offcanvas.scss src/styles/components/_navbar.scss tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts guides/veneer.md
gate check npm run check
gate lint npm run lint:check
gate guides npm run test:guides
gate policy npm run test:policy
gate setup npm run test:setup
gate build-src npm run build:src
gate browser npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts
gate app npm run test:app
gate conformance npm run test:conformance
gate styles npm run test:src:styles
