#!/bin/bash
# chain-main-4.sh: the authoritative chain over the Veneer session branch before its push to main. It runs the
# non-mutating gates in order (format:check, lint:check, check, build), regenerates the capture portfolio with every
# journey variant under CAPTURE=1 (the portfolio guard requires every registered frame whenever any frame is present),
# then npm test and npm run test:service. Each step writes its command at the head of its log and its exit at the
# foot, and the chain stops at the first red step. Logs: .orkestrel/veneer/units/chain-main-4-<step>.log.txt;
# summary: chain-main-4.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; SUM=$R/chain-main-4.log.txt; : > "$SUM"
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
echo "=== head $(git rev-parse --short HEAD) at $(date -u +%H:%M:%S)" >> "$SUM"
step() { local name=$1; shift; local log=$R/chain-main-4-$name.log.txt
  { echo "command: $*"; env "$@"; echo "exit $?"; } > "$log" 2>&1
  local code; code=$(tail -1 "$log" | sed 's/exit //')
  echo "=== $name exit=$code $(grep -E 'Tests |Test Files ' "$log" | tail -1 | sed 's/\x1b\[[0-9;]*m//g') at $(date -u +%H:%M:%S)" >> "$SUM"
  [ "$code" = 0 ] || { echo "=== STOPPED at $name" >> "$SUM"; exit 1; }; }
step format npm run format:check
step lint npm run lint:check
step check npm run check
step build npm run build
step capture CAPTURE=1 npm run test:journey
step test npm test
step service npm run test:service
git status --porcelain >> "$SUM"
echo "=== chain green at $(date -u +%H:%M:%S)" >> "$SUM"
