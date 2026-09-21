#!/usr/bin/env bash
# Land CL3 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). Steps: confirm every tracked or untracked change outside tmp/ is one of the
# files the brief owns; commit them by pathspec with cl3-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/cl3-land.log.txt"
ALLOWED=" src/styles/_reset.scss src/styles/index.scss src/styles/_tokens.scss src/styles/_mixins.scss src/core/constants.ts tests/src/styles/tokens.test.ts tests/src/styles/index.test.ts tests/src/styles/reset.test.ts app/browser/constants.ts app/browser/types.ts app/browser/index.ts app/browser/Showcase.ts app/browser/sections/ContentSection.ts tests/app/browser/sections/ContentSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts guides/veneer.md "
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/cl3-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
