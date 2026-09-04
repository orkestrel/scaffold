#!/bin/bash
# Re-run scaffold's gates after merging origin/main into the release branch: format, prepublishOnly, dist against 0.0.63, stage.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; LOG=$W/regate-scaffold-2.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) scaffold $*" >> "$LOG"; }
cd /home/user/scaffold || exit 2
npm run format > "$W/regate-scaffold-2-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/regate-scaffold-2-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:' "$W/regate-scaffold-2-prepublish.log" | head -12 >> "$LOG"; say "REGATE-scaffold-RED"; exit 1; }
say "dist against published 0.0.63: $(node /home/user/work/distdiff2.mjs /home/user/scaffold 0.0.63 | cut -c1-240)"
git add -A . > /dev/null 2>&1; git status --porcelain >> "$LOG"
say "REGATE-scaffold-GREEN"
