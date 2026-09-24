#!/usr/bin/env bash
# J-GUARDS acceptance chain, run from the worktree root: bash tmp/j-guards/acceptance.sh
# Each step prints its own exit code; the chain continues past a failure so every reading lands in
# the log, and the script exits non-zero when any step failed.
set -u
cd "$(dirname "$0")/../.." || exit 2
failed=0

step() {
	echo "=== $*"
	"$@"
	status=$?
	echo "=== exit $status: $*"
	if [ "$status" -ne 0 ]; then failed=1; fi
}

step npm run check:src:browser
step npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser guides/veneer.md
step npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step npm run check
step npm run test:src:browser
step npm run test:setup:browser
step npm run test:guides
step npm run test:policy
step npm run build:src:core
step npm run build:src:browser
step npm run build:src:styles
step npm run test:conformance
step npm run test:setup

echo "=== chain exit $failed"
exit "$failed"
