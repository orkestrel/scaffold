#!/usr/bin/env bash
# Reruns the PAGE-FRAME acceptance gates in order and logs each exit. Log: tmp/units/pf-gates.log.txt
set -u
cd /home/user/veneer-pf
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/pf-gates.log.txt
: > "$LOG"
gate() {
	local name=$1; shift
	local out=tmp/units/pf-gate-$name.log.txt
	"$@" > "$out" 2>&1
	local code=$?
	{ echo "== $name"; echo "command: $*"; echo "exit: $code"; grep -E "Tests |All matched|Format issues|Found [0-9]+ (warning|error)" "$out" | tail -2; } >> "$LOG"
}
gate format npx oxfmt --check tests/setupBrowser.ts tests/setupBrowser.test.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts
gate lint npm run lint:check
gate check npm run check
gate setup npm run test:setup
gate setup-browser npm run test:setup:browser
