#!/bin/bash
# codex-queue-5.sh: a bounded liveness probe, then the ALERT round-2 objective lane on Astra (one lane per bench). Log: tmp/codex/queue-5.log.txt
cd /home/user/scaffold || exit 1; LOG=/home/user/scaffold/tmp/codex/queue-5.log.txt; : > $LOG; TS=$(date -u +%Y-%m-%d-%H%M)
echo "=== probe start $(date -u +%H:%M:%S)" >> $LOG
timeout 180 codex exec --json -C /home/user/scaffold --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="low"' --output-last-message /home/user/scaffold/tmp/codex/probe-$TS-last.md "Reply with the single word ready and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/probe-$TS.jsonl 2> /home/user/scaffold/tmp/codex/probe-$TS.err
echo "=== probe done $(date -u +%H:%M:%S) exit=$? last=[$(cat /home/user/scaffold/tmp/codex/probe-$TS-last.md 2>/dev/null | tr -d '\n')]" >> $LOG
if ! grep -qi '^ready' /home/user/scaffold/tmp/codex/probe-$TS-last.md 2>/dev/null; then echo "=== bench dark; al lane not launched" >> $LOG; echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG; exit 1; fi
echo "=== al start $(date -u +%H:%M:%S)" >> $LOG; bash /home/user/scaffold/.orkestrel/veneer/units/al-audit-2-analyst.sh; echo "=== al done $(date -u +%H:%M:%S) $(tail -1 /home/user/scaffold/tmp/codex/al-audit-2-analyst.err) last=$(wc -c < /home/user/scaffold/tmp/codex/al-audit-2-analyst-last.md 2>/dev/null)" >> $LOG
echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG
