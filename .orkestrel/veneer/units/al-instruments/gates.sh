#!/usr/bin/env bash
# Runs the unit's gates on the fresh validation copy, one log per gate, and prints each exit.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-al/tmp/probe/fresh
logs=/home/user/veneer-al/tmp/probe/logs
mkdir -p "$logs"
run() {
	local name=$1
	shift
	"$@" > "$logs/$name.log.txt" 2>&1
	echo "$name exit=$? :: $(grep -E 'Tests |Test Files' "$logs/$name.log.txt" | tr -s ' ' | tr '\n' ' ')"
}
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts
run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
run setup npm run test:setup
