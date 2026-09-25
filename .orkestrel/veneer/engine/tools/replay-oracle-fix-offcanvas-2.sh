#!/usr/bin/env bash
# The Orchestrator's replay of J-ORACLE-FIX-OFFCANVAS round 2 at dcff520 (2026-09-25). It runs the unit's committed
# successor instruments and checks the result:
# - whole-file runs of Offcanvas, Isolation, and Modal;
# - mutate-4.sh (round 1's five mutations, the document mutation, and both bases) and mutate-5.sh (the click
#   mutation), each run's log read for its error class;
# - the census, compared with round 1's through compare-2.py;
# - the tree afterwards.
# Usage: bash replay-oracle-fix-offcanvas-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-oracle-fix-offcanvas-replay-2.log.txt
cd "$TREE" || exit 1
{
	echo "# J-ORACLE-FIX-OFFCANVAS round 2 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Offcanvas Isolation Modal; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay2-$f.log.txt" 2>&1
		echo "$f whole-file exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay2-$f.log.txt")"
	done
	bash "$UNITS/j-oracle-fix-offcanvas-2-mutate-4.sh"; echo "mutate-4 exit=$?"
	bash "$UNITS/j-oracle-fix-offcanvas-2-mutate-5.sh"; echo "mutate-5 exit=$?"
	echo "--- error class of each mutation run"
	for f in tmp/j-oracle-fix-offcanvas/mutation-4-*.log.txt tmp/j-oracle-fix-offcanvas/mutation-5-*.log.txt; do
		[ -f "$f" ] || continue
		echo "$f: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") failed=$(grep -cE '^ +×' "$f")"
	done
	echo "--- the census"
	cp "$UNITS/j-oracle-record-census-3.test.ts" tmp/probe/census.test.ts
	ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > tmp/replay2-census.log.txt 2>&1
	echo "census exit=$?"
	echo "departures rows naming focus: $(grep -c '"focus"' tmp/j-oracle/census/departures.json)"
	grep -o '"[a-z]*\.departures": [0-9]*' tmp/j-oracle/census/findings.json
	echo "--- the tree after the replay"
	git status --short
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|exit [0-9]|assertion=|departures|focus|restored|^ ?[MA?] |^#" | head -40
