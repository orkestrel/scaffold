#!/bin/bash
# batch1-gates.sh: the authoritative gate chain for the first wave-2/3 landing batch over Veneer session branch
# a9dff19, run after batch1-capture-rerun.sh re-ran alone the capture variants that failed under load in
# batch1-land-verify.sh (that chain was stopped at its dark-390 capture). The tail of batch1-land-verify.sh:
# the clean-tree check, the lockfile marker, and every gate in order.
# Log: /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/batch1-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/batch1-gates.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) $(date -u +%H:%M:%S)" >> "$LOG"
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty: [$(git status --porcelain | tr '\n' ' ')]" >> "$LOG"; exit 3; }
npm install --ignore-scripts >> "$LOG" 2>&1; echo "=== npm install exit=$?" >> "$LOG"; rm -f node_modules/.orkestrel-lock.sha256; sha256sum package-lock.json | cut -d" " -f1 > node_modules/.orkestrel-lock.sha256
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
