#!/bin/bash
# Closing round of the wave: re-pin a package's @orkestrel ranges to the registry with no bump (development ranges
# only should move by now), regenerate the lockfile, run the gates, prove dist unmoved against the released tarball,
# commit and push. A moved dist is reported as PREP-<pkg>-BUMP-OWED rather than committed as a development re-pin.
# Scaffold's generated-manifest fixtures move with its ranges (vitest --update on compilers.test.ts) before the gates.
# Successor repin-dev-2.sh: after the install, `scaffold catalog` refreshes the target's catalog table and guide mirrors
# from the registry and `scaffold audit` must exit 0, so every target leaves the wave with a current table.
# Usage: repin-dev-2.sh <pkg>; log /home/user/work/wave/devrepin-<pkg>.log; ends DEVREPIN-<pkg>-(DONE|NOCHANGE|RED <step>|BUMP-OWED)
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}; W=/home/user/work/wave; LOG=$W/devrepin-$P.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $P $*" >> "$LOG"; }
red() { say "DEVREPIN-$P-RED $1"; exit 1; }
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR" || red "no checkout"
[ -z "$(git status --porcelain)" ] || red "tree dirty: $(git status --porcelain | tr '\n' ' ')"
VER=$(node -p "require('./package.json').version")
node "$W/repin.mjs" "$DIR" --no-bump >> "$LOG" 2>&1 || red "repin"
if git diff --quiet -- package.json; then say "DEVREPIN-$P-NOCHANGE"; exit 0; fi
grep -qE '^dependencies |^peerDependencies |^optionalDependencies ' "$LOG" && say "NOTE: a runtime or peer range moved; this is a bump, not a development re-pin" && red "runtime range moved"
npm install --no-audit --no-fund > "$W/devrepin-$P-install.log" 2>&1 || red "npm install"
say "npm install exit=0 (lockfile regenerated)"
if [ "$P" != scaffold ]; then npx scaffold catalog > "$W/devrepin-$P-catalog.log" 2>&1; say "scaffold catalog exit=$? ($(git status --porcelain | grep -vE "package(-lock)?\.json" | tr "\n" " " | cut -c1-160))"; npx scaffold audit > "$W/devrepin-$P-audit.log" 2>&1 || red "scaffold audit"; fi
if [ "$P" = scaffold ]; then npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts --update > "$W/devrepin-scaffold-snapshots.log" 2>&1; say "snapshot tripwire moved: exit=$? ($(git diff --stat -- tests | tail -n 1 | sed 's/^ *//'))"; fi
npm run format > "$W/devrepin-$P-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/devrepin-$P-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:' "$W/devrepin-$P-prepublish.log" | head -8 >> "$LOG"; red "prepublishOnly"; }
DIST=$(node /home/user/work/distdiff2.mjs "$DIR" "$VER" | cut -c1-240); say "dist against released $VER: $DIST"
echo "$DIST" | grep -q '"moved":false' || { say "DEVREPIN-$P-BUMP-OWED"; exit 2; }
git add -A . > /dev/null 2>&1
printf 'Re-pin the development ranges to the released fleet\n\nA development re-pin after the wave: %s. The catalog table and the guide mirrors are refreshed from the registry (`scaffold catalog`, `scaffold audit` exit 0), the lockfile is regenerated, `prepublishOnly` exits 0, and the rebuilt `dist/` is unmoved against the released %s tarball, so no bump and no publish.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB\n' "$(grep -E '^devDependencies ' "$LOG" | sed 's/^devDependencies //' | paste -sd';' - | sed 's/;/; /g')" "$VER" > "$W/devrepin-$P-commit.txt"
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$W/devrepin-$P-commit.txt" || red "commit"
git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta || red "push"
say "DEVREPIN-$P-DONE $(git rev-parse --short HEAD)"
