#!/usr/bin/env bash
# Runs the kickoff brief's acceptance item 5 gate list exactly (`format:check`, `lint:check`, `check`, `build`, `test`,
# `test:service`) on a named Veneer commit in a detached worktree, because the landing chain never ran `test` or
# `test:service` (the 2026-09-25 exit-evidence lane, units/rebaseline-0925-exit.md). Usage: bash kickoff-gates.sh <commit>
set -u
COMMIT="$1"
VENEER=/c/Users/mikes/WebstormProjects/veneer
T=$VENEER/tmp/worktrees/gates-$COMMIT
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/kickoff-gates-$COMMIT.log.txt
{
	echo "# The kickoff acceptance item 5 gates on Veneer $COMMIT (2026-09-25, Chromium 153.0.8010.12)"
	git -C "$VENEER" worktree add --detach "$T" "$COMMIT"; echo "worktree exit=$?"
	cd "$T" || exit 1
	npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"
	FAIL=0
	for step in format:check lint:check check build test test:service; do
		npm run "$step"; code=$?; echo "$step exit=$code"; [ "$code" -ne 0 ] && FAIL=1
	done
	echo "all gates: $([ "$FAIL" -eq 0 ] && echo green || echo RED)"
	cd "$VENEER" || exit 1
	git worktree remove --force "$T"; echo "worktree remove exit=$?"
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Tests |Test Files|FAIL |all gates" | tail -40
