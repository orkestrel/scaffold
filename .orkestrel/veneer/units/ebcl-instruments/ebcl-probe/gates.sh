#!/usr/bin/env bash
# Runs the unit's scoped checks and the gates Execution step 5 names, one log per gate, each ending
# with its exit code.
cd /home/user/veneer-ebcl
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
logs=tmp/units/logs
owned="tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md"
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $owned > $logs/ebcl-gate-format-scoped.log.txt 2>&1; echo "exit=$?" >> $logs/ebcl-gate-format-scoped.log.txt
./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts tests/setupStyles.ts tests/setupStyles.test.ts > $logs/ebcl-gate-lint-scoped.log.txt 2>&1; echo "exit=$?" >> $logs/ebcl-gate-lint-scoped.log.txt
npm run build:src > $logs/ebcl-gate-build-src.log.txt 2>&1; echo "exit=$?" >> $logs/ebcl-gate-build-src.log.txt
npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts > $logs/ebcl-gate-owned.log.txt 2>&1; echo "exit=$?" >> $logs/ebcl-gate-owned.log.txt
for gate in test:src:styles test:setup test:conformance test:guides test:policy; do
	log=$logs/ebcl-gate-${gate//:/-}.log.txt
	npm run $gate > $log 2>&1; echo "exit=$?" >> $log
done
echo "gates done"
