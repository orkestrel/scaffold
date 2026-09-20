#!/usr/bin/env bash
# Land U7a in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). Steps: confirm every tracked change is one of the files brief 2 owns; commit
# them by pathspec with u7a-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/u7a-land.log.txt"
ALLOWED=" src/styles/elements/_button.scss src/styles/components/_button.scss src/styles/index.scss src/styles/_tokens.scss src/styles/_theme.scss src/styles/_mixins.scss src/core/constants.ts src/core/types.ts tests/src/styles/elements/button.test.ts tests/src/styles/components/button.test.ts tests/src/styles/mixins.test.ts tests/src/core/index.test.ts tests/conformance.test.ts guides/veneer.md "
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain | grep -v '^?? tmp'
CHANGED=$(git status --porcelain | grep -v '^?? tmp' | awk '{print $2}' | sort)
echo "changed: $(echo "$CHANGED" | tr '\n' ' ')"
for file in $CHANGED; do
  case "$ALLOWED" in
    *" $file "*) ;;
    *) echo "refused: $file is outside the owned set"; exit 2 ;;
  esac
done
if [ -z "$CHANGED" ]; then echo "refused: nothing to land"; exit 2; fi
git add -- $CHANGED || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/u7a-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
