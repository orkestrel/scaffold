#!/usr/bin/env bash
# Runs the journey at one variant, optionally filtered to case titles, and appends the run to the fo
# mutation log under a label.
# Usage: fo-journey.sh LABEL VARIANT [CAPTURE] [PATTERN]
# CAPTURE is 1 to write frames and 0 otherwise. PATTERN is a case-title filter passed as the `-t`
# option, or empty for the whole journey.
set -u
cd /home/user/veneer-fo || exit 2
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
label="$1"
variant="$2"
capture="${3:-0}"
pattern="${4:-}"
log=tmp/units/fo-mutations.log.txt
out="tmp/units/fo-journey-${variant}.log.txt"
args=(run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:${variant}*")
if [ -n "$pattern" ]; then
	args+=(-t "$pattern")
fi
if [ "$capture" = "1" ]; then
	export CAPTURE=1
	prefix="CAPTURE=1 "
else
	unset CAPTURE
	prefix=""
fi
timeout 3600 npx vitest "${args[@]}" >"$out" 2>&1
status=$?
{
	echo "=== $label"
	printf 'command: %snpx vitest' "$prefix"
	printf ' %q' "${args[@]}"
	echo
	echo "exit: $status"
	grep -E '^\s+(Test Files|Tests)\s' "$out"
	sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -a -E '^ *(×|✗) ' | sed 's/^ *[×✗] /failing: /'
	grep -E '^(AssertionError|Error|TypeError):' "$out" | head -8 | sed 's/^/message: /'
	echo
} >>"$log"
sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -a -E '^ *(×|✗|✓) |Test Files|Tests ' | tail -n 60
exit $status
