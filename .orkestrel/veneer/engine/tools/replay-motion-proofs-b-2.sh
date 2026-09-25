#!/usr/bin/env bash
# The Orchestrator's replay of J-MOTION-PROOFS-B rounds 1 and 2 at fd82ae9 (2026-09-25). It runs:
# - whole-file runs of the four owned proofs, and npm run test:app;
# - round 1's Toast, Collapse, and Tab mutation rows, and every round-2 row, through the unit's mutate.py. Round 1's
#   Carousel rows are left out, because round 2 replaced the text they mutate and its rows supersede them;
# - the error class of every failing case in each mutation log;
# - the plant, through the unit's plant.sh;
# - a check that the tree is clean afterwards.
# Usage: bash replay-motion-proofs-b-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-motion-proofs-b-replay-2.log.txt
T=tmp/j-motion-proofs-b
cd "$TREE" || exit 1
{
	echo "# J-MOTION-PROOFS-B rounds 1 and 2 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Collapse Toast Tab Carousel; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay-$f.log.txt" 2>&1
		echo "$f whole-file exit=$?"; grep -E "Tests +[0-9]" "tmp/replay-$f.log.txt"
	done
	npm run test:app > tmp/replay-app.log.txt 2>&1; echo "test:app exit=$?"; grep -E "Tests +[0-9]" tmp/replay-app.log.txt
	R1="toast-base toast-fadein-skip toast-fadein-door toast-show-skip toast-hide-skip collapse-show-skip collapse-hide-skip tab-skip toast-fadein-yield toast-show-yield toast-hide-yield collapse-show-yield collapse-hide-yield tab-yield"
	R2="r2-carousel-base r2-carousel-incoming r2-carousel-outgoing r2-carousel-yield"
	python "$T/mutate.py" "$T/mutations.json" $R1; echo "round 1 rows exit=$?"
	python "$T/mutate.py" "$T/r2-mutations.json" $R2; echo "round 2 rows exit=$?"
	echo "--- error class of each failing case"
	for name in $R1 $R2; do
		f="$T/mutations/$name.log.txt"
		[ -f "$f" ] || { echo "$name: no log"; continue; }
		echo "$name: assertion=$(grep -c 'AssertionError' "$f") abort=$(grep -c 'AbortError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") $(sed 's/\x1b\[[0-9;]*m//g' "$f" | grep -oE 'Tests +[0-9]+ failed[^(]*\([0-9]+\)' | head -1)"
	done
	echo "--- the plant"
	bash "$T/plant.sh" "$T/plant.py" replay-2; echo "plant exit=$?"
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit|Tests  |assertion=|no log|restored|scratch|^ ?[MA?] |^#" | head -60
