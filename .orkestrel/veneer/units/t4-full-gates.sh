#!/bin/bash
# t4-full-gates.sh: the test package's full gate chain over the T4 working tree, the release's own gate. Log: t4-full-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/t4-full-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/test || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) dirty: $(git status --porcelain | wc -l) ($(date -u +%H:%M:%S))" >> $LOG
for g in format:check lint:check check build test; do timeout 1800 npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== t4 full gates done ($(date -u +%H:%M:%S))" >> $LOG
