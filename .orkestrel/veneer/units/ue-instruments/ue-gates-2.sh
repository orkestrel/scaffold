#!/bin/bash
# UTIL-EFFECT round-2 gates on the validation copy at tmp/probe/base (the base commit, the owned
# files, and ue-shared-2.patch), each logged as tmp/units/ue-2-gate-<name>.log.txt, with its exit, its
# command, and its summary line appended to tmp/units/ue-gates-2.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
U=/home/user/veneer-ue/tmp/units
cd /home/user/veneer-ue/tmp/probe/base
: > $U/ue-gates-2.log.txt
run() { name=$1; shift; "$@" > $U/ue-2-gate-$name.log.txt 2>&1; echo "$name exit $? :: $* :: $(grep -E 'Tests +[0-9]|All matched|Finished' $U/ue-2-gate-$name.log.txt | tail -n 1 | sed 's/^ *//')" >> $U/ue-gates-2.log.txt; }
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
run setup-owned npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ShadowSection.test.ts tests/app/browser/sections/OpacitySection.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
echo done >> $U/ue-gates-2.log.txt
