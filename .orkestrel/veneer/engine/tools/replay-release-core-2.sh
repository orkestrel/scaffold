#!/usr/bin/env bash
# The Orchestrator's replay of J-RELEASE-CORE round 2 at 03526bc (2026-09-25). It runs:
# - whole-file runs of the five owned test files;
# - test:policy, test:guides, and test:setup:browser;
# - every row of the unit's committed mutate-2.mjs, which classifies each failed case from the Vitest JSON report;
# - a check that the source and the tree are clean afterwards.
# Usage: bash replay-release-core-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG=$UNITS/j-release-core-replay-2.log.txt
cd "$TREE" || exit 1
{
	echo "# J-RELEASE-CORE round 2 replay (2026-09-25) at $(git log --oneline -1)"
	for f in Lifetime HostSnapshot helpers Button index; do
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$f.test.ts" > "tmp/replay2-$f.log.txt" 2>&1
		echo "$f whole-file exit=$? $(grep -E 'Tests +[0-9]' "tmp/replay2-$f.log.txt")"
	done
	for step in test:policy test:guides test:setup:browser; do
		npm run "$step" > "tmp/replay2-$step.log.txt" 2>&1; echo "$step exit=$?"
	done
	node tmp/j-release-core/mutate-2.mjs > tmp/replay2-mutate.stdout.log.txt 2>&1; echo "mutate-2 exit=$?"
	cp tmp/j-release-core/mutations-2.log.txt tmp/replay2-mutations.log.txt
	cat tmp/replay2-mutations.log.txt
	echo "--- the tree after the replay"
	git status --short
	git diff --stat HEAD
} > "$LOG" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -E "exit=|Tests|^## |failed|Error|skipped|^ ?[MA?] |^#" | head -80
