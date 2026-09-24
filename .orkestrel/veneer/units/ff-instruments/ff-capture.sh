#!/usr/bin/env bash
# Runs one journey capture variant and writes its log under tmp/units.
# Usage: ff-capture.sh VARIANT LABEL
set -u
cd /home/user/veneer-ff
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log="tmp/units/ff-capture-$2-$1.log.txt"
start=$(date +%s)
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1*" > "$log" 2>&1
code=$?
echo "exit $code after $(( $(date +%s) - start )) s" >> "$log"
exit $code
