#!/usr/bin/env bash
# J-TAB round 3: the acceptance chain in j-tab-brief-3.md's order, each command's exit code and its
# summary lines written to tmp/j-tab/acceptance-3.log.txt.
cd C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab
LOG=tmp/j-tab/acceptance-3.log.txt
: > "$LOG"
run() {
	local label="$1"
	shift
	"$@" > tmp/j-tab/acc3-step.log.txt 2>&1
	local code=$?
	echo "== $label exit=$code" >> "$LOG"
	sed 's/\x1b\[[0-9;]*m//g' tmp/j-tab/acc3-step.log.txt | grep -E "Test Files|Tests  |All matched|Finished in|error|✓ built|Copied|Chrome/" | grep -v "npm notice" >> "$LOG"
}
run 'npm run check:src:browser' npm run check:src:browser
run 'npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser' npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
run 'npx oxfmt --config .oxfmtrc.json --write guides/veneer.md' npx oxfmt --config .oxfmtrc.json --write guides/veneer.md
run 'npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md' npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
run 'npm run test:src:browser' npm run test:src:browser
run 'npm run test:guides' npm run test:guides
run 'npm run test:policy' npm run test:policy
run 'npm run build:src:core' npm run build:src:core
run 'npm run build:src:styles' npm run build:src:styles
run 'npm run build:src:browser' npm run build:src:browser
run 'npm run test:conformance' npm run test:conformance
run 'npm run test:setup' npm run test:setup
echo done >> "$LOG"
