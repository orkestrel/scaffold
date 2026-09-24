#!/usr/bin/env bash
# Runs the FADE round-3 acceptance gates on the scratch copy tmp/probe/cf3-copy, which carries
# cf-shared-3.patch and cf-offlimits.patch, and records each command, its exit, and its result line
# in tmp/units/cf-3-gates.log.txt. Each full log sits beside it as tmp/units/cf-3-gate-<n>.log.txt.
# The build precedes the setup project, whose readers open the built cascade and the built core.
set -u
cd /home/user/veneer-cf/tmp/probe/cf3-copy
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=/home/user/veneer-cf/tmp/units
: > "$OUT/cf-3-gates.log.txt"
n=0
run() {
	n=$((n + 1))
	local log="$OUT/cf-3-gate-$n.log.txt"
	bash -c "$1" > "$log" 2>&1
	local code=$?
	local line
	line=$(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^ +Tests |All matched files|Finished in|✓ built in|Found [0-9]+ warning' | tail -1 | sed 's/^ *//')
	printf '%s\t%s\t%s\t%s\n' "$n" "$1" "$code" "${line:-(no result line; exit only)}" >> "$OUT/cf-3-gates.log.txt"
}
run 'npm run format:check'
run 'npm run lint:check'
run 'npm run check'
run 'npm run build:src'
run 'npm run test:setup'
