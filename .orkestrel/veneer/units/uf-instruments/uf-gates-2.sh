#!/usr/bin/env bash
# UTIL-FONT round-2 gates on the validation copy tmp/probe/base; writes tmp/units/uf-gates-2.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
ROOT=/home/user/veneer-uf
LOG=$ROOT/tmp/units/uf-gates-2.log.txt
cd "$ROOT/tmp/probe/base" || exit 1
: > "$LOG"
run() {
	local label="$1"; shift
	"$@" > "$ROOT/tmp/probe/work/uf-gate2-$label.log.txt" 2>&1
	local code=$?
	echo "== $label :: $* :: exit=$code" >> "$LOG"
	grep -E "Tests +[0-9]|Test Files| FAIL " "$ROOT/tmp/probe/work/uf-gate2-$label.log.txt" | sed 's/\x1b\[[0-9;]*m//g' | tail -3 >> "$LOG"
}
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/font.test.ts
run section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run setupStyles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
