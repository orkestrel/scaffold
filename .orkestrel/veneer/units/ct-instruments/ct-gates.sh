#!/usr/bin/env bash
# Runs the THEME unit's acceptance gates and records each command, its directory, its exit, and its
# result line in tmp/units/ct-gates.log.txt, with each full log in tmp/units/ct-gate-<n>.log.txt. The
# worktree carries the owned files alone; the scratch copy tmp/probe/ct-copy carries the owned files,
# ct-shared.patch, and ct-unscoped.patch on a 2bf1142 extract. The build precedes every run that
# reads the built cascade. Every proof runs in the scratch copy, because the owned proofs import the
# case tables ct-shared.patch adds to tests/setupStyles.ts.
set -u
ROOT=/home/user/veneer-ct
COPY=$ROOT/tmp/probe/ct-copy
OUT=$ROOT/tmp/units
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OWNED="src/styles/_tokens.scss src/styles/_theme.scss tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/setupServer.ts tests/setupServer.test.ts app/browser/sections/ColorModeSection.ts tests/app/browser/sections/ColorModeSection.test.ts"
: > "$OUT/ct-gates.log.txt"
n=0
run() {
	n=$((n + 1))
	local dir=$1 command=$2
	local log="$OUT/ct-gate-$n.log.txt"
	(cd "$dir" && bash -c "$command") > "$log" 2>&1
	local code=$?
	local line
	line=$(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^ +Tests |All matched files|Finished in|✓ built in|Found [0-9]+ warning|# (pass|fail)' | tail -1 | sed 's/^ *//')
	printf '%s\t%s\t%s\t%s\t%s\n' "$n" "${dir#$ROOT/}" "$command" "$code" "${line:-(no result line; exit only)}" >> "$OUT/ct-gates.log.txt"
}
run "$ROOT" "npx oxfmt --config .oxfmtrc.json --check $OWNED"
run "$ROOT" 'npm run lint:check'
run "$COPY" 'npm run format:check'
run "$COPY" 'npm run lint:check'
run "$COPY" 'npm run check'
run "$ROOT" 'npm run build:src'
run "$COPY" 'npm run build:src'
run "$COPY" 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts'
run "$COPY" 'npm run test:setup'
run "$COPY" 'npm run test:conformance'
run "$COPY" 'npm run test:guides'
run "$COPY" 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts'
run "$COPY" 'npm run test:policy'
run "$COPY" 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot'
