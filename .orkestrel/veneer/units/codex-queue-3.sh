#!/bin/bash
# codex-queue-3.sh: the NAV and DROPDOWN round-2 objective lanes on Astra, one exec at a time (bench law: one lane per bench), each under its own cap. Log: tmp/codex/queue-3.log.txt
cd /home/user/scaffold || exit 1; LOG=/home/user/scaffold/tmp/codex/queue-3.log.txt; : > $LOG
for u in nv dd; do echo "=== $u start $(date -u +%H:%M:%S)" >> $LOG; bash /home/user/scaffold/.orkestrel/veneer/units/$u-audit-2-analyst.sh; echo "=== $u done $(date -u +%H:%M:%S) $(tail -1 /home/user/scaffold/tmp/codex/$u-audit-2-analyst.err) last=$(wc -c < /home/user/scaffold/tmp/codex/$u-audit-2-analyst-last.md 2>/dev/null)" >> $LOG; done
echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG
