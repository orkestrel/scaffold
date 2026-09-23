#!/bin/bash
# land-f8c.sh <message-file>: land the F8 SERVICE line (F8b SHARED-PREFLIGHT, F8c-A READERS, F8c-B MOVE with its
# rounds 2 and 3) from the worktree /home/user/veneer-f8b as ONE commit on the session branch. The unit branch
# unit/f8b carries checkpoint commits above the merge base 0783b2b, so the landing commit is built with
# git commit-tree from the worktree's whole tree with parent 0783b2b (no history rewrite on unit/f8b), then
# cherry-picked onto the session branch; conflicts take the land-unit.sh diff3 path with base 0783b2b.
set -u
MSG=$1; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
MAIN=/home/user/veneer; WT=/home/user/veneer-f8b; BASE=0783b2b; U=f8c
cd $WT || exit 1
echo "=== f8b worktree status before commit"; git status --porcelain
git checkout -q -B unit/f8b && git add -A && git commit -q -F "$MSG" || { echo "=== commit failed"; exit 2; }
TIP=$(git rev-parse --short HEAD); echo "=== f8b tip committed as $TIP on unit/f8b"
TREE=$(git rev-parse HEAD^{tree})
LAND=$(git commit-tree $TREE -p $BASE -F "$MSG"); echo "=== squashed landing commit $LAND (tree of $TIP, parent $BASE)"
git tag -f land/f8c $LAND > /dev/null
OURS=$(git -C $MAIN rev-parse --short HEAD)
cd $MAIN || exit 1
git status --porcelain | grep -q . && { echo "=== main checkout is dirty; refusing"; exit 3; }
if git cherry-pick $LAND > $S/land-f8c.log.txt 2>&1; then echo "=== clean: $(git rev-parse --short HEAD)"; exit 0; fi
echo "=== CONFLICT"; git status --porcelain | grep -E '^(UU|AA|DU|UD|DD|AU|UA)'
git status --porcelain | grep -E '^DU' | awk '{print $2}' | while read -r f; do git rm -q "$f"; echo "removed $f"; done
git status --porcelain | grep -E '^UD' | awk '{print $2}' | while read -r f; do git rm -q "$f"; echo "removed (theirs deleted) $f"; done
for f in $(git status --porcelain | grep -E '^UU' | awk '{print $2}'); do
  n=$(echo "$f" | tr '/' '_'); mkdir -p $S/merge3/$U
  git show $BASE:$f > $S/merge3/$U/$n.base; git show $OURS:$f > $S/merge3/$U/$n.ours; git show $LAND:$f > $S/merge3/$U/$n.theirs
  cp $S/merge3/$U/$n.ours $S/merge3/$U/$n.merged
  git merge-file --diff3 -L ours -L base -L theirs $S/merge3/$U/$n.merged $S/merge3/$U/$n.base $S/merge3/$U/$n.theirs > /dev/null
  echo "## $f"; python3 $S/resolve-diff3.py $S/merge3/$U/$n.merged "$f"
done
if grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' $(git status --porcelain | grep -E '^UU' | awk '{print $2}') 2>/dev/null; then echo "MARKERS REMAIN"; exit 4; fi
git add -A && GIT_EDITOR=true git cherry-pick --continue > /dev/null 2>&1 && echo "=== continued: $(git rev-parse --short HEAD)"
