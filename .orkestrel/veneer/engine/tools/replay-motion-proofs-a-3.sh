#!/usr/bin/env bash
# The Orchestrator's check of J-MOTION-PROOFS-A round 3 (5b98071 and the integration 180d513 on unit/motion-proofs-a,
# over beb7cd8), 2026-09-25. Successor of replay-motion-proofs-a-2.sh: it runs every row of the round-3 instrument
# (mutate-3.py over mutations-3.json, which carries the round-1 and round-2 rows with the new ones), then the plant
# (plant.sh with plant.py) against the tip, and lists each row whose log names no AssertionError.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a
LOG="$U/j-motion-proofs-a-replay-3.log.txt"
cp "$TREE/tmp/j-motion-proofs-a/mutate-3.py" "$U/j-motion-proofs-a-mutate-3.py"
cp "$TREE/tmp/j-motion-proofs-a/mutations-3.json" "$U/j-motion-proofs-a-mutations-3.json"
cp "$TREE/tmp/j-motion-proofs-a/plant.py" "$U/j-motion-proofs-a-plant.py"
cp "$TREE/tmp/j-motion-proofs-a/plant.sh" "$U/j-motion-proofs-a-plant.sh"
git -C "$TREE" diff beb7cd8 HEAD > "$U/j-motion-proofs-a-3.diff"
git -C "$TREE" diff --name-status beb7cd8 HEAD > "$U/j-motion-proofs-a-3-status.txt"
cd "$TREE" || exit 1
ROWS="modal-base modal-stale-dialog modal-show-dialog modal-hide-host modal-show-skip modal-hide-skip modal-backdrop-hide-skip offcanvas-show-backdrop offcanvas-show-panel offcanvas-hide-backdrop offcanvas-hide-panel backdrop-show-skip backdrop-hide-skip backdrop-literal-fade-show backdrop-literal-fade-hide alert-skip reader-seconds"
{
	echo "# The Orchestrator's replay of J-MOTION-PROOFS-A round 3 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	sha256sum src/browser/*.ts tests/setupBrowser.ts tests/src/browser/*.ts > "$S/replay-motion-proofs-a-3-before.sha256"
	for step in format:check lint:check check test:guides test:setup:browser; do npm run "$step" > /dev/null 2>&1; echo "$step exit=$?"; done
	echo "--- control: the four owned files, unmutated"
	NO_COLOR=1 npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts tests/src/browser/Alert.test.ts 2>&1 | grep -E "Test Files|Tests  |FAIL|Unhandled" | head -12
	echo "control exit=${PIPESTATUS[0]}"
	echo "--- rows (the instrument's stdout)"
	python tmp/j-motion-proofs-a/mutate-3.py tmp/j-motion-proofs-a/mutations-3.json $ROWS
	echo "--- rows whose log names no AssertionError"
	for row in $ROWS; do grep -q "AssertionError" "tmp/j-motion-proofs-a/mutations-3/$row.log.txt" || echo "$row"; done
	echo "--- unhandled errors in the row logs"
	grep -l -E "Unhandled Error|Unhandled Rejection" tmp/j-motion-proofs-a/mutations-3/*.log.txt || echo "none"
	echo "--- the plant"
	bash tmp/j-motion-proofs-a/plant.sh 2>&1 | tail -20
	echo "plant exit=$?"
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-motion-proofs-a-3-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte"
	echo "--- status after"
	git status --short
	git diff --stat -- src/styles
} > "$LOG" 2>&1
grep -E "exit=|Tests  |== |none$|restored|^[a-z-]+$|passed|failed" "$LOG" | cut -c1-200 | head -80
