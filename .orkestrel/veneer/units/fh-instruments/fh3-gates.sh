#!/usr/bin/env bash
# FRAME-HELPERS round 3 gates, each logged under tmp/units with its exit status.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
run() { log=$1; shift; "$@" > tmp/units/$log 2>&1; echo "exit $?" >> tmp/units/$log; }
run fh3-format.log.txt npx oxfmt --config .oxfmtrc.json --check tests/app/browser/integration.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts
run fh3-lint.log.txt npm run lint:check
run fh3-check.log.txt npm run check
run fh3-setup-browser.log.txt npm run test:setup:browser
run fh3-test-guides.log.txt npm run test:guides
