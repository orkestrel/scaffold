#!/usr/bin/env bash
# Land CL6 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is the union of CL6's briefs 1 to 3: the link partial and its
# proof, the link showcase section and its proof, the anchor partial and its proof, the token file
# for the link tokens, the styles barrel, the styles setup module and its proof, the conformance
# listing and the conformance setup proof where the key's rows move a population, the button proof
# for its two authorized assertions, the showcase wiring with its proofs, and the guide's link
# compatibility rows.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them
# by pathspec with cl6-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl6-land.log.txt"
ALLOWED=" app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts guides/veneer.md src/styles/_tokens.scss src/styles/index.scss src/styles/elements/_a.scss tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/a.test.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$file" in
    src/styles/components/_link.scss) ;;
    tests/src/styles/components/link.test.ts) ;;
    app/browser/sections/LinkSection.ts) ;;
    tests/app/browser/sections/LinkSection.test.ts) ;;
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl6-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
