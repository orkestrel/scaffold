#!/usr/bin/env bash
# Runs the owned motion-factor proofs after building the styles; the first argument names the log.
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
log="tmp/units/mfac-$1.log.txt"
{
	echo "loadavg=$(cat /proc/loadavg)"
	npm run build:src:styles > /dev/null 2>&1
	echo "build=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose \
		tests/src/styles/components/form-floating.test.ts \
		tests/src/styles/components/progress.test.ts \
		tests/src/styles/components/nav.test.ts \
		tests/src/styles/components/pagination.test.ts \
		tests/src/styles/components/navbar.test.ts \
		tests/src/styles/components/accordion.test.ts \
		-t 'motion factor'
	echo "exit=$?"
} > "$log" 2>&1
