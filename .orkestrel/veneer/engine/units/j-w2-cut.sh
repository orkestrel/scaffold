#!/usr/bin/env bash
# Cuts the seven W2 unit worktrees under veneer/tmp/worktrees/<unit> (E14) from the committed main tip
# through unit-worktree.sh new, one after another (each runs npm ci), and records each tip. Run only
# after the J-COLLAPSE landing is on main and pushed. Usage: bash cut-w2.sh [unit ...]
set -u
LOG="$(dirname "$0")/cut-w2.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
UNITS="${*:-tab alert dropdown carousel scrollspy toast modal}"
{
	echo "# W2 worktrees cut from main $(git -C /c/Users/mikes/WebstormProjects/veneer log --oneline -1) (2026-09-24)"
	for unit in $UNITS; do
		echo "--- $unit"
		bash "$U/unit-worktree.sh" new "$unit"; echo "$unit exit=$?"
	done
	git -C /c/Users/mikes/WebstormProjects/veneer worktree list
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "^---\|exit=\|worktree=\|worktrees/" | head -40
