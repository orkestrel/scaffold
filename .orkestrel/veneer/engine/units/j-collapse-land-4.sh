#!/usr/bin/env bash
# J-COLLAPSE landing, step 3 of 3: fast-forwards main to unit/collapse in the user's checkout (E4; the
# branch contains main after step 1's merge), removes the worktree (E14: under veneer/tmp/worktrees)
# and the branch. Run after collapse-land-3.sh reads green; the verifier chain and the push follow.
set -u
LOG="$(dirname "$0")/collapse-land-4.log"
: > "$LOG"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-COLLAPSE landing, step 3: the fast-forward (2026-09-24)"
	if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; git -C "$VENEER" status --short; exit 65; fi
	git -C "$VENEER" merge --ff-only unit/collapse; echo "main ff to unit/collapse exit=$?"
	git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
	git -C "$VENEER" branch -D unit/collapse; echo "branch delete exit=$?"
	git -C "$VENEER" log --oneline -5
	git -C "$VENEER" status --short --branch
	git -C "$VENEER" worktree list
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | tail -14
