#!/bin/bash
# nb-landing-probe-3.sh: successor of nb-landing-probe-2.sh, run at the UTIL-PLACEMENT tip with the round-4 patches (nb-shared-4.patch, nb-offlimits-4.patch, nb-retirement-4.patch). Probe the whole NAVBAR resolution in a scratch worktree at the
# current Veneer tip: the round-3 shared and off-limits patches with diff3-style blocks, nb-resolve.py's rulings, the
# deferral table rebuilt three-way by table-merge3.py from a658879 (the patch applied over the base gives theirs), the
# retirement patch applied plain (its base is the simulated post-ACCORDION state, whose blobs the repository lacks, so
# `--3way` cannot read them; the context lines are what the resolved tree carries, the owned files copied in first as
# the landing's cherry-pick places them), then land-seams.py and
# sort-inventories.py, and a marker check. No gate runs here. Output kept as nb-landing-probe-3.txt. The round-4 shared

S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
TIP=$(git -C /home/user/veneer rev-parse --short HEAD); W=$S/probe-land-nb
cd /home/user/veneer && git worktree remove --force $W > /dev/null 2>&1; rm -rf $W
git worktree add -q --detach $W $TIP && cd $W || exit 1
echo "=== nb diff3 apply of nb-shared-4.patch and nb-offlimits-4.patch on $TIP $(date -u +%H:%M:%S)"
git -c merge.conflictStyle=diff3 apply --3way $U/nb-shared-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git -c merge.conflictStyle=diff3 apply --3way $U/nb-offlimits-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- resolve"; python3 $U/nb-resolve.py || exit 2
echo "--- theirs guide = a658879's guide with the shared patch applied"
rm -rf $S/nbfix && mkdir -p $S/nbfix/theirs/guides && git show a658879:guides/veneer.md > $S/nbfix/theirs/guides/veneer.md && git show a658879:guides/veneer.md > $S/nbfix/base.md && git show $TIP:guides/veneer.md > $S/nbfix/ours.md
(cd $S/nbfix/theirs && git apply --include='guides/veneer.md' $U/nb-shared-4.patch && echo "theirs applied")
echo "--- file table"; python3 $U/table-merge3.py $S/nbfix/base.md $S/nbfix/ours.md $S/nbfix/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1 || exit 4
echo "--- deferral table"; python3 $U/table-merge3.py $S/nbfix/base.md $S/nbfix/ours.md $S/nbfix/theirs/guides/veneer.md guides/veneer.md '\| Name +\| Owner +\| Reason' 1
echo "--- owned files copied from the worktree (the landing cherry-picks them before the shared patch)"; for f in $(git -C /home/user/veneer-nb status --porcelain | awk '{print $2}'); do mkdir -p "$(dirname $f)"; cp "/home/user/veneer-nb/$f" "$f"; done
echo "--- retirement patch (plain apply)"; git apply --verbose $U/nb-retirement-4.patch 2>&1 | grep -v '^Checking\|^Hunk.*succeeded\|^Applied' | head -8; echo "retirement apply exit=${PIPESTATUS[0]}"
echo "--- seams and sort"; python3 $U/land-seams.py; python3 $S/sort-inventories.py $W navbar
grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' app tests guides src 2>/dev/null | sed 's/^/MARKERS LEFT: /'
echo "--- \$assets after the resolution"; grep -n 'assets' src/styles/_tokens.scss src/styles/_theme.scss | head -5
echo "--- the ruled dropdown sentence and cell"; grep -n -A3 'key records, the split toggle included' guides/veneer.md | cut -c1-120; grep -n '^| dropdown         | selector' guides/veneer.md | cut -c1-260
echo "--- done $(date -u +%H:%M:%S)"
