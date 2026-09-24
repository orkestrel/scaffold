#!/bin/bash
# AP-COLOR round-3 final evidence, successor to apc-2-final.sh: the same gates without the journey, which the round-3 brief
# makes an observation. Each gate logs to /home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-<name>.log.txt.
cd /home/user/veneer-apc || exit 1
unset CAPTURE
for g in format:check lint:check check test:src:styles test:setup test:conformance test:guides; do
	/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh "apc-3-final-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
