#!/bin/bash
# chain-main-5.sh: successor of chain-main-4.sh, which stopped at npm test on the engine session's Placement proof
# (red on Veneer main c21fd17 with the same assertion: chain-main-4-placement-main.log.txt). It runs each project npm test
# chains, one at a time, and records every exit rather than stopping, so the one known red cannot hide the rest; then
# npm run test:service. The format, lint, check, build, and capture steps passed in chain-main-4 on the same head.
# Logs: .orkestrel/veneer/units/chain-main-5-<step>.log.txt; summary: chain-main-5.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; SUM=$R/chain-main-5.log.txt; : > "$SUM"
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
echo "=== head $(git rev-parse --short HEAD) at $(date -u +%H:%M:%S)" >> "$SUM"
step() { local name=$1; shift; local log=$R/chain-main-5-$name.log.txt
  { echo "command: $*"; env "$@"; echo "exit $?"; } > "$log" 2>&1
  local code; code=$(tail -1 "$log" | sed 's/exit //')
  echo "=== $name exit=$code $(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E 'Tests ' | tail -1) $(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^ FAIL ' | head -3 | tr '\n' ' ') at $(date -u +%H:%M:%S)" >> "$SUM"; }
step src-core npm run test:src:core
step src-browser npm run test:src:browser
step src-styles npm run test:src:styles
step app npm run test:app
step journey npm run test:journey
step policy npm run test:policy
step config npm run test:config
step setup npm run test:setup
step setup-browser npm run test:setup:browser
step conformance npm run test:conformance
step guides npm run test:guides
step service npm run test:service
git status --porcelain >> "$SUM"
echo "=== chain done at $(date -u +%H:%M:%S)" >> "$SUM"
