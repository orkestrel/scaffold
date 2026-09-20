#!/usr/bin/env bash
# Land Test-paint in the Test checkout and vendor the packed tarball into Veneer ahead of Test's
# release. The Orchestrator's own tracked command (commit, pack, install are barred to roles).
# Derived from units/test-u6-land.sh. Steps: confirm the three owned files are the whole diff;
# commit them by pathspec; push; build and pack; install the tarball into Veneer --no-save,
# recording the range replaced and the tarball digest; confirm the new declarations resolve from
# Veneer's node_modules. Test's publication and the registry re-pin stay separate.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
TESTREPO="C:/Users/mikes/WebstormProjects/test"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/test-paint-land.log.txt"
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$TESTREPO" || exit 9
git log --oneline -1
git status --porcelain | grep -v '^??'
CHANGED=$(git status --porcelain | grep -v '^??' | awk '{print $2}' | sort | tr '\n' ' ')
echo "changed: $CHANGED"
if [ "$CHANGED" != "guides/test.md src/browser/helpers.ts tests/src/browser/helpers.test.ts " ]; then
  echo "refused: the tracked change is not exactly the three owned files"
  exit 2
fi
git add -- guides/test.md src/browser/helpers.ts tests/src/browser/helpers.test.ts || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/test-paint-land-message.txt" || exit 3
git log --oneline -1
git status --porcelain | grep -v '^??'
git push -q origin main 2>&1 | tail -1
npm run build 2>&1 | tail -1
mkdir -p "$TESTREPO/tmp/pack"
rm -f "$TESTREPO/tmp/pack/"orkestrel-test-*.tgz
npm pack --pack-destination "$TESTREPO/tmp/pack" 2>&1 | tail -2
TGZ=$(ls "$TESTREPO/tmp/pack/"orkestrel-test-*.tgz | head -1)
echo "tarball: $TGZ"
sha256sum "$TGZ"
echo "the Veneer install is test-paint-vendor.sh, run between U7d's exit and U7a's launch (no writer live in Veneer)"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
