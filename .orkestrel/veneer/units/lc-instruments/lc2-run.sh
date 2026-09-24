#!/usr/bin/env bash
# lc2-run.sh LOG FILES...: builds the styles and runs the named styles proofs, logging the command first.
set -uo pipefail
root=/home/user/veneer-lc2
log=$root/tmp/units/$1
shift
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$root"
{
	echo "# command: npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $*"
	npm run build:src:styles > /dev/null 2>&1
	echo "# build exit $?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "$@" 2>&1 | grep -v 'externalized for browser compatibility\|^stderr | unknown test$\|^$'
	echo "# vitest exit ${PIPESTATUS[0]}"
} > "$log" 2>&1
grep -E '^# (build|vitest) exit|Test Files|Tests  ' "$log"
