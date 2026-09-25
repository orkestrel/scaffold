#!/usr/bin/env bash
# The Orchestrator's red-first reading of J-SNAPSHOT-SHARED round 3 (successor of red-snapshot-shared.sh, which read
# round 1 against 3acad4c): a scratch worktree at round 2's e3167f7 carries round 3's four test files from 43637c1
# (written with `git show`, no checkout) and runs them against round 2's sources, where every case round 3 adds
# except the second-spelling pin must read red; then the worktree and its branch go.
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
T=$VENEER/tmp/worktrees/snapshot-red-3
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$U/j-snapshot-shared-red-3-orchestrator.log.txt
{
	echo "# The Orchestrator's red reading of the J-SNAPSHOT-SHARED round-3 cases on round 2's sources (2026-09-25, Chromium 153.0.8010.12)"
	git -C "$VENEER" worktree add -b red/snapshot-shared-3 "$T" e3167f7 || exit 1
	cd "$T" || exit 1
	npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"
	for f in HostSnapshot ColorMode Placement ScrollLock; do
		git show "43637c1:tests/src/browser/$f.test.ts" > "tests/src/browser/$f.test.ts"
	done
	git status --short
	echo "--- the four files on round 2's sources"
	npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts tests/src/browser/ColorMode.test.ts tests/src/browser/Placement.test.ts tests/src/browser/ScrollLock.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError" | head -40
	cd "$VENEER" || exit 1
	git worktree remove --force "$T"; echo "worktree remove exit=$?"
	git branch -D red/snapshot-shared-3; echo "branch delete exit=$?"
} > "$LOG" 2>&1
cut -c1-240 "$LOG"
