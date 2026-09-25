#!/usr/bin/env bash
# Finishes a landing whose kickoff chain (w2-land-2d.sh) found a merge collision the Orchestrator then resolved in the
# unit's worktree (2026-09-25). It commits the resolution with the message file given, re-runs the tree-wide
# format:check, lint:check, and check, and hands over to w2-land-rest.sh, which runs the test projects after test:src,
# fast-forwards main, and pushes. The resolution touches no file test:src reads, so test:src's reading from the
# kickoff chain stands.
# Usage: bash w2-land-fix.sh <unit> <commit-message-file>
set -u
UNIT="$1"
MESSAGE="$2"
S="$(dirname "$0")"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
LOG="$S/w2-land-fix-$UNIT.log.txt"
cd "$TREE" || exit 1
{
	echo "# J-${UNIT^^} landing, the merge fix (2026-09-25), over $(git log --oneline -1)"
	git status --short
	git commit -q -a -F "$MESSAGE"; echo "commit exit=$?"
	git log --oneline -1
	FAIL=0
	for step in format:check lint:check check; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	if [ "$FAIL" -ne 0 ]; then echo "a gate is red; the rest is not run"; exit 71; fi
} > "$LOG" 2>&1
code=$?
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|red;|^[0-9a-f]{7} " | head -20
[ "$code" -ne 0 ] && exit "$code"
bash "$S/w2-land-rest.sh" "$UNIT"
