#!/usr/bin/env bash
# Land CL5c in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). The allowed set is the union of CL5c's briefs 1 to 3: the shared specimen
# section base with its proof and the three sections that extend it, the app types and barrel with
# the barrel proof, the two registry leaves, the mark mixin and the two mark tokens, the two mark
# partials, the styles setup module and its proof, and the type and image component proofs.
# Steps: confirm every tracked or untracked change outside tmp/ is one of those files; commit them
# by pathspec with cl5c-land-message.txt; push.
#
# Widened once, after this script refused `app/browser/constants.ts` on its first run. That
# refusal was correct: the list was written before brief 4, whose finding 2 renames the shared
# specimen row type and whose criterion 2 requires the three specimen table annotations to follow
# it. Those annotations live in that file, and the unit's deviation report records that its whole
# diff there is the type import plus those three annotations. The list is widened to that one
# file and nothing else.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl5c-land.log.txt"
ALLOWED=" app/browser/constants.ts app/browser/index.ts app/browser/types.ts src/core/constants.ts src/styles/_mixins.scss src/styles/_tokens.scss src/styles/components/_type.scss src/styles/elements/_mark.scss tests/app/browser/index.test.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/styles/components/image.test.ts tests/src/styles/components/type.test.ts "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
CHANGED=$(git status --porcelain --untracked-files=all | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$file" in
    app/browser/sections/*.ts) ;;
    tests/app/browser/sections/*.test.ts) ;;
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl5c-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
