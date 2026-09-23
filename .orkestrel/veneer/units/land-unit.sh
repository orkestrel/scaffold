#!/bin/bash
# land-unit.sh <unit> <message-file> [<base>]: integrate a worktree unit onto the session branch; on conflicts,
# drop the removed ledger file and redo each conflicted text file as a diff3 three-way merge resolved by
# resolve-diff3.py (structural interleave / table merge / concatenation), then continue the cherry-pick.
# Prints the files it resolved; the caller checks the tree (oxfmt, tsc) before folding the ledger rows.
set -u
U=$1; MSG=$2; BASE=${3:-3a9202a}; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
MAIN=/home/user/veneer; WT=/home/user/veneer-$U
OURS=$(git -C $MAIN rev-parse --short HEAD)
bash $S/integrate-unit.sh $U $MSG > $S/land-$U.log.txt 2>&1
THEIRS=$(git -C $WT rev-parse --short HEAD)
cd $MAIN || exit 1
if git status --porcelain | grep -qE '^(UU|DU|AA|UD)'; then
  git status --porcelain | grep -E '^DU' | awk '{print $2}' | while read -r f; do git rm -q "$f"; echo "removed $f"; done
  for f in $(git status --porcelain | grep -E '^UU' | awk '{print $2}'); do
    n=$(echo "$f" | tr '/' '_'); mkdir -p $S/merge3/$U
    git show $BASE:$f > $S/merge3/$U/$n.base; git show $OURS:$f > $S/merge3/$U/$n.ours; git show $THEIRS:$f > $S/merge3/$U/$n.theirs
    cp $S/merge3/$U/$n.ours $S/merge3/$U/$n.merged
    git merge-file --diff3 -L ours -L base -L theirs $S/merge3/$U/$n.merged $S/merge3/$U/$n.base $S/merge3/$U/$n.theirs > /dev/null
    echo "## $f"; python3 $S/resolve-diff3.py $S/merge3/$U/$n.merged "$f"
  done
  if grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' $(git status --porcelain | grep -E '^UU' | awk '{print $2}') 2>/dev/null; then echo "MARKERS REMAIN"; exit 4; fi
  git add -A && GIT_EDITOR=true git cherry-pick --continue > /dev/null 2>&1 && echo "=== continued: $(git rev-parse --short HEAD)"
else
  echo "=== clean: $(git rev-parse --short HEAD)"
fi
