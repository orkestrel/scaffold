#!/usr/bin/env bash
# fp capture chain: one variant at a time, each log closing with its exit line.
cd /home/user/veneer-fp
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for variant in light-1280 dark-390; do
	CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:${variant}*" > "tmp/units/fp-capture-${variant}.log.txt" 2>&1
	echo "exit $?" >> "tmp/units/fp-capture-${variant}.log.txt"
done
