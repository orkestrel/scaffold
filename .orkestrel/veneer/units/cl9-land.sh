#!/usr/bin/env bash
# Land CL9 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are barred
# to roles). The allowed set is CL9's brief § Scope: the new table partial and its proof, the styles
# barrel, the styles setup module and its proof, the conformance listing, the conformance setup
# proof's one enumerating assertion, the guide's rows for this key, and the new showcase section with
# its constants, its registration in the showcase and the application barrel, and the proofs of each.
# The brief granted the token file and the registry only if the record required a state token; the
# unit reported that the existing stripe token already carried the recorded factor, so neither file
# is in the status and neither is listed here.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them by
# pathspec with the retained message; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/.orkestrel/veneer/units/cl9-land.log.txt"
ALLOWED=" app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts app/browser/sections/TableSection.ts guides/veneer.md src/styles/components/_table.scss src/styles/index.scss tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/app/browser/sections/TableSection.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/table.test.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$ALLOWED" in
    *" $file "*) ;;
    *) echo "refused: $file is outside the owned set"; exit 2 ;;
  esac
done
if [ -z "$CHANGED" ]; then echo "refused: nothing to land"; exit 2; fi
git add -- $CHANGED || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/.orkestrel/veneer/units/cl9-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
