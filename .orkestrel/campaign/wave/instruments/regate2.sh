#!/bin/bash
# Re-run a prepared package's gates alone on an idle container (writing-concurrency rule 10): format, prepublishOnly,
# stage everything for the release commit. No install, no commit. Usage: regate2.sh <pkg>; log regate2-<pkg>.log.
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}; W=/home/user/work/wave; LOG=$W/regate2-$P.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $P $*" >> "$LOG"; }
cd "/home/user/fleet/$P" || exit 2
npm run format > "$W/regate2-$P-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/regate2-$P-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:' "$W/regate2-$P-prepublish.log" | head -12 >> "$LOG"; say "REGATE2-$P-RED"; exit 1; }
git add -A . > /dev/null 2>&1
say "REGATE2-$P-GREEN"
