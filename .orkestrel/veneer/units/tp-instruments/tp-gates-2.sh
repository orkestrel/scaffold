#!/usr/bin/env bash
# TIP round-2 gates on the rebuilt validation copy tmp/probe/base (2a3f223 + tp-shared-2 edits + owned files).
source /home/user/veneer-tp/tmp/units/tp-env.sh
cd /home/user/veneer-tp/tmp/probe/base
run() { local name=$1; shift; "$@" > ../tp-gate2-$name.log 2>&1; local code=$?; echo "## $name exit $code :: $*"; sed 's/\x1b\[[0-9;]*m//g' ../tp-gate2-$name.log | grep -E "Test Files|Tests  "; }
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/src/styles/mixins.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TooltipSection.test.ts tests/app/browser/sections/PopoverSection.test.ts
run setup npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
run showcase npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run fmt npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check $(cat ../tp-changed.txt)
run lint npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore $(grep -E '\.ts$' ../tp-changed.txt)
