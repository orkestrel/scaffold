#!/usr/bin/env bash
# Runs the named app:browser test files and appends the run to the fo mutation log under a label.
# Usage: fo-run.sh LABEL FILE...
# The log entry carries the label, the exact command, the exit, the summary lines, and the failing
# case names with their first assertion line.
set -u
cd /home/user/veneer-fo || exit 2
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
label="$1"
shift
log=tmp/units/fo-mutations.log.txt
out=tmp/units/fo-last-run.log.txt
command="npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser $*"
timeout 540 npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser "$@" >"$out" 2>&1
status=$?
{
	echo "=== $label"
	echo "command: $command"
	echo "exit: $status"
	grep -E '^\s+(Test Files|Tests)\s' "$out"
	sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -a -E '^ *(×|✗) ' | sed 's/^ *[×✗] /failing: /'
	grep -E '^(AssertionError|Error|TypeError):' "$out" | head -8 | sed 's/^/message: /'
	echo
} >>"$log"
tail -n 25 "$out"
exit $status
