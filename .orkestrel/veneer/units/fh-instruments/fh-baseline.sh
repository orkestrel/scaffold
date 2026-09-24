#!/usr/bin/env bash
# FRAME-HELPERS baseline: capture every scenario at the session head for later frame comparison.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
for v in dark-1280 light-390; do
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v" > tmp/units/fh-baseline-$v.log.txt 2>&1
  echo "exit $v $?" >> tmp/units/fh-baseline-$v.log.txt
  mkdir -p tmp/units/fh-baseline/$v
  cp tmp/capture/states/*--$v.png tmp/units/fh-baseline/$v/ 2>/dev/null
  cp tmp/capture/$v.txt tmp/units/fh-baseline/$v/ 2>/dev/null
done
