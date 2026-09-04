#!/bin/bash
set -eu
cd /home/user/scaffold
mkdir -p .orkestrel/campaign/wave
git mv .orkestrel/campaign/conform/wave-report.md .orkestrel/campaign/wave/report.md
git rm -r -q .orkestrel/campaign/conform .orkestrel/campaign/debrief .orkestrel/campaign/debrief.md .orkestrel/campaign/fix .orkestrel/campaign/merge .orkestrel/campaign/last .orkestrel/campaign/touched.md .orkestrel/campaign/HANDOFF.md
node -e '
const fs = require("fs"); const p = ".orkestrel/campaign/carry.md"; const s = fs.readFileSync(p, "utf8")
const i = s.indexOf("<!-- The fleet campaign register"); if (i < 0) throw new Error("marker missing")
const head = s.slice(0, i).replace(/\n---\s*$/, "\n")
fs.writeFileSync(p, head.trimEnd() + "\n")'
git add .orkestrel/campaign/carry.md
rm -rf tmp/cursor tmp/probe tmp/tarballs tmp/units tmp/work
rm -f /home/user/fleet/html/tmp/units/html-sanitizer-report.md /home/user/fleet/reason/tmp/units/reason-remove-report.md
rm -rf /home/user/fleet/test/tmp/capture
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F /home/user/work/wave/prune-msg.txt
git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta
echo "pruned: $(git rev-parse --short HEAD); dirty paths: $(git status --porcelain | wc -l | tr -d ' ')"
ls .orkestrel/campaign | tr '\n' ' '; echo
