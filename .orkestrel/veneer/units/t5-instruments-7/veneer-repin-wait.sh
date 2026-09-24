#!/bin/bash
# Waits up to 20 minutes for the registry to serve @orkestrel/test 0.0.24 (npm reports the upload processing), then runs
# veneer-repin-0.0.24.sh. Log: veneer-repin-wait.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
L=$S/veneer-repin-wait.log.txt; : > $L
export PATH="$S/npm11/node_modules/.bin:$PATH"
for i in $(seq 1 60); do
	v=$(npm view @orkestrel/test@0.0.24 version 2>/dev/null); l=$(npm view @orkestrel/test version 2>/dev/null)
	echo "$(date -u +%H:%M:%S) exact=$v latest=$l" >> $L
	[ "$v" = "0.0.24" ] && [ "$l" = "0.0.24" ] && { bash $S/veneer-repin-0.0.24.sh; echo "repin exit=$?" >> $L; exit 0; }
	sleep 20
done
echo "registry never served 0.0.24" >> $L; exit 4
