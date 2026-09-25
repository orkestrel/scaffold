#!/usr/bin/env bash
# Runs each acceptance gate into its own log with the exit code and load average appended.
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
OWNED="guides/veneer.md src/styles/components/_form-floating.scss src/styles/components/_progress.scss src/styles/components/_nav.scss src/styles/components/_pagination.scss src/styles/components/_navbar.scss src/styles/components/_accordion.scss tests/src/styles/components/form-floating.test.ts tests/src/styles/components/progress.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/pagination.test.ts tests/src/styles/components/navbar.test.ts tests/src/styles/components/accordion.test.ts"
run() {
	local gate="$1"; shift
	local log="tmp/units/mfac-$gate.log.txt"
	{ echo "loadavg=$(cat /proc/loadavg)"; "$@"; echo "exit=$?"; echo "loadavg=$(cat /proc/loadavg)"; } > "$log" 2>&1
}
run format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $OWNED
run check npm run check
run lint npm run lint:check
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
