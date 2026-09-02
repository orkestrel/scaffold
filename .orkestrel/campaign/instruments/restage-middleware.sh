#!/bin/bash
# Re-stage middleware's closure on the server fix-up tip and prove its gates still green.
LOG=/home/user/work/logs/restage-middleware.log
: > "$LOG"
/home/user/work/stage-closure.sh middleware >> "$LOG" 2>&1; echo "stage exit=$?" >> "$LOG"
cd /home/user/fleet/middleware || exit 1
npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
npm test >> "$LOG" 2>&1; echo "test exit=$?" >> "$LOG"
echo RESTAGE-MIDDLEWARE-DONE >> "$LOG"
