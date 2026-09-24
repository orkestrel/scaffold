#!/usr/bin/env bash
# lc2-journey.sh LOG VARIANT: runs the journey's composed-contrast case and role-link case at one
# variant, logging the command first.
set -uo pipefail
root=/home/user/veneer-lc2
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$root"
cmd=(npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$2" -t 'measures the composed contrast of every variant and state against its control|drives a link of each link specimen to the pointer and to keyboard focus')
{
	echo "# cwd: $root"
	echo "# command: ${cmd[*]}"
	"${cmd[@]}" 2>&1 | grep -v 'externalized for browser compatibility\|^stderr | unknown test$\|^$'
	echo "# exit ${PIPESTATUS[0]}"
} > "$root/tmp/units/$1" 2>&1
grep -E '^# exit|Test Files|Tests  ' "$root/tmp/units/$1"
