#!/usr/bin/env bash
# The Orchestrator's check of J-HOLDERS (commit ef320ca on unit/holders over 4cd56a8): the scoped gates; the red reading, in
# which the unit's three test files run against 4cd56a8's sources and are restored after; then the unit's instrument, after a
# check that it is byte-identical to the retained units/j-holders-mutations.py, with every killed row whose message does
# not name an assertion listed. The diff and status are written from the commit range.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/holders
LOG="$U/j-holders-mutations-orchestrator.log.txt"
RED="$U/j-holders-red-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-holders
bash "$S/w2-gates-scoped.sh" holders 1 > /dev/null 2>&1
git -C "$TREE" diff 4cd56a8 HEAD > "$U/j-holders.diff"
git -C "$TREE" diff --name-status 4cd56a8 HEAD > "$U/j-holders-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Modal.ts src/browser/Isolation.ts src/browser/ScrollLock.ts src/browser/HostSnapshot.ts src/browser/types.ts"
{
	echo "# The Orchestrator's red reading of J-HOLDERS' cases on 4cd56a8's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "4cd56a8:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/ScrollLock.test.ts tests/src/browser/ColorMode.test.ts tests/src/browser/Isolation.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|Error:" | head -30
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-HOLDERS mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-holders/mutations.py | cut -c1-64); b=$(sha256sum "$U/j-holders-mutations.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-holders-1-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-holders/mutations.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-holders/mutations.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-holders/mutations.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-holders-1-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-holders-1.log" | head -12
cut -c1-200 "$RED" | tail -16
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|failing" "$LOG" | cut -c1-200 | head -20
