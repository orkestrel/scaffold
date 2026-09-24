#!/usr/bin/env bash
# J-TESTPIN landing, step 1, derived from w2-land-1.sh: the unit owns the manifests and the test setup
# rather than the engine paths, so this variant stages package.json, package-lock.json, tests/setupBrowser.ts,
# and tests/setupBrowser.test.ts, commits them on unit/testpin with units/j-testpin-landing-message.txt,
# fast-forwards main to origin, merges main into the branch, and stops on any conflict. Usage: bash land-testpin-1.sh
set -u
UNIT=testpin
S="$(dirname "$0")"
LOG="$S/land-testpin-1.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
{
	echo "# J-TESTPIN landing, step 1: the landing commit and the merge of main (2026-09-24)"
	cd "$TREE" || exit 1
	git status --short
	git add -- package.json package-lock.json tests/setupBrowser.ts tests/setupBrowser.test.ts
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
