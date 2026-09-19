#!/usr/bin/env bash
# Produce the review evidence the S audit claims file names, from the committed tip, and retain
# the round's brief set under .orkestrel/campaign/ as it is dispatched.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
tip="$(git rev-parse --short=8 HEAD)"
echo "tip: $tip"
git diff 4c4edd93 HEAD > tmp/audit/s-audit-diff.patch
git diff a0440d3c HEAD -- .agents/skills/orkestrel-prove-journey .agents/transports/codex.md ROADMAP.md > tmp/audit/s3-diff.patch
git status --short > tmp/audit/s-audit-status.txt
wc -l tmp/audit/s-audit-diff.patch tmp/audit/s3-diff.patch tmp/audit/s-audit-status.txt
sed -i "s/S3_2_CHECKPOINT/\`$tip\`/g" tmp/audit/s-audit-claims.md
grep -c "S3_2_CHECKPOINT" tmp/audit/s-audit-claims.md
cp tmp/audit/s-audit-claims.md .orkestrel/campaign/s-audit-claims.md
cp tmp/audit/s-audit-objective-brief.md .orkestrel/campaign/s-audit-objective-brief.md
cp tmp/codex/s-audit-subjective-brief.md .orkestrel/campaign/s-audit-subjective-brief.md
cp tmp/codex/s-audit-run.sh .orkestrel/campaign/s-audit-run.sh
cp tmp/audit/s-audit-diff.patch .orkestrel/campaign/s-audit-diff.patch
cp tmp/audit/s3-diff.patch .orkestrel/campaign/s3-diff.patch
sed -i 's#tmp/audit/s-audit-#.orkestrel/campaign/s-audit-#g; s#tmp/audit/s3-diff.patch#.orkestrel/campaign/s3-diff.patch#g; s#tmp/codex/s-audit-#.orkestrel/campaign/s-audit-#g; s#tmp/verify/s3-gates-summary.txt#.orkestrel/campaign/s3-gates-summary.txt#g; s#tmp/verify/s3b-summary.txt#.orkestrel/campaign/s3b-gates-summary.txt#g; s#tmp/probe/inject-probe/#.orkestrel/campaign/s-audit-inject-probe/#g' .orkestrel/campaign/s-audit-claims.md .orkestrel/campaign/s-audit-objective-brief.md .orkestrel/campaign/s-audit-subjective-brief.md
echo "remaining tmp/ mentions in retained copies:"
grep -n "tmp/" .orkestrel/campaign/s-audit-claims.md .orkestrel/campaign/s-audit-objective-brief.md .orkestrel/campaign/s-audit-subjective-brief.md
echo "(end)"
