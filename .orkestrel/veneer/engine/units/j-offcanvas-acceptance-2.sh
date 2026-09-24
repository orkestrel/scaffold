#!/usr/bin/env bash
# J-OFFCANVAS round-2 scoped chain: the checks, one test file per obligation, then the whole browser
# suite, the guide parity, and the policy sweep once; each gate's log sits under tmp/j-offcanvas/ and
# each exit code goes to acceptance-2.log.txt.
cd "$(dirname "$0")/../.." || exit 1
out=tmp/j-offcanvas
summary=$out/acceptance-2.log.txt
: > "$summary"

gate() {
	local name=$1
	shift
	"$@" > "$out/gate2-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code :: $*" >> "$summary"
}

gate check-src-browser npm run check:src:browser
gate check npm run check
gate oxlint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
gate oxfmt npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
gate offcanvas npm run test:src:browser -- tests/src/browser/Offcanvas.test.ts
gate backdrop npm run test:src:browser -- tests/src/browser/Backdrop.test.ts
gate isolation npm run test:src:browser -- tests/src/browser/Isolation.test.ts
gate modal npm run test:src:browser -- tests/src/browser/Modal.test.ts
gate delegate npm run test:src:browser -- tests/src/browser/Delegate.test.ts
gate test-src-browser npm run test:src:browser
gate test-guides npm run test:guides
gate test-policy npm run test:policy
cat "$summary"
