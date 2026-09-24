#!/usr/bin/env bash
# The J-INTEGRATION acceptance chain: scoped typecheck, lint, and format, the whole-tree typecheck,
# the guides and policy proofs, the owned test files, then the whole browser suite once. Each step
# writes its own log under tmp/j-integration/acceptance/ and the summary records each exit code.
set -u
cd "$(dirname "$0")/../.."
out=tmp/j-integration/acceptance
mkdir -p "$out"
summary="$out/summary.log.txt"
: > "$summary"
step() {
	local name="$1"
	shift
	"$@" > "$out/$name.log.txt" 2>&1
	echo "$name exit $?" >> "$summary"
}
step check-src-browser npm run check:src:browser
step oxlint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step oxfmt npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step check npm run check
step test-guides npm run test:guides
step test-policy npm run test:policy
step owned-files npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Backdrop.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/HostSnapshot.test.ts tests/src/browser/Delegate.test.ts
step test-src-browser npm run test:src:browser
echo "done" >> "$summary"
