#!/usr/bin/env bash
# ER-MECH gate chain: each gate through its npm script, logged to tmp/units/erm-<gate>.log.txt
# with its exit status appended.
cd /home/user/veneer-erm || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for gate in format:check lint:check check test:setup test:guides test:policy test:conformance; do
	log="tmp/units/erm-${gate//:/-}.log.txt"
	npm run "$gate" > "$log" 2>&1
	echo "exit=$?" >> "$log"
	echo "$gate $(tail -1 "$log")"
done
