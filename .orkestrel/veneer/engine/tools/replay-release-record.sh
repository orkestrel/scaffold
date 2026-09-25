#!/usr/bin/env bash
# The Orchestrator's replay of J-RELEASE-RECORD at a1041bd (2026-09-25). It re-runs the unit's committed instruments:
# every witness against b8c6a08's engine sources (baseline-reading.sh), every mutation (mutate.sh), the six owned test
# files whole, test:setup:browser, and test:conformance, because single-token writes change the mutation records the
# oracle compares. Then it names each log's error class and checks the tree. Usage: bash replay-release-record.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-release-record-replay.log.txt
T=tmp/j-release-record
B=src/browser
S=tests/src/browser
cd "$TREE" || exit 1
{
	echo "# J-RELEASE-RECORD replay (2026-09-25) at $(git log --oneline -1)"
	echo "--- witnesses at b8c6a08's engine sources"
	bash $T/baseline-reading.sh replay-red-toast $S/Toast.test.ts 'never wrote it|its show never wrote'
	bash $T/baseline-reading.sh replay-red-carousel $S/Carousel.test.ts 'never wrote'
	bash $T/baseline-reading.sh replay-red-tab $S/Tab.test.ts 'already carried|its swap never wrote|sibling blur'
	bash $T/baseline-reading.sh replay-red-tab-recorded $S/Tab.test.ts 'whose token its swap never changed'
	bash $T/baseline-reading.sh replay-red-helpers $S/helpers.test.ts 'recordHostWrite'
	bash $T/baseline-reading.sh replay-red-collapse $S/Collapse.test.ts 'which its show never wrote'
	bash $T/baseline-reading.sh replay-red-collapse-recorded $S/Collapse.test.ts 'whose token its show never changed'
	bash $T/baseline-reading.sh replay-red-dropdown $S/Dropdown.test.ts 'its show never wrote'
	echo "--- mutations"
	bash $T/mutate.sh replay-m1-helpers $B/helpers.ts $T/mutants/helpers.ts $S/helpers.test.ts 'recordHostWrite'
	bash $T/mutate.sh replay-m1-collapse $B/helpers.ts $T/mutants/helpers.ts $S/Collapse.test.ts
	for m in Collapse Toast Tab Carousel Dropdown; do
		bash $T/mutate.sh "replay-m2-$m" "$B/$m.ts" "$T/mutants/$m.ts" "$S/$m.test.ts"
	done
	bash $T/mutate.sh replay-m3-tab-reread $B/Tab.ts $T/mutants/Tab-reread.ts $S/Tab.test.ts
	echo "--- error class of each replay log"
	for f in $T/logs/replay-*.log.txt; do
		echo "$f: assertion=$(grep -c 'AssertionError' "$f") other=$(grep -cE '^(TypeError|ReferenceError|SyntaxError|Error):' "$f") $(sed 's/\x1b\[[0-9;]*m//g' "$f" | grep -E 'Tests +[0-9]' | head -1)"
	done
	echo "--- whole files"
	for f in Collapse Toast Tab Carousel Dropdown helpers; do
		bash $T/run.sh "replay-green-$f" "$S/$f.test.ts" > /dev/null
		echo "$f whole-file $(sed 's/\x1b\[[0-9;]*m//g' "$T/logs/replay-green-$f.log.txt" | grep -E 'Tests +[0-9]')"
	done
	npm run test:setup:browser > $T/logs/replay-setup-browser.log.txt 2>&1
	echo "test:setup:browser exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $T/logs/replay-setup-browser.log.txt | grep -E 'Tests +[0-9]')"
	npm run test:conformance > $T/logs/replay-conformance.log.txt 2>&1
	echo "test:conformance exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $T/logs/replay-conformance.log.txt | grep -E 'Tests +[0-9]')"
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "^exit|restored|assertion=|whole-file|exit=|^---|^ ?[MA?]{1,2} |^#" | head -80
