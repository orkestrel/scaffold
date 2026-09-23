#!/usr/bin/env bash
# Runs the J-BINDER round-5 acceptance commands (round 2's criteria 1 to 6 plus the brief-5 sweep)
# in the veneer-binder worktree and records each command, its output with colour codes stripped,
# and its exit code. Successor of binder4-accept.sh: replaces the brief-4 sweep with the brief-5 sweep.
cd C:/Users/mikes/WebstormProjects/veneer-binder || exit 1
run() {
	echo "\$ $*"
	"$@" 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	echo "exit ${PIPESTATUS[0]}"
	echo
}
run npm run check:src:browser
run npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser tests/setupBrowser.ts
run npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md
run npm run test:src:browser
run npm run test:policy
run npm run test:guides
run npm run build:src:browser
run grep -n 'owner: this\|owner === this' src/browser/HostSnapshot.ts
run git diff --check
echo "=== observations"
run npx tsc --noEmit -p tsconfig.json
