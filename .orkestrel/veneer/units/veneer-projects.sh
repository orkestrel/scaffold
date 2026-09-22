#!/bin/bash
# Baseline reading of every veneer test project run alone (the test chain stops at its first red script),
# at HEAD a04fb7c with the Test tip tarball installed. Log: veneer-projects.log.txt. Cap: 1500 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/veneer-projects.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
for s in test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides; do
  echo "=== npm run $s ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 600 npm run "$s" >> "$LOG" 2>&1
  echo "=== $s exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== projects done" >> "$LOG"
