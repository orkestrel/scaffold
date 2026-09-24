#!/usr/bin/env bash
# The fast-forward of a landing whose gates w2-land-2c.sh ran green: refuses a dirty main checkout,
# fast-forwards main to unit/<unit>, removes the worktree and the branch, and shows main.
# Usage: bash w2-land-3.sh <unit>
set -u
UNIT="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
VENEER=/c/Users/mikes/WebstormProjects/veneer
echo "--- the fast-forward"
if [ -n "$(git -C "$VENEER" status --porcelain)" ]; then echo "main checkout is not clean; land refused"; git -C "$VENEER" status --short; exit 65; fi
git -C "$VENEER" merge --ff-only "unit/$UNIT"; code=$?; echo "main ff to unit/$UNIT exit=$code"
[ "$code" -ne 0 ] && exit 66
git -C "$VENEER" worktree remove --force "$TREE"; echo "worktree remove exit=$?"
git -C "$VENEER" branch -D "unit/$UNIT"; echo "branch delete exit=$?"
git -C "$VENEER" log --oneline -4
git -C "$VENEER" status --short --branch
