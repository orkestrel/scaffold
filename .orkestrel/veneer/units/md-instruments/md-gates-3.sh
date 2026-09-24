#!/bin/bash
# MODAL round 3: gate readings on the rebuilt validation copy tmp/probe/md-base. Each line of the
# summary prints the command exactly as it ran, every argument expanded.
set -u
B=/home/user/veneer-md/tmp/probe/md-base
L=/home/user/veneer-md/tmp/units/md-gates-3
mkdir -p $L
cd $B
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
run() { local name=$1; shift; echo "\$ $*" > $L/$name.log.txt; "$@" >> $L/$name.log.txt 2>&1; local code=$?; echo "$name | \$ $* | exit=$code | $(grep -a 'Tests \|All matched\|Format issues\| error' $L/$name.log.txt | tr -s ' ' | tr '\n' ' ' | sed 's/\x1b\[[0-9;]*m//g' | cut -c1-200)"; }
run oxfmt npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/setupStyles.ts tests/setupStyles.test.ts
run oxlint npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts tests/setupStyles.test.ts
run build npm run build:src
run check npm run check
run setup npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run guides npm run test:guides
run policy npm run test:policy
run conformance npm run test:conformance
