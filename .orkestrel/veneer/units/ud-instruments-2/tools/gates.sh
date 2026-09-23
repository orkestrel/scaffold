#!/usr/bin/env bash
# Runs the acceptance gates in the landing copy, in the brief's order, one log per gate under
# logs/gates/, and prints each gate's exact command, exit code, and result line.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
root=/home/user/veneer-ud
land=$root/tmp/probe/land
logs=$root/tmp/units/ud-instruments-2/logs/gates
mkdir -p "$logs"
cd "$land"
gate() {
	local name=$1; shift
	{ echo "copy: $land"; echo "command: $*"; bash -c "$*" 2>&1 | sed 's/\x1b\[[0-9;]*m//g'; echo "exit=${PIPESTATUS[0]}"; } > "$logs/$name.log.txt"
	echo "$name | $* | $(grep -E '^exit=' "$logs/$name.log.txt" | tail -1) | $(grep -E 'Tests +[0-9]|All matched files|Found [0-9]+ warning|passed|failed' "$logs/$name.log.txt" | tail -1 | sed 's/^ *//')"
}
gate format-check 'npm run format:check'
gate lint-check 'npm run lint:check'
gate check 'npm run check'
gate build-src 'npm run build:src'
gate styles-proofs 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts tests/setupStyles.test.ts'
gate app-proofs 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts'
gate test-guides 'npm run test:guides'
gate test-policy 'npm run test:policy'
gate test-setup 'npm run test:setup'
gate test-conformance 'npm run test:conformance'
gate conformance-verbose 'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project conformance'
gate test-service 'npm run build:src:styles && npm run test:service'
