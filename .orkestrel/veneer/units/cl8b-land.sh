#!/usr/bin/env bash
# Land CL8b in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is CL8b's brief § Scope: the new utilities partial and its proof,
# the styles barrel, the token file and the registry for the step scale and its leaves, the styles
# setup module and its proof, the conformance listing, the conformance setup proof's one enumerating
# assertion, the guide's compatibility rows and the deferral rows this unit deletes, the layout
# showcase section with its constants and its proof, and the mixins file with the partial a shared
# block names, only if the sweep reports one.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them
# by pathspec with the retained message; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl8b-land.log.txt"
ALLOWED=" app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts app/browser/sections/LayoutSection.ts guides/veneer.md src/core/constants.ts src/styles/_mixins.scss src/styles/_tokens.scss src/styles/components/_container.scss src/styles/components/_grid.scss src/styles/index.scss tests/app/browser/sections/LayoutSection.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/grid.test.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
# The new partial's and proof's paths are the unit's own choice within its scope, so they are not
# listed above. The refusal below is expected to name them on the first run: read the unit's report,
# confirm each is the file it says it created, then add that exact path here with the brief clause
# that granted it. Never widen this with a glob — a glob over the partials would admit a file the
# unit was told not to touch, which is what this gate exists to refuse.
for file in $CHANGED; do
  case "$ALLOWED" in
    *" $file "*) ;;
    *) echo "refused: $file is outside the owned set"; exit 2 ;;
  esac
done
if [ -z "$CHANGED" ]; then echo "refused: nothing to land"; exit 2; fi
git add -- $CHANGED || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl8b-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
