#!/usr/bin/env bash
# The Orchestrator's replay of J-MOTION-PROOFS-B round 3 at dfd9204 (2026-09-25). It runs the unit's committed
# instruments:
# - whole-file runs of the four motion proofs;
# - the reduced-motion mutation r3-tab-reduced-force through mutate.py, with its error class;
# - the factor plant r3-factor.sh, on the tip and with the fd82ae9 proofs as the control;
# - the motion plant plant.sh;
# - the tree afterwards.
# Usage: bash replay-motion-proofs-b-3.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-motion-proofs-b-replay-3.log.txt
T=tmp/j-motion-proofs-b
cd "$TREE" || exit 1
{
	echo "# J-MOTION-PROOFS-B round 3 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Collapse Toast Tab Carousel; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay3-$f.log.txt" 2>&1
		echo "$f whole-file exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay3-$f.log.txt")"
	done
	python "$T/mutate.py" "$T/r3-mutations.json" r3-tab-reduced-force; echo "mutation exit=$?"
	f="$T/mutations/r3-tab-reduced-force.log.txt"
	echo "r3-tab-reduced-force: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error|AbortError):' "$f") $(sed 's/\x1b\[[0-9;]*m//g' "$f" | grep -oE 'Tests +[0-9]+ failed[^(]*\([0-9]+\)' | head -1)"
	bash "$T/r3-factor.sh" replay3-factor; echo "factor plant exit=$?"
	bash "$T/r3-factor.sh" replay3-factor-base fd82ae9; echo "factor plant control exit=$?"
	bash "$T/plant.sh" "$T/plant.py" replay3-plant; echo "motion plant exit=$?"
	echo "--- the tree after the replay"
	git status --short
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit|Tests  |assertion=|restored|scratch|expected .* to be close|^ ?[MA?] |^#" | head -50
