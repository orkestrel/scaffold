#!/bin/bash
# Stage every L4 checkout's closure from the accepted tips, serially, one row per checkout.
set -u
for c in brief program workflow worker queue probe lsp; do
	if /home/user/work/stage-closure.sh "$c" > /home/user/work/logs/stage-l4-$c.log 2>&1; then
		echo "$c OK $(grep -c ' OK ' /home/user/work/logs/stage-l4-$c.log) rows"
	else
		echo "$c FAILED $(tail -1 /home/user/work/logs/stage-l4-$c.log)"
	fi
done
echo STAGE-L4-DONE
