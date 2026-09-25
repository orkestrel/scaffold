#!/usr/bin/env bash
# The Orchestrator's replay of J-CONCERNS-B round 2 (2026-09-25). It applies the unit's two committed mutation diffs to
# src/browser/Tooltip.ts one at a time with git apply, runs Popover.test.ts, reverses the diff, and checks the source is
# back to its committed bytes. It also runs the file unmutated. Usage: bash replay-concerns-b-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-concerns-b-replay-2.log.txt
cd "$TREE" || exit 1
run() {
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Popover.test.ts > "tmp/replay2-$1.log.txt" 2>&1
	echo "$1 exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay2-$1.log.txt") assertion=$(grep -c 'AssertionError' "tmp/replay2-$1.log.txt")"
	sed 's/\x1b\[[0-9;]*m//g' "tmp/replay2-$1.log.txt" | grep -E '^ +×' | head -3
}
{
	echo "# J-CONCERNS-B round 2 replay (2026-09-25) at $(git log --oneline -1)"
	run unmutated
	for m in show hide; do
		git apply "$UNITS/j-concerns-b-2-$m-mutation.diff"; echo "apply $m exit=$?"
		run "$m"
		git apply -R "$UNITS/j-concerns-b-2-$m-mutation.diff"; echo "reverse $m exit=$?"
	done
	echo "Tooltip.ts at HEAD: $(git diff --quiet HEAD -- src/browser/Tooltip.ts && echo unchanged || echo CHANGED)"
	git status --short
} > "$LOG" 2>&1
cat "$LOG"
