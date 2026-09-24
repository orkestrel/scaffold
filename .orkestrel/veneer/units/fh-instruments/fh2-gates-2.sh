#!/usr/bin/env bash
# FRAME-HELPERS round 2 gates, second run after the press-case repair, each logged under tmp/units with its exit status.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
run() { log=$1; shift; "$@" > tmp/units/$log 2>&1; echo "exit $?" >> tmp/units/$log; }
run fh2-format-2.log.txt npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts
run fh2-lint-2.log.txt npm run lint:check
run fh2-check-2.log.txt npm run check
run fh2-test-setup-2.log.txt npm run test:setup
run fh2-setup-browser-2.log.txt npm run test:setup:browser
run fh2-test-guides-2.log.txt npm run test:guides
CAPTURE=1 run fh2-journey-dark-1280-2.log.txt npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280
CAPTURE=1 run fh2-journey-light-390-2.log.txt npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390
