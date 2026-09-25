#!/usr/bin/env bash
# J-SNAPSHOT-SHARED acceptance chain: the scoped, read-only gates over the unit's owned files, then
# the project typecheck, the guide parity proof, the policy sweep, and the owned test files.
# Run from the worktree root: bash tmp/j-snapshot-shared/acceptance.sh
# Each step prints its exit code; the chain continues past a failure so every reading is recorded.

SOURCES="src/browser/HostSnapshot.ts src/browser/types.ts src/browser/Alert.ts src/browser/Tab.ts src/browser/Tooltip.ts"
TESTS="tests/src/browser/HostSnapshot.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Alert.test.ts tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts tests/src/browser/Delegate.test.ts tests/src/browser/Carousel.test.ts tests/src/browser/Swipe.test.ts"

status=0

step() {
	echo "== $1"
	shift
	"$@"
	code=$?
	echo "== exit $code"
	if [ "$code" -ne 0 ]; then status=1; fi
}

step 'check:src:browser' npm run check:src:browser
step 'oxlint over the owned files' npx oxlint --config .oxlintrc.json --deny-warnings $SOURCES $TESTS
step 'oxfmt over the owned files' npx oxfmt --config .oxfmtrc.json --check $SOURCES $TESTS guides/veneer.md
step 'check' npm run check
step 'test:guides' npm run test:guides
step 'test:policy' npm run test:policy
step 'owned test files' npm run test:src:browser -- $TESTS

echo "== chain exit $status"
exit $status
