#!/usr/bin/env bash
# Runs the round-2 proofs, one log each; usage: eic2-red.sh <stage>, where stage names the log suffix.
cd /home/user/veneer-eic
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
stage=$1
{ npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts; echo "exit $?"; } > "tmp/units/logs/r2-setup-$stage.log.txt" 2>&1
tail -6 "tmp/units/logs/r2-setup-$stage.log.txt"
tmp/units/eic-run.sh "tmp/units/logs/r2-index-$stage.log.txt" tests/src/styles/index.test.ts
