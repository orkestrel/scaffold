#!/bin/bash
# Cursor bench queue: one grok lane at a time (Bench laws rule 4). Usage: cursor-queue.sh <pid-to-wait-for> <launcher>...
# Waits on the recorded process id of the running lane (kill -0, never a pattern), then launches each launcher under setsid, waiting for each to exit before the next. Log: cursor-queue.log.txt
LOG=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/cursor-queue.log.txt
WAIT=$1; shift
while kill -0 "$WAIT" 2>/dev/null; do sleep 30; done
echo "=== lane $WAIT gone at $(date -u +%H:%M:%S)" >> "$LOG"
for s in "$@"; do
  echo "=== launch $s at $(date -u +%H:%M:%S)" >> "$LOG"
  setsid bash /home/user/scaffold/tmp/cursor/$s > /dev/null 2>&1 &
  PID=$!
  wait $PID
  echo "=== $s exited $? at $(date -u +%H:%M:%S)" >> "$LOG"
done
echo "=== queue drained at $(date -u +%H:%M:%S)" >> "$LOG"
