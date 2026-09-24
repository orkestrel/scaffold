#!/bin/bash
# AP-TYPE round 3 gates (successor of apt-2-gates.sh: logs are apt-3-gate-*): each gate's output to its own log, exit status appended.
. /home/user/scaffold/.orkestrel/veneer/units/apt-instruments/env.sh
for gate in format:check lint:check check test:setup test:guides test:conformance test:src:styles; do
	log="/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-${gate//:/-}.log.txt"
	npm run "$gate" > "$log" 2>&1
	echo "=== $gate exit $?" >> "$log"
	tail -1 "$log"
done
{ echo '=== grep -rn -E "(^|[^-])fluid\(" src tests guides'; grep -rn -E "(^|[^-])fluid\(" src tests guides; echo "=== grep exit $? (1 means no match)"; } > /home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-grep-fluid.log.txt
tail -1 /home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-grep-fluid.log.txt
