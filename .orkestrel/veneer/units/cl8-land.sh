#!/usr/bin/env bash
# Land CL8 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is CL8's brief § Scope: the grid partial and its proof, the
# styles barrel, the styles setup module and its proof, the conformance listing, the guide's
# compatibility and deferral rows, the layout showcase section and its proof, the showcase wiring,
# and the mixins file, which the brief granted only for a shared block the sweep reports.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them
# by pathspec with the retained message; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl8-land.log.txt"
ALLOWED=" app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts app/browser/sections/LayoutSection.ts guides/veneer.md src/styles/_mixins.scss src/styles/index.scss tests/app/browser/sections/LayoutSection.test.ts tests/conformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$file" in
    src/styles/components/_grid.scss) ;;
    tests/src/styles/components/grid.test.ts) ;;
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl8-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
