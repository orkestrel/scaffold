#!/bin/bash
# Successor to codex-queue.sh: same queue, but the launched launcher no longer inherits the lock fd
# (9>&-), so a queue instance stops blocking on a launcher that is still running. Log unchanged.
LOG=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/codex-queue.log.txt
exec 9> "$LOG.lock"
flock -x 9
for s in "$@"; do
  while [ "$(ps -eo comm | grep -c '^codex$')" -ge 2 ]; do sleep 20; done
  echo "=== launch $s at $(date -u +%H:%M:%S)" >> "$LOG"
  setsid bash /home/user/scaffold/tmp/codex/$s > /dev/null 2>&1 9>&- &
  sleep 30
done
echo "=== queue drained at $(date -u +%H:%M:%S)" >> "$LOG"
