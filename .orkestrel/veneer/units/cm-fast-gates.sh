#!/bin/bash
# cm landing: format the landed files, then the fast gates. Log: cm-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/cm-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:guides; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== fast gates done" >> $LOG
npm run test:setup >> $LOG 2>&1; echo "=== test:setup exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; echo "=== build:src:styles exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-range.test.ts tests/src/styles/components/form-floating.test.ts tests/src/styles/components/form-select.test.ts tests/src/styles/components/form-control.test.ts tests/src/styles/components/form-check.test.ts tests/src/styles/components/pagination.test.ts tests/src/styles/components/progress.test.ts tests/src/styles/components/spinner.test.ts tests/src/styles/components/icon-link.test.ts >> $LOG 2>&1; echo "=== scoped styles (nine proofs) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== cm landing gates done" >> $LOG
