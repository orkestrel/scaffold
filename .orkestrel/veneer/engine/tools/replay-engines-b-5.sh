#!/usr/bin/env bash
# The Orchestrator's replay of J-SAMEWAY-ENGINES-B round 5 at 4c9a7dd (2026-09-25). It runs the unit's committed probes:
# - the platform reproduction, tmp/probe/platform/loop.test.ts;
# - the popover-794 site's copy with its wait removed, three runs;
# - that site's control copy, three runs;
# - the two edited files, three whole-file runs each.
# It counts the loop reports in each log, and checks the tree afterwards. Usage: bash replay-engines-b-5.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-sameway-engines-b-replay-5.log.txt
cd "$TREE" || exit 1
count() { grep -c "ResizeObserver loop" "$1"; }
{
	echo "# J-SAMEWAY-ENGINES-B round 5 replay (2026-09-25) at $(git log --oneline -1)"
	npx vitest run --config tmp/probe/vitest.probe.config.ts --no-cache tmp/probe/platform/ > tmp/replay-platform.log.txt 2>&1
	echo "platform exit=$? loop-reports=$(count tmp/replay-platform.log.txt)"; grep -E "Tests +[0-9]" tmp/replay-platform.log.txt
	for site in popover-794 control-popover; do
		for run in 1 2 3; do
			npx vitest run --config tmp/probe/vitest.probe.config.ts --no-cache "tmp/probe/$site/" > "tmp/replay-$site-$run.log.txt" 2>&1
			echo "$site run $run exit=$? loop-reports=$(count "tmp/replay-$site-$run.log.txt")"
		done
	done
	for f in Tooltip Popover; do
		for run in 1 2 3; do
			npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay-$f-$run.log.txt" 2>&1
			echo "$f run $run exit=$? loop-reports=$(count "tmp/replay-$f-$run.log.txt") $(grep -E 'Tests +[0-9]' "tmp/replay-$f-$run.log.txt")"
		done
	done
	echo "--- the tree after the replay"
	git status --short
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Tests|^ ?[MA?] |^#"
