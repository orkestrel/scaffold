#!/bin/bash
# Prepare @orkestrel/scaffold for its own-account release: bump from the registry, re-pin every @orkestrel range to
# the registry, regenerate the lockfile (which also restores the registry copies over the staged tarballs), report
# the self-pin sweep, converge the formatter, run prepublishOnly to green, compare dist against the published
# tarball, commit, push. Stops at the first red. Log: /home/user/work/wave/prep-scaffold.log; ends PREP-scaffold-DONE.
set -u
W=/home/user/work/wave; LOG=$W/prep-scaffold.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $*" >> "$LOG"; }
cd /home/user/scaffold || exit 2
[ -z "$(git status --porcelain)" ] || { say "REFUSE: tree dirty"; exit 1; }
PRIOR=$(node -p "require('./package.json').version")
say "prior manifest version $PRIOR; registry $(npm view @orkestrel/scaffold version)"
node "$W/repin.mjs" /home/user/scaffold >> "$LOG" 2>&1 || { say "repin FAILED"; exit 1; }
NEXT=$(node -p "require('./package.json').version"); say "next version $NEXT"
npm install --no-audit --no-fund > "$W/prep-scaffold-install.log" 2>&1; say "npm install exit=$? (lockfile regenerated, registry copies restored)"
say "self-pin sweep for $PRIOR in src/ and tests/:"; grep -rn "$(echo "$PRIOR" | sed 's/\./\\./g')" src tests --include='*.ts' >> "$LOG" 2>&1 || say "  no hit"
npm run format > "$W/prep-scaffold-format.log" 2>&1; say "format exit=$?; changed after format: $(git status --porcelain | grep -v 'package.json\|package-lock.json' | wc -l | tr -d ' ') other paths"
npm run prepublishOnly > "$W/prep-scaffold-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { say "RED: see prep-scaffold-prepublish.log"; grep -E 'FAIL|Error|error TS|✗|×' "$W/prep-scaffold-prepublish.log" | head -20 >> "$LOG"; exit 1; }
say "dist against published: $(node /home/user/work/distdiff.mjs /home/user/scaffold | cut -c1-300)"
git status --porcelain >> "$LOG"
say "PREP-scaffold-GATES-GREEN"
