#!/usr/bin/env bash
# The Orchestrator's check of J-CONCERNS-A round 3 (0cb4433 and the integration 90e8b60 on unit/concerns-a, over bcea965),
# 2026-09-25. Successor of replay-concerns-a-2.sh: it retains the round-3 instrument (mutate-3.cjs, mutations-3.sh), reads
# the flipped reduced-motion case red on bcea965's ScrollSpy.ts, runs the scoped gates and a control run, then every
# round-3 mutation, listing each block with no AssertionError line and checking every source restored byte for byte.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a
LOG="$U/j-concerns-a-mutations-orchestrator-3.log.txt"
MLOG="$U/j-concerns-a-mutations-orchestrator-3-raw.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-concerns-a-3
cp "$TREE/tmp/j-concerns-a/mutate-3.cjs" "$U/j-concerns-a-mutate-3.cjs"
cp "$TREE/tmp/j-concerns-a/mutations-3.sh" "$U/j-concerns-a-mutations-3.sh"
git -C "$TREE" diff bcea965 HEAD > "$U/j-concerns-a-3.diff"
git -C "$TREE" diff --name-status bcea965 HEAD > "$U/j-concerns-a-3-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
: > "$MLOG"
{
	echo "# The Orchestrator's replay of J-CONCERNS-A round 3 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	sha256sum src/browser/ScrollSpy.ts src/browser/Button.ts tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts > "$S/replay-concerns-a-3-before.sha256"
	for step in format:check lint:check check test:guides; do npm run "$step" > /dev/null 2>&1; echo "$step exit=$?"; done
	echo "--- red: the tip's ScrollSpy tests on bcea965's ScrollSpy.ts"
	cp src/browser/ScrollSpy.ts "$KEEP/ScrollSpy.ts"
	git show bcea965:src/browser/ScrollSpy.ts > src/browser/ScrollSpy.ts
	NO_COLOR=1 npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts 2>&1 | grep -E "FAIL |AssertionError|Tests  " | head -10
	cp "$KEEP/ScrollSpy.ts" src/browser/ScrollSpy.ts
	echo "--- control: both owned files, unmutated"
	NO_COLOR=1 npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts 2>&1 | grep -E "Test Files|Tests  |FAIL|Error" | head -20
	echo "control exit=${PIPESTATUS[0]}"
	echo "--- mutations (raw log: $MLOG)"
	LOG="$MLOG" bash tmp/j-concerns-a/mutations-3.sh scrollspy-cancel scrollspy-focus-link scrollspy-focus-section scrollspy-navigate scrollspy-instant-host scrollspy-instant-view scrollspy-ungated button-focus button-blur button-motion button-stale-return
	grep -E "^=== |Tests  |exit=" "$MLOG"
	echo "--- mutation blocks with no AssertionError line"
	awk '/^=== /{if (name != "" && !seen) print name; name=$0; seen=0} /AssertionError/{seen=1} END{if (name != "" && !seen) print name}' "$MLOG" | grep . || echo "none"
	echo "--- non-assertion errors in the raw log"
	grep -E "TypeError|ReferenceError|SyntaxError|Unhandled" "$MLOG" || echo "none"
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-concerns-a-3-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
cat "$LOG" | cut -c1-200
