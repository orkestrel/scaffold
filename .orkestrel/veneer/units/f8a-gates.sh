#!/bin/bash
# F8a PROFILES gate chain (over the fix-round worktree; with test:src:tailwind added).
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f8a-gates.log.txt
: > "$LOG"
cd /home/user/veneer-f8 || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:src:tailwind test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
