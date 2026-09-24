#!/bin/bash
# Attributes the post-landing reds: runs setup:browser and src:browser on Veneer main e42b5fa alone (no FRAME-HELPERS),
# in a probe worktree with a hard-linked node_modules and a fresh build.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-main-probe; LOG=$S/main-attribution.log.txt; : > $LOG
cd /home/user/veneer && git worktree add -q --detach $P e42b5fa && cp -al /home/user/veneer/node_modules $P/node_modules
cd $P && echo "=== head $(git rev-parse --short HEAD)" >> $LOG
step() { name=$1; shift; "$@" > $S/main-attr-$name.log.txt 2>&1; e=$?; echo "=== $name exit=$e $(sed 's/\x1b\[[0-9;]*m//g' $S/main-attr-$name.log.txt | grep -E '^ +Tests ' | tail -1)" >> $LOG; }
step build npm run build
step setup-browser npm run test:setup:browser
step src-browser npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
sed 's/\x1b\[[0-9;]*m//g' $S/main-attr-setup-browser.log.txt | grep -E "^ FAIL" >> $LOG
echo "=== done" >> $LOG
