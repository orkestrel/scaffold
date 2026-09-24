#!/bin/bash
# batch2-verify.sh: the verification of the second wave-2/3 landing batch on the Veneer session branch
# (UTIL-PAINT, OFFCANVAS, UTIL-TEXT, UTIL-SPACING, RESIDUE, BACKGROUND-SIZE, JOURNEY-BUDGET, and BARE-BUTTON over
# 88cb691): the refresh loop, the per-variant capture regeneration, the clean-tree check, then every gate in
# order. Derived from the pruned batch1-land-verify.sh and batch1-gates.sh (read them through
# `git show 8c46b904~1:.orkestrel/veneer/units/<file>`), with every subject field rewritten.
# Log: /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/batch2-verify.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/batch2-verify.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> "$LOG"; exit 2; }
echo "=== HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
for s in build:src test:conformance test:setup test:app; do
  npm run $s >> "$LOG" 2>&1; echo "=== refresh $s exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
for v in light-1280 dark-1280 light-390 dark-390; do
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v*" >> "$LOG" 2>&1; echo "=== capture $v exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> "$LOG"
done
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty after regen: [$(git status --porcelain | tr '\n' ' ')]" >> "$LOG"; exit 3; }
npm install --ignore-scripts >> "$LOG" 2>&1; echo "=== npm install exit=$?" >> "$LOG"; rm -f node_modules/.orkestrel-lock.sha256; sha256sum package-lock.json | cut -d" " -f1 > node_modules/.orkestrel-lock.sha256
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
