#!/usr/bin/env bash
# The Orchestrator's own first-party mutation probe for CL5's round 2, taken after every lane has
# exited so no verifier chain is running against a planted tree. Round 2's objective lane accepted
# the implementation and asked only for execution evidence on the retune matrix's plant.
# One mutation: append a literal size to one heading class equal to that level's default, which no
# default-value case can observe, and read the type proof. The partial is tracked, so the final
# `git diff --name-only` proves the restoration.
set -u
V="C:/Users/mikes/WebstormProjects/veneer"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-probe.log.txt.txt"
PARTIAL="src/styles/components/_type.scss"
exec > >(tee "$LOG") 2>&1
cd "$V" || exit 9
echo "== baseline"
git log --oneline -1
git status --porcelain -- "$PARTIAL"
echo "-- hash before:"
git hash-object "$PARTIAL"

echo "== plant: a literal size on the fourth heading class, equal to that level's default"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-plant.mjs" plant || exit 2
tail -3 "$PARTIAL"
npm run build:src:styles > /dev/null 2>&1
echo "-- type proof with the literal planted:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/type.test.ts 2>&1 | tail -25

echo "== restore"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-plant.mjs" restore || exit 2
echo "-- hash after:"
git hash-object "$PARTIAL"
npm run build:src:styles > /dev/null 2>&1
echo "-- type proof restored:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/type.test.ts 2>&1 | tail -6

echo "== final tree"
git status --porcelain --untracked-files=all | grep -v '^?? tmp' | wc -l
echo "== probe end"
