#!/usr/bin/env bash
# The Orchestrator's run of J-MOTION-PROOFS-A round 4's plant (2026-09-25): round 4 changed only the instrument, so this
# retains plant.py, plant.sh, and the probe, then runs the plant against the tip 180d513 and the round-3 planter as the
# control, and checks the tree clean after. Successor of replay-motion-proofs-a-3.sh's plant step.
set -u
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a
LOG="$U/j-motion-proofs-a-plant-4.log.txt"
cp "$TREE/tmp/j-motion-proofs-a/plant.py" "$U/j-motion-proofs-a-plant-4.py"
cp "$TREE/tmp/j-motion-proofs-a/plant.sh" "$U/j-motion-proofs-a-plant-4.sh"
cp "$TREE/tmp/j-motion-proofs-a/plant-probe.test.ts.txt" "$U/j-motion-proofs-a-plant-probe-4.test.ts.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's plant run for J-MOTION-PROOFS-A round 4 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	echo "--- the plant (round 4's planter)"
	bash tmp/j-motion-proofs-a/plant.sh 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "planted|exit|Test Files|Tests  |AssertionError|scratch"
	echo "--- the control (round 3's planter)"
	bash tmp/j-motion-proofs-a/plant.sh tmp/j-motion-proofs-a/plant-round-3.py orchestrator-control 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "planted|exit|Test Files|Tests  |AssertionError|scratch"
	echo "--- status after"
	git status --short
	git diff --stat -- src/styles
} > "$LOG" 2>&1
cat "$LOG"
