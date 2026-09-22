#!/usr/bin/env bash
# Land CL10 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are barred
# to roles). The allowed set is CL10's brief § Scope: the three new helper partials and their three
# proofs, the styles barrel, the styles setup module and its proof, the conformance listing, the
# conformance setup proof's one enumerating assertion, the guide's rows for these keys, and the
# showcase specimens with the proofs of the sections they joined.
# CL10 added no showcase section: the specimens went into the Links, Media, and Layout sections the
# tree already registers, so neither app/browser/Showcase.ts nor app/browser/index.ts is in the
# status and neither is listed here. The brief granted the token file and the registry only if the
# record required a token; the unit reported the vertical rule reads the pre-declared border-width
# alias, so neither src/styles/_tokens.scss nor src/core/constants.ts is in the status or listed.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them by
# pathspec with the retained message; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/.orkestrel/veneer/units/cl10-land.log.txt"
ALLOWED=" app/browser/constants.ts guides/veneer.md src/styles/components/_icon-link.scss src/styles/components/_ratio.scss src/styles/components/_vr.scss src/styles/index.scss tests/app/browser/sections/LayoutSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/sections/MediaSection.test.ts tests/conformance.test.ts tests/setupConformance.test.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/icon-link.test.ts tests/src/styles/components/ratio.test.ts tests/src/styles/components/vr.test.ts "
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/.orkestrel/veneer/units/cl10-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
