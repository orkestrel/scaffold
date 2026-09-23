#!/bin/bash
# us landing (746d3e9): format the landed files, the fast gates, then the projects the unit touches. Log: us-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/us-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:policy test:guides test:setup; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/utilities/gap.test.ts >> $LOG 2>&1; echo "=== scoped styles (mixins, gap) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/LayoutSection.test.ts >> $LOG 2>&1; echo "=== Layout section proof exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== us fast gates done" >> $LOG
