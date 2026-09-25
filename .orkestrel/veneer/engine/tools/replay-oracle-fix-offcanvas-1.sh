#!/usr/bin/env bash
# The Orchestrator's replay of J-ORACLE-FIX-OFFCANVAS round 1 at eaf3908 (2026-09-25):
# - whole-file runs of Offcanvas, Isolation, and Modal;
# - the unit's committed mutation instruments, mutate-2.sh (five mutations and the 63eabbd base) and mutate-3.sh (the
#   click-listener mutation), each log checked for the error class of every failing case;
# - the census for offcanvas and modal through the round-3 census instrument;
# - a check that the source and the tree are clean afterwards.
# Usage: bash replay-oracle-fix-offcanvas-1.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-oracle-fix-offcanvas-replay-1.log.txt
cd "$TREE" || exit 1
{
	echo "# J-ORACLE-FIX-OFFCANVAS round 1 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Offcanvas Isolation Modal; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay-$f.log.txt" 2>&1
		echo "$f whole-file exit=$?"; grep -E "Tests +[0-9]" "tmp/replay-$f.log.txt"
	done
	for m in mutate-2 mutate-3; do
		bash "$UNITS/j-oracle-fix-offcanvas-$m.sh"; echo "$m exit=$?"
	done
	echo "--- error class of each failing case in the mutation logs"
	for f in tmp/j-oracle-fix-offcanvas/mutation-2-*.log.txt tmp/j-oracle-fix-offcanvas/mutation-3-click.log.txt; do
		echo "$f: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") failed=$(grep -cE '^ +×' "$f")"
	done
	echo "--- the census for offcanvas and modal"
	cp "$UNITS/j-oracle-record-census-3.test.ts" tmp/probe/census.test.ts
	ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > tmp/replay-census.log.txt 2>&1
	echo "census exit=$?"
	echo "departures rows naming focus: $(grep -c '"focus"' tmp/j-oracle/census/departures.json)"
	grep -o '"departures": [0-9]*\|"[a-z]*\.departures": [0-9]*' tmp/j-oracle/census/findings.json
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -vE "^\s*$" | grep -E "exit|Tests|assertion=|departures|focus|restored|^ ?[MA?]|^#" | head -40
