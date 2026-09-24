#!/bin/bash
# Lands BCF (rounds 1 to 4) on the Veneer session branch: commits the worktree's rounds 2-4 on unit/bcf, applies
# the unit's net diff over ec98064 (the session head its branch merged) three-way onto the session branch, applies
# bcf-shared-2.patch three-way, commits with bcf-landing-message.txt, then runs land-sort, the formatter check on
# the touched files, oxlint, and check. Log: .orkestrel/veneer/units/land-bcf.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$R/land-bcf.log.txt; : > $LOG; export PATH="$S/npm11/node_modules/.bin:$PATH"
{
cd /home/user/veneer-bcf || exit 1
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
git add app/browser/constants.ts tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/*.test.ts
git -c user.name="$N" -c user.email="$M" commit -q -m "BCF rounds 2 to 4 (unit branch checkpoint)" && echo "=== unit/bcf $(git rev-parse --short HEAD)"
[ -z "$(git status --porcelain | grep -v '^?? tmp/')" ] || { echo "=== bcf worktree dirty"; exit 2; }
git diff ec98064 HEAD > $S/bcf-net.diff; echo "=== net diff files: $(git diff --name-only ec98064 HEAD | tr '\n' ' ')"
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
git apply --3way $S/bcf-net.diff && echo "=== applied net diff" || { echo "=== NET APPLY FAILED"; git status --short; exit 3; }
git apply --3way $R/bcf-shared-2.patch && echo "=== applied shared patch" || { echo "=== SHARED APPLY FAILED"; git status --short; exit 3; }
if git status --porcelain | grep -qE '^(UU|AA)'; then echo "=== CONFLICTS"; git status --short; exit 4; fi
git add -A app tests guides && git -c user.name="$N" -c user.email="$M" commit -q -F $R/bcf-landing-message.txt && echo "=== landed $(git rev-parse --short HEAD)"
python3 $R/land-sort.py
files=$(git diff --name-only HEAD~1 HEAD)
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $files; echo "=== oxfmt check exit=$?"
./node_modules/.bin/oxlint --deny-warnings $(echo "$files" | grep '\.ts$'); echo "=== oxlint exit=$?"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
git status --porcelain
} >> $LOG 2>&1
grep '^===' $LOG
