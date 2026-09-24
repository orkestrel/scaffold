#!/usr/bin/env bash
# Runs the THEME round-2 acceptance gates. Owned-file checks run in the worktree; every gate that
# reads a shared file runs in the scratch copy, which is ac74459 with ct2-shared.patch and the
# owned files applied. Each gate's full output is ct2-gate-<n>.log.txt, and ct2-gates.log.txt
# records each gate's place, command, exit, and result line.
set -uo pipefail
root=/home/user/veneer-ct2
copy="$root/tmp/probe/ct2-copy"
units="$root/tmp/units"
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
owned='tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts'
shared='guides/veneer.md tests/conformance.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts'
: > "$units/ct2-gates.log.txt"
gate() {
	local number="$1" place="$2" command="$3" directory="$root"
	test "$place" = copy && directory="$copy"
	(cd "$directory" && eval "$command") > "$units/ct2-gate-$number.log.txt" 2>&1
	local status=$?
	local line
	line=$(grep -E 'Tests  |Finished in|built in|No errors|Found [0-9]+ warning' "$units/ct2-gate-$number.log.txt" | sed 's/\x1b\[[0-9;]*m//g' | tail -1)
	printf '%s | %s | %s | exit %s | %s\n' "$number" "$place" "$command" "$status" "${line:-none}" >> "$units/ct2-gates.log.txt"
}
"$units/ct2-sync.sh" > /dev/null
gate 1 worktree "npx oxfmt --config .oxfmtrc.json --check $owned"
gate 2 worktree 'npm run lint:check'
gate 3 copy "npx oxfmt --config .oxfmtrc.json --check $owned $shared"
gate 4 copy 'npm run lint:check'
gate 5 copy 'npm run check'
gate 6 copy 'npm run build:src'
gate 7 copy 'npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts'
gate 8 copy 'npm run test:setup'
gate 9 copy 'npm run test:conformance'
gate 10 copy 'npm run test:guides'
gate 11 copy 'npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts'
echo done >> "$units/ct2-gates.log.txt"
