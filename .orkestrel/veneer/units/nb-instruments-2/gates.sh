#!/usr/bin/env bash
# Runs the unit's gates in the stage, cheap first, and logs each exit and summary line.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage
I=/home/user/veneer-nb/tmp/units/nb-instruments-2
cd "$STAGE" || exit 1
LOG=$I/logs/gates.log.txt
: > "$LOG"
step() {
	local name="$1"; shift
	"$@" > "$I/logs/gate-$name.log.txt" 2>&1
	local code=$?
	sed -i 's/\x1b\[[0-9;]*m//g' "$I/logs/gate-$name.log.txt"
	local summary
	summary=$(grep -E '^\s+Tests\s|All matched files|Found [0-9]+ (warning|error)|error TS|✓ built' "$I/logs/gate-$name.log.txt" | tail -1)
	echo "$name | exit $code | $summary | $*" >> "$LOG"
}
step format-check npm run format:check
step lint-check npm run lint:check
step check npm run check
step build-src npm run build:src
step styles-owned npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/components/container.test.ts
step section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts
step setupstyles-setup-project npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
step test-conformance npm run test:conformance
step test-guides npm run test:guides
step test-policy npm run test:policy
step test-app npm run test:app
step test-setup npm run test:setup
echo done >> "$LOG"
