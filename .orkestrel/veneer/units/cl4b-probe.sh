#!/usr/bin/env bash
# The Orchestrator's own first-party mutation probe for CL4b, taken after the unit exited and
# before the landing. Every audit lane ruled the red-then-green runs report-only, so this run
# establishes them independently. Two mutations, each planted, read, and restored:
#   1. drop the box-reset include from _hr.scss, keeping margin and colour, and read the hr proof;
#   2. rename the first content specimen, and read the content section proof.
# The tree carries CL4b's uncommitted change; both planted files are tracked and must return to
# their committed state, which `git diff --name-only` proves at the end.
set -u
V="C:/Users/mikes/WebstormProjects/veneer"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-probe.log.txt.txt"
exec > >(tee "$LOG") 2>&1
cd "$V" || exit 9
echo "== baseline"
git log --oneline -1
git diff --name-only

echo "== plant 1: drop the border reset from the horizontal rule"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-plant.mjs" hr plant || exit 2
sed -n '3,11p' src/styles/elements/_hr.scss
npm run build:src:styles > /dev/null 2>&1
echo "-- hr proof with the reset dropped:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/hr.test.ts 2>&1 | tail -30
echo "exit=$?"

echo "== restore 1"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-plant.mjs" hr restore || exit 2
git diff --name-only -- src/styles/elements/_hr.scss
npm run build:src:styles > /dev/null 2>&1
echo "-- hr proof restored:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/hr.test.ts 2>&1 | tail -6

echo "== plant 2: rename the first content specimen"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-plant.mjs" specimen plant || exit 2
echo "-- content section proof with the rename:"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ContentSection.test.ts 2>&1 | tail -30

echo "== restore 2"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-plant.mjs" specimen restore || exit 2
git diff --name-only -- app/browser/constants.ts
echo "-- content section proof restored:"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ContentSection.test.ts 2>&1 | tail -6

echo "== final tree"
npm run build:src:styles > /dev/null 2>&1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
echo "== probe end"
