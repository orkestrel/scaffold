#!/bin/bash
# resting-key-measure.sh: runs the journey's resting-cascade-key case alone per variant, without capture,
# under a raised timeout, and reports each run's duration, to size the case against the 120 s journey cap.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/resting-key-measure.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for v in "$@"; do
  start=$(date +%s)
  npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --testTimeout=900000 --project "journey:$v*" -t 'reads every resting cascade key the same' >> "$LOG" 2>&1
  echo "=== $v exit=$? seconds=$(( $(date +%s) - start )) load $(cut -d' ' -f1 /proc/loadavg) ($(date -u +%H:%M:%S))" >> "$LOG"
done
