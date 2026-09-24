#!/usr/bin/env bash
# The Orchestrator's own re-run of the J-COLLAPSE round-2 mutations through the unit's retained
# whole-file instrument (j-collapse-mutations-2.py: applies one mutation, runs the whole named test
# file, reads Vitest's JSON report, restores the bytes, and writes its own digest receipt), with the
# Orchestrator's independent digest of every owned source before and after. Run only after every
# audit lane reading the worktree has returned. Arguments: the mutation names to replay (the
# instrument's own selection); none replays the whole list. Derived from the round-1
# collapse-mutations-orchestrator.sh; what changed: the instrument, the log, and the copied unit log.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
LOG="$U/j-collapse-mutations-2-orchestrator.log.txt"
cd /c/Users/mikes/WebstormProjects/veneer-collapse || exit 1
{
	echo "# The Orchestrator's re-run of the J-COLLAPSE round-2 mutations (2026-09-24, Chromium 153.0.8010.12, the unit's whole-file instrument j-collapse-mutations-2.py as retained)"
	echo "worktree: $(git log --oneline -1); selection: ${*:-the whole list}"
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/collapse-2-orchestrator-before.sha256"
	echo "--- results (the instrument's stdout)"
	python "$U/j-collapse-mutations-2.py" "$@"
	echo "--- the instrument's log rows for this run"
	grep -v "^#" tmp/j-collapse/mutations-round-2.log.txt
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/collapse-2-orchestrator-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "EXACT\|JOINED\|GREEN\|receipt\|restored\|Traceback\|Error\|^[ AM?][ AMD?] " "$LOG" | cut -c1-220 | head -80
