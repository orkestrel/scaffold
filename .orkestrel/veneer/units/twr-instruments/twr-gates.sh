#!/usr/bin/env bash
# Runs the unit's acceptance gates, each logged to tmp/units/twr-<gate>.log.txt with its exit code.
cd /home/user/veneer-twr || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for gate in check lint:check build:src test:service test:guides test:policy; do
	log="tmp/units/twr-${gate//:/-}.log.txt"
	npm run "$gate" > "$log" 2>&1
	echo "exit=$?" >> "$log"
	echo "loadavg=$(cat /proc/loadavg)" >> "$log"
done
