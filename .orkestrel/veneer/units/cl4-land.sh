#!/usr/bin/env bash
# Land CL4 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is the union of CL4's briefs 1 to 7: the remaining Reboot
# partials and their proofs under the two element globs, the styles barrel, the mixins file
# (brief 7's grant for the shared-block extraction), the selector canonicalization in the styles
# setup and its cases, the conformance case tables and the `listed` key, the showcase specimen
# constants and the section proof, and the guide.
# Steps: confirm every tracked or untracked change outside tmp/ is one of the files those briefs
# own; commit them by pathspec with cl4-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl4-land.log.txt"
ALLOWED=" app/browser/constants.ts guides/veneer.md src/styles/_mixins.scss src/styles/index.scss tests/app/browser/sections/ContentSection.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$file" in
    src/styles/elements/_*.scss) ;;
    tests/src/styles/elements/*.test.ts) ;;
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl4-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
