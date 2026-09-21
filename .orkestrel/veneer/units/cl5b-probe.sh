#!/usr/bin/env bash
# The Orchestrator's own first-party mutation probe for CL5b, run after every lane has exited so
# no verifier chain meets a planted tree. Both audit lanes recorded the red-then-green run as
# report-only, and this unit ships a gate that will judge every future styles unit, so the gate's
# own falsifiability is worth a first-party reading rather than the writer's account.
# One mutation: an identical declaration block appended to two partials the extractions never
# touched. Both files are tracked, so the final `git diff --name-only` proves the restoration.
set -u
V="C:/Users/mikes/WebstormProjects/veneer"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-probe.log.txt.txt"
exec > >(tee "$LOG") 2>&1
cd "$V" || exit 9
echo "== baseline"
git log --oneline -1
echo "-- hashes before:"
git hash-object src/styles/elements/_address.scss src/styles/components/_quote.scss

echo "== plant: one identical block in two untouched partials"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-plant.mjs" plant || exit 2
echo "-- the tree-is-clean case with the plant present:"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts 2>&1 | tail -22

echo "== restore"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-plant.mjs" restore || exit 2
echo "-- hashes after:"
git hash-object src/styles/elements/_address.scss src/styles/components/_quote.scss
echo "-- the tree-is-clean case restored:"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts 2>&1 | tail -6

echo "== final tree"
git status --porcelain --untracked-files=all | grep -v '^?? tmp' | wc -l
echo "== probe end"
