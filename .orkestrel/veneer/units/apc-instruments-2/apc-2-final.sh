#!/bin/bash
# AP-COLOR round-2 final evidence, successor to apc-final.sh: adds the scoped journey case in its four variants with
# CAPTURE unset, under the verbose reporter so each variant's case is named. Each gate logs to /home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-<name>.log.txt.
cd /home/user/veneer-apc || exit 1
unset CAPTURE
for g in format:check lint:check check test:src:styles test:setup test:conformance test:guides; do
	/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh "apc-2-final-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh apc-2-final-test-journey npm run test:journey -- --reporter=verbose -t "measures the composed contrast"
echo "test:journey exit=$?"
