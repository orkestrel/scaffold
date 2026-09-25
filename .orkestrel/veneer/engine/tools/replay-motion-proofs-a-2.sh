#!/usr/bin/env bash
# The Orchestrator's check of J-MOTION-PROOFS-A rounds 1 and 2 (88036ca, the integration 8e3e222, and beb7cd8 on
# unit/motion-proofs-a over Veneer main 0865c67), 2026-09-25. Retains the unit's instrument, runs the gates and the owned
# files, then every round-1 row and the round-2 reader row through mutate-2.py, and lists each row whose log has no
# AssertionError line or reports an unhandled error. The modal-base row is the red reading of the order case on
# 0865c67's Modal.ts. It checks every source restored byte for byte. Derived from replay-concerns-a-3.sh.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a
LOG="$U/j-motion-proofs-a-replay-2.log.txt"
cp "$TREE/tmp/j-motion-proofs-a/mutate-2.py" "$U/j-motion-proofs-a-mutate-2.py"
cp "$TREE/tmp/j-motion-proofs-a/mutations.json" "$U/j-motion-proofs-a-mutations.json"
cp "$TREE/tmp/j-motion-proofs-a/mutations-2.json" "$U/j-motion-proofs-a-mutations-2.json"
cp "$TREE/tmp/j-motion-proofs-a/plant.sh" "$U/j-motion-proofs-a-plant.sh" 2>/dev/null
git -C "$TREE" diff 0865c67 HEAD > "$U/j-motion-proofs-a.diff"
git -C "$TREE" diff --name-status 0865c67 HEAD > "$U/j-motion-proofs-a-status.txt"
cd "$TREE" || exit 1
ROWS="modal-base modal-show-dialog modal-hide-host modal-show-skip modal-hide-skip offcanvas-show-backdrop offcanvas-show-panel offcanvas-hide-backdrop offcanvas-hide-panel backdrop-show-skip backdrop-hide-skip alert-skip"
{
	echo "# The Orchestrator's replay of J-MOTION-PROOFS-A rounds 1 and 2 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	sha256sum src/browser/*.ts tests/setupBrowser.ts tests/src/browser/*.ts > "$S/replay-motion-proofs-a-2-before.sha256"
	for step in format:check lint:check check test:guides test:setup:browser; do npm run "$step" > /dev/null 2>&1; echo "$step exit=$?"; done
	echo "--- control: the four owned files, unmutated"
	NO_COLOR=1 npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts tests/src/browser/Alert.test.ts 2>&1 | grep -E "Test Files|Tests  |FAIL|Unhandled" | head -12
	echo "control exit=${PIPESTATUS[0]}"
	echo "--- rows (the instrument's stdout)"
	python tmp/j-motion-proofs-a/mutate-2.py tmp/j-motion-proofs-a/mutations.json $ROWS
	python tmp/j-motion-proofs-a/mutate-2.py tmp/j-motion-proofs-a/mutations-2.json reader-seconds
	echo "--- rows whose log names no AssertionError"
	for row in $ROWS reader-seconds; do grep -q "AssertionError" "tmp/j-motion-proofs-a/mutations-2/$row.log.txt" || echo "$row"; done
	echo "--- unhandled errors in the row logs"
	grep -l -E "Unhandled Error|Unhandled Rejection" tmp/j-motion-proofs-a/mutations-2/*.log.txt || echo "none"
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-motion-proofs-a-2-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -E "exit=|Tests  |== |FAIL|none$|restored|^[a-z-]+$" "$LOG" | cut -c1-200 | head -70
