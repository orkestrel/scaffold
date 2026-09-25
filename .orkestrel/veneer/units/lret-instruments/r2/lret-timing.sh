#!/usr/bin/env bash
# Runs the timing probe four times at once, the contended reading LEDGER_TIMEOUT is derived from,
# each run appending one line to tmp/units/r2/probe/timing.txt.
. /home/user/veneer-lret/tmp/units/r2/env.sh
for run in 1 2 3 4; do
	npx vitest run --config tmp/units/r2/probe.config.ts > "tmp/units/r2/lret-timing-contended-$run.log.txt" 2>&1 &
done
wait
echo "done $(cat /proc/loadavg)"
