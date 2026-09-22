#!/bin/bash
# F4 gate chain, run 3 (after the audit round's fixes: the Delegate reinsertion case, the EventReading move, the
# provenance case split, the README and guide sentences; successor of f4-gates-2.sh). Log beside this script.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f4-gates-3.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
