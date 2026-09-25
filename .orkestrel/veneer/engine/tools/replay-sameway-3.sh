#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY round 3 (commit e557bfe on unit/integration, J-INTEGRATION round 6); successor of
# replay-sameway-2.sh, which checked dc838aa. It runs the scoped gates, then the red reading: round 3's two test files run against
# dc838aa's Modal and Offcanvas sources, restored after. Then the unit's instrument runs, after a check that it is
# byte-identical to the retained copy units/j-sameway-mutations-3.py. Its log carries each row's cause, and this script
# lists every killed row whose cause is not an AssertionError. The diff and status are rewritten from the commit range.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration
LOG="$U/j-sameway-mutations-3-orchestrator.log.txt"
RED="$U/j-sameway-red-3-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-sameway-3
bash "$S/w2-gates-scoped.sh" integration 6 > /dev/null 2>&1
git -C "$TREE" diff dc838aa e557bfe > "$U/j-sameway-3.diff"
git -C "$TREE" diff --name-status dc838aa e557bfe > "$U/j-sameway-3-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Modal.ts src/browser/Offcanvas.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY round 3's cases on dc838aa's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "dc838aa:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError" | head -40
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY round-3 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-sameway/mutations-3.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-mutations-3.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-sameway-3-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-sameway/mutations-3.py
	echo "instrument exit=$?"
	echo "--- killed rows whose cause is not an AssertionError"
	grep "| KILLED" tmp/j-sameway/mutations-3.log.txt | grep -v "AssertionError" || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-sameway/mutations-3.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-sameway-3-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$U/j-integration-gates-6.log.txt" | head -12
cut -c1-200 "$RED" | tail -14
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|SURVIV\|rows " "$LOG" | cut -c1-200 | head -20
