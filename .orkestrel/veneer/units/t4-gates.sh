#!/bin/bash
# T4 TEST-CLIP scoped gates in /home/user/test: format the touched files, then format:check, lint:check, check, the
# scoped browser cases for clipsOverflow and measureContent, and the guides project. Log: t4-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/t4-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/test || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) dirty: $(git status --porcelain | wc -l) ($(date -u +%H:%M:%S))" >> $LOG
npx oxfmt --write src/browser/helpers.ts tests/src/browser/helpers.test.ts guides/test.md >> $LOG 2>&1; echo "=== oxfmt exit=$?" >> $LOG
for g in format:check lint:check check; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "clipsOverflow|measureContent" >> $LOG 2>&1; echo "=== scoped browser (clipsOverflow, measureContent) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:guides >> $LOG 2>&1; echo "=== test:guides exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== t4 gates done ($(date -u +%H:%M:%S))" >> $LOG
