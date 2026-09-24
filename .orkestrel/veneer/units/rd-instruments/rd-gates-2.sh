#!/usr/bin/env bash
# rd round 2 gate chain (successor of rd-gates.sh; logs renamed with the -2 suffix): each gate's command, exit, and result line, logged under tmp/units/.
cd /home/user/veneer-rd || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
run() {
	local name="$1"; shift
	"$@" > "tmp/units/rd-gate-$name-2.log.txt" 2>&1
	local code=$?
	echo "[$name] $* -> exit $code"
}
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
cmp tmp/units/rd-base.css dist/src/styles/index.css; echo "[cmp] cmp tmp/units/rd-base.css dist/src/styles/index.css -> exit $?"
run styles npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/table.test.ts tests/src/styles/components/offcanvas.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
