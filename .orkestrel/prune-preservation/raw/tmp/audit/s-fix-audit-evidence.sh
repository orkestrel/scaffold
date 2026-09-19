#!/usr/bin/env bash
# Produce the review evidence the fix-round claims file names, fill its placeholders from the
# committed tip and the mutation closure, and retain the round's brief set as it is dispatched.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
tip="$(git rev-parse --short=8 HEAD)"
echo "tip: $tip"
git diff 0d03ec79 HEAD > tmp/audit/s-fix-audit-diff.patch
git status --short > tmp/audit/s-fix-audit-status.txt
wc -l tmp/audit/s-fix-audit-diff.patch tmp/audit/s-fix-audit-status.txt
reading="$(grep -E "^(A|B|base)_(core|bin|config)_EXIT=" tmp/audit/s-fix-c7-mutations-summary.txt | tr '\n' ' ')"
echo "mutation reading: $reading"
sed -i "s/S5_CHECKPOINT/\`$tip\`/g; s/(S5_MUTATION_READING)/($reading)/" tmp/audit/s-fix-audit-claims.md
echo "placeholders left: $(grep -c 'S5_CHECKPOINT\|S5_MUTATION_READING' tmp/audit/s-fix-audit-claims.md)"
cp tmp/audit/s-fix-audit-claims.md .orkestrel/campaign/s-fix-audit-claims.md
cp tmp/audit/s-fix-audit-objective-brief.md .orkestrel/campaign/s-fix-audit-objective-brief.md
cp tmp/codex/s-fix-audit-subjective-brief.md .orkestrel/campaign/s-fix-audit-subjective-brief.md
cp tmp/codex/s-fix-audit-run.sh .orkestrel/campaign/s-fix-audit-run.sh
cp tmp/audit/s-fix-audit-diff.patch .orkestrel/campaign/s-fix-audit-diff.patch
sed -i 's#tmp/audit/s-fix-audit-#.orkestrel/campaign/s-fix-audit-#g; s#tmp/codex/s-fix-audit-#.orkestrel/campaign/s-fix-audit-#g; s#tmp/audit/s-fix-c7-mutations-summary.txt#.orkestrel/campaign/s-fix-c7-mutations-summary.txt#g; s#tmp/verify/s4-gates-summary.txt#.orkestrel/campaign/s4-gates-summary.txt#g; s#tmp/verify/s5-gates-summary.txt#.orkestrel/campaign/s5-gates-summary.txt#g' .orkestrel/campaign/s-fix-audit-claims.md .orkestrel/campaign/s-fix-audit-objective-brief.md .orkestrel/campaign/s-fix-audit-subjective-brief.md .orkestrel/campaign/s-fix-audit-run.sh
echo "remaining tmp/ mentions in retained copies:"
grep -n "tmp/" .orkestrel/campaign/s-fix-audit-claims.md .orkestrel/campaign/s-fix-audit-objective-brief.md .orkestrel/campaign/s-fix-audit-subjective-brief.md
echo "(end)"
