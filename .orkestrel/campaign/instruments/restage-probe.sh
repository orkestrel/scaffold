#!/bin/bash
# Re-stage probe's closure with peer dependencies followed, then read check and test.
LOG=/home/user/work/logs/restage-probe.log
: > "$LOG"
/home/user/work/stage-closure.sh probe >> "$LOG" 2>&1; echo "stage exit=$?" >> "$LOG"
node /home/user/work/verify-stage.mjs probe >> "$LOG" 2>&1; echo "verify exit=$?" >> "$LOG"
cd /home/user/fleet/probe || exit 1
npm ls @orkestrel/server >> "$LOG" 2>&1
npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
npm test >> "$LOG" 2>&1; echo "test exit=$?" >> "$LOG"
echo RESTAGE-PROBE-DONE >> "$LOG"
