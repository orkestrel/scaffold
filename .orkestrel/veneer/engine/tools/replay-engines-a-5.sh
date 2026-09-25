#!/usr/bin/env bash
# The Orchestrator's check of J-SAMEWAY-ENGINES-A round 5 (fb179a9 and the integration 63a153b on unit/engines-a, over
# 3f62d64); successor of replay-engines-a-4.sh. The round renames and adds one case, so no base red run applies beyond
# the instrument's N5 row. It runs the scoped gates, then the unit's instrument after a check that it is byte-identical
# to the retained units/j-sameway-engines-a-mutations-5.py, with every killed row whose message does not name an
# assertion listed, and every source checked restored.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a
LOG="$U/j-sameway-engines-a-mutations-5-orchestrator.log.txt"
cp "$TREE/tmp/j-engines-a/mutations-5.py" "$U/j-sameway-engines-a-mutations-5.py"
cp "$TREE/tmp/j-engines-a/guide-5.patch" "$U/j-sameway-engines-a-guide-5.patch"
bash "$S/w2-gates-scoped.sh" engines-a 5 > /dev/null 2>&1
git -C "$TREE" diff 3f62d64 HEAD > "$U/j-sameway-engines-a-5.diff"
git -C "$TREE" diff --name-status 3f62d64 HEAD > "$U/j-sameway-engines-a-5-status.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's re-run of the J-SAMEWAY-ENGINES-A round-5 mutations (2026-09-25, Chromium 153.0.8010.12), worktree $TREE at $(git log --oneline -1)"
	a=$(sha256sum tmp/j-engines-a/mutations-5.py | cut -c1-64); b=$(sha256sum "$U/j-sameway-engines-a-mutations-5.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/replay-engines-a-5-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-engines-a/mutations-5.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure message does not name an assertion"
	grep "| KILLED |" tmp/j-engines-a/mutations-5.log.txt | grep -v -E "AssertionError|[|] .?expected " || echo "none"
	echo "--- the instrument's log"
	cat tmp/j-engines-a/mutations-5.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/replay-engines-a-5-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "exit=\| Tests " "$S/w2-gates-scoped-engines-a-5.log" | head -12
grep -n "instrument\|restored\|DIFFER\|none$\|MISSED\|missed\|rows " "$LOG" | cut -c1-200 | head -20
