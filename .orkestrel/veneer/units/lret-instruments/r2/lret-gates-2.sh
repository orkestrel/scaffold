#!/usr/bin/env bash
# Runs each acceptance gate of LEDGER-RETUNE round 2 in order, logging each to
# tmp/units/r2/lret-<gate>.log.txt with the command first, the load, the full output, and the exit
# status, then the observation run over the whole styles project.
. /home/user/veneer-lret/tmp/units/r2/env.sh
set -u
OWNED="tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/tokens.test.ts guides/veneer.md src/styles/_tokens.scss"
gate() {
	local name="$1"; shift
	{ echo "command: $*"; echo "load $(cat /proc/loadavg)"; "$@" 2>&1; echo "exit=$?"; echo "load after $(cat /proc/loadavg)"; } > "tmp/units/r2/lret-$name.log.txt"
	echo "$name $(grep '^exit=' "tmp/units/r2/lret-$name.log.txt")"
}
gate check npm run check
gate lint-check npm run lint:check
gate format-check ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $OWNED
gate setup npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts
gate build-src npm run build:src
gate conformance npm run test:conformance
gate build-src-styles npm run build:src:styles
gate tokens npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/tokens.test.ts
gate guides npm run test:guides
gate policy npm run test:policy
gate src-styles npm run test:src:styles
