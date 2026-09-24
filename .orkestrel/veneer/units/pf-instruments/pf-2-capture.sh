#!/usr/bin/env bash
# Runs one round-2 capture journey variant and records its exit. Usage: pf-2-capture.sh VARIANT
set -u
cd /home/user/veneer-pf
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/pf-2-capture-$1.log.txt
echo "command: CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project \"journey:$1*\"" > "$LOG"
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1*" >> "$LOG" 2>&1
echo "exit: $?" >> "$LOG"
