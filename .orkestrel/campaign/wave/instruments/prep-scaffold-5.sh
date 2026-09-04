#!/bin/bash
# Scaffold's L3 release: bump from the registry, re-pin every @orkestrel range to the registry (its runtime ranges moved in
# L0 to L2), regenerate the lockfile, move the generated-manifest snapshot tripwire with the bump, format, prepublishOnly,
# dist comparison, stage. Log: /home/user/work/wave/prep-scaffold-5.log; ends PREP-scaffold-GATES-GREEN or -RED.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; LOG=$W/prep-scaffold-5.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) scaffold $*" >> "$LOG"; }
cd /home/user/scaffold || exit 2
[ -z "$(git status --porcelain)" ] || { say "REFUSE: tree dirty"; exit 1; }
PRIOR=$(node -p "require('./package.json').version"); say "manifest $PRIOR; registry $(npm view @orkestrel/scaffold version)"
node "$W/repin.mjs" /home/user/scaffold >> "$LOG" 2>&1 || { say "PREP-scaffold-RED repin"; exit 1; }
NEXT=$(node -p "require('./package.json').version"); say "next version $NEXT"
npm install --no-audit --no-fund > "$W/prep-scaffold-5-install.log" 2>&1 || { say "PREP-scaffold-RED npm install"; exit 1; }
say "npm install exit=0 (lockfile regenerated)"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts --update > "$W/prep-scaffold-5-snapshots.log" 2>&1; say "snapshot tripwire moved: exit=$?; fixture diff lines: $(git diff -- tests | grep -E '^[-+]\s' | grep -v '^[-+][-+]' | sed 's/^[[:space:]]*//' | sort | uniq -c | tr '\n' ';' | cut -c1-300)"
say "self-pin sweep for $PRIOR in src/ and tests/:"; grep -rn "$(echo "$PRIOR" | sed 's/\./\\./g')" src tests >> "$LOG" 2>&1 || say "  no hit"
npm run format > "$W/prep-scaffold-5-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/prep-scaffold-5-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:' "$W/prep-scaffold-5-prepublish.log" | head -12 >> "$LOG"; say "PREP-scaffold-RED prepublishOnly"; exit 1; }
say "dist against published $PRIOR: $(node /home/user/work/distdiff2.mjs /home/user/scaffold "$PRIOR" | cut -c1-240)"
git add -A . > /dev/null 2>&1; git status --porcelain >> "$LOG"
say "PREP-scaffold-GATES-GREEN"
