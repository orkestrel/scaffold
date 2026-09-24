#!/usr/bin/env bash
# Removes the J-REENTRY-SWEEP scratch worktrees and their sweep/<lens> branches after the lens reports
# and probe files are retained under units/ (j-reentry-sweep-<lens>-report.md and
# j-reentry-sweep-probe-<lens>.test.ts). Each worktree holds only its untracked probe file. Usage: bash sweep-drop.sh
set -u
VENEER=/c/Users/mikes/WebstormProjects/veneer
for lens in modal-show modal-hide offcanvas-show offcanvas-hide; do
	T="$VENEER/tmp/worktrees/sweep-$lens"
	[ -d "$T" ] || continue
	echo "sweep-$lens status: $(git -C "$T" status --short | tr '\n' ' ')"
	git -C "$VENEER" worktree remove --force "$T"; echo "worktree remove exit=$?"
	git -C "$VENEER" branch -D "sweep/$lens"; echo "branch delete exit=$?"
done
git -C "$VENEER" worktree list
