#!/bin/bash
# Pack workflow's checkpoint tip, stage agent's closure on it, verify, and generate agent's brief.
LOG=/home/user/work/logs/stage-l5.log
: > "$LOG"
/home/user/work/pack-dep.sh workflow >> "$LOG" 2>&1; echo "pack workflow exit=$?" >> "$LOG"
/home/user/work/stage-closure.sh agent > /home/user/work/logs/stage-l5-agent.log 2>&1; echo "agent stage exit=$? $(grep -c ' OK ' /home/user/work/logs/stage-l5-agent.log) OK rows" >> "$LOG"
node /home/user/work/verify-stage.mjs agent > /home/user/work/logs/verify-l5-agent.log 2>&1; echo "agent verify exit=$?" >> "$LOG"
STANDING="$(cat /home/user/scaffold/.orkestrel/campaign/fix/l3-standing.txt) $(cat /home/user/scaffold/.orkestrel/campaign/fix/l4-standing.txt) $(cat /home/user/scaffold/.orkestrel/campaign/fix/l5-standing.txt) Standing condition: @orkestrel/workflow is staged from its landed checkpoint bcf8ab4 while its audit runs; a workflow fix-up re-stages this checkout before this unit's audit."
STAGED=$(node -e 'const t=require("/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json");console.log([...new Set(t.filter(r=>r.consumer==="agent").map(r=>r.dependency.replace("@orkestrel/","")))].sort().join(","))')
cd /home/user/work && node mkbrief.mjs agent "$STAGED" "$STANDING" >> "$LOG" 2>&1; echo "mkbrief exit=$?" >> "$LOG"
echo STAGE-L5-DONE >> "$LOG"
