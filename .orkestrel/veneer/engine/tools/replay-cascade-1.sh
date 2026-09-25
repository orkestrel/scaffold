#!/usr/bin/env bash
# The Orchestrator's check of J-CASCADE (commits 4765f6f and a963585 on unit/cascade, over 6dd5034): the scoped gates, then
# the unit's instrument after a check that it is byte-identical to the retained units/j-cascade-mutations.py. Its log
# carries each row's failure message, and this script lists every killed row whose message is not an AssertionError.
# The diff and status are written from the commit range.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/cascade
LOG="$U/j-cascade-mutations-orchestrator.log.txt"
bash "$S/w2-gates-scoped.sh" cascade 1 > /dev/null 2>&1
git -C "$TREE" diff 6dd5034 a963585 > "$U/j-cascade.diff"
git -C "$TREE" diff --name-status 6dd5034 a963585 > "$U/j-cascade-status.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-CASCADE mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-cascade/mutations.py | cut -c1-64); b=$(sha256sum "$U/j-cascade-mutations.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts src/styles/components/_fade.scss tests/src/browser/*.ts guides/veneer.md > "$S/replay-cascade-1-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-cascade/mutations.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message is not an AssertionError"
	grep "| KILLED" tmp/j-cascade/mutations.log.txt | grep -v "AssertionError" || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-cascade/mutations.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-cascade-1-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-cascade-1.log" | head -12
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|SURVIV\|rows " "$LOG" | cut -c1-200 | head -20
