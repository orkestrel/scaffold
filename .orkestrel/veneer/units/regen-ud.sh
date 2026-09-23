#!/bin/bash
# Regenerate the main checkout's capture portfolio, one variant at a time, then take the plain journey reading.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/regen-ud.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
for v in light-1280 dark-1280 light-390 dark-390; do
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v*" >> $LOG 2>&1; echo "=== capture $v exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
done
npm run test:journey >> $LOG 2>&1; echo "=== test:journey exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
ls tmp/capture/states | wc -l >> $LOG
