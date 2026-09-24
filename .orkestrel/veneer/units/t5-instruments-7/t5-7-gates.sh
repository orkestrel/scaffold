#!/bin/bash
# Runs the round-7 gates and appends each exit status to its log under tmp/units/.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
npx oxfmt --config .oxfmtrc.json --check src/browser/helpers.ts guides/test.md > tmp/units/t5-7-gate-format.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-7-gate-format.log.txt
npm run lint:check > tmp/units/t5-7-gate-lint.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-7-gate-lint.log.txt
npm run check > tmp/units/t5-7-gate-check.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-7-gate-check.log.txt
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts > tmp/units/t5-7-gate-file.log.txt 2>&1
echo "exit $?" >> tmp/units/t5-7-gate-file.log.txt
