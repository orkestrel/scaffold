#!/bin/bash
# F8c integration check on the session branch after land-f8c.sh: format the merged files, then the scoped gates F8c touches. Log: f8c-integrate.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/f8c-integrate.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
FILES=$(git diff-tree --no-commit-id --name-only -r HEAD | grep -E '\.(ts|md|scss|css|json)$' | while read -r f; do [ -f "$f" ] && echo "$f"; done)
echo "=== merged files: $FILES" >> $LOG
npx oxfmt --config .oxfmtrc.json --write $FILES >> $LOG 2>&1; echo "=== oxfmt exit=$?" >> $LOG
echo "=== reformatted: [$(git status --porcelain)]" >> $LOG
for gate in format:check lint:check check test:setup test:conformance test:guides; do
  npm run $gate >> $LOG 2>&1; echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> $LOG
done
npm run build:src:styles >> $LOG 2>&1; echo "=== build:src:styles exit=$?" >> $LOG
timeout 900 npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== integrate done" >> $LOG
