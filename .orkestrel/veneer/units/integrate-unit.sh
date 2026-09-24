#!/bin/bash
# Integrate one worktree unit into the main Veneer checkout as one linear commit.
# Usage: integrate-unit.sh <unit> <message-file>
# Commits the worktree's tree on branch unit/<unit>, then cherry-picks that commit onto the session
# branch in /home/user/veneer. A conflict stops here and is resolved by the Orchestrator by hand.
set -u
U=$1; MSG=$2; WT=/home/user/veneer-$U; MAIN=/home/user/veneer
cd "$WT" || exit 1
echo "=== $U worktree status before commit"; git status --porcelain
git checkout -q -B "unit/$U" && git add -A && git commit -q -F "$MSG" || { echo "=== commit failed"; exit 2; }
SHA=$(git rev-parse --short HEAD); echo "=== $U committed as $SHA on unit/$U"
cd "$MAIN" || exit 1
git status --porcelain | grep -q . && { echo "=== main checkout is dirty; refusing"; exit 3; }
if git cherry-pick "$SHA"; then echo "=== cherry-pick clean: $(git rev-parse --short HEAD)"; else echo "=== CONFLICT; resolve by hand, then git cherry-pick --continue"; git status --porcelain | grep -E '^(UU|AA|DU|UD)'; exit 4; fi
