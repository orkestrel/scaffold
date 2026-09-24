#!/usr/bin/env bash
# J-SCROLLSPY round-3 acceptance chain, in the brief's order; each command's exit and summary lines
# go to tmp/j-scrollspy/acceptance-3.log.txt.
cd C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy || exit 1
LOG=tmp/j-scrollspy/acceptance-3.log.txt
: > "$LOG"
run() {
	echo "\$ $*" >> "$LOG"
	"$@" > tmp/j-scrollspy/acceptance-3-step.log.txt 2>&1
	code=$?
	sed 's/\x1b\[[0-9;]*m//g' tmp/j-scrollspy/acceptance-3-step.log.txt | grep -a "Test Files\|Tests \|All matched\|Found \|error\|FAIL" | grep -v "Uncaught SyntaxError\|console.error\|Unhandled error" >> "$LOG"
	echo "exit $code" >> "$LOG"
}
run npm run check:src:browser
run npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
run npx oxfmt --config .oxfmtrc.json --write guides/veneer.md
run npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
run npm run test:src:browser
run npm run test:guides
run npm run test:policy
run npm run build:src:core
run npm run build:src:styles
run npm run build:src:browser
run npm run test:conformance
run npm run test:setup
