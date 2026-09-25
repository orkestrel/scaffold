#!/usr/bin/env bash
# Runs each acceptance gate, logging it to tmp/units/lret-<gate>.log.txt with its load reading and
# exit status.
set -u
cd /home/user/veneer-lret
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED="tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/src/styles/tokens.test.ts guides/veneer.md"
gate() {
	local name="$1"; shift
	{ echo "load $(cat /proc/loadavg)"; echo "command: $*"; "$@" 2>&1; echo "exit=$?"; } > "tmp/units/lret-$name.log.txt"
	tail -1 "tmp/units/lret-$name.log.txt" | sed "s/^/$name /"
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
