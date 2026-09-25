#!/usr/bin/env bash
# The J-SAMEWAY acceptance chain: the scoped typecheck, lint, and format over the owned and shared
# files, the whole-tree typecheck, the guides and policy proofs, the owned test files with the
# delegate's, then the setup proof and the whole browser suite once each as observations. Each step
# writes its own log under tmp/j-sameway/acceptance/ and the summary records each exit code and the
# Tests line of each Vitest step.
set -u
cd "$(dirname "$0")/../.."
out=tmp/j-sameway/acceptance
mkdir -p "$out"
summary="$out/summary.log.txt"
: > "$summary"
sources="src/browser/Modal.ts src/browser/Offcanvas.ts src/browser/Backdrop.ts src/browser/types.ts"
tests="tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts"
step() {
	local name="$1"
	shift
	"$@" > "$out/$name.log.txt" 2>&1
	local code=$?
	local line
	line=$(sed -e 's/\x1b\[[0-9;]*m//g' "$out/$name.log.txt" | grep -E '^ +Tests +' | tail -1)
	echo "$name exit $code${line:+ |$line}" >> "$summary"
}
step check-src-browser npm run check:src:browser
step oxlint npx oxlint --config .oxlintrc.json --deny-warnings $sources $tests
step oxfmt npx oxfmt --config .oxfmtrc.json --check $sources $tests guides/veneer.md
step check npm run check
step test-guides npm run test:guides
step test-policy npm run test:policy
step owned-files npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts tests/src/browser/Delegate.test.ts
step test-setup-browser npm run test:setup:browser
step test-src-browser npm run test:src:browser
echo "done" >> "$summary"
