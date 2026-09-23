#!/usr/bin/env bash
# Runs the unit's gates in the stage, cheap first, and logs each exit and summary.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
NB=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb
cd "$NB/retire" || exit 1
LOG="$NB/retire-gates.log.txt"
: > "$LOG"
step() {
	local name="$1"; shift
	"$@" > "$NB/retire-gate-$name.log.txt" 2>&1
	local code=$?
	local summary
	summary=$(sed 's/\x1b\[[0-9;]*m//g' "$NB/retire-gate-$name.log.txt" | grep -E '^\s+Tests\s|All matched files|Found [0-9]+ warning|error TS|✓ built' | tail -1)
	echo "$name | exit $code | $summary | $*" >> "$LOG"
}
step format-check npx oxfmt --config .oxfmtrc.json --check src/styles/_tokens.scss src/styles/_theme.scss tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/theme.test.ts
step lint-check npm run lint:check
step check npm run check
step build-src npm run build:src
step setupstyles-setup-project npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
step styles-retired npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/container.test.ts
step test-conformance npm run test:conformance
echo done >> "$LOG"
