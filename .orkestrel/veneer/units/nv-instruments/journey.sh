#!/bin/bash
# Runs one journey variant in the nv stage. Usage: journey.sh <variant>. Log: nv-unit/journey-<variant>.log.txt
SC=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$SC/npm11/node_modules/.bin:$PATH"
cd $SC/nv-stage || exit 1
timeout 580 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1" > $SC/nv-unit/journey-$1.log.txt 2>&1
echo "exit=$?" >> $SC/nv-unit/journey-$1.log.txt
