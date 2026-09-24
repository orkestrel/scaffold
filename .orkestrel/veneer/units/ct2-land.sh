#!/bin/bash
# Lands THEME rounds 2 and 3 on the Veneer session branch at ac74459 (their base): applies ct2-2.diff (the owned
# files) and ct2-shared-2.patch directly, commits with ct2-landing-message.txt, then runs the formatter check on
# the touched files, oxlint, check, and the scoped proofs the rounds touched. Log: .orkestrel/veneer/units/land-ct2.log.txt
R=/home/user/scaffold/.orkestrel/veneer/units; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$R/land-ct2.log.txt; : > $LOG; export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{
cd /home/user/veneer || exit 1
[ "$(git rev-parse --short HEAD)" = "ac74459" ] || { echo "=== HEAD moved: $(git rev-parse --short HEAD)"; exit 2; }
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
git apply $R/ct2-2.diff && git apply $R/ct2-shared-2.patch && echo "=== applied" || { echo "=== APPLY FAILED"; git status --short; exit 3; }
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
git add -A tests guides && git -c user.name="$N" -c user.email="$M" commit -q -F $R/ct2-landing-message.txt && echo "=== landed $(git rev-parse --short HEAD)"
files=$(git diff --name-only HEAD~1 HEAD)
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $files; echo "=== oxfmt check exit=$?"
./node_modules/.bin/oxlint --deny-warnings $(echo "$files" | grep '\.ts$'); echo "=== oxlint exit=$?"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
npm run build:src > /dev/null 2>&1; echo "=== build:src exit=$?"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts 2>&1 | grep -E 'Tests |FAIL'; echo "=== styles scoped exit=${PIPESTATUS[0]}"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts tests/setupServer.test.ts tests/setupStyles.test.ts 2>&1 | grep -E 'Tests |FAIL'; echo "=== setup scoped exit=${PIPESTATUS[0]}"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance 2>&1 | grep -E 'Tests |FAIL'; echo "=== conformance exit=${PIPESTATUS[0]}"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts 2>&1 | grep -E 'Tests |FAIL'; echo "=== color modes section exit=${PIPESTATUS[0]}"
git status --porcelain
} >> $LOG 2>&1
grep -E '^===|Tests ' $LOG
