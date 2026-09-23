#!/bin/bash
# cn landing (8ca1609): format the landed files, the fast gates, the setup and conformance projects, then the
# authoritative chain (build, test). Log: cn-landing-gates.log.txt in the scratchpad, retained beside this script.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/cn-landing-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:policy test:setup; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== fast gates done" >> $LOG
npm run build >> $LOG 2>&1; echo "=== build exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm test >> $LOG 2>&1; echo "=== test exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== cn landing gates done" >> $LOG
