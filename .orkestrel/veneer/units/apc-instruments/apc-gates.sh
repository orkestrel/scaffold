#!/bin/bash
# AP-COLOR gate chain: each acceptance gate logged to its own /home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-gate-<name>.log.txt with its exit status.
cd /home/user/veneer-apc || exit 1
for g in format:check lint:check check test:setup test:guides test:conformance; do
	/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh "apc-gate-${g/:/-}" npm run "$g"
	echo "$g exit=$?"
done
