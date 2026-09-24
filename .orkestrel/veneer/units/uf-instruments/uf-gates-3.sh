#!/usr/bin/env bash
# UTIL-FONT round-3 gates: the validation copy tmp/probe/base, then the worktree, then the apply check
# on a fresh 2a3f223 extract. Writes tmp/units/uf-gates-3.log.txt with each command as it ran.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
ROOT=/home/user/veneer-uf
LOG=$ROOT/tmp/units/uf-gates-3.log.txt
: > "$LOG"
run() {
	local dir="$1" label="$2"; shift 2
	(cd "$dir" && "$@") > "$ROOT/tmp/probe/work/uf-gate3-$label.log.txt" 2>&1
	local code=$?
	echo "== [$dir] $* :: exit=$code" >> "$LOG"
	sed 's/\x1b\[[0-9;]*m//g' "$ROOT/tmp/probe/work/uf-gate3-$label.log.txt" | grep -E "Tests +[0-9]|Test Files| FAIL |All matched|Found [0-9]+ warning" | tail -3 >> "$LOG"
}
BASE=$ROOT/tmp/probe/base
run "$BASE" check npm run check
run "$BASE" build npm run build:src
run "$BASE" styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/font.test.ts
run "$BASE" setupStyles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run "$BASE" section npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TypeSection.test.ts
run "$BASE" guides npm run test:guides
run "$BASE" policy npm run test:policy
run "$BASE" lintshared npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore tests/setupStyles.ts tests/setupStyles.test.ts app/browser/constants.ts tests/src/styles/utilities/font.test.ts
run "$BASE" fmtshared npx oxfmt --config .oxfmtrc.json --check --ignore-path=.prettierignore tests/setupStyles.ts tests/setupStyles.test.ts app/browser/constants.ts guides/veneer.md tests/src/styles/utilities/font.test.ts
run "$ROOT" format npm run format:check
run "$ROOT" lint npm run lint:check
mkdir -p "$ROOT/tmp/probe/fresh"
git -C "$ROOT" archive 2a3f223 | tar -x -C "$ROOT/tmp/probe/fresh"
run "$ROOT/tmp/probe/fresh" apply git apply --check "$ROOT/tmp/units/uf-shared-3.patch"
