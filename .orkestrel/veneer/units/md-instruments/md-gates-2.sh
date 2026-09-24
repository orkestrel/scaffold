#!/bin/bash
# MODAL round 2: gate readings on the rebuilt validation copy tmp/probe/md-base
# (2a3f223 + the owned files + the round-2 shared changes). Each log lands in tmp/units/md-gates-2/.
set -u
W=/home/user/veneer-md
B=$W/tmp/probe/md-base
L=$W/tmp/units/md-gates-2
mkdir -p $L
cd $B
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
FILES=$(cat $W/tmp/probe/md-files.txt)
run() { local name=$1; shift; echo "\$ $*" > $L/$name.log.txt; "$@" >> $L/$name.log.txt 2>&1; local code=$?; echo "$name | \$ $* | exit=$code | $(grep -a 'Tests \|All matched\|Format issues\| error' $L/$name.log.txt | tr -s ' ' | tr '\n' ' ' | cut -c1-200)"; }
run oxfmt npx oxfmt --config .oxfmtrc.json --check $FILES
run oxlint npx oxlint --config .oxlintrc.json --deny-warnings $(echo $FILES | tr ' ' '\n' | grep '\.ts$')
run build npm run build:src
run check npm run check
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/modal.test.ts tests/src/styles/components/close.test.ts tests/src/styles/mixins.test.ts
run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ModalSection.test.ts
run showcase npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run setup npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
