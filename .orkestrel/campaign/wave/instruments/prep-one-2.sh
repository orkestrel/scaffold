#!/bin/bash
# Successor of prep-one.sh: commits the re-pin and bump before `scaffold overwrite`, which refuses a tree carrying
# uncommitted changes. Steps: re-pin + bump (repin.mjs) → npm install (lockfile regenerated, registry copies
# restored) → preparation commit → scaffold overwrite → scaffold audit exit 0 → re-pin again if the overwrite
# re-declared a range (install again if it moved) → self-pin sweep report → format → prepublishOnly → dist against
# the published tarball → stage everything for the release commit the Orchestrator writes.
# A tree whose only dirty paths are package.json and package-lock.json (a visit stopped after its install) is
# accepted. Usage: prep-one-2.sh <pkg>; log /home/user/work/wave/prep-<pkg>.log; ends PREP-<pkg>-GATES-GREEN or
# PREP-<pkg>-RED <step>.
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}
W=/home/user/work/wave; LOG=$W/prep-$P.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $P $*" >> "$LOG"; }
red() { say "PREP-$P-RED $1"; exit 1; }
cd "/home/user/fleet/$P" || red "no checkout"
dirty=$(git status --porcelain | grep -v -E ' (package\.json|package-lock\.json)$' | wc -l | tr -d ' ')
[ "$dirty" = 0 ] || red "tree dirty before the visit: $(git status --porcelain | tr '\n' ' ')"
NAME=$(node -p "require('./package.json').name")
REG=$(npm view "$NAME" version 2>/dev/null || echo none)
PRIOR=$(git show HEAD:package.json | node -p "JSON.parse(require('fs').readFileSync(0,'utf8')).version")
say "committed manifest $PRIOR; registry $REG"
node "$W/repin.mjs" "/home/user/fleet/$P" >> "$LOG" 2>&1 || red "repin"
NEXT=$(node -p "require('./package.json').version"); say "next version $NEXT"
npm install --no-audit --no-fund > "$W/prep-$P-install.log" 2>&1 || red "npm install (see prep-$P-install.log)"
say "npm install exit=0 (lockfile regenerated)"
if ! git diff --quiet -- package.json package-lock.json; then
  printf 'Prepare %s %s: re-pin and bump from the registry\n\nEvery `@orkestrel/*` range names the caret of the version the registry serves as of the visit, `@orkestrel/scaffold` at `^%s`, and the version moves to the registry'"'"'s next patch; the lockfile is regenerated with the registry copies restored over the staged tips.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB\n' "$NAME" "$NEXT" "$(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']" | sed 's/\^//')" > "$W/prep-$P-commit1.txt"
  git add package.json package-lock.json && git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$W/prep-$P-commit1.txt" || red "preparation commit"
  say "preparation commit $(git rev-parse --short HEAD)"
fi
npx scaffold overwrite > "$W/prep-$P-overwrite.log" 2>&1; rc=$?; say "scaffold overwrite exit=$rc"
[ $rc -eq 0 ] || { tail -n 6 "$W/prep-$P-overwrite.log" >> "$LOG"; red "scaffold overwrite"; }
npx scaffold audit > "$W/prep-$P-audit.log" 2>&1; rc=$?; say "scaffold audit exit=$rc: $(tail -n 1 "$W/prep-$P-audit.log" | cut -c1-160)"
[ $rc -eq 0 ] || { grep -E 'stale|missing|foreign|drift' "$W/prep-$P-audit.log" | head -8 >> "$LOG"; red "scaffold audit"; }
before=$(md5sum package.json | cut -c1-32); node "$W/repin.mjs" "/home/user/fleet/$P" --no-bump >> "$LOG" 2>&1
if [ "$before" != "$(md5sum package.json | cut -c1-32)" ]; then npm install --no-audit --no-fund > "$W/prep-$P-install2.log" 2>&1 || red "npm install after overwrite"; say "ranges re-pinned after overwrite; lockfile regenerated"; fi
say "overwrite changed: $(git status --porcelain | tr '\n' ' ' | cut -c1-300)"
say "self-pin sweep for $PRIOR in src/ and tests/:"; grep -rn "$(echo "$PRIOR" | sed 's/\./\\./g')" src tests 2>/dev/null >> "$LOG" || say "  no hit"
npm run format > "$W/prep-$P-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/prep-$P-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:|ERR!' "$W/prep-$P-prepublish.log" | head -12 >> "$LOG"; red "prepublishOnly"; }
say "dist against published $PRIOR: $(node /home/user/work/distdiff.mjs "/home/user/fleet/$P" | cut -c1-240)"
git add -A . > /dev/null 2>&1
git status --porcelain >> "$LOG"
say "PREP-$P-GATES-GREEN"
