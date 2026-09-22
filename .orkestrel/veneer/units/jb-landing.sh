#!/bin/bash
# Land J1 JOURNEY-BUDGET on the session branch, prove it with test:config and test:journey, push. Log: land-jb.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/land-jb.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
bash $S/integrate-unit.sh jb $S/jb-landing-message.txt >> "$LOG" 2>&1; echo "=== integrate exit=$?" >> "$LOG"
cd /home/user/veneer || exit 1
npm run format:check >> "$LOG" 2>&1; echo "=== format:check exit=$?" >> "$LOG"
npm run test:config >> "$LOG" 2>&1; echo "=== test:config exit=$?" >> "$LOG"
npm run test:journey >> "$LOG" 2>&1; echo "=== test:journey exit=$? load $(cut -d' ' -f1 /proc/loadavg)" >> "$LOG"
echo "=== HEAD $(git rev-parse --short HEAD) status [$(git status --porcelain)]" >> "$LOG"
