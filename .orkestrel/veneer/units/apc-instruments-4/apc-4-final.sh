#!/bin/bash
# AP-COLOR round-4 gates, successor to apc-3-final.sh: the four gates the round-4 brief names. Each logs to tmp/units/apc-4-final-<name>.log.txt.
cd /home/user/veneer-apc || exit 1
unset CAPTURE
for g in format:check lint:check check test:src:styles; do
	tmp/units/apc-run.sh "apc-4-final-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
