#!/bin/bash
# batch1-capture-rerun.sh: re-runs alone the capture variants that failed under load in batch1-land-verify.sh
# (dark-1280, light-390, dark-390), each with the same command that chain ran, then reads the tree's status.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/batch1-capture-rerun.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for v in "$@"; do
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:$v*" >> "$LOG" 2>&1
  echo "=== capture $v exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> "$LOG"
done
echo "=== status [$(git status --porcelain | tr '\n' ' ')]" >> "$LOG"
