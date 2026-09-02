#!/bin/bash
# Re-stage agent's closure on workflow's fix-up tip and read its check; run only when no writer is live in agent.
LOG=/home/user/work/logs/restage-agent.log
: > "$LOG"
/home/user/work/stage-closure.sh agent >> "$LOG" 2>&1; echo "stage exit=$?" >> "$LOG"
node /home/user/work/verify-stage.mjs agent >> "$LOG" 2>&1; echo "verify exit=$?" >> "$LOG"
cd /home/user/fleet/agent && npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
echo RESTAGE-AGENT-DONE >> "$LOG"
