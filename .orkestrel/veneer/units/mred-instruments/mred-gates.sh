#!/usr/bin/env bash
# Runs each acceptance gate of unit E-ID-MOTION-REDUCED, one log per gate, each with its exit code
# and the load average read before it.
set -u
cd /home/user/veneer-mred || exit 2
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED='src/styles/components/_placeholder.scss src/styles/components/_spinner.scss tests/src/styles/components/placeholder.test.ts tests/src/styles/components/spinner.test.ts guides/veneer.md'
run() {
	local gate=$1
	shift
	local log="tmp/units/mred-$gate.log.txt"
	cat /proc/loadavg > "$log"
	"$@" >> "$log" 2>&1
	echo "exit=$?" >> "$log"
}
run format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $OWNED
run check npm run check
run lint npm run lint:check
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
run styles npm run test:src:styles
