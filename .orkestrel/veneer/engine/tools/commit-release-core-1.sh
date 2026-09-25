#!/usr/bin/env bash
# Commits J-RELEASE-CORE round 1 in its worktree and retains the round under units/ in the same action (2026-09-25): the
# status, the diff (new files included), the mutation instrument and its input, and the logs. The report is retained
# already. Usage: bash commit-release-core-1.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-release-core
cd "$TREE" || exit 1
git status --short > "$UNITS/j-release-core-status.txt"
git add -- guides/veneer.md src/browser/Button.ts src/browser/HostSnapshot.ts src/browser/helpers.ts src/browser/index.ts src/browser/types.ts src/browser/Lifetime.ts tests/src/browser/Button.test.ts tests/src/browser/HostSnapshot.test.ts tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts tests/src/browser/Lifetime.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git status --short
git diff 63eabbd HEAD > "$UNITS/j-release-core.diff"
cp "$T/mutate.mjs" "$UNITS/j-release-core-mutate.mjs"
cp "$T/mutations.json" "$UNITS/j-release-core-mutations.json"
for f in mutations.log.txt m1-policy-base.log.txt m1-policy-control.log.txt m2-m3-button-red.log.txt acc-policy.log.txt acc-guides-2.log.txt acc-setup-browser.log.txt; do cp "$T/$f" "$UNITS/j-release-core-$f"; done
ls "$UNITS" | grep -c "^j-release-core-"
