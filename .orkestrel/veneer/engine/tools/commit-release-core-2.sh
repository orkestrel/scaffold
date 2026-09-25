#!/usr/bin/env bash
# Commits J-RELEASE-CORE round 2 in its worktree and retains the round under units/ in the same action (2026-09-25): the
# status, the diff, the successor mutation instrument and its input, the acceptance script, and the logs, with the
# j-release-core-2- prefix. The report is retained already. Usage: bash commit-release-core-2.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-release-core
cd "$TREE" || exit 1
git status --short > "$UNITS/j-release-core-2-status.txt"
git add -- guides/veneer.md src/browser/Button.ts src/browser/HostSnapshot.ts src/browser/Lifetime.ts src/browser/types.ts tests/src/browser/Button.test.ts tests/src/browser/HostSnapshot.test.ts tests/src/browser/Lifetime.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff d702bb8 HEAD > "$UNITS/j-release-core-2.diff"
for f in mutate-2.mjs mutations-2.json accept-2.sh run-2.sh; do cp "$T/$f" "$UNITS/j-release-core-2-$f"; done
for f in mutations-2.log.txt Lifetime-2.log.txt Button-2.log.txt acc2-policy.log.txt acc2-guides-final.log.txt acc2-setup-browser.log.txt; do cp "$T/$f" "$UNITS/j-release-core-2-$f"; done
ls "$UNITS" | grep -c "^j-release-core-2-"
