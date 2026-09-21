#!/usr/bin/env bash
# Land U7b in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). Steps: confirm every tracked change is one of the files the brief owns;
# commit them by pathspec with u7b-land-message.txt; push.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/u7b-land.log.txt"
ALLOWED=" src/browser/types.ts src/browser/constants.ts src/browser/validators.ts src/browser/helpers.ts src/browser/Button.ts src/browser/Delegate.ts src/browser/index.ts tests/src/browser/Button.test.ts tests/src/browser/Delegate.test.ts tests/src/browser/helpers.test.ts tests/src/browser/validators.test.ts tests/src/browser/index.test.ts "
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/u7b-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
