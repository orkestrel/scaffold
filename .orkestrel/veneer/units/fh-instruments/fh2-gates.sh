#!/usr/bin/env bash
# FRAME-HELPERS round 2 gates, each logged under tmp/units with its exit status.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
run() { log=$1; shift; "$@" > tmp/units/$log 2>&1; echo "exit $?" >> tmp/units/$log; }
run fh2-format.log.txt npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts
run fh2-lint.log.txt npm run lint:check
run fh2-check.log.txt npm run check
run fh2-test-setup.log.txt npm run test:setup
run fh2-setup-browser.log.txt npm run test:setup:browser
run fh2-test-guides.log.txt npm run test:guides
CAPTURE=1 run fh2-journey-dark-1280.log.txt npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280
CAPTURE=1 run fh2-journey-light-390.log.txt npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390
