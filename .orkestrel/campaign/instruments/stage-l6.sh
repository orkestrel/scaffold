#!/bin/bash
# Pack agent's checkpoint tip, stage ollama and toolbox closures on it, verify, and generate their briefs.
LOG=/home/user/work/logs/stage-l6.log
: > "$LOG"
/home/user/work/pack-dep.sh agent >> "$LOG" 2>&1; echo "pack agent exit=$?" >> "$LOG"
STANDING="$(cat /home/user/scaffold/.orkestrel/campaign/fix/l3-standing.txt) $(cat /home/user/scaffold/.orkestrel/campaign/fix/l4-standing.txt) $(cat /home/user/scaffold/.orkestrel/campaign/fix/l5-standing.txt) $(cat /home/user/scaffold/.orkestrel/campaign/fix/l6-standing.txt) Standing condition: @orkestrel/agent is staged from its landed checkpoint df12fab while its audit runs; an agent fix-up re-stages this checkout before this unit's audit."
for c in ollama toolbox; do
	/home/user/work/stage-closure.sh "$c" > /home/user/work/logs/stage-l6-$c.log 2>&1; echo "$c stage exit=$? $(grep -c ' OK ' /home/user/work/logs/stage-l6-$c.log) OK rows" >> "$LOG"
	node /home/user/work/verify-stage.mjs "$c" > /home/user/work/logs/verify-l6-$c.log 2>&1; echo "$c verify exit=$?" >> "$LOG"
	STAGED=$(node -e "const t=require('/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json');console.log([...new Set(t.filter(r=>r.consumer==='$c').map(r=>r.dependency.replace('@orkestrel/','')))].sort().join(','))")
	( cd /home/user/work && node mkbrief.mjs "$c" "$STAGED" "$STANDING" >> "$LOG" 2>&1; echo "$c mkbrief exit=$?" >> "$LOG" )
done
echo STAGE-L6-DONE >> "$LOG"
