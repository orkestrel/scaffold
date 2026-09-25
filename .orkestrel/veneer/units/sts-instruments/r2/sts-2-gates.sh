#!/usr/bin/env bash
# Runs the STATES round 2 acceptance gates, one log per gate under tmp/units, each ending in its exit code.
cd /home/user/veneer-sts || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED=(tests/src/styles/components/form-range.test.ts tests/src/styles/components/button.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts guides/veneer.md)

npm run check > tmp/units/sts-2-check.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-2-check.log.txt

npm run lint:check > tmp/units/sts-2-lint.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-2-lint.log.txt

./node_modules/.bin/oxfmt --config .oxfmtrc.json --check "${OWNED[@]}" > tmp/units/sts-2-format.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-2-format.log.txt

{
	npm run build:src:styles
	npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts tests/src/styles/components/button.test.ts --reporter=verbose
} 2>&1 | grep -v 'externalized for browser compatibility' > tmp/units/sts-2-styles.log.txt
echo "exit=${PIPESTATUS[0]}" >> tmp/units/sts-2-styles.log.txt

npx vitest run --config vite.config.ts --no-cache --project setup:browser 2>&1 | grep -v 'externalized for browser compatibility' > tmp/units/sts-2-setup-browser.log.txt
echo "exit=${PIPESTATUS[0]}" >> tmp/units/sts-2-setup-browser.log.txt

npm run test:guides > tmp/units/sts-2-guides.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-2-guides.log.txt

npm run test:policy > tmp/units/sts-2-policy.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-2-policy.log.txt
