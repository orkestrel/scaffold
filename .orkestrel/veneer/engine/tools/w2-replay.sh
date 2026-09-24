#!/usr/bin/env bash
# The Orchestrator's own re-run of one W2 unit's mutations through the unit's retained whole-file
# instrument (units/j-<unit>-mutations[-<round>].py, whose ROOT names the unit's worktree and whose LOG
# sits under the worktree's tmp/j-<unit>/), with the Orchestrator's independent digest of every owned
# source before and after. Run only after every audit lane reading the worktree has returned.
# Usage: bash w2-replay.sh <unit> [round] [mutation names...]
set -u
UNIT="$1"; ROUND="${2:-1}"; shift 2 2>/dev/null || shift $#
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
SUFFIX=""; [ "$ROUND" != "1" ] && SUFFIX="-$ROUND"
LOG="$U/j-$UNIT-mutations$SUFFIX-orchestrator.log.txt"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
cd "$TREE" || exit 1
UNITLOG=$(grep -o "tmp/j-$UNIT/[A-Za-z0-9_.-]*log[A-Za-z0-9_.-]*" "$U/j-$UNIT-mutations$SUFFIX.py" | head -1)
{
	echo "# The Orchestrator's re-run of the J-${UNIT^^} round-$ROUND mutations (2026-09-24, Chromium 153.0.8010.12, the unit's whole-file instrument j-$UNIT-mutations$SUFFIX.py as retained; worktree $TREE)"
	echo "worktree: $(git log --oneline -1); selection: ${*:-the whole list}"
	sha256sum src/browser/*.ts tests/src/browser/*.ts guides/veneer.md > "$S/w2-$UNIT-$ROUND-before.sha256"
	echo "--- results (the instrument's stdout)"
	python "$U/j-$UNIT-mutations$SUFFIX.py" "$@"
	echo "--- the instrument's log rows for this run ($UNITLOG)"
	[ -n "$UNITLOG" ] && grep -v "^#" "$UNITLOG"
	echo "--- the Orchestrator's restore check"
	sha256sum -c "$S/w2-$UNIT-$ROUND-before.sha256" | grep -v ": OK$" || echo "every source restored byte for byte (the Orchestrator's digest)"
	echo "--- status after"
	git status --short
} > "$LOG" 2>&1
grep -n "GREEN\|receipt\|restored\|Traceback\|Error\|MISSED\|NOREPORT\|^[ AM?][ AMD?] " "$LOG" | cut -c1-200 | head -30
