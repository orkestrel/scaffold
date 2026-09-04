#!/bin/bash
# Scaffold 0.0.63: the closing round's development re-pin moved dist/src (the compiler embeds the ranges it writes into
# generated workspaces), so the re-pin is a release. Bump from the registry on the dirty re-pinned tree, move the
# generated-manifest fixtures, format, prepublishOnly, dist comparison against 0.0.62, stage. Log prep-scaffold-6.log.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; LOG=$W/prep-scaffold-6.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) scaffold $*" >> "$LOG"; }
cd /home/user/scaffold || exit 2
say "dirty before: $(git status --porcelain | tr '\n' ' ')"
node "$W/repin.mjs" /home/user/scaffold >> "$LOG" 2>&1 || { say "PREP-scaffold-RED repin"; exit 1; }
say "version $(node -p "require('./package.json').version")"
npm install --no-audit --no-fund > "$W/prep-scaffold-6-install.log" 2>&1 || { say "PREP-scaffold-RED npm install"; exit 1; }
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts --update > "$W/prep-scaffold-6-snapshots.log" 2>&1; say "snapshot tripwire moved: exit=$? ($(git diff --stat -- tests | tail -n 1 | sed 's/^ *//'))"
npm run format > "$W/prep-scaffold-6-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/prep-scaffold-6-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:' "$W/prep-scaffold-6-prepublish.log" | head -12 >> "$LOG"; say "PREP-scaffold-RED prepublishOnly"; exit 1; }
say "dist against released 0.0.62: $(node /home/user/work/distdiff2.mjs /home/user/scaffold 0.0.62 | cut -c1-240)"
git add -A . > /dev/null 2>&1; git status --porcelain >> "$LOG"
say "PREP-scaffold-GATES-GREEN"
