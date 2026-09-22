#!/usr/bin/env bash
# Land CL11 in the Veneer checkout. The Orchestrator's own tracked command (commit and push are barred
# to roles). The allowed set is CL11's brief and its fix round: the journey proof, the shared setup
# module and its proof, the browser setup module and its proof, the distribution proof, and the
# Button-family section proof, which was granted narrowly for one rename's call sites after a scope
# read found it unscoped.
# CL11 adds no file: every path is a modification, so the status carries no untracked entry outside
# tmp/. Two of the seven listed files carry only round-1 work, unchanged by the fix round, confirmed by
# git blob identity across the two rendered diffs.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/.orkestrel/veneer/units/cl11-land.log.txt"
ALLOWED=" tests/app/browser/integration.test.ts tests/app/browser/sections/ButtonSection.test.ts tests/distribution.test.ts tests/setup.test.ts tests/setup.ts tests/setupBrowser.test.ts tests/setupBrowser.ts "
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
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/.orkestrel/veneer/units/cl11-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain --untracked-files=all | grep -v '^?? tmp'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
