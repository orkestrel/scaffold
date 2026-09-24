#!/usr/bin/env bash
# J-OFFCANVAS acceptance chain: runs each scoped gate the brief names from the worktree root, keeps
# each gate's log under tmp/j-offcanvas/, and writes each exit code to acceptance.log.txt.
cd "$(dirname "$0")/../.." || exit 1
out=tmp/j-offcanvas
summary=$out/acceptance.log.txt
: > "$summary"

gate() {
	local name=$1
	shift
	"$@" > "$out/gate-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code :: $*" >> "$summary"
}

gate check-src-browser npm run check:src:browser
gate check npm run check
gate oxlint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
gate oxfmt npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
gate test-src-browser npm run test:src:browser
gate test-guides npm run test:guides
gate test-policy npm run test:policy
gate build-src-core npm run build:src:core
gate build-src-styles npm run build:src:styles
gate build-src-browser npm run build:src:browser
gate test-conformance npm run test:conformance
gate test-setup npm run test:setup
cat "$summary"
