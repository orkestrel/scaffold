#!/usr/bin/env bash
# Successor of tmp/units/mtoast-gates.sh for round 2: runs every acceptance gate, logging each to
# tmp/units/mtoast-<gate>-2.log.txt with the command echoed first and its exit and load appended.
cd /home/user/veneer-mtoast || exit 1
. tmp/units/mtoast-env.sh
gate() {
	local name=$1
	shift
	{
		echo "\$ $*"
		"$@"
		echo "exit=$?"
		cat /proc/loadavg
	} > "tmp/units/mtoast-$name-2.log.txt" 2>&1
	echo "$name $(grep '^exit=' "tmp/units/mtoast-$name-2.log.txt")"
}
gate format ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts tests/src/styles/components/fade.test.ts tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md
gate lint npm run lint:check
gate check npm run check
gate build-src npm run build:src
gate styles npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/toast.test.ts tests/src/styles/components/fade.test.ts
gate setup npm run test:setup
gate conformance npm run test:conformance
gate guides npm run test:guides
gate policy npm run test:policy
gate engine npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Toast.test.ts
gate app npm run test:app
gate src-styles npm run test:src:styles
