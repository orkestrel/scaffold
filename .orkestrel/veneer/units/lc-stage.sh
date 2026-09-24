#!/bin/bash
# lc-stage.sh: stages LABEL round 1 onto the session head for its round-2 unit, without touching /home/user/veneer-lc
# (the round-1 audit lanes read it). Builds unit/lc-merge in a throwaway worktree at ac74459 from the round-1 owned
# files and lc-shared.patch, then squash-merges it three-way (diff3) into the worktree /home/user/veneer-lc2 on branch
# unit/lc2 from the session head, and hard-links node_modules there. Stops on a conflict and prints each file; the
# Orchestrator resolves each hunk mechanically. Log: .orkestrel/veneer/units/lc-stage.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; LOG=$R/lc-stage.log.txt; : > "$LOG"
{
cd /home/user/veneer || exit 1
HEADREV=$(git rev-parse --short HEAD); echo "=== session head $HEADREV"
git worktree add -q --detach /home/user/veneer-lcb ac74459 && echo "=== veneer-lcb at ac74459"
cd /home/user/veneer-lcb || exit 1
for f in $(sed -E 's/^.. //' "$R/lc-status.txt"); do mkdir -p "$(dirname "$f")"; cp /home/user/veneer-lc/"$f" "$f"; done
git apply "$R/lc-shared.patch" && echo "=== lc-shared.patch applied" || { echo "=== SHARED PATCH FAILED"; exit 3; }
git add -A src tests guides && git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit -q -m "LABEL round 1 (staging checkpoint)" && git branch -f unit/lc-merge HEAD && echo "=== unit/lc-merge $(git rev-parse --short HEAD)"
git diff --stat ac74459 HEAD | tail -1
cd /home/user/veneer || exit 1
git worktree add -q -b unit/lc2 /home/user/veneer-lc2 "$HEADREV" && echo "=== veneer-lc2 on unit/lc2 at $HEADREV"
cd /home/user/veneer-lc2 || exit 1
git -c merge.conflictStyle=diff3 merge --squash unit/lc-merge; echo "=== squash merge exit=$?"
conflicted=$(git diff --name-only --diff-filter=U); echo "=== CONFLICTS: $(echo $conflicted)"
cp -al /home/user/veneer/node_modules /home/user/veneer-lc2/node_modules && echo "=== node_modules linked"
git worktree remove --force /home/user/veneer-lcb && echo "=== veneer-lcb removed"
} >> "$LOG" 2>&1
grep '^===' "$LOG"
