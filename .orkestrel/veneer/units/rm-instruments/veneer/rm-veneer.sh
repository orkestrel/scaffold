#!/bin/bash
# RM-VENEER, the Orchestrator's tracked command (release-mode-design-verdict.md § Units). Packs scaffold at its main tip,
# which carries RM-SCAFFOLD (cab0596f, merged as d146df8f), cuts a throwaway Veneer worktree at origin/main, installs it
# from the lockfile, installs the packed tarball over the registry copy without saving, clears the Vite pre-bundle, runs
# the packed scaffold's `repair`, and then takes the ordinary and the release-mode distribution runs over a fresh build.
# The release-mode run must either prove the artifact or fail loudly; it must never skip. Nothing is committed or pushed,
# and the worktree is removed only on the owner's go-ahead. Log: rm-veneer.log.txt. Cap: 2400 s.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/rm-veneer.log.txt; : > $LOG
W=/home/user/veneer-rmv
PACK=/home/user/scaffold/tmp/pack
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
observe() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; echo "=== $name exit=$?" >> $LOG; }
cd /home/user/scaffold || exit 1
[ -z "$(git status --porcelain -- src tests vite.config.ts package.json host.json .agents .claude)" ] || { echo "=== scaffold tree dirty; refusing" >> $LOG; exit 2; }
echo "=== scaffold HEAD $(git rev-parse --short HEAD) npm $(npm --version) node $(node --version)" >> $LOG
rm -rf $PACK; mkdir -p $PACK
step "scaffold pack (prepack builds)" npm pack --pack-destination $PACK
TGZ=$(ls $PACK/*.tgz)
echo "=== tarball $(basename $TGZ) sha256 $(sha256sum $TGZ | cut -c1-16)" >> $LOG
tar -tzf $TGZ | grep -c . | sed 's/^/=== tarball entries: /' >> $LOG
cd /home/user/veneer || exit 1
git fetch -q origin main
[ -e $W ] && { echo "=== $W exists; refusing" >> $LOG; exit 2; }
step "worktree at origin/main" git worktree add --detach $W origin/main
cd $W || exit 1
echo "=== veneer HEAD $(git rev-parse --short HEAD); scaffold range $(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']")" >> $LOG
step "npm ci" npm ci --ignore-scripts --no-audit --no-fund
echo "=== registry copy installed: $(node -p "require('./node_modules/@orkestrel/scaffold/package.json').version")" >> $LOG
step "install the packed tarball without saving" npm install --no-save --ignore-scripts --no-audit --no-fund $TGZ
rm -rf node_modules/.vite
step "installed core bundle equals scaffold's build" cmp node_modules/@orkestrel/scaffold/dist/src/core/index.js /home/user/scaffold/dist/src/core/index.js
step "installed vendored orchestration file equals scaffold's" cmp node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md /home/user/scaffold/.agents/orchestration.md
echo "=== package.json and lockfile unchanged: [$(git status --porcelain -- package.json package-lock.json | tr '\n' ' ')]" >> $LOG
step "scaffold repair" ./node_modules/.bin/scaffold repair --offline
echo "=== status after repair: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
git diff --stat >> $LOG
git diff -- vite.config.ts > $S/rm-veneer-vite-config.diff
echo "=== vite.config.ts diff lines: $(wc -l < $S/rm-veneer-vite-config.diff)" >> $LOG
step "check" npm run check
step "test:config" npm run test:config
step "test:policy" npm run test:policy
step "build" npm run build
step "test:distribution (ordinary)" npm run test:distribution
observe "test:distribution --mode release" npm run test:distribution -- --mode release
echo "=== status at end: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== rm-veneer done" >> $LOG
