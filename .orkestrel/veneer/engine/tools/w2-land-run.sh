#!/usr/bin/env bash
# Runs one audited unit's landing end to end (2026-09-25): w2-merge-main.sh (fast-forward the checkout's main to origin and
# merge it into unit/<unit>, stopping on a conflict), then w2-land-2d.sh (the merge commit, the kickoff gate list, and the
# fast-forward through w2-land-3.sh), then the push of Veneer main, only when main now holds the unit's tip.
# Usage: bash w2-land-run.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
VENEER=/c/Users/mikes/WebstormProjects/veneer
bash "$S/w2-merge-main.sh" "$UNIT" 2>&1 | tail -4
if [ -n "$(git -C "$VENEER/tmp/worktrees/$UNIT" diff --name-only --diff-filter=U 2>/dev/null)" ]; then echo "merge conflicts; stopped"; exit 70; fi
TIP="$(git -C "$VENEER" rev-parse "unit/$UNIT")"
bash "$S/w2-land-2d.sh" "$UNIT"
code=$?
echo "w2-land-2d exit=$code"
[ "$code" -ne 0 ] && exit "$code"
if [ "$(git -C "$VENEER" rev-parse main)" = "$(git -C "$VENEER" rev-parse "$TIP" 2>/dev/null || echo none)" ] || git -C "$VENEER" merge-base --is-ancestor "$TIP" main; then
	git -C "$VENEER" push origin main; echo "push exit=$?"
else
	echo "main does not hold the unit's tip; no push"
fi
git -C "$VENEER" log --oneline -3
