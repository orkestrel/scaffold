#!/bin/bash
# bfl landing: format the landed files, then the fast gates. Log: bfl-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/bfl-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npx oxfmt --write $(git diff --name-only HEAD~1 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG
for g in format:check lint:check check test:guides; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== fast gates done" >> $LOG
