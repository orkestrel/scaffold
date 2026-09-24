#!/usr/bin/env bash
# TIP round-4 gates on the rebuilt validation copy tmp/probe/base (2a3f223 + the owned files + the tp-shared-4 edits).
# The build precedes the setup and styles runs, which read the built cascade. The copy carries a
# hard-link copy of node_modules (cp -al), as the round-1 brief prescribes; a symlink fails the
# app:browser project's physical-package-root check.
source /home/user/veneer-tp/tmp/units/tp-env.sh
cd /home/user/veneer-tp/tmp/probe/base
run() { local name=$1; shift; "$@" > ../tp-gate4-$name.log 2>&1; local code=$?; echo "## $name exit $code :: $*"; sed 's/\x1b\[[0-9;]*m//g' ../tp-gate4-$name.log | grep -E "Test Files|Tests  |All matched|Finished|Found"; }
run check npm run check
run build npm run build:src
run setup npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run guides npm run test:guides
run policy npm run test:policy
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/PopoverSection.test.ts
run fmt npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check app/browser/constants.ts guides/veneer.md tests/setupStyles.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/app/browser/sections/PopoverSection.test.ts
run lint npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore app/browser/constants.ts tests/setupStyles.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/app/browser/sections/PopoverSection.test.ts
