#!/usr/bin/env bash
# Commits J-MOTION-PROOFS-B round 1 in its worktree and retains the round in the same action (2026-09-25): the diff, the
# status, the instruments, the patches, and the logs, copied under units/ with the j-motion-proofs-b- prefix. The report
# is retained already (units/j-motion-proofs-b-report.md). Usage: bash commit-motion-proofs-b-1.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-motion-proofs-b
cd "$TREE" || exit 1
git status --short > "$UNITS/j-motion-proofs-b-status.txt"
git add -- src/browser/Toast.ts tests/src/browser/Carousel.test.ts tests/src/browser/Collapse.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Toast.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff 1290162 HEAD > "$UNITS/j-motion-proofs-b.diff"
for f in mutate.py mutations.json plant.py plant.sh probe.sh run.sh verify-patches.sh; do cp "$T/$f" "$UNITS/j-motion-proofs-b-$f"; done
cp "$T/plant-probe.test.ts.txt" "$UNITS/j-motion-proofs-b-plant-probe.test.ts.txt"
cp "$T/carousel-order-probe.test.ts.txt" "$UNITS/j-motion-proofs-b-carousel-order-probe.test.ts.txt"
for f in EngineSection.test.ts.patch types.ts.patch veneer.md.patch; do cp "$T/$f" "$UNITS/j-motion-proofs-b-$f"; done
for f in mutations-all.log.txt mutations-toast.log.txt mutations-yield.log.txt plant-final.log.txt plant-control-base.log.txt verify-patches.log.txt test-app.log.txt; do cp "$T/$f" "$UNITS/j-motion-proofs-b-$f"; done
ls "$UNITS" | grep -c "^j-motion-proofs-b-"
