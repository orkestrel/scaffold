#!/bin/bash
# t4-headstart.sh: prove the T4 diagnosis on Veneer before the release. Builds the test checkout, packs it, installs
# the tarball into /home/user/veneer with --no-save (the manifest and lockfile untouched; the range replaced is the
# one package.json pins, recorded in the log), runs the regeneration's journey:light-1280 project with CAPTURE=1 on
# the UTIL-PLACEMENT landing, then restores the registry copy with npm ci --ignore-scripts and rewrites the lockfile
# marker, so no later gate proves the tarball. The tarball stays under the scratchpad. Log: t4-headstart.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/t4-headstart.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
mkdir -p $S/t4 && cd /home/user/test || exit 1
echo "=== test checkout $(git rev-parse --short HEAD) dirty: $(git status --porcelain | wc -l); build ($(date -u +%H:%M:%S))" >> $LOG
npm run build >> $LOG 2>&1; echo "=== build exit=$?" >> $LOG
TARBALL=$(npm pack --pack-destination $S/t4 2>>$LOG | tail -1); echo "=== packed $TARBALL ($(date -u +%H:%M:%S))" >> $LOG
cd /home/user/veneer || exit 1
echo "=== range replaced: $(grep -o '"@orkestrel/test": "[^"]*"' package.json); veneer $(git rev-parse --short HEAD)" >> $LOG
npm install --no-save --ignore-scripts $S/t4/$TARBALL >> $LOG 2>&1; echo "=== tarball install exit=$? manifest: [$(git status --porcelain package.json package-lock.json)] installed: $(grep '"version"' node_modules/@orkestrel/test/package.json)" >> $LOG
grep -c 'clipsOverflow' node_modules/@orkestrel/test/dist/src/browser/index.js >> $LOG
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*" >> $LOG 2>&1; echo "=== capture light-1280 with the tarball exit=$? ($(date -u +%H:%M:%S)) load $(cut -d' ' -f1 /proc/loadavg)" >> $LOG
npm ci --ignore-scripts >> $LOG 2>&1; echo "=== npm ci (registry copy restored) exit=$? installed: $(grep '"version"' node_modules/@orkestrel/test/package.json) clipsOverflow: $(grep -c 'clipsOverflow' node_modules/@orkestrel/test/dist/src/browser/index.js)" >> $LOG
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
echo "=== headstart done ($(date -u +%H:%M:%S))" >> $LOG
