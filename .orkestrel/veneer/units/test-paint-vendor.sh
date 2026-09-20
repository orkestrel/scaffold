#!/usr/bin/env bash
# Vendor the packed Test tarball (built by test-paint-land.sh) into Veneer --no-save.
# The Orchestrator's own tracked command; runs only while no writer is live in Veneer (between
# U7d's exit and U7a's launch). Records the range replaced and the tarball digest, then confirms
# the conversion and journey declarations resolve from Veneer's node_modules. Veneer's manifest
# and lockfile must stay untouched (the tarball is a head start, never a pin).
set -u
SCAFFOLD="C:/Users/mikes/WebstormProjects/scaffold"
TESTREPO="C:/Users/mikes/WebstormProjects/test"
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="$SCAFFOLD/tmp/units/test-paint-vendor.log.txt"
exec > >(tee -a "$LOG") 2>&1
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) vendor start"
TGZ=$(ls "$TESTREPO/tmp/pack/"orkestrel-test-*.tgz | head -1)
echo "tarball: $TGZ"
sha256sum "$TGZ"
cd "$VENEER" || exit 9
git log --oneline -1
git status --porcelain | grep -v '^?? tmp'
echo "replaced range: $(node -e "const p=require('./package.json');console.log((p.devDependencies||{})['@orkestrel/test']||(p.dependencies||{})['@orkestrel/test'])") installed: $(node -e "console.log(require('./node_modules/@orkestrel/test/package.json').version)")"
npm install --no-save "$TGZ" 2>&1 | tail -2
node -e "console.log('installed now:', require('./node_modules/@orkestrel/test/package.json').version)"
git status --porcelain -- package.json package-lock.json
echo "conversion declarations: $(grep -c "convertOKLab\|convertLab\|convertXYZD50\|convertRec2020\|convertDisplayP3" node_modules/@orkestrel/test/dist/src/browser/index.d.ts)"
echo "journey declarations: $(grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol\|MEDIA_STAGE\|POINTER_HOLD" node_modules/@orkestrel/test/dist/src/browser/index.d.ts)"
echo "markdown still installed: $(node -e "console.log(require('./node_modules/@orkestrel/markdown/package.json').version)")"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) vendor end"
