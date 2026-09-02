#!/bin/bash
# Stage the four L4 adopt-when-red checkouts' closures from the accepted tips, verify each, and read
# npm run check and npm test as the red/green signal. Serial, one row per step.
set -u
LOG=/home/user/work/logs/stage-l4b.log
: > "$LOG"
for c in worker queue probe lsp; do
	if /home/user/work/stage-closure.sh "$c" > /home/user/work/logs/stage-l4-$c.log 2>&1; then
		echo "$c stage OK $(grep -c ' OK ' /home/user/work/logs/stage-l4-$c.log) rows" >> "$LOG"
	else
		echo "$c stage FAILED $(tail -1 /home/user/work/logs/stage-l4-$c.log)" >> "$LOG"
	fi
	node /home/user/work/verify-stage.mjs "$c" > /home/user/work/logs/verify-l4-$c.log 2>&1; echo "$c verify exit=$?" >> "$LOG"
	( cd /home/user/fleet/$c && npm run check > /home/user/work/logs/check-l4-$c.log 2>&1; echo "$c check exit=$?" >> "$LOG"; npm test > /home/user/work/logs/test-l4-$c.log 2>&1; echo "$c test exit=$?" >> "$LOG" )
done
echo STAGE-L4B-DONE >> "$LOG"
