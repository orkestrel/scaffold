#!/usr/bin/env bash
# Runs one named gate of unit E-ID-FLOW in the worktree and logs it under tmp/units/flow-logs.
# Usage: flow-run.sh <label> <command...>
set -u
cd /home/user/veneer-flow
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
label=$1
shift
log=tmp/units/flow-logs/$label.log.txt
"$@" > "$log" 2>&1
code=$?
echo "exit $code" >> "$log"
echo "$label exit $code"
tail -25 "$log"
