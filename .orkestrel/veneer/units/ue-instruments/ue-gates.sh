#!/bin/bash
# UTIL-EFFECT scoped gates on the validation copy at tmp/probe/base (the base commit, the owned
# files, and the shared patch applied), each logged as tmp/units/ue-gate-<name>.log.txt, with its exit
# and summary line appended to tmp/units/ue-gates.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
U=/home/user/veneer-ue/tmp/units
cd /home/user/veneer-ue/tmp/probe/base
: > $U/ue-gates.log.txt
run() { name=$1; shift; "$@" > $U/ue-gate-$name.log.txt 2>&1; echo "$name exit $? :: $* :: $(grep -E 'Tests +[0-9]|All matched|Finished' $U/ue-gate-$name.log.txt | tail -n 1 | sed 's/^ *//')" >> $U/ue-gates.log.txt; }
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
run setup npm run test:setup
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/shadow.test.ts tests/src/styles/utilities/opacity.test.ts tests/src/styles/components/focus-ring.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ShadowSection.test.ts tests/app/browser/sections/OpacitySection.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run service npm run test:service
run guides npm run test:guides
run policy npm run test:policy
run journey npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280
echo done >> $U/ue-gates.log.txt
