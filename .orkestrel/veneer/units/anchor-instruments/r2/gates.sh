#!/usr/bin/env bash
# Runs the E-ID-ANCHOR round-2 acceptance gates in order, each logged to
# tmp/units/r2/anchor-<gate>.log.txt with the command echoed first and its exit status appended.
source /home/user/veneer-anchor/tmp/units/r2/env.sh
summary=tmp/units/r2/anchor-gates-summary.log.txt
: > "$summary"
for gate in format:check lint:check check test:src:styles test:conformance test:guides test:policy; do
	log="tmp/units/r2/anchor-${gate//:/-}.log.txt"
	echo "\$ npm run $gate" > "$log"
	npm run "$gate" >> "$log" 2>&1
	echo "exit=$?" >> "$log"
	echo "$gate $(tail -1 "$log")" >> "$summary"
done
echo done >> "$summary"
