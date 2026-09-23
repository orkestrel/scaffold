#!/bin/bash
# Runs one journey variant in the validation copy tmp/probe/base, without CAPTURE. Usage: journey.sh <variant>.
# Log: logs/journey-<variant>.log.txt beside this script, ending in exit=<code>.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
I=/home/user/veneer-tg/tmp/units/tg-instruments/logs
cd /home/user/veneer-tg/tmp/probe/base || exit 1
timeout 580 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1" > "$I/journey-$1.log.txt" 2>&1
echo "exit=$?" >> "$I/journey-$1.log.txt"
