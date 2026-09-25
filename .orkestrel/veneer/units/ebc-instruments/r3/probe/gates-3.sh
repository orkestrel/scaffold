#!/usr/bin/env bash
# Round 3 gates, in the brief's Execution order, each into tmp/units/ebc-3-<gate>.log.txt with its
# exit code appended. What changed from gates.sh: the brief's round-3 gate list and log names.
set -u
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-ebc
L=tmp/units
run() {
	local gate="$1"; shift
	"$@" > "$L/ebc-3-$gate.log.txt" 2>&1
	echo "exit=$?" >> "$L/ebc-3-$gate.log.txt"
	echo "$gate $(tail -1 "$L/ebc-3-$gate.log.txt")"
}
run build-styles npm run build:src:styles
run owned-styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache \
	tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts \
	tests/src/styles/components/close.test.ts tests/src/styles/components/button.test.ts \
	tests/src/styles/components/accordion.test.ts tests/src/styles/components/carousel.test.ts
run owned-service npx vitest run --config vite.config.ts --no-cache --project service \
	tests/service/tailwind/consumer.test.ts
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run test-src-styles npm run test:src:styles
run test-setup npm run test:setup
run test-conformance npm run test:conformance
run test-guides npm run test:guides
run test-policy npm run test:policy
run service npx vitest run --config vite.config.ts --no-cache --project service
echo "gates done"
