#!/usr/bin/env bash
# lc-run.sh LOG [FILES...]: builds the styles in the scratch copy and runs the named styles proofs
# there, logging to tmp/units/LOG. With no files it runs the owned proofs.
set -uo pipefail
root=/home/user/veneer-lc
scratch=$root/tmp/probe/lc-scratch
log=$root/tmp/units/$1
shift
files=("$@")
if [ ${#files[@]} -eq 0 ]; then
	files=(tests/src/styles/mixins.test.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/button.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/validation.test.ts)
fi
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$scratch"
{
	echo "# build: npm run build:src:styles (in $scratch)"
	npm run build:src:styles > /dev/null 2>&1
	echo "# build exit $?"
	echo "# command: npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot ${files[*]}"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot "${files[@]}" 2>&1 | grep -v 'externalized for browser compatibility\|^stderr | unknown test$\|^$'
	echo "# vitest exit ${PIPESTATUS[0]}"
} > "$log" 2>&1
grep -E '^# (build|vitest) exit|Test Files|Tests  ' "$log"
