#!/bin/bash
# Serial-ish queue for Astra audit lanes: keeps at most 2 codex processes live; launches each named
# launcher when a slot frees. Args: launcher scripts under /home/user/scaffold/tmp/codex/.
LOG=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/codex-queue.log.txt
# One queue instance at a time: a second instance blocks on the lock until the first has launched every launcher it was given.
exec 9> "$LOG.lock"
flock -x 9
for s in "$@"; do
  while [ "$(ps -eo comm | grep -c '^codex$')" -ge 2 ]; do sleep 20; done
  echo "=== launch $s at $(date -u +%H:%M:%S)" >> "$LOG"
  setsid bash /home/user/scaffold/tmp/codex/$s > /dev/null 2>&1 &
  sleep 30
done
echo "=== queue drained at $(date -u +%H:%M:%S)" >> "$LOG"
