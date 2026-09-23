#!/bin/bash
# veneer-021-2.sh: successor of veneer-021.sh, whose run stopped at the dark-1280 capture when its harness task was killed
# at about 23:38 UTC (veneer-021.log.txt). What that run finished holds: the re-pin commit ec87654 (test ^0.0.21, one
# contract copy at ^0.0.17), the refresh gates (build:src, conformance, setup, app), and the light-1280 capture, each
# exit 0. This run refuses unless HEAD is ec87654 with a clean tree and 0.0.21 installed, then takes the remaining
# captures (dark-1280, light-390, dark-390) and the authoritative chain. Detached with setsid by its launcher so a
# stopped watcher cannot stop it. Log: veneer-021-2.log.txt (copied to units at the end).
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$S/veneer-021-2.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
finish() { echo "=== veneer-021-2 done ($(date -u +%H:%M:%S))" >> $LOG; cp $LOG $U/veneer-021-2.log.txt; exit $1; }
gate() { echo "=== $1 ($(date -u +%H:%M:%S))" >> $LOG; timeout 1500 npm run $1 >> $LOG 2>&1; local code=$?; echo "=== $1 exit=$code ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $1" >> $LOG; finish $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; finish 2; }
[ "$(git rev-parse --short HEAD)" = "ec87654" ] || { echo "=== HEAD is $(git rev-parse --short HEAD), not ec87654; refusing" >> $LOG; finish 3; }
installed=$(node -p "require('./node_modules/@orkestrel/test/package.json').version")
[ "$installed" = "0.0.21" ] || { echo "=== installed test $installed, not 0.0.21; refusing" >> $LOG; finish 4; }
echo "=== npm $(npm --version) node $(node --version) HEAD $(git rev-parse --short HEAD) installed test $installed contract $(node -p "require('./node_modules/@orkestrel/contract/package.json').version") ($(date -u +%H:%M:%S))" >> $LOG
for v in dark-1280 light-390 dark-390; do
  echo "=== capture $v ($(date -u +%H:%M:%S))" >> $LOG
  CAPTURE=1 timeout 1500 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v*" >> $LOG 2>&1; code=$?
  echo "=== capture $v exit=$code ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
  [ $code -eq 0 ] || { echo "=== stopped at capture $v" >> $LOG; finish $code; }
done
echo "=== portfolio status: [$(git status --porcelain | wc -l) changed paths]" >> $LOG
for g in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do gate $g; done
echo "=== gates done ($(date -u +%H:%M:%S))" >> $LOG
finish 0
