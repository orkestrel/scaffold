#!/bin/bash
# codex-queue-4.sh: the CAROUSEL objective lane on Astra, launched after queue-3's DROPDOWN exec ends (one lane per bench). Log: tmp/codex/queue-4.log.txt
cd /home/user/scaffold || exit 1; LOG=/home/user/scaffold/tmp/codex/queue-4.log.txt; : > $LOG
echo "=== ca start $(date -u +%H:%M:%S)" >> $LOG; bash /home/user/scaffold/.orkestrel/veneer/units/ca-audit-analyst.sh; echo "=== ca done $(date -u +%H:%M:%S) $(tail -1 /home/user/scaffold/tmp/codex/ca-audit-analyst.err) last=$(wc -c < /home/user/scaffold/tmp/codex/ca-audit-analyst-last.md 2>/dev/null)" >> $LOG
echo "=== queue done $(date -u +%H:%M:%S)" >> $LOG
