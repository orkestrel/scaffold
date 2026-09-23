#!/bin/bash
# dx (disclosure) landing (a1b12ab dd, 77bb770 nv, 041925c co on the session branch over e4e6a40): format the landed files, the fast gates, then the projects the units touch. Log: dx-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/dx-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) base e4e6a40 ($(date -u +%H:%M:%S))" >> $LOG
npx oxfmt --write $(git diff --name-only e4e6a40 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
git status --short >> $LOG
for g in format:check lint:check check test:policy test:guides test:setup; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/collapse.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/button-group.test.ts tests/src/styles/components/card.test.ts >> $LOG 2>&1; echo "=== scoped styles (collapse, dropdown, nav, button-group, card) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/CollapseSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts >> $LOG 2>&1; echo "=== section proofs (Collapse, Dropdown, Nav, Card) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== dx fast gates done ($(date -u +%H:%M:%S))" >> $LOG
