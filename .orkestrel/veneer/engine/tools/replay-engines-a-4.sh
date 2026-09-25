#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY-ENGINES-A round 4 (bdecfa1 and the integration 3f62d64 on unit/engines-a, over
# dc2a1a7); successor of replay-engines-a-3.sh. It runs the scoped gates. Then the red reading: the Collapse, Toast, Tab,
# Carousel, and HostSnapshot test files run against dc2a1a7's engine, helpers, HostSnapshot, and types sources, restored
# after, with every unhandled error listed. Then the unit's instrument, after a check that it is byte-identical to the
# retained units/j-sameway-engines-a-mutations-4.py, with every killed row whose message does not name an assertion listed.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a
LOG="$U/j-sameway-engines-a-mutations-4-orchestrator.log.txt"
RED="$U/j-sameway-engines-a-red-4-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-engines-a-4
cp "$TREE/tmp/j-engines-a/mutations-4.py" "$U/j-sameway-engines-a-mutations-4.py"
cp "$TREE/tmp/j-engines-a/base-red-4.py" "$U/j-sameway-engines-a-base-red-4.py"
cp "$TREE/tmp/j-engines-a/guide-4.patch" "$U/j-sameway-engines-a-guide-4.patch"
bash "$S/w2-gates-scoped.sh" engines-a 4 > /dev/null 2>&1
git -C "$TREE" diff dc2a1a7 HEAD > "$U/j-sameway-engines-a-4.diff"
git -C "$TREE" diff --name-status dc2a1a7 HEAD > "$U/j-sameway-engines-a-4-status.txt"
git -C "$TREE" diff 2760f7e HEAD -- src/browser/types.ts src/browser/helpers.ts src/browser/HostSnapshot.ts guides/veneer.md > "$U/j-sameway-engines-a-shape-2to4.diff"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Collapse.ts src/browser/Toast.ts src/browser/Tab.ts src/browser/Carousel.ts src/browser/helpers.ts src/browser/HostSnapshot.ts src/browser/types.ts"
TESTS="tests/src/browser/Collapse.test.ts tests/src/browser/Toast.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Carousel.test.ts tests/src/browser/HostSnapshot.test.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY-ENGINES-A round 4's cases on dc2a1a7's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "dc2a1a7:$f" > "$f"; done
	npm run test:src:browser -- $TESTS 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|SyntaxError|Unhandled|Error:" | head -60
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	echo "--- the tip, the same files, for the unhandled-error reading"
	npm run test:src:browser -- $TESTS 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |Test Files|FAIL |Unhandled|Errors" | head -20
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY-ENGINES-A round-4 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-engines-a/mutations-4.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-engines-a-mutations-4.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-engines-a-4-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-engines-a/mutations-4.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-engines-a/mutations-4.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-engines-a/mutations-4.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-engines-a-4-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-engines-a-4.log" | head -12
grep -E "Tests |restored|Unhandled|Errors" "$RED"
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|missed" "$LOG" | cut -c1-200 | head -20
