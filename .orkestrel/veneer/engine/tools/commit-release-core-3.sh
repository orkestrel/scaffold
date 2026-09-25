#!/usr/bin/env bash
# Commits J-RELEASE-CORE round 3 in its worktree and retains the round under units/ in the same action (2026-09-25): the
# status, the diff, the successor mutation instrument, its input builder, the acceptance script, and the logs, with the
# j-release-core-3- prefix. The report is retained already. Usage: bash commit-release-core-3.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-release-core
cd "$TREE" || exit 1
git status --short > "$UNITS/j-release-core-3-status.txt"
git add -- guides/veneer.md src/browser/Lifetime.ts tests/src/browser/Button.test.ts tests/src/browser/Lifetime.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff 03526bc HEAD > "$UNITS/j-release-core-3.diff"
for f in mutate-3.mjs build-mutations-3.mjs mutations-3.json accept-3.sh mutations-3.log.txt; do cp "$T/$f" "$UNITS/j-release-core-3-$f"; done
ls "$UNITS" | grep -c "^j-release-core-3-"
