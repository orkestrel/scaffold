#!/bin/bash
# F5c TOKENS-TRUTH round-3 scoped gate chain over the worktree (test infrastructure and one guide sentence changed). Log: f5c-fix-3-gates.log.txt.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/f5c-fix-3-gates.log.txt
: > "$LOG"
cd /home/user/veneer-f5c || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for gate in format:check lint:check check test:setup test:src:styles test:guides test:policy; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
