#!/usr/bin/env bash
# Runs the FADE acceptance gates on the scratch copy tmp/probe/cf-copy, in brief order, and records
# each command, its exit, and its result line in tmp/units/cf-gates.log.txt. Each full log sits
# beside it as tmp/units/cf-gate-<n>.log.txt.
set -u
cd /home/user/veneer-cf/tmp/probe/cf-copy
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=/home/user/veneer-cf/tmp/units
: > "$OUT/cf-gates.log.txt"
n=0
run() {
	n=$((n + 1))
	local log="$OUT/cf-gate-$n.log.txt"
	bash -c "$1" > "$log" 2>&1
	local code=$?
	local line
	line=$(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^ +Tests |All matched files|Finished in|✓ built in|Found [0-9]+ warning' | tail -1 | sed 's/^ *//')
	printf '%s\t%s\t%s\t%s\n' "$n" "$1" "$code" "${line:-(no result line; exit only)}" >> "$OUT/cf-gates.log.txt"
}
run 'npm run format:check'
run 'npm run lint:check'
run 'npm run check'
run 'npm run build:src'
run 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts'
run 'npm run test:conformance'
run 'npm run test:guides'
run 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts'
# Observations beyond the criteria.
run 'npm run test:setup'
run 'npm run test:policy'
run 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot'
