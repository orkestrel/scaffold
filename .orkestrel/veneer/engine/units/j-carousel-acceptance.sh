#!/usr/bin/env bash
# J-CAROUSEL acceptance chain: runs each acceptance command in the brief's order in this worktree,
# writing each command's output to its own log and its exit code to acceptance.log.txt.
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel || exit 1
LOG=tmp/j-carousel/acceptance.log.txt
: > "$LOG"
step() {
	local name="$1"
	shift
	"$@" > "tmp/j-carousel/acceptance-$name.log.txt" 2>&1
	echo "$name exit $?" >> "$LOG"
}
step check npm run check:src:browser
step lint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step format npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step browser npm run test:src:browser
step guides npm run test:guides
step policy npm run test:policy
step build-core npm run build:src:core
step build-styles npm run build:src:styles
step build-browser npm run build:src:browser
step conformance npm run test:conformance
step setup npm run test:setup
cat "$LOG"
