#!/usr/bin/env bash
# The Orchestrator's own red-first reading for J-SNAPSHOT-SHARED: a scratch worktree at the base 3acad4c
# carries the unit's test files from 3b3b4a9 (written with `git show`, no checkout), and runs the
# report's Commands A, B, and C against the base sources, which must read red; then the worktree goes.
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
T=$VENEER/tmp/worktrees/snapshot-red
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$U/j-snapshot-shared-red-orchestrator.log.txt
{
	echo "# The Orchestrator's red reading of the J-SNAPSHOT-SHARED cases on the base sources (2026-09-24, Chromium 153.0.8010.12)"
	git -C "$VENEER" worktree add -b red/snapshot-shared "$T" 3acad4c || exit 1
	cd "$T" || exit 1
	npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"
	for f in HostSnapshot Alert Tab Carousel Swipe Delegate Tooltip Popover; do
		git show "3b3b4a9:tests/src/browser/$f.test.ts" > "tests/src/browser/$f.test.ts"
	done
	git status --short
	echo "--- Command A"
	npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts tests/src/browser/Alert.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |TypeError" | head -20
	echo "--- Command B"
	npm run test:src:browser -- tests/src/browser/Delegate.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Carousel.test.ts tests/src/browser/Swipe.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL " | head -20
	echo "--- Command C"
	npm run test:src:browser -- tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts -t "names only live tips" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL " | head -10
	cd "$VENEER" || exit 1
	git worktree remove --force "$T"; echo "worktree remove exit=$?"
	git branch -D red/snapshot-shared; echo "branch delete exit=$?"
} > "$LOG" 2>&1
cat "$LOG" | cut -c1-220
