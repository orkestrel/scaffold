#!/usr/bin/env bash
# W2 landing, step 1 of 3, for one unit after its audit passes and every lane has returned: applies the
# unit's returned shared-file patches (under the worktree's tmp/j-<unit>/patches/ where the report put
# them), commits every changed path on unit/<unit> with the landing message
# units/j-<unit>-landing-message.txt, fast-forwards main to origin, merges main into the branch, and
# stops on any conflict for w2-resolve-guide.py. Usage: bash w2-land-1.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
LOG="$S/w2-land-1-$UNIT.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-${UNIT^^} landing, step 1: the patches, the landing commit, and the merge of main (2026-09-24)"
	cd "$TREE" || exit 1
	if ls tmp/j-$UNIT/patches/*.diff > /dev/null 2>&1; then
		git apply --check tmp/j-$UNIT/patches/*.diff; echo "apply check exit=$?"
		git apply tmp/j-$UNIT/patches/*.diff; echo "apply exit=$?"
	else
		echo "no patches directory; the report's patches are applied by hand before this step or none exist"
	fi
	git status --short
	git add -A -- src/browser tests/src/browser guides/veneer.md ROADMAP.md
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
