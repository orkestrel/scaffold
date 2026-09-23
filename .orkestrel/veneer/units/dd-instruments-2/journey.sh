#!/bin/bash
# Runs the named journey variants one after another in the validation copy, one log per variant.
# Usage: journey.sh VARIANT... (light-390 light-1280 dark-390 dark-1280)
W=/home/user/veneer-dd
C=$W/tmp/probe/base
L=$W/tmp/units/dd-instruments-2/logs
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd "$C" || exit 1
for variant in "$@"; do
	npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:$variant" >"$L/journey-$variant.log.txt" 2>&1
	echo "journey-$variant exit=$?" | tee -a "$L/summary.txt"
done
