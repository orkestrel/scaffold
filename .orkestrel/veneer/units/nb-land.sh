#!/bin/bash
# nb-land.sh: land NAVBAR on the Veneer session branch (the procedure nb-landing-probe-3.sh proved at the UTIL-PLACEMENT
# tip). Integrates the worktree's owned files as one commit (land-unit.sh cherry-picks unit/nb onto the tip), applies
# the round-4 shared and off-limits patches three-way with diff3-style blocks, runs nb-resolve.py's rulings, rebuilds
# the guide's file table and deferral table three-way from a658879 with table-merge3.py, applies the retirement patch
# plain, joins the seams, re-sorts the inventories, formats the changed files, and typechecks. The caller amends the
# landing commit after reading the output. Log: the script's stdout, kept as nb-land.txt.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
cd /home/user/veneer || exit 1
TIP=$(git rev-parse --short HEAD); echo "=== tip $TIP $(date -u +%H:%M:%S)"
bash $U/land-unit.sh nb $U/nb-landing-message.txt a658879 || { echo "land-unit failed"; exit 2; }
git log --oneline -1
echo "--- diff3 apply"
git -c merge.conflictStyle=diff3 apply --3way $U/nb-shared-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git -c merge.conflictStyle=diff3 apply --3way $U/nb-offlimits-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- resolve"; python3 $U/nb-resolve.py || exit 3
echo "--- theirs guide = a658879's guide with the shared patch applied"
rm -rf $S/nbfix && mkdir -p $S/nbfix/theirs/guides && git show a658879:guides/veneer.md > $S/nbfix/theirs/guides/veneer.md && git show a658879:guides/veneer.md > $S/nbfix/base.md && git show $TIP:guides/veneer.md > $S/nbfix/ours.md
(cd $S/nbfix/theirs && git apply --include='guides/veneer.md' $U/nb-shared-4.patch && echo "theirs applied") || exit 4
echo "--- file table"; python3 $U/table-merge3.py $S/nbfix/base.md $S/nbfix/ours.md $S/nbfix/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1 || exit 5
echo "--- deferral table"; python3 $U/table-merge3.py $S/nbfix/base.md $S/nbfix/ours.md $S/nbfix/theirs/guides/veneer.md guides/veneer.md '\| Name +\| Owner +\| Reason' 1 || exit 6
echo "--- retirement patch (plain apply)"; git apply --verbose $U/nb-retirement-4.patch 2>&1 | grep -v '^Checking\|^Hunk.*succeeded\|^Applied' | head -8; echo "retirement apply exit=${PIPESTATUS[0]}"
echo "--- seams and sort"; python3 $U/land-seams.py; python3 $S/sort-inventories.py /home/user/veneer navbar
grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' app tests guides src 2>/dev/null | sed 's/^/MARKERS LEFT: /'
for h in '^| File ' '^| Name  *| Owner' '^| Component  *| Kind'; do echo "header $h: $(grep -c "$h" guides/veneer.md)"; done
echo "--- format"; npx oxfmt --write $(git status --porcelain | awk '{print $2}') 2>&1 | tail -1
git status --short | wc -l
echo "--- check $(date -u +%H:%M:%S)"; npm run check 2>&1 | grep -E 'error TS' | head -10; echo "check exit=${PIPESTATUS[0]}"
echo "=== done $(date -u +%H:%M:%S)"
