#!/usr/bin/env bash
# The Orchestrator's round-3 check of J-SANITIZER: the scoped gates, then the unit's whole instrument run from
# the worktree (its ROOT is derived from its own path), with the Orchestrator's own digest of every browser
# source and test before and after. Run with no lane reading the worktree.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer
LOG=$U/j-sanitizer-mutations-3-orchestrator.log.txt
bash "$S/w2-gates-scoped.sh" sanitizer 3 > /dev/null 2>&1
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-SANITIZER round-3 instrument (2026-09-24, Chromium 153.0.8010.12), worktree $TREE"
	find src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md -type f \( -name '*.ts' -o -name '*.md' \) -print0 | sort -z | xargs -0 sha256sum > "$S/replay-sanitizer-3-before.sha256"
	python tmp/j-sanitizer/mutations.py; echo "instrument exit=$?"
	find src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md -type f \( -name '*.ts' -o -name '*.md' \) -print0 | sort -z | xargs -0 sha256sum > "$S/replay-sanitizer-3-after.sha256"
	if diff -q "$S/replay-sanitizer-3-before.sha256" "$S/replay-sanitizer-3-after.sha256" > /dev/null; then echo "every source restored byte for byte (the Orchestrator's digest)"; else echo "SOURCES DIFFER after the run"; diff "$S/replay-sanitizer-3-before.sha256" "$S/replay-sanitizer-3-after.sha256"; fi
	echo "--- the instrument's own log"
	cat tmp/j-sanitizer/mutations.log.txt
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$U/j-sanitizer-gates-3.log.txt" | head -12
grep -n "instrument exit\|restored byte\|DIFFER\|differs\|HELD\|SURVIVED" "$LOG" | head -12
