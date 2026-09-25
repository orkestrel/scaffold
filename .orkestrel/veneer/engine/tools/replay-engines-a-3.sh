#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY-ENGINES-A rounds 2 and 3 (5805a28, 61640e0, and the integration 5e3ae52 on unit/engines-a, over the round-1 integration 7511b82 and the merge 2760f7e); successor of replay-engines-a-1.sh, measured against
# the merge 2760f7e, whose four engine sources equal 7511b82's. It runs the scoped gates. Then the red reading: the four engine test files run against 7511b82's Collapse, Toast,
# Tab, and Carousel sources, restored after. Then the unit's instrument, after a check that it is byte-identical to the
# retained units/j-sameway-engines-a-mutations-3.py, with every killed row whose message does not name an assertion listed.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a
LOG="$U/j-sameway-engines-a-mutations-3-orchestrator.log.txt"
RED="$U/j-sameway-engines-a-red-3-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-engines-a
bash "$S/w2-gates-scoped.sh" engines-a 3 > /dev/null 2>&1
git -C "$TREE" diff 2760f7e HEAD > "$U/j-sameway-engines-a-3.diff"
git -C "$TREE" diff --name-status 2760f7e HEAD > "$U/j-sameway-engines-a-3-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Collapse.ts src/browser/Toast.ts src/browser/Tab.ts src/browser/Carousel.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY-ENGINES-A's cases on 2760f7e's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "2760f7e:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Collapse.test.ts tests/src/browser/Toast.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Carousel.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|Error:" | head -90
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY-ENGINES-A round-3 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-engines-a/mutations-3.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-engines-a-mutations-3.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-engines-a-3-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-engines-a/mutations-3.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-engines-a/mutations-3.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-engines-a/mutations-3.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-engines-a-3-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-engines-a-3.log" | head -12
grep -E "Tests |restored" "$RED"
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|missed" "$LOG" | cut -c1-200 | head -20
