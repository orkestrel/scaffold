#!/bin/bash
# the UTIL-PLACEMENT landing (on the session branch over the TOGGLES landing and its fold): format check, the fast gates, then the projects the unit touches. Log: upl-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/upl-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) base $(git rev-parse --short HEAD~1) ($(date -u +%H:%M:%S))" >> $LOG
npx oxfmt --write $(git diff --name-only --diff-filter=AM HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG; git status --short >> $LOG
for g in format:check lint:check check test:policy test:guides test:setup test:setup:browser; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/position.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/utilities/visually-hidden.test.ts >> $LOG 2>&1; echo "=== scoped styles (position, sizing, visibility, visually-hidden) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts >> $LOG 2>&1; echo "=== section proofs (Position, Sizing, Visibility, Showcase, entry) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== upl fast gates done ($(date -u +%H:%M:%S))" >> $LOG
