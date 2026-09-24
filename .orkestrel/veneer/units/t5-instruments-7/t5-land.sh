#!/bin/bash
# Lands T5 TEST-FRAME (rounds 1 to 7, accepted) on @orkestrel/test's session branch at /home/user/test: applies the
# round-7 diff (the whole change over 80c419e, .orkestrel/veneer/units/t5-7.diff) to the clean session tree at 80c419e,
# confirms the applied tree equals /home/user/test-tf's working tree file by file, runs the fast gates, and commits the
# landing. The release bump is t5-release-bump.sh, run after this. Refuses a dirty tree. Log: t5-land.log.txt
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/t5-land.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/test || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; exit 2; }
[ "$(git rev-parse --short HEAD)" = "80c419e" ] || { echo "=== HEAD is $(git rev-parse --short HEAD), not 80c419e; refusing" >> $LOG; exit 3; }
git apply /home/user/scaffold/.orkestrel/veneer/units/t5-7.diff >> $LOG 2>&1 || { echo "=== apply failed" >> $LOG; exit 4; }
for f in guides/test.md src/browser/helpers.ts src/browser/types.ts tests/src/browser/helpers.test.ts; do
  cmp -s "$f" "/home/user/test-tf/$f" && echo "=== $f equals test-tf" >> $LOG || { echo "=== $f differs from test-tf; refusing" >> $LOG; exit 5; }
done
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
git add guides/test.md src/browser/helpers.ts src/browser/types.ts tests/src/browser/helpers.test.ts
git commit -q -F $S/t5-landing-message.txt
echo "=== landing commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
echo "=== land done" >> $LOG
