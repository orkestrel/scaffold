#!/usr/bin/env bash
# fp round-2 gate runner: writes the command at the head of its log, runs it, and closes the log with its exit.
# Usage: fp-gate-2.sh <log name> <command...>
cd /home/user/veneer-fp
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log="tmp/units/$1"
shift
printf 'env: CAPTURE=%s\n' "${CAPTURE:-}" > "$log"
printf 'command:' >> "$log"
printf ' %q' "$@" >> "$log"
printf '\n' >> "$log"
"$@" >> "$log" 2>&1
code=$?
echo "exit $code" >> "$log"
exit $code
