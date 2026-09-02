#!/bin/bash
# Stage the three L4 implementer checkouts' closures from the accepted tips, serially, then verify each.
set -u
for c in brief program workflow; do
	if /home/user/work/stage-closure.sh "$c" > /home/user/work/logs/stage-l4-$c.log 2>&1; then
		echo "$c OK $(grep -c ' OK ' /home/user/work/logs/stage-l4-$c.log) rows"
	else
		echo "$c FAILED $(tail -1 /home/user/work/logs/stage-l4-$c.log)"
	fi
	node /home/user/work/verify-stage.mjs "$c" > /home/user/work/logs/verify-l4-$c.log 2>&1; echo "$c verify exit=$?"
done
echo STAGE-L4A-DONE
