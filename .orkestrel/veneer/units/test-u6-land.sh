#!/usr/bin/env bash
# Land U6 in the Test checkout and vendor the packed tarball into Veneer ahead of Test's release.
# The Orchestrator's own tracked command (commit, pack, install are barred to roles).
# Steps: confirm the six owned files are the whole diff; commit them by pathspec; push; build and
# pack; install the tarball into Veneer --no-save, recording the range replaced and the tarball
# digest; confirm the new declarations resolve from Veneer's node_modules. Test's publication and
# the registry re-pin stay separate. The Veneer consumer probe runs after U3's writer exits.
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
TESTREPO="C:/Users/mikes/WebstormProjects/test"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/test-u6-land.log.txt"
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land start"
cd "$TESTREPO" || exit 9
git status --porcelain | grep -v '^??'
git add guides/test.md src/browser/constants.ts src/browser/helpers.ts src/browser/types.ts tests/setup.ts tests/src/browser/helpers.test.ts || exit 2
git -c core.hooksPath=/dev/null commit -q -F "$SCAFFOLD/tmp/units/test-u6-land-message.txt" || exit 3
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
cd "$VENEER" || exit 9
echo "replaced range: $(node -e "const p=require('./package.json');console.log((p.devDependencies||{})['@orkestrel/test']||(p.dependencies||{})['@orkestrel/test'])") installed: $(node -e "console.log(require('./node_modules/@orkestrel/test/package.json').version)")"
npm install --no-save "$TGZ" 2>&1 | tail -2
node -e "console.log('installed now:', require('./node_modules/@orkestrel/test/package.json').version)"
git status --porcelain -- package.json package-lock.json
grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol\|MEDIA_STAGE\|POINTER_HOLD" node_modules/@orkestrel/test/dist/src/browser/index.d.ts
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) land end"
