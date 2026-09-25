#!/usr/bin/env bash
# Finishes a landing whose `npm run test` stopped at a standing red row E5 excludes (2026-09-25). `npm run test` chains
# its projects with `&&`, so a red in `test:src` skips every later project. This script runs each project `test` chains
# after `test:src`, in the unit's worktree, then runs w2-land-3.sh (the fast-forward) and pushes main only when every one
# is green. The standing row itself is recorded in units/host-chromium-153-reading.md before this runs.
# Usage: bash w2-land-rest.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
LOG="$S/w2-land-rest-$UNIT.log.txt"
cd "$TREE" || exit 1
{
	echo "# J-${UNIT^^} landing, the test projects after test:src (2026-09-25), at $(git log --oneline -1)"
	FAIL=0
	for step in test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	if [ "$FAIL" -ne 0 ]; then echo "a project is red; the fast-forward is not run"; exit 71; fi
	bash "$S/w2-land-3.sh" "$UNIT"; echo "w2-land-3 exit=$?"
	git -C "$VENEER" push origin main; echo "push exit=$?"
	git -C "$VENEER" log --oneline -3
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Test Files|Tests  |FAIL |red;|^[0-9a-f]{7} " | head -40
