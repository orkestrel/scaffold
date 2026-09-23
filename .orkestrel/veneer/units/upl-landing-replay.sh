#!/bin/bash
# upl-landing-replay.sh: settle the UTIL-PLACEMENT landing checker's byte-parity sub-clauses by replaying the landing's
# mechanical procedure in a scratch worktree at the landing's base (51a8fa0): the owned files read from the unit's
# branch `unit/upl` (land-unit.sh committed them there), the round-4 shared and unlisted patches applied with diff3-style blocks, upl-resolve-2.py, the two table
# merges, land-seams.py, sort-inventories.py, the format pass, and the two load-order edits, then a byte comparison of
# every file the landing touches against the landing commit. An empty difference proves the landing equals the
# procedure's output. Output kept as upl-landing-replay.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units; W=$S/replay-upl
LAND=$(git -C /home/user/veneer rev-parse --short HEAD); BASE=51a8fa0
cd /home/user/veneer && git worktree remove --force $W > /dev/null 2>&1; rm -rf $W
git worktree add -q --detach $W $BASE && cd $W || exit 1
for f in $(git -C /home/user/veneer-upl diff --name-only e4e6a40); do mkdir -p "$(dirname $f)"; git -C /home/user/veneer-upl show "unit/upl:$f" > "$f"; done
git add -A && git -c user.name=replay -c user.email=replay@local commit -q -m replay
git -c merge.conflictStyle=diff3 apply --3way $U/upl-shared-4.patch > /dev/null 2>&1; git -c merge.conflictStyle=diff3 apply --3way $U/upl-unlisted-4.patch > /dev/null 2>&1
python3 $U/upl-resolve-2.py > /dev/null || exit 2
rm -rf $S/replayfix && mkdir -p $S/replayfix/theirs/guides && git show e4e6a40:guides/veneer.md > $S/replayfix/theirs/guides/veneer.md && git show e4e6a40:guides/veneer.md > $S/replayfix/base.md && git show $BASE:guides/veneer.md > $S/replayfix/ours.md
(cd $S/replayfix/theirs && git apply --include='guides/veneer.md' $U/upl-shared-4.patch) || exit 3
python3 $U/table-merge3.py $S/replayfix/base.md $S/replayfix/ours.md $S/replayfix/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1 > /dev/null || exit 4
python3 $U/table-merge3.py $S/replayfix/base.md $S/replayfix/ours.md $S/replayfix/theirs/guides/veneer.md guides/veneer.md '\| Component +\| Kind +\| Obligation' 0 > /dev/null || exit 5
python3 $U/land-seams.py > /dev/null; python3 $S/sort-inventories.py $W bottom end fixed h invisible mh min mw position start sticky top translate-middle vh visible visually-hidden vw w z > /dev/null
npx oxfmt --write $(git status --porcelain | awk '{print $2}') > /dev/null 2>&1
python3 - <<PY
import re,sys
p='$W/src/styles/index.scss'; s=open(p).read()
old="@use 'components/stacks';\n@use 'components/position' as position-component;\n"; new="@use 'components/position' as position-component;\n@use 'components/stacks';\n"
assert s.count(old)==1; s=s.replace(old,new)
order=['visually-hidden','vertical-align','display','position','sizing','flex','gap','visibility']; lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if re.match(r"@use 'utilities/[\w-]+'", l)]; names={re.match(r"@use 'utilities/([\w-]+)'", lines[i]).group(1): lines[i] for i in idx}
lines[idx[0]:idx[-1]+1]=[names[n] for n in order]; open(p,'w').write('\n'.join(lines))
PY
echo "=== replay on $BASE against the landing $LAND: files differing"
for f in $(git -C /home/user/veneer diff --name-only $BASE $LAND); do cmp -s "$f" "/home/user/veneer/$f" || echo "DIFFERS: $f"; done
echo "=== compared $(git -C /home/user/veneer diff --name-only $BASE $LAND | wc -l) files $(date -u +%H:%M:%S)"
