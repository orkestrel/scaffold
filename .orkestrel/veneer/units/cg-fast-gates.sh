#!/bin/bash
# cg landing: format the landed files, then the fast gates. Log: cg-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/cg-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:guides; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== fast gates done" >> $LOG
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/integration.test.ts >> $LOG 2>&1; echo "=== scoped styles (integration) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== cg landing gates done" >> $LOG
