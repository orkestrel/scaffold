#!/usr/bin/env bash
# The merge step of a landing whose unit commits are already on unit/<unit> (the fix-round form of
# w2-land-1.sh, which commits with a landing message first): fast-forwards the checkout's main to
# origin, merges main into the unit branch, and stops on any conflict. Usage: bash w2-merge-main.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
LOG="$S/w2-merge-main-$UNIT.log.txt"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-${UNIT^^} landing: the merge of main into unit/$UNIT (2026-09-24)"
	cd "$TREE" || exit 1
	git status --short
	git log --oneline -2
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" log --oneline -1
	git merge --no-edit main; echo "merge main into unit/$UNIT exit=$?"
	CONFLICTS=$(git diff --name-only --diff-filter=U)
	echo "conflicts: ${CONFLICTS:-none}"
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -v "^ \(create\|delete\|rename\) mode" | tail -22
