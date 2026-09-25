#!/usr/bin/env bash
# Runs the unit's gates in the brief's order, each into its own log with its exit code appended.
set -u
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-ebc
L=tmp/units/logs
npm run build:src:styles > "$L/ebc-gate-build-styles.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-build-styles.log.txt"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache \
	tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts \
	tests/src/styles/components/close.test.ts > "$L/ebc-gate-owned-styles.log.txt" 2>&1
echo "exit=$?" >> "$L/ebc-gate-owned-styles.log.txt"
npx vitest run --config vite.config.ts --no-cache --project service \
	tests/service/tailwind/consumer.test.ts > "$L/ebc-gate-owned-service.log.txt" 2>&1
echo "exit=$?" >> "$L/ebc-gate-owned-service.log.txt"
npm run test:src:styles > "$L/ebc-gate-test-src-styles.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-test-src-styles.log.txt"
npm run test:setup > "$L/ebc-gate-test-setup.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-test-setup.log.txt"
npm run test:conformance > "$L/ebc-gate-test-conformance.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-test-conformance.log.txt"
npm run test:guides > "$L/ebc-gate-test-guides.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-test-guides.log.txt"
npm run test:policy > "$L/ebc-gate-test-policy.log.txt" 2>&1; echo "exit=$?" >> "$L/ebc-gate-test-policy.log.txt"
npx vitest run --config vite.config.ts --no-cache --project app:browser > "$L/ebc-gate-app-browser.log.txt" 2>&1
echo "exit=$?" >> "$L/ebc-gate-app-browser.log.txt"
echo "gates done"
