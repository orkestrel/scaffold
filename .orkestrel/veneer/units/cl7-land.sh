#!/usr/bin/env bash
# Land CL7 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is the union of CL7's briefs 1, 2, and 3: the container
# partial and its proof, the layout showcase section and its proof, the token file and the
# registry for the container and gutter tokens, the styles barrel, the styles setup module and
# its proof, the conformance listing and the conformance setup proof where the key's rows move a
# population, the showcase wiring with its proofs, and the guide's container compatibility rows.
# Brief 3 moved only the styles setup proof and the container proof, both already in the set.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them
# by pathspec with cl7-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/.orkestrel/veneer/units/cl7-land.log.txt"
ALLOWED=" app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts guides/veneer.md src/styles/_tokens.scss src/styles/index.scss tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts src/core/constants.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$file" in
    src/styles/components/_container.scss) ;;
    tests/src/styles/components/container.test.ts) ;;
    app/browser/sections/LayoutSection.ts) ;;
    tests/app/browser/sections/LayoutSection.test.ts) ;;
    *)
      case "$ALLOWED" in
        *" $file "*) ;;
        *) echo "refused: $file is outside the owned set"; exit 2 ;;
      esac
      ;;
  esac
done
if [ -z "$CHANGED" ]; then echo "refused: nothing to land"; exit 2; fi
git add -- $CHANGED || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/.orkestrel/veneer/units/cl7-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
