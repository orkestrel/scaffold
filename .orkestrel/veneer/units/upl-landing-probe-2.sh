#!/bin/bash
# upl-landing-probe-2.sh: successor of upl-landing-probe.sh. Probe the UTIL-PLACEMENT round-4 patches three-way with
# diff3-style blocks against the current Veneer tip in a scratch worktree, run upl-resolve-2.py, rebuild the guide's
# file table (key: File) and ledger table (a row sequence, key 0) three-way with table-merge3.py from e4e6a40, join
# the seams, re-sort the inventories, and check for markers. No gate runs here; upl-landing-probe-gates.sh follows once
# the container is idle. Output kept as upl-landing-probe-2.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
TIP=$(git -C /home/user/veneer rev-parse --short HEAD); W=$S/probe-land-upl3
cd /home/user/veneer && git worktree remove --force $W > /dev/null 2>&1; rm -rf $W
git worktree add -q --detach $W $TIP && cd $W || exit 1
echo "=== upl diff3 apply of upl-shared-4.patch and upl-unlisted-4.patch on $TIP $(date -u +%H:%M:%S)"
git -c merge.conflictStyle=diff3 apply --3way $U/upl-shared-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git -c merge.conflictStyle=diff3 apply --3way $U/upl-unlisted-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -3
echo "--- resolve"; python3 $U/upl-resolve-2.py || exit 2
echo "--- theirs guide = e4e6a40's guide with the patch applied"
rm -rf $S/uplfix && mkdir -p $S/uplfix/theirs/guides && git show e4e6a40:guides/veneer.md > $S/uplfix/theirs/guides/veneer.md && git show e4e6a40:guides/veneer.md > $S/uplfix/base.md && git show $TIP:guides/veneer.md > $S/uplfix/ours.md
(cd $S/uplfix/theirs && git apply --include='guides/veneer.md' $U/upl-shared-4.patch && echo "theirs applied")
echo "--- file table"; python3 $U/table-merge3.py $S/uplfix/base.md $S/uplfix/ours.md $S/uplfix/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1
echo "--- ledger table"; python3 $U/table-merge3.py $S/uplfix/base.md $S/uplfix/ours.md $S/uplfix/theirs/guides/veneer.md guides/veneer.md '\| Component +\| Kind +\| Obligation' 0
echo "--- seams and sort"; python3 $U/land-seams.py; python3 $S/sort-inventories.py $W bottom end fixed h invisible mh min mw position start sticky top translate-middle vh visible visually-hidden vw w z
grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' app tests guides src 2>/dev/null | sed 's/^/MARKERS LEFT: /'
echo "--- the merged Tailwind paragraph"; grep -n -B3 -A12 'Every other shipped name off the line' guides/veneer.md | cut -c1-110
echo "--- done $(date -u +%H:%M:%S)"
