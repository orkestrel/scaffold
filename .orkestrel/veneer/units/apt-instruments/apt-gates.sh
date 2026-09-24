#!/bin/bash
# AP-TYPE gates: each gate's full output to its own log under tmp/units/, with its exit status appended.
. /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/env.sh
for gate in format:check lint:check check test:setup test:guides test:conformance test:src:styles; do
	log="/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/apt-gate-${gate//:/-}.log.txt"
	npm run "$gate" > "$log" 2>&1
	echo "=== $gate exit $?" >> "$log"
	tail -1 "$log"
done
