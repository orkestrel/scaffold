#!/usr/bin/env bash
# Rebuilds the styles and runs the unit's owned element tests in the styles project into the named log.
# Usage: owned.sh <log name> [extra test files...]
set -u
source /home/user/veneer-flow2/tmp/units/flow2-instruments/env.sh
log=tmp/units/flow2-instruments/logs/$1; shift
{
	npm run build:src:styles > /dev/null 2>&1; echo "build exit $?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/dl.test.ts tests/src/styles/elements/pre.test.ts tests/src/styles/elements/hr.test.ts tests/src/styles/elements/figure.test.ts "$@" 2>&1
	echo "exit=$?"
} > "$log"
grep -a "✗\|×\|FAIL\|Test Files\|Tests \|exit" "$log" | sort -u
