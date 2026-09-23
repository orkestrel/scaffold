#!/usr/bin/env bash
# Runs the scoped proof projects in the validation copy and reports each exit and tally.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd "$(dirname "$0")/../base" || exit 2
run() {
	local name="$1"; shift
	"$@" > "../instruments/$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code $(grep -E '^ +Tests ' "../instruments/$name.log.txt" | tail -1)"
}
run test-setup npm run test:setup
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/collapse.test.ts tests/src/styles/components/card.test.ts tests/src/styles/components/form-select.test.ts tests/src/styles/components/form-check.test.ts
run app npm run test:app
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
