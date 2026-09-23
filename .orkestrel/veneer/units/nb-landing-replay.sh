#!/bin/bash
# nb-landing-replay.sh: settle the NAVBAR landing checker's byte-parity sub-clauses by replaying nb-land.sh's mechanical
# procedure in a scratch worktree at the landing's base (5fb8b41): the owned files read from unit/nb, the round-4 shared
# and off-limits patches applied with diff3-style blocks, nb-resolve.py, the file and deferral table merges, the
# retirement patch, land-seams.py, sort-inventories.py, and the format pass, then a byte comparison of every file the
# landing touches against the landing commit. An empty difference proves the landing equals the procedure's output.
# Output kept as nb-landing-replay.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units; W=$S/replay-nb
LAND=$(git -C /home/user/veneer rev-parse --short HEAD); BASE=5fb8b41
cd /home/user/veneer && git worktree remove --force $W > /dev/null 2>&1; rm -rf $W
git worktree add -q --detach $W $BASE && cd $W || exit 1
for f in $(git -C /home/user/veneer-nb diff --name-only a658879; git -C /home/user/veneer-nb ls-files --others --exclude-standard); do mkdir -p "$(dirname $f)"; git -C /home/user/veneer show "unit/nb:$f" > "$f"; done
git add -A && git -c user.name=replay -c user.email=replay@local commit -q -m replay
git -c merge.conflictStyle=diff3 apply --3way $U/nb-shared-4.patch > /dev/null 2>&1; git -c merge.conflictStyle=diff3 apply --3way $U/nb-offlimits-4.patch > /dev/null 2>&1
python3 $U/nb-resolve.py > /dev/null || exit 2
rm -rf $S/replaynb && mkdir -p $S/replaynb/theirs/guides && git show a658879:guides/veneer.md > $S/replaynb/theirs/guides/veneer.md && git show a658879:guides/veneer.md > $S/replaynb/base.md && git show $BASE:guides/veneer.md > $S/replaynb/ours.md
(cd $S/replaynb/theirs && git apply --include='guides/veneer.md' $U/nb-shared-4.patch) || exit 3
python3 $U/table-merge3.py $S/replaynb/base.md $S/replaynb/ours.md $S/replaynb/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1 > /dev/null || exit 4
python3 $U/table-merge3.py $S/replaynb/base.md $S/replaynb/ours.md $S/replaynb/theirs/guides/veneer.md guides/veneer.md '\| Name +\| Owner +\| Reason' 1 > /dev/null || exit 5
git apply $U/nb-retirement-4.patch || exit 6
python3 $U/land-seams.py > /dev/null; python3 $S/sort-inventories.py $W navbar > /dev/null
npx oxfmt --write $(git status --porcelain | awk '{print $2}') > /dev/null 2>&1
echo "=== replay on $BASE against the landing $LAND: files differing"
for f in $(git -C /home/user/veneer diff --name-only $BASE $LAND); do cmp -s "$f" "/home/user/veneer/$f" || echo "DIFFERS: $f"; done
echo "=== compared $(git -C /home/user/veneer diff --name-only $BASE $LAND | wc -l) files $(date -u +%H:%M:%S)"
echo "=== owned files against unit/nb"; n=0; for f in $(git -C /home/user/veneer-nb diff --name-only a658879; git -C /home/user/veneer-nb ls-files --others --exclude-standard); do cmp -s <(git -C /home/user/veneer show "unit/nb:$f") "/home/user/veneer-nb/$f" && n=$((n+1)) || echo "WORKTREE DIFFERS: $f"; done; echo "$n owned files equal the worktree"
