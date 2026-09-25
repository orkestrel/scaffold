#!/usr/bin/env bash
# Commits J-MOTION-PROOFS-B round 3 in its worktree and retains the round under units/ in the same action (2026-09-25):
# the status, the diff, the round's instruments, and its logs, with the j-motion-proofs-b-3- prefix. The report is
# retained already. Usage: bash commit-motion-proofs-b-3.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-motion-proofs-b
cd "$TREE" || exit 1
git status --short > "$UNITS/j-motion-proofs-b-3-status.txt"
git add -- guides/veneer.md src/browser/Carousel.ts src/browser/Toast.ts tests/src/browser/Tab.test.ts tests/src/browser/Toast.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff fd82ae9 HEAD > "$UNITS/j-motion-proofs-b-3.diff"
for f in r3-accept.sh r3-factor-plant.py r3-factor.sh r3-mutations.json r3-factor-base.log.txt r3-factor.log.txt r3-plant.log.txt; do cp "$T/$f" "$UNITS/j-motion-proofs-b-3-$f"; done
cp "$T/mutations/r3-tab-reduced-force.log.txt" "$UNITS/j-motion-proofs-b-3-r3-tab-reduced-force.log.txt"
ls "$UNITS" | grep -c "^j-motion-proofs-b-3-"
