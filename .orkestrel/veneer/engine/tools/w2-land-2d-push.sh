#!/usr/bin/env bash
# Finishes a landing whose merge the Orchestrator resolved by hand in the unit's worktree (2026-09-25): runs w2-land-2d.sh
# (the merge commit, the kickoff gates, and the fast-forward), then pushes Veneer main when main holds the unit's tip.
# When the only red is a standing row E5 excludes, run w2-land-rest.sh <unit> afterwards instead.
# Usage: bash w2-land-2d-push.sh <unit>
set -u
UNIT="$1"
S="$(dirname "$0")"
VENEER=/c/Users/mikes/WebstormProjects/veneer
bash "$S/w2-land-2d.sh" "$UNIT"
code=$?
echo "w2-land-2d exit=$code"
[ "$code" -ne 0 ] && exit "$code"
git -C "$VENEER" push origin main; echo "push exit=$?"
git -C "$VENEER" log --oneline -3
