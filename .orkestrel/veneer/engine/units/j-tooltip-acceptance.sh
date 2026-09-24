#!/usr/bin/env bash
# J-TOOLTIP acceptance chain, run from the worktree root. Each command's output goes to its own log
# under tmp/j-tooltip/, and the chain records every exit code in acceptance.log.txt; it runs every
# command whatever an earlier one returned, so the log carries each reading.
cd "$(dirname "$0")/../.." || exit 1
LOGS=tmp/j-tooltip
SUMMARY="$LOGS/acceptance.log.txt"
: > "$SUMMARY"

step() {
	local name="$1"
	shift
	"$@" > "$LOGS/acceptance-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code | $*" >> "$SUMMARY"
}

node tmp/j-tooltip/chromium.mjs >> "$SUMMARY" 2>&1
step check npm run check:src:browser
step lint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step format npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step browser npm run test:src:browser
step guides npm run test:guides
step policy npm run test:policy
step core npm run build:src:core
step styles npm run build:src:styles
step build npm run build:src:browser
step conformance npm run test:conformance
step setup npm run test:setup
cat "$SUMMARY"
