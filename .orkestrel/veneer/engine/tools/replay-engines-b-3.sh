#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY-ENGINES-B round 3 (e73c3af and the integration 87dc147 on unit/engines-b, over the
# merge 45aebaa of main 3058570); successor of replay-engines-b-1.sh. It runs the scoped gates. Then the red reading: the
# three owned test files, with the tip's tests/setupBrowser.ts tables, against 45aebaa's Dropdown, Tooltip, and Popover
# sources, restored after. Then the unit's round-3 instrument, after a check that it is byte-identical to the retained
# units/j-sameway-engines-b-mutations-3.py, with every killed row whose message does not name an assertion listed.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b
LOG="$U/j-sameway-engines-b-mutations-3-orchestrator.log.txt"
RED="$U/j-sameway-engines-b-red-3-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-engines-b-3
cp "$TREE/tmp/j-engines-b/mutations-3.py" "$U/j-sameway-engines-b-mutations-3.py"
cp "$TREE/tmp/j-engines-b/shared3/types.patch" "$U/j-sameway-engines-b-types-3.patch"
cp "$TREE/tmp/j-engines-b/shared3/guide.patch" "$U/j-sameway-engines-b-guide-3.patch"
bash "$S/w2-gates-scoped.sh" engines-b 3 > /dev/null 2>&1
git -C "$TREE" diff 45aebaa HEAD > "$U/j-sameway-engines-b-3.diff"
git -C "$TREE" diff --name-status 45aebaa HEAD > "$U/j-sameway-engines-b-3-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Dropdown.ts src/browser/Tooltip.ts src/browser/Popover.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY-ENGINES-B round 3's cases on 45aebaa's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "45aebaa:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Dropdown.test.ts tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|Error:" | head -90
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY-ENGINES-B round-3 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-engines-b/mutations-3.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-engines-b-mutations-3.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts tests/setupBrowser.ts guides/veneer.md > "$S/replay-engines-b-3-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-engines-b/mutations-3.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-engines-b/mutations-3.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-engines-b/mutations-3.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-engines-b-3-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-engines-b-3.log" | head -12
grep -E "Tests |restored" "$RED"
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|missed\|rows " "$LOG" | cut -c1-200 | head -20
