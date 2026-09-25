#!/usr/bin/env bash
# The Orchestrator's check of J-ORACLE-RECORD round 2 (c66e317 on unit/oracle-record over 9ea360d), 2026-09-25. Successor of replay-oracle-record-1.sh: it also retains the plant tmp/j-oracle/mutation.test.ts.
# Retains the unit's instrument and census, runs the format, lint, and type gates, then test:conformance and test:setup,
# then the unit's mutation instrument after a check that it is byte-identical to the retained copy. It lists every killed
# row whose failure line does not name an assertion, and reads the sources back unchanged. Derived from replay-concerns-a-2.sh.
set -u
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record
LOG="$U/j-oracle-record-replay-2.log.txt"
cp "$TREE/tmp/j-oracle/mutations.py" "$U/j-oracle-record-mutations-2.py"; cp "$TREE/tmp/j-oracle/mutation.test.ts" "$U/j-oracle-record-mutation-2.test.ts"
mkdir -p "$U/j-oracle-record-census-2"
cp "$TREE"/tmp/j-oracle/census/*.json "$U/j-oracle-record-census-2/"
git -C "$TREE" diff 9ea360d HEAD -- tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts > "$U/j-oracle-record-2.diff"
git -C "$TREE" diff --name-status 9ea360d HEAD > "$U/j-oracle-record-2-status.txt"
cd "$TREE" || exit 1
{
	echo "# The Orchestrator's replay of J-ORACLE-RECORD round 2 (2026-09-25, Chromium 153), worktree $TREE at $(git log --oneline -1)"
	for step in format:check lint:check check; do npm run "$step" > /dev/null 2>&1; echo "$step exit=$?"; done
	for step in test:conformance test:setup; do
		npm run "$step" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "Test Files|Tests  |FAIL |AssertionError|Unhandled" | head -20
		echo "$step exit=${PIPESTATUS[0]}"
	done
	a=$(sha256sum tmp/j-oracle/mutations.py | cut -c1-64); b=$(sha256sum "$U/j-oracle-record-mutations-2.py" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "instrument: the worktree copy equals the retained copy ($a)"; else echo "INSTRUMENT DIFFERS: worktree $a, retained $b"; exit 3; fi
	sha256sum src/browser/*.ts tests/setupServer.ts tests/conformance.test.ts > "$U/../tools/replay-oracle-record-2-before.sha256"
	echo "--- results (the instrument's stdout)"
	python tmp/j-oracle/mutations.py
	echo "instrument exit=$?"
	echo "--- killed rows whose failure line does not name an assertion"
	grep "| KILLED | KILLED |" tmp/j-oracle/mutations.log.txt | grep -v "AssertionError" || echo "none"
	echo "--- the instrument's rows"
	grep "^| " tmp/j-oracle/mutations.log.txt
	grep "mismatches" tmp/j-oracle/mutations.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$U/../tools/replay-oracle-record-2-before.sha256" | grep -v ": OK$" || echo "every source unchanged byte for byte"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -E "exit=|Tests  |instrument|none$|mismatches|unchanged|DIFFER" "$LOG" | head -30
