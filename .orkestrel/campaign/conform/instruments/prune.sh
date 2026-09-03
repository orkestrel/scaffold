#!/usr/bin/env bash
# Retire the campaign folders and sweep tmp/ as a tree, then commit with the promotion record.
set -eu
cd /home/user/scaffold
S=/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad
D=.orkestrel/campaign/debrief
# Retain this round's bench briefs, run scripts, and the instruction-audit brief beside the lanes.
mkdir -p "$D/instruments"
cp tmp/cursor/carry-register-brief.md tmp/cursor/retrospective-brief.md tmp/cursor/run-carry-register.sh tmp/cursor/run-retrospective.sh tmp/cursor/probe.sh tmp/cursor/probe-json.sh "$D/instruments/"
cp tmp/units/instraudit-brief.md "$D/"
# Sweep tmp/ as a tree (named in the commit message).
rm -rf tmp/units/breaking tmp/units/fix tmp/units/fixup tmp/units/verify tmp/units/verify2 tmp/units/voice
rm -f tmp/units/*.md
find tmp/cursor -maxdepth 1 -type f ! -name 'probe.sh' ! -name 'probe-json.sh' -delete
rm -rf /home/user/fleet/middleware/tmp/referrals /home/user/fleet/test/tmp/capture
# Prune the campaign folders.
git rm -r -q --cached .orkestrel/campaign .orkestrel/scaffold .orkestrel/contract
git add .orkestrel/campaign/last .orkestrel/campaign/carry.md .orkestrel/campaign/debrief.md .orkestrel/campaign/debrief
git ls-files .orkestrel > "$S/kept.txt"
# Remove the pruned files from the working tree (everything under .orkestrel not kept).
for f in $(git ls-files --others --exclude-standard .orkestrel); do rm -f "$f"; done
find .orkestrel -type d -empty -delete
git add ROADMAP.md
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$S/prune-msg.txt"
git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta
echo "kept:"; cat "$S/kept.txt" | sed 's#^#  #' | head -80
echo "tree:"; find .orkestrel -type f | wc -l; du -sh .orkestrel
git status --short | wc -l
git log --oneline -1
echo PRUNE-DONE
