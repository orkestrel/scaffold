#!/bin/bash
# Runs the fast gates and appends each exit status to its log under tmp/units/.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH
npx oxfmt --config .oxfmtrc.json --check src/browser/helpers.ts src/browser/types.ts tests/src/browser/helpers.test.ts guides/test.md > tmp/units/t5-5-gate-format.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-5-gate-format.log.txt
npm run lint:check > tmp/units/t5-5-gate-lint.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-5-gate-lint.log.txt
npm run check > tmp/units/t5-5-gate-check.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-5-gate-check.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts > tmp/units/t5-5-gate-file.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-5-gate-file.log.txt
timeout 900 npm run test:src:browser > tmp/units/t5-5-gate-browser.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-5-gate-browser.log.txt
