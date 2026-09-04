#!/bin/bash
# Land the guide-keyword follow-on in every consumer, serially within a lane; two lanes over disjoint lists.
# Usage: land-guide-keyword.sh <lane-name> <pkg>...
export RETAIN_DIR=/home/user/scaffold/.orkestrel/campaign/conform/units/followon
LANE=$1; shift
LOG=/home/user/work/logs/land-guide-keyword-$LANE.log
: > "$LOG"
for p in "$@"; do
  msg=/home/user/scaffold/tmp/work/msgs/land-followon-guide-keyword.txt
  [ "$p" = database ] && msg=/home/user/scaffold/tmp/work/msgs/land-followon-guide-keyword-database.txt
  echo "$(date -u +%H:%M:%S) $p start" >> "$LOG"
  node /home/user/scaffold/tmp/work/land-conform.mjs "$p:$msg" >> "$LOG" 2>&1
  echo "$(date -u +%H:%M:%S) $p exit=$?" >> "$LOG"
done
echo "LANE-$LANE-DONE" >> "$LOG"
