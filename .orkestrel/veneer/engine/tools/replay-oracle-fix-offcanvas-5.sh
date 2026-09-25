#!/usr/bin/env bash
# The Orchestrator's replay of J-ORACLE-FIX-OFFCANVAS round 5 at 88d06f4 (2026-09-25). It runs the unit's committed
# instruments: red-5.sh (the 43fa73d red and the fixed green of Offcanvas.test.ts), mutate-7.sh (the press mutations),
# and mutate-helper-7.sh (the holdsFocus mutation), then whole-file runs of the five owned test files, and checks the
# tree. Usage: bash replay-oracle-fix-offcanvas-5.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-oracle-fix-offcanvas-replay-5.log.txt
T=tmp/j-oracle-fix-offcanvas
cd "$TREE" || exit 1
{
	echo "# J-ORACLE-FIX-OFFCANVAS round 5 replay (2026-09-25) at $(git log --oneline -1)"
	bash "$T/red-5.sh"; echo "red-5 exit=$?"
	bash "$T/mutate-7.sh"; echo "mutate-7 exit=$?"
	bash "$T/mutate-helper-7.sh"; echo "mutate-helper-7 exit=$?"
	echo "--- error class of each mutation log"
	for f in $T/mutation-7-*.log.txt; do
		echo "$f: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") $(sed 's/\x1b\[[0-9;]*m//g' "$f" | grep -oE 'Tests +[0-9]+ (failed|passed)[^(]*\([0-9]+\)' | head -1)"
	done
	for f in Offcanvas Isolation Modal helpers index; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay5-$f.log.txt" 2>&1
		echo "$f whole-file exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay5-$f.log.txt")"
	done
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit|Tests|assertion=|restored|cmp|^---|^ ?[MA?] |^#" | head -60
