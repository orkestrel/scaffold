#!/bin/bash
# AP-COLOR final evidence: styles suite (rebuilds the bundle after the mutation runs), then the setup, conformance, and guides gates, then the read-only format, lint, and type gates.
cd /home/user/veneer-apc || exit 1
for g in test:src:styles test:setup test:conformance test:guides format:check lint:check check; do
	/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-run.sh "apc-final-${g//:/-}" npm run "$g"
	echo "$g exit=$?"
done
