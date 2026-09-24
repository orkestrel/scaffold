#!/usr/bin/env bash
# The failing-first reading: the owned styles proofs over the 2a3f223 barrel, which loads neither
# partial, then over the barrel with the unit's `@use` lines.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp/tmp/probe/base
cp src/styles/index.scss ../../units/usp-index-keep.scss
git -C /home/user/veneer-usp show 2a3f223:src/styles/index.scss > src/styles/index.scss
CMD="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts"
echo "== before: the 2a3f223 barrel"; npm run build:src:styles > /dev/null 2>&1; echo "build exit $?"; echo "command: $CMD"
$CMD > ../../units/usp-first-before.log.txt 2>&1; echo "test exit $?"; grep -E "^\s+Tests " ../../units/usp-first-before.log.txt; grep -E "^ FAIL " ../../units/usp-first-before.log.txt | sed 's/|\[object Object\] (chromium)| //'
cp ../../units/usp-index-keep.scss src/styles/index.scss && rm ../../units/usp-index-keep.scss
echo "== after: the barrel with the unit's lines"; npm run build:src:styles > /dev/null 2>&1; echo "build exit $?"; echo "command: $CMD"
$CMD > ../../units/usp-first-after.log.txt 2>&1; echo "test exit $?"; grep -E "^\s+Tests " ../../units/usp-first-after.log.txt
