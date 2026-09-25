#!/usr/bin/env bash
# Runs the STATES unit's acceptance gates, one log per gate under tmp/units, each ending in its exit code.
cd /home/user/veneer-sts || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED=(tests/src/styles/components/form-range.test.ts tests/src/styles/components/button.test.ts guides/veneer.md)

npm run check > tmp/units/sts-check.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-check.log.txt

npm run lint:check > tmp/units/sts-lint.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-lint.log.txt

./node_modules/.bin/oxfmt --config .oxfmtrc.json --check "${OWNED[@]}" > tmp/units/sts-format.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-format.log.txt

{
	npm run build:src:styles
	npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts tests/src/styles/components/button.test.ts --reporter=verbose
} 2>&1 | grep -v 'externalized for browser compatibility' > tmp/units/sts-styles.log.txt
echo "exit=${PIPESTATUS[0]}" >> tmp/units/sts-styles.log.txt

npm run test:guides > tmp/units/sts-guides.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-guides.log.txt

npm run test:policy > tmp/units/sts-policy.log.txt 2>&1
echo "exit=$?" >> tmp/units/sts-policy.log.txt
