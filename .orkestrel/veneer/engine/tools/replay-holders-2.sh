#!/usr/bin/env bash
# The Orchestrator's check of J-HOLDERS round 2 (commits 88f15c7 and the integration patch ada50f4 on unit/holders, over the
# merge 806717d); successor of replay-holders-1.sh. It runs the scoped gates, whose browser suite covers every engine the
# presence change reaches. Then the red reading: round 2's test files run against 806717d's HostSnapshot.ts, restored after.
# Then the unit's instrument, after a check that it is byte-identical to the retained units/j-holders-mutations-2.py,
# with every killed row whose message does not name an assertion listed. The diff and status are written from the range.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/holders
LOG="$U/j-holders-mutations-2-orchestrator.log.txt"
RED="$U/j-holders-red-2-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-holders-2
bash "$S/w2-gates-scoped.sh" holders 2 > /dev/null 2>&1
git -C "$TREE" diff 806717d HEAD > "$U/j-holders-2.diff"
git -C "$TREE" diff --name-status 806717d HEAD > "$U/j-holders-2-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/HostSnapshot.ts"
{
	echo "# The Orchestrator's red reading of J-HOLDERS round 2's cases on 806717d's HostSnapshot.ts (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "806717d:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts tests/src/browser/Modal.test.ts tests/src/browser/Isolation.test.ts tests/src/browser/Tab.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|Error:" | head -30
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-HOLDERS round-2 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-holders/mutations-2.py | cut -c1-64); b=$(sha256sum "$U/j-holders-mutations-2.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-holders-2-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-holders/mutations-2.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-holders/mutations-2.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-holders/mutations-2.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-holders-2-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-holders-2.log" | head -12
cut -c1-200 "$RED" | tail -16
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|failing" "$LOG" | cut -c1-200 | head -20
