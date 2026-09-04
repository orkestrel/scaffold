#!/bin/bash
# Prepare one fleet package for its release in the current layer (wave.md § Visit a repository, § Prepare a layer):
#   1. re-pin every @orkestrel range to the registry (scaffold included) and bump from the registry (repin.mjs)
#   2. npm install: regenerates the lockfile and restores the registry copies over the staged tarballs
#   3. scaffold overwrite (repair + catalog + deletions + range re-declare), then scaffold audit must exit 0
#   4. self-pin sweep: report every hit of the prior version literal in src/ and tests/ (the script continues; a hit
#      that reddens a gate is ruled by the Orchestrator)
#   5. npm run format (mutating), then prepublishOnly to green
#   6. dist compared against the published tarball (distdiff.mjs; the published copy is fetched when absent)
#   7. commit and push
# Stops at the first red and names it. Usage: prep-one.sh <pkg>; log /home/user/work/wave/prep-<pkg>.log; ends
# PREP-<pkg>-DONE or PREP-<pkg>-RED <step>.
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}
W=/home/user/work/wave; LOG=$W/prep-$P.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $P $*" >> "$LOG"; }
red() { say "PREP-$P-RED $1"; exit 1; }
cd "/home/user/fleet/$P" || red "no checkout"
[ -z "$(git status --porcelain)" ] || red "tree dirty before the visit"
NAME=$(node -p "require('./package.json').name")
PRIOR=$(node -p "require('./package.json').version")
say "manifest $PRIOR; registry $(npm view "$NAME" version 2>/dev/null || echo none)"
node "$W/repin.mjs" "/home/user/fleet/$P" >> "$LOG" 2>&1 || red "repin"
NEXT=$(node -p "require('./package.json').version"); say "next version $NEXT"
npm install --no-audit --no-fund > "$W/prep-$P-install.log" 2>&1 || red "npm install (see prep-$P-install.log)"
say "npm install exit=0 (lockfile regenerated)"
npx scaffold overwrite > "$W/prep-$P-overwrite.log" 2>&1; rc=$?; say "scaffold overwrite exit=$rc"
[ $rc -eq 0 ] || { tail -n 5 "$W/prep-$P-overwrite.log" >> "$LOG"; red "scaffold overwrite"; }
npx scaffold audit > "$W/prep-$P-audit.log" 2>&1; rc=$?; say "scaffold audit exit=$rc: $(tail -n 1 "$W/prep-$P-audit.log" | cut -c1-160)"
[ $rc -eq 0 ] || red "scaffold audit"
# the overwrite may have re-declared ranges; re-pin again so every range is the registry's and install if it moved
before=$(md5sum package.json | cut -c1-32); node "$W/repin.mjs" "/home/user/fleet/$P" --no-bump >> "$LOG" 2>&1
if [ "$before" != "$(md5sum package.json | cut -c1-32)" ]; then npm install --no-audit --no-fund > "$W/prep-$P-install2.log" 2>&1 || red "npm install after overwrite"; say "ranges re-pinned after overwrite; lockfile regenerated"; fi
say "self-pin sweep for $PRIOR in src/ and tests/:"; grep -rn "$(echo "$PRIOR" | sed 's/\./\\./g')" src tests 2>/dev/null >> "$LOG" || say "  no hit"
npm run format > "$W/prep-$P-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/prep-$P-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:|ERR!' "$W/prep-$P-prepublish.log" | head -12 >> "$LOG"; red "prepublishOnly"; }
say "dist against published $PRIOR: $(node /home/user/work/distdiff.mjs "/home/user/fleet/$P" | cut -c1-240)"
git add -A -- package.json package-lock.json . >> /dev/null 2>&1
git status --porcelain >> "$LOG"
say "PREP-$P-GATES-GREEN"
