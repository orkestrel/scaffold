#!/usr/bin/env bash
# Runs the E-ID-ANCHOR acceptance gates in order, each logged to tmp/units/anchor-<gate>.log.txt.
cd /home/user/veneer-anchor || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for gate in format:check lint:check check test:src:styles test:conformance test:guides test:policy; do
	log="tmp/units/anchor-${gate//:/-}.log.txt"
	npm run "$gate" > "$log" 2>&1
	echo "exit=$?" >> "$log"
	echo "$gate $(tail -1 "$log")"
done
