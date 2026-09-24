#!/usr/bin/env bash
# J-ALERT round-2 acceptance gates, run in order from the worktree root; each command's output lands in its
# own log under tmp/j-alert/gates-2/ and its exit code in the summary.
cd "$(dirname "$0")/../.." || exit 1
mkdir -p tmp/j-alert/gates-2
summary=tmp/j-alert/gates-2/summary.log.txt
: > "$summary"
step() {
	name=$1
	shift
	"$@" > "tmp/j-alert/gates-2/$name.log.txt" 2>&1
	echo "$name exit=$? :: $*" >> "$summary"
}
step check-src-browser npm run check:src:browser
step oxlint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step oxfmt npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step test-src-browser npm run test:src:browser
step test-guides npm run test:guides
step test-policy npm run test:policy
step build-src-core npm run build:src:core
step build-src-styles npm run build:src:styles
step build-src-browser npm run build:src:browser
step test-conformance npm run test:conformance
step test-setup npm run test:setup
cat "$summary"
