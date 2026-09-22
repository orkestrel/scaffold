#!/bin/bash
# T1/T2 gate chain, run 3 (after the changing-resolver traversal proof threshold fix; successor of t1-t2-gates-2.sh).
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/t1-t2-gates-3.log.txt
: > "$LOG"
cd /home/user/test || exit 1
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for gate in format:check lint:check check build test; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
