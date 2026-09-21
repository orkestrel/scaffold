#!/usr/bin/env bash
# The Orchestrator's own first-party mutation probe for CL5c's round 2, run after every lane has
# exited so no verifier chain meets a planted tree. Every lane recorded the red-then-green run as
# report-only, and the case under test exists to keep two public retune points armed, so its
# falsifiability is worth a first-party reading rather than the writer's account.
# One mutation: inline the CSS system colour keywords into the shared mark mixin, which is the
# edit that would remove the tokens as retune points while every literal-pinning case stayed green.
set -u
V="C:/Users/mikes/WebstormProjects/veneer"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5c-probe.log.txt.txt"
MIXINS="src/styles/_mixins.scss"
exec > >(tee "$LOG") 2>&1
cd "$V" || exit 9
echo "== baseline"
git log --oneline -1
echo "-- mixins hash before:"
git hash-object "$MIXINS"

echo "== plant: inline the system colour keywords into the shared mixin"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5c-plant.mjs" plant || exit 2
npm run build:src:styles > /dev/null 2>&1
echo "-- the type proof with the keywords inlined:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/type.test.ts 2>&1 | tail -22
echo "-- the mark tag proof with the keywords inlined (must stay green):"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/mark.test.ts 2>&1 | tail -6

echo "== restore"
node "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5c-plant.mjs" restore || exit 2
echo "-- mixins hash after:"
git hash-object "$MIXINS"
npm run build:src:styles > /dev/null 2>&1
echo "-- the type proof restored:"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/type.test.ts 2>&1 | tail -6

echo "== final tree"
git status --porcelain --untracked-files=all | grep -v '^?? tmp' | wc -l
echo "== probe end"
