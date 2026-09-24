#!/usr/bin/env bash
# The Orchestrator's round-3 check of J-INTEGRATION: the scoped gates, then the unit's round-3 mutation runner
# every browser source and test before and after. Run with no lane reading the worktree.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration
LOG=$U/j-integration-mutations-3-orchestrator.log.txt
bash "$S/w2-gates-scoped.sh" integration 3 > /dev/null 2>&1
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-INTEGRATION round-3 mutations (2026-09-24, Chromium 153.0.8010.12), worktree $TREE"
	find src/browser src/styles tests/src/browser guides/veneer.md -type f \( -name '*.ts' -o -name '*.scss' -o -name '*.md' \) -print0 | sort -z | xargs -0 sha256sum > "$S/replay-integration-3-before.sha256"
	bash tmp/j-integration/mutations-3.sh; echo "mutations-3 exit=$?"
	find src/browser src/styles tests/src/browser guides/veneer.md -type f \( -name '*.ts' -o -name '*.scss' -o -name '*.md' \) -print0 | sort -z | xargs -0 sha256sum > "$S/replay-integration-3-after.sha256"
	if diff -q "$S/replay-integration-3-before.sha256" "$S/replay-integration-3-after.sha256" > /dev/null; then echo "every source restored byte for byte (the Orchestrator's digest)"; else echo "SOURCES DIFFER after the run"; diff "$S/replay-integration-3-before.sha256" "$S/replay-integration-3-after.sha256"; fi
	echo "--- mutations-3.summary.log.txt"
	cat tmp/j-integration/mutations-3.summary.log.txt
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$U/j-integration-gates-3.log.txt" | head -12
grep -n "exit=\|restored byte\|DIFFER" "$LOG" | head -6
