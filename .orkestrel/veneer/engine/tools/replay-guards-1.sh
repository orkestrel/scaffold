#!/usr/bin/env bash
# The Orchestrator's check of J-GUARDS (commit f609bb0 on unit/guards): the scoped gates, then the unit's
# whole-file instrument with the Orchestrator's own digests. The instrument finds its root from its own
# path, so the worktree copy runs, after a check that it is byte-identical to the retained copy
# units/j-guards-mutations.py. The audit lanes read the commit through `git show`, so the instrument's
# plants in the worktree never reach them. The gate script rewrites units/j-guards.diff from HEAD, which
# the commit emptied, so the diff and status are rewritten from the commit range afterwards.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/guards
LOG="$U/j-guards-mutations-orchestrator.log.txt"
bash "$S/w2-gates-scoped.sh" guards 1 > /dev/null 2>&1
git -C "$TREE" diff b1d314d f609bb0 > "$U/j-guards.diff"
git -C "$TREE" diff --name-status b1d314d f609bb0 > "$U/j-guards-status.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-GUARDS mutations (2026-09-24, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-guards/mutations.py | cut -c1-64); b=$(sha256sum "$U/j-guards-mutations.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-guards-1-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-guards/mutations.py
	echo "instrument exit=$?"
	echo "--- the instrument's log"
	cat tmp/j-guards/mutations.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-guards-1-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$U/j-guards-gates.log.txt" | head -12
grep -n "instrument\|restored\|DIFFER\|KILLED\|HELD\|MISSED\|SURVIV" "$LOG" | cut -c1-160 | head -40
