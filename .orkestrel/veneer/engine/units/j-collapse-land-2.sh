#!/usr/bin/env bash
# J-COLLAPSE landing, step 1 of 3, after collapse-integrate.sh applied the four patches and read the
# gates green but could not merge main (git refused the merge because main's toast landing touches
# guides/veneer.md, which the worktree had dirty; exit 2, no conflict markers, so the stop never fired):
# commits every changed path on unit/collapse with the landing message, then merges main and stops
# on the guide conflict for collapse-resolve-guide.py. Step 2 is collapse-land-3.sh.
set -u
LOG="$(dirname "$0")/collapse-land-2.log"
: > "$LOG"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse
{
	echo "# J-COLLAPSE landing, step 1: the landing commit and the merge of main (2026-09-24)"
	git -C "$TREE" status --short
	git -C "$TREE" add -A -- src/browser tests/src/browser guides/veneer.md ROADMAP.md
	git -C "$TREE" status --short
	git -C "$TREE" commit -F "$U/j-collapse-landing-message.txt"; echo "landing commit exit=$?"
	git -C "$TREE" log --oneline -3
	git -C "$TREE" merge --no-edit main; echo "merge main into unit/collapse exit=$?"
	CONFLICTS=$(git -C "$TREE" diff --name-only --diff-filter=U)
	echo "conflicts: ${CONFLICTS:-none}"
} >> "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -v "^ \(create\|delete\|rename\) mode" | tail -25
