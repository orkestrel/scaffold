#!/bin/bash
# Lands THEME (round 1 with brief 2's V13 row) on the Veneer session branch. The shared and unscoped patches carry
# no index blobs, so they are applied on the unit branch over 2bf1142 (the base both were written against) and the
# unit branch is squash-merged three-way onto the session branch; ct-resolve.py settles the one conflict in the
# tests/setupStyles.ts TSDoc. Then the landing commit with ct-landing-message.txt, land-sort, the formatter check on
# the touched files, oxlint, and check. Log: .orkestrel/veneer/units/land-ct.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$R/land-ct.log.txt; : > $LOG; export PATH="$S/npm11/node_modules/.bin:$PATH"
{
cd /home/user/veneer-ct || exit 1
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
git add src/styles/_theme.scss src/styles/_tokens.scss tests/setupServer.test.ts tests/setupServer.ts tests/src/styles/theme.test.ts app/browser/sections/ColorModeSection.ts tests/app/browser/sections/ColorModeSection.test.ts
git -c user.name="$N" -c user.email="$M" commit -q -m "THEME round 1 (unit branch checkpoint)" && echo "=== unit/ct $(git rev-parse --short HEAD)"
git apply $R/ct-shared.patch && git apply $R/ct-unscoped.patch && echo "=== patches applied on unit/ct" || { echo "=== PATCH APPLY FAILED"; exit 3; }
git add app guides tests && git -c user.name="$N" -c user.email="$M" commit -q -m "THEME shared and unscoped patches (unit branch checkpoint)" && echo "=== unit/ct $(git rev-parse --short HEAD)"
[ -z "$(git status --porcelain | grep -v '^?? tmp/')" ] || { echo "=== ct worktree dirty"; git status --short; exit 2; }
echo "=== unit files: $(git diff --name-only 2bf1142 HEAD | tr '\n' ' ')"
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
git -c merge.conflictStyle=diff3 merge --squash unit/ct; echo "=== squash merge exit=$?"
python3 $R/ct-resolve.py /home/user/veneer || { echo "=== RESOLVE FAILED"; exit 4; }
if grep -rlE '^(<<<<<<<|>>>>>>>) ' $(git diff --name-only HEAD) 2>/dev/null; then echo "=== MARKERS REMAIN"; exit 4; fi
git add -A app src tests guides && git -c user.name="$N" -c user.email="$M" commit -q -F $R/ct-landing-message.txt && echo "=== landed $(git rev-parse --short HEAD)"
python3 $R/land-sort.py
files=$(git diff --name-only HEAD~1 HEAD)
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $files; echo "=== oxfmt check exit=$?"
./node_modules/.bin/oxlint --deny-warnings $(echo "$files" | grep '\.ts$'); echo "=== oxlint exit=$?"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
git status --porcelain
} >> $LOG 2>&1
grep '^===' $LOG
