#!/usr/bin/env bash
# J-DEMO landing, step 1, derived from w2-land-1.sh: the unit owns app/browser, tests/app/browser, and the
# guide's § Showcase, so this variant stages those paths, commits them on unit/demo with
# units/j-demo-landing-message.txt, fast-forwards main to origin, merges main into the branch, and stops
# on any conflict. Usage: bash land-demo-1.sh
set -u
UNIT=demo
S="$(dirname "$0")"
LOG="$S/land-demo-1.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-DEMO landing, step 1: the landing commit and the merge of main (2026-09-24)"
	cd "$TREE" || exit 1
	git status --short
	git add -A -- app/browser tests/app/browser guides/veneer.md
	git commit -F "$U/j-$UNIT-landing-message.txt"; echo "landing commit exit=$?"
	git log --oneline -2
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git -C "$VENEER" merge --ff-only origin/main; echo "main ff to origin exit=$?"
	git -C "$VENEER" log --oneline -1
	git merge --no-edit main; echo "merge main into unit/$UNIT exit=$?"
	CONFLICTS=$(git diff --name-only --diff-filter=U)
	echo "conflicts: ${CONFLICTS:-none}"
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -v "^ \(create\|delete\|rename\) mode" | tail -22
