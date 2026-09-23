#!/usr/bin/env bash
# Runs every scoped gate of the round-2 brief on the final validation copy (tmp/probe/final: a658879,
# the round-2 shared patch, and the owned files) and reports each exit and result line. Each gate
# logs to logs/final-<gate>.log.txt. Round 2: supersedes ac-instruments/gates-fast.sh and
# ac-instruments/gates-proofs.sh for the final reading.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE/../../probe/final" || exit 2
run() {
	local name="$1"; shift
	"$@" > "$HERE/logs/final-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code $(grep -E '^ +Tests ' "$HERE/logs/final-$name.log.txt" | tail -1 | sed 's/^ *//')"
}
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run build-src npm run build:src
run accordion npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts
run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts
run test-setup npm run test:setup
run test-conformance npm run test:conformance
run test-guides npm run test:guides
run test-policy npm run test:policy
run test-app npm run test:app
run journey-light-1280 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280
