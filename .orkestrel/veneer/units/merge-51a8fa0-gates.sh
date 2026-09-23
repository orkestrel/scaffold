#!/bin/bash
# Fast gates over the Veneer merge commit 51a8fa0 (the TOGGLES fold merged with the engine session's landings f538d48 on main), which the TOGGLES chain (run on d0c1eff) did not cover. Log: merge-51a8fa0-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/merge-51a8fa0-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) ($(date -u +%H:%M:%S))" >> $LOG
npm install --ignore-scripts >> $LOG 2>&1; echo "=== npm install exit=$? lockfile: [$(git status --porcelain package-lock.json package.json)] ($(date -u +%H:%M:%S))" >> $LOG; sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
for g in format:check lint:check check build test:src:browser test:setup test:guides test:conformance test:app test:policy test:service; do timeout 1500 npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
echo "=== merge gates done ($(date -u +%H:%M:%S))" >> $LOG
