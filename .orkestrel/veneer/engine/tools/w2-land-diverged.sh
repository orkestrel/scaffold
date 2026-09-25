#!/usr/bin/env bash
# Lands a local main that holds a landed unit the push refused because origin/main moved first (2026-09-25). It cuts
# tmp/worktrees/<unit> on unit/<unit> from local main, installs node_modules, merges origin/main into it, and stops on
# a conflict. A clean merge goes on to w2-land-2d.sh <unit>, which runs the kickoff gates and fast-forwards local main
# to the merged tip. The push follows only when main holds that tip, so it is a fast-forward of origin/main.
# Usage: bash w2-land-diverged.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=$VENEER/tmp/worktrees/$UNIT
LOG="$S/w2-land-diverged-$UNIT.log.txt"
{
	echo "# J-${UNIT^^} landing over a moved origin/main (2026-09-25)"
	git -C "$VENEER" fetch origin main; echo "fetch exit=$?"
	git -C "$VENEER" log --oneline -1 main
	git -C "$VENEER" log --oneline -1 origin/main
	git -C "$VENEER" worktree add -b "unit/$UNIT" "$TREE" main; echo "worktree add exit=$?"
	cd "$TREE" || exit 1
	npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"
	sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256
	git merge --no-edit origin/main; echo "merge origin/main exit=$?"
	CONFLICTS=$(git diff --name-only --diff-filter=U)
	echo "conflicts: ${CONFLICTS:-none}"
	[ -n "$CONFLICTS" ] && exit 70
	git log --oneline -3
} > "$LOG" 2>&1
code=$?
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|conflicts:|^[0-9a-f]{7} " | head -20
[ "$code" -ne 0 ] && exit "$code"
TIP="$(git -C "$VENEER" rev-parse "unit/$UNIT")"
bash "$S/w2-land-2d.sh" "$UNIT"
code=$?
echo "w2-land-2d exit=$code"
[ "$code" -ne 0 ] && exit "$code"
if git -C "$VENEER" merge-base --is-ancestor "$TIP" main; then
	git -C "$VENEER" push origin main; echo "push exit=$?"
else
	echo "main does not hold the merged tip; no push"
fi
git -C "$VENEER" log --oneline -3
