#!/bin/bash
# The Orchestrator's solo re-run of the timing failures land-check-ct.log.txt recorded on ac74459 (THEME's landing
# merged with Veneer main afae42c): the conformance file and the two setup files, each run alone, with the load
# average stamped beside each result. Log: .orkestrel/veneer/units/ct-rerun.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=/home/user/scaffold/.orkestrel/veneer/units/ct-rerun.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) status [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
for spec in "conformance tests/conformance.test.ts" "setup tests/setupServer.test.ts" "setup tests/setupStyles.test.ts"; do
  set -- $spec
  echo "=== $2 start $(date -u +%H:%M:%S) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
  npx vitest run --config vite.config.ts --no-cache --reporter=dot --project $1 $2 >> $LOG 2>&1
  echo "=== $2 exit=$? end $(date -u +%H:%M:%S) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
done
grep -E '^=== |Tests .*(failed|passed)|FAIL ' $LOG
