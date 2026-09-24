#!/bin/bash
# land-check.sh <unit>: the scoped reading after one landing on the Veneer session branch — build:src, then the conformance, setup, and app projects — before the next unit lands. Log: .orkestrel/veneer/units/land-check-<unit>.log.txt
U=$1; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=/home/user/scaffold/.orkestrel/veneer/units/land-check-$U.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) status [$(git status --porcelain | tr '\n' ' ')] $(date -u +%H:%M:%S)" >> "$LOG"
for s in build:src test:conformance test:setup test:app; do npm run $s >> "$LOG" 2>&1; echo "=== $s exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"; done
grep -E '^=== |Tests .*(failed|passed)|FAIL ' "$LOG" | tail -20
