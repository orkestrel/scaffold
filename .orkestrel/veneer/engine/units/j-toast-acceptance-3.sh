#!/usr/bin/env bash
# Runs the round-3 acceptance chain in the brief's order from the worktree root, logging each
# command under tmp/j-toast/final-2 and printing its exit code and summary lines.
cd "$(dirname "$0")/../.." || exit 1
out=tmp/j-toast/final-3
mkdir -p "$out"
step() {
	name=$1
	shift
	"$@" > "$out/$name.log.txt" 2>&1
	code=$?
	echo "== $name: exit $code"
	sed -e 's/\x1b\[[0-9;]*m//g' "$out/$name.log.txt" | grep -E "Test Files|Tests |built in|All matched|Found|error" | grep -v "^npm notice" | tail -3
}
step check npm run check:src:browser
step format-write npx oxfmt --config .oxfmtrc.json --write guides/veneer.md
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
node tmp/j-toast/browser-version.mjs
