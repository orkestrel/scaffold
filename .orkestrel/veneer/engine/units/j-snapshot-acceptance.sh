#!/usr/bin/env bash
# J-SNAPSHOT scoped acceptance chain, run once before the report from the worktree root. Each command's
# full output goes to its own log under tmp/j-snapshot/, and its exit code to acceptance.log.txt.
cd "$(dirname "$0")/../.." || exit 1
DIR=tmp/j-snapshot
SUMMARY=$DIR/acceptance.log.txt
: > "$SUMMARY"
node "$DIR/chromium.mjs" >> "$SUMMARY" 2>&1

step() {
	local name=$1
	shift
	"$@" > "$DIR/chain-$name.log.txt" 2>&1
	echo "$name exit=$? :: $*" >> "$SUMMARY"
}

step check-src-browser npm run check:src:browser
step check npm run check
step oxlint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step oxfmt npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step test-src-browser npm run test:src:browser
step test-guides npm run test:guides
step test-policy npm run test:policy
echo done >> "$SUMMARY"
