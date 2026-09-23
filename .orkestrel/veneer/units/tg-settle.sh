#!/bin/bash
# tg-settle.sh: the Orchestrator's host gate run over the reconstructed TOGGLES round-3 snapshot (a658879 plus the retained round-3 shared patch plus the six owned files from the worktree), settling the objective lane's claim-7 chronology clause. Log: $S/tg-settle.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units; W=/home/user/veneer-tg; D=$S/tg-settle
rm -rf $D; mkdir -p $D; cd $W && git archive a658879 | tar -x -C $D; cd $D && git init -q && git apply $U/tg-shared-3.patch && echo "=== round-3 shared patch applied to a fresh a658879 extract exit=$?"
for f in src/styles/components/_button-group.scss src/styles/components/_input-group.scss tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts; do cp $W/$f $D/$f; done; echo "=== owned files copied from the worktree; digests:"; sha256sum src/styles/components/_button-group.scss tests/src/styles/components/button-group.test.ts | cut -c1-16,65-
cp -al /home/user/veneer/node_modules node_modules
echo "=== check ($(date -u +%H:%M:%S))"; nice npm run check > /dev/null 2>&1; echo "=== check exit=$?"
echo "=== build:src:styles"; nice npm run build:src:styles > /dev/null 2>&1; echo "=== build:src:styles exit=$?"
echo "=== styles proofs ($(date -u +%H:%M:%S))"; nice npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts 2>&1 | grep -E "Tests |Test Files"; echo "=== styles exit=${PIPESTATUS[0]}"
echo "=== setup tables ($(date -u +%H:%M:%S))"; nice npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts 2>&1 | grep -E "Tests |Test Files"; echo "=== setup exit=${PIPESTATUS[0]}"
echo "=== section proofs ($(date -u +%H:%M:%S))"; nice npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts 2>&1 | grep -E "Tests |Test Files"; echo "=== sections exit=${PIPESTATUS[0]}"
echo "=== done ($(date -u +%H:%M:%S))"; cd $S && rm -rf $D
