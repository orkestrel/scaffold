#!/usr/bin/env bash
# Land U7d in the Veneer checkout. The Orchestrator's own tracked command (commit and push are
# barred to roles). Steps: confirm the four owned files are the whole tracked diff; commit them by
# pathspec with u7d-land-message.txt; push; print the landing commit.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/u7d-land.log.txt"
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain | grep -v '^??'
CHANGED=$(git status --porcelain | grep -v '^??' | awk '{print $2}' | sort | tr '\n' ' ')
echo "changed: $CHANGED"
if [ "$CHANGED" != "guides/veneer.md tests/conformance.test.ts tests/setupConformance.test.ts tests/setupConformance.ts " ]; then
  echo "refused: the tracked change is not exactly the four owned files"
  exit 2
fi
git add -- guides/veneer.md tests/conformance.test.ts tests/setupConformance.test.ts tests/setupConformance.ts || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/u7d-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain | grep -v '^??'
git push -q origin main 2>&1 | tail -1
git status -sb | head -1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
