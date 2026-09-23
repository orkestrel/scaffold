#!/bin/bash
# upl-land.sh: land UTIL-PLACEMENT on the Veneer session branch. Integrates the worktree's owned files as one commit
# (land-unit.sh cherry-picks unit/upl onto the tip; a conflict in app/browser/styles/_shell.scss resolves through
# resolve-diff3.py), applies the round-4 shared and unlisted patches three-way with diff3-style blocks, runs
# upl-resolve-2.py, rebuilds the guide's file table (key: File) and obligation ledger (row sequence) three-way from
# e4e6a40 with table-merge3.py, joins the seams, re-sorts the inventories, formats the changed files, and typechecks.
# The caller amends the landing commit after reading the output. Log: the script's stdout, kept as upl-land.txt.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
cd /home/user/veneer || exit 1
TIP=$(git rev-parse --short HEAD); echo "=== tip $TIP $(date -u +%H:%M:%S)"
bash $U/land-unit.sh upl $U/upl-landing-message.txt e4e6a40 || { echo "land-unit failed"; exit 2; }
git log --oneline -1
echo "--- diff3 apply"
git -c merge.conflictStyle=diff3 apply --3way $U/upl-shared-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git -c merge.conflictStyle=diff3 apply --3way $U/upl-unlisted-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -3
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- resolve"; python3 $U/upl-resolve-2.py || exit 3
echo "--- theirs guide = e4e6a40's guide with the patch applied"
rm -rf $S/uplfix && mkdir -p $S/uplfix/theirs/guides && git show e4e6a40:guides/veneer.md > $S/uplfix/theirs/guides/veneer.md && git show e4e6a40:guides/veneer.md > $S/uplfix/base.md && git show $TIP:guides/veneer.md > $S/uplfix/ours.md
(cd $S/uplfix/theirs && git apply --include='guides/veneer.md' $U/upl-shared-4.patch && echo "theirs applied") || exit 4
echo "--- file table"; python3 $U/table-merge3.py $S/uplfix/base.md $S/uplfix/ours.md $S/uplfix/theirs/guides/veneer.md guides/veneer.md '\| File +\| Role' 1 || exit 5
echo "--- ledger table"; python3 $U/table-merge3.py $S/uplfix/base.md $S/uplfix/ours.md $S/uplfix/theirs/guides/veneer.md guides/veneer.md '\| Component +\| Kind +\| Obligation' 0 || exit 6
echo "--- seams and sort"; python3 $U/land-seams.py; python3 $S/sort-inventories.py /home/user/veneer bottom end fixed h invisible mh min mw position start sticky top translate-middle vh visible visually-hidden vw w z
grep -rlE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|)' app tests guides src 2>/dev/null | sed 's/^/MARKERS LEFT: /'
echo "--- format"; npx oxfmt --write $(git status --porcelain | awk '{print $2}') 2>&1 | tail -1
git status --short | wc -l
echo "--- check $(date -u +%H:%M:%S)"; npm run check 2>&1 | grep -E 'error TS' | head -10; echo "check exit=${PIPESTATUS[0]}"
echo "=== done $(date -u +%H:%M:%S)"
