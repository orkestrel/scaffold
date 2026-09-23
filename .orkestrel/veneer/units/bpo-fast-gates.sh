#!/bin/bash
# bpo landing: format the landed files, then the fast gates and the scoped proofs. Log: bpo-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/bpo-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:guides; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== fast gates done" >> $LOG
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/pagination.test.ts tests/src/styles/components/button-group.test.ts tests/src/styles/components/progress.test.ts tests/src/styles/components/spinner.test.ts tests/src/styles/components/placeholder.test.ts tests/src/styles/components/card.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/breadcrumb.test.ts tests/src/styles/components/badge.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/icon-link.test.ts tests/src/styles/components/ratio.test.ts tests/src/styles/components/vr.test.ts >> $LOG 2>&1; echo "=== scoped styles (thirteen proofs) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== bpo landing gates done" >> $LOG
