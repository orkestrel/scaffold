#!/bin/bash
# Trial integration of the E-ID units, E-ID-FLOW, and J-FIXTURES over Veneer main in the scratch worktree $S/eid-trial:
# per unit, each changed file merges three-way (base: the unit's cut; ours: the trial tree; theirs: the unit's worktree
# file) with git merge-file --diff3, conflicts go through resolve-diff3.py, and the result is reported. Nothing commits.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
T=$S/eid-trial; cd $T || exit 1
git reset -q --hard origin/main && git clean -qfd -- . || exit 1
for spec in eir:ca83afb eil:ca83afb eic:ca83afb flow:6882751 jf:6882751; do
  U=${spec%%:*}; B=${spec##*:}; W=/home/user/veneer-$U
  echo "== $U over $B"
  for f in $(git -C $W diff --name-only $B); do
    mkdir -p $S/trial3/$U; n=$(echo "$f" | tr '/' '_')
    git -C $W show $B:$f > $S/trial3/$U/$n.base 2>/dev/null || : > $S/trial3/$U/$n.base
    cp $W/$f $S/trial3/$U/$n.theirs; cp $T/$f $S/trial3/$U/$n.merged 2>/dev/null || cp $S/trial3/$U/$n.base $S/trial3/$U/$n.merged
    git merge-file --diff3 -L ours -L base -L theirs $S/trial3/$U/$n.merged $S/trial3/$U/$n.base $S/trial3/$U/$n.theirs; c=$?
    if [ $c -ne 0 ]; then echo "  $f: $c conflict(s)"; python3 $S/resolve-diff3.py $S/trial3/$U/$n.merged $T/$f; grep -cE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' $T/$f | sed 's/^/    markers left: /'
    else cp $S/trial3/$U/$n.merged $T/$f; echo "  $f: clean"; fi
  done
done
