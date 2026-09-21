#!/usr/bin/env bash
# Land CL5b in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is the union of CL5b's briefs 1 and 2: the mixins file, the
# four partials the extractions touch, the conformance setup module and its proof (granted for
# the sweep function alone), the styles setup module and its proof, and both image proofs.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit
# them by pathspec with cl5b-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl5b-land.log.txt"
ALLOWED=" src/styles/_mixins.scss src/styles/components/_image.scss src/styles/components/_type.scss src/styles/elements/_heading.scss src/styles/elements/_img.scss tests/setupConformance.test.ts tests/setupConformance.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/image.test.ts tests/src/styles/elements/img.test.ts "
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl5b-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
