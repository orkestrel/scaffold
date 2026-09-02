#!/bin/bash
# Land interpret's fix-up, then re-stage its closure on template-8fdc167.tgz and re-run check and test.
LOG=/home/user/work/logs/land-interpret.log
: > "$LOG"
cd /home/user/work && UNIT=interpret-fixup node land-fixup.mjs interpret:/home/user/work/msg-interpret-fixup.txt >> "$LOG" 2>&1
/home/user/work/stage-closure.sh interpret >> "$LOG" 2>&1; echo "stage exit=$?" >> "$LOG"
cd /home/user/fleet/interpret && npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
npm test >> "$LOG" 2>&1; echo "test exit=$?" >> "$LOG"
echo LAND-INTERPRET-DONE >> "$LOG"
