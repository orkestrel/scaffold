#!/bin/bash
# codex-queue-15.sh: wait for queue-14's TOGGLES round-2 exec to end (one lane per bench), then a bounded liveness probe, then the ACCORDION round-2 objective lane on Astra. Log: tmp/codex/queue-15.log.txt
cd /home/user/scaffold || exit 1; LOG=/home/user/scaffold/tmp/codex/queue-15.log.txt; : > $LOG
until grep -q 'queue done' /home/user/scaffold/tmp/codex/queue-14.log.txt 2>/dev/null; do sleep 20; done
echo "=== queue-14 ended; probe start $(date -u +%H:%M:%S)" >> $LOG; TS=$(date -u +%Y-%m-%d-%H%M)
timeout 180 codex exec --json -C /home/user/scaffold --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="low"' --output-last-message /home/user/scaffold/tmp/codex/probe-$TS-last.md "Reply with the single word ready and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/probe-$TS.jsonl 2> /home/user/scaffold/tmp/codex/probe-$TS.err
echo "=== probe done $(date -u +%H:%M:%S) exit=$? last=[$(cat /home/user/scaffold/tmp/codex/probe-$TS-last.md 2>/dev/null | tr -d '\n')]" >> $LOG
if ! grep -qi '^ready' /home/user/scaffold/tmp/codex/probe-$TS-last.md 2>/dev/null; then echo "=== bench dark; ac round-2 lane not launched" >> $LOG; echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG; exit 1; fi
echo "=== ac-2 start $(date -u +%H:%M:%S)" >> $LOG; bash /home/user/scaffold/.orkestrel/veneer/units/ac-audit-2-analyst.sh; echo "=== ac-2 done $(date -u +%H:%M:%S) $(tail -1 /home/user/scaffold/tmp/codex/ac-audit-2-analyst.err) last=$(wc -c < /home/user/scaffold/tmp/codex/ac-audit-2-analyst-last.md 2>/dev/null)" >> $LOG
echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG
