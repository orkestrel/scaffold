#!/bin/bash
# Baseline reading of veneer's gate chain at HEAD a04fb7c, in the acceptance order, each gate read bare.
# Log: veneer-baseline.log.txt beside this script. Cap: 1800 s total (test chain drives Playwright Chromium).
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/veneer-baseline.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
for gate in format:check lint:check check build test; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== baseline done" >> "$LOG"
