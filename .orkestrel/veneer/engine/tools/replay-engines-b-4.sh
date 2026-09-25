#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY-ENGINES-B round 4 (040f4f3 and the integration 3bb9afb on unit/engines-b, over 87dc147);
# successor of replay-engines-b-3.sh. It runs the scoped gates. Then the red reading: the
# three owned test files, with the tip's tests/setupBrowser.ts tables, against 87dc147's Dropdown, Tooltip, and Popover
# sources, restored after. Then the unit's round-4 instrument, after a check that it is byte-identical to the retained
# units/j-sameway-engines-b-mutations-4.py, with every killed row whose message does not name an assertion listed.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b
LOG="$U/j-sameway-engines-b-mutations-4-orchestrator.log.txt"
RED="$U/j-sameway-engines-b-red-4-orchestrator.log.txt"
KEEP=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/red-engines-b-4
cp "$TREE/tmp/j-engines-b/mutations-4.py" "$U/j-sameway-engines-b-mutations-4.py"
cp "$TREE/tmp/j-engines-b/shared4/types.patch" "$U/j-sameway-engines-b-types-4.patch"
cp "$TREE/tmp/j-engines-b/shared4/guide.patch" "$U/j-sameway-engines-b-guide-4.patch"
bash "$S/w2-gates-scoped.sh" engines-b 4 > /dev/null 2>&1
git -C "$TREE" diff 87dc147 HEAD > "$U/j-sameway-engines-b-4.diff"
git -C "$TREE" diff --name-status 87dc147 HEAD > "$U/j-sameway-engines-b-4-status.txt"
cd "$TREE" || exit 1
mkdir -p "$KEEP"
FILES="src/browser/Dropdown.ts src/browser/Tooltip.ts src/browser/Popover.ts"
{
	echo "# The Orchestrator's red reading of J-SAMEWAY-ENGINES-B round 4's cases on 87dc147's sources (2026-09-25, Chromium 153.0.8010.12), tests at $(git log --oneline -1)"
	sha256sum $FILES > "$KEEP/digests.txt"
	for f in $FILES; do cp "$f" "$KEEP/$(basename "$f")"; git show "87dc147:$f" > "$f"; done
	npm run test:src:browser -- tests/src/browser/Dropdown.test.ts tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Tests |FAIL |AssertionError|ReferenceError|TypeError|Error:" | head -90
	for f in $FILES; do cp "$KEEP/$(basename "$f")" "$f"; done
	sha256sum -c "$KEEP/digests.txt" | grep -v ": OK$" || echo "restored byte for byte (the Orchestrator's digest)"
	git status --short
} > "$RED" 2>&1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY-ENGINES-B round-4 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-engines-b/mutations-4.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-engines-b-mutations-4.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts tests/setupBrowser.ts guides/veneer.md > "$S/replay-engines-b-4-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-engines-b/mutations-4.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-engines-b/mutations-4.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-engines-b/mutations-4.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-engines-b-4-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-engines-b-4.log" | head -12
grep -E "Tests |restored" "$RED"
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|missed\|rows " "$LOG" | cut -c1-200 | head -20
