#!/usr/bin/env bash
# Cuts one unit's worktree on a new branch unit/<unit> from a named Veneer commit, installs its node_modules from its
# lockfile, and records the lock digest. Successor of cut-cascade-probe.sh, generalised to one unit per call.
# Usage: bash cut-worktree.sh <unit> <commit>
set -u
UNIT="$1"
BASE="$2"
VENEER=/c/Users/mikes/WebstormProjects/veneer
T="$VENEER/tmp/worktrees/$UNIT"
git -C "$VENEER" worktree add -b "unit/$UNIT" "$T" "$BASE"; echo "worktree exit=$?"
cd "$T" || exit 1
npm ci --ignore-scripts > /dev/null 2>&1; echo "npm ci exit=$?"
sha256sum package-lock.json | cut -c1-64 > node_modules/.orkestrel-lock.sha256
git log --oneline -1
git status --short
