#!/usr/bin/env bash
# Runs the capture journey at each registered variant, one at a time, and logs each run beside its exit.
cd /home/user/veneer-bcf || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for variant in "$@"; do
	CAPTURE=1 timeout 1800 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$variant*" > "tmp/units/bcf-capture-$variant.log.txt" 2>&1
	echo "$variant exit $?" >> tmp/units/bcf-capture-exits.txt
done
