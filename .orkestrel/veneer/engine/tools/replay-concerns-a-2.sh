#!/usr/bin/env bash
# The Orchestrator's check of J-CONCERNS-A rounds 1 and 2 (bcea965 on unit/concerns-a, main 094a71e merged in as bd5c882), 2026-09-25.
# Retains the unit's instrument, runs the scoped gates and a control run of both owned files, then every mutation
# through the unit's runner into a retained log. It lists each mutation block with no AssertionError line, and checks
# that every source is restored byte for byte. Successor of replay-concerns-a-1.sh: the round-2 tip, the diff over 094a71e.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a
LOG="$U/j-concerns-a-mutations-orchestrator-2.log.txt"
MLOG="$U/j-concerns-a-mutations-orchestrator-2-raw.log.txt"
cp "$TREE/tmp/j-concerns-a/mutate.cjs" "$U/j-concerns-a-mutate.cjs"
cp "$TREE/tmp/j-concerns-a/mutations.sh" "$U/j-concerns-a-mutations.sh"
git -C "$TREE" diff 094a71e HEAD > "$U/j-concerns-a-2.diff"
git -C "$TREE" diff --name-status 094a71e HEAD > "$U/j-concerns-a-2-status.txt"
cd "$TREE" || exit 1
: > "$MLOG"
{
	echo "# The Orchestrator's replay of J-CONCERNS-A rounds 1 and 2 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	sha256sum src/browser/ScrollSpy.ts src/browser/Button.ts tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts > "$S/replay-concerns-a-2-before.sha256"
	for step in format:check lint:check check; do npm run "$step" > /dev/null 2>&1; echo "$step exit=$?"; done
	echo "--- control: both owned files, unmutated"
	NO_COLOR=1 npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts 2>&1 | grep -E "Test Files|Tests  |FAIL|Error" | head -20
	echo "control exit=${PIPESTATUS[0]}"
	echo "--- mutations (raw log: $MLOG)"
	LOG="$MLOG" bash tmp/j-concerns-a/mutations.sh scrollspy-cancel scrollspy-focus-link scrollspy-focus-section scrollspy-navigate scrollspy-instant-host scrollspy-instant-view scrollspy-reduced button-focus button-blur button-motion
	grep -E "^=== |Tests  |exit=" "$MLOG"
	echo "--- mutation blocks with no AssertionError line"
	awk '/^=== /{if (name != "" && !seen) print name; name=$0; seen=0} /AssertionError/{seen=1} END{if (name != "" && !seen) print name}' "$MLOG" | grep . || echo "none"
	echo "--- non-assertion errors in the raw log"
	grep -E "TypeError|ReferenceError|SyntaxError|Unhandled" "$MLOG" || echo "none"
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-concerns-a-2-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
cat "$LOG"
