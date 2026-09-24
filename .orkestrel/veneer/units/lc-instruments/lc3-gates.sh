#!/usr/bin/env bash
# lc3-gates.sh: runs round 3's gates in the lc2 worktree, one log per gate opening with its command,
# and a summary line per gate in tmp/units/lc3-gates.log.txt.
set -uo pipefail
root=/home/user/veneer-lc2
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$root"
summary=$root/tmp/units/lc3-gates.log.txt
: > "$summary"
n=0
gate() {
	n=$((n + 1))
	local log=$root/tmp/units/lc3-gate-$n.log.txt
	{ echo "# command: $*"; eval "$@"; echo "# exit $?"; } > "$log" 2>&1
	local line
	line=$(sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^# exit|Tests  |All matched|Found [0-9]+ (warning|error)' | tr '\n' ' ')
	echo "gate $n | $* | $line" >> "$summary"
}
changed=$(git diff --name-only | tr '\n' ' ')
gate "npx oxfmt --config .oxfmtrc.json --check $changed"
gate "npm run lint:check"
gate "npm run check"
gate "npm run build:src"
gate "cmp tmp/units/lc3-round2-index.css dist/src/styles/index.css && echo byte-identical"
gate "npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
gate "npm run test:guides"
gate "npm run test:conformance"
gate "npm run test:src:styles"
cat "$summary"
