#!/usr/bin/env bash
# The Orchestrator's replay of J-RELEASE-RECORD round 2 at d3a3969 (2026-09-25). It re-runs the unit's committed
# instruments: r2-doors.sh (each door after a split write deleted, printing the deleted lines), Tab's take-time read
# restored and recordHostWrite through writeHostValue (mutate.sh), then the six owned test files whole and
# test:setup:browser, names each log's error class, and checks the tree. Usage: bash replay-release-record-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-release-record-replay-2.log.txt
T=tmp/j-release-record
S=tests/src/browser
cd "$TREE" || exit 1
{
	echo "# J-RELEASE-RECORD round 2 replay (2026-09-25) at $(git log --oneline -1)"
	echo "--- the doors, each deleted"
	bash $T/r2-doors.sh
	echo "--- Tab's take-time read restored"
	bash $T/mutate.sh replay2-tab-take src/browser/Tab.ts $T/mutants/r2-tab-take.ts $S/Tab.test.ts
	echo "--- recordHostWrite through writeHostValue"
	bash $T/mutate.sh replay2-helpers-tab src/browser/helpers.ts $T/mutants/r2-helpers.ts $S/Tab.test.ts
	bash $T/mutate.sh replay2-helpers-helpers src/browser/helpers.ts $T/mutants/r2-helpers.ts $S/helpers.test.ts
	echo "--- error class of each mutation log"
	for f in $T/logs/r2-door-*.log.txt $T/logs/replay2-*.log.txt; do
		echo "$f: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") $(sed 's/\x1b\[[0-9;]*m//g' "$f" | grep -E 'Tests +[0-9]' | head -1)"
	done
	echo "--- whole files"
	for f in Collapse Toast Tab Carousel Dropdown helpers; do
		bash $T/run.sh "replay2-green-$f" "$S/$f.test.ts" > /dev/null
		echo "$f whole-file $(sed 's/\x1b\[[0-9;]*m//g' "$T/logs/replay2-green-$f.log.txt" | grep -E 'Tests +[0-9]')"
	done
	npm run test:setup:browser > $T/logs/replay2-setup-browser.log.txt 2>&1
	echo "test:setup:browser exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $T/logs/replay2-setup-browser.log.txt | grep -E 'Tests +[0-9]')"
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "^==|restored|assertion=|whole-file|exit=|^---|^ ?[MA?]{1,2} |^#" | head -80
