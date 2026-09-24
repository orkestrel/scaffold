#!/usr/bin/env bash
# The Orchestrator's reproduction of the J-COLLAPSE round-2 subjective lane's referral R1 on
# Chromium 153: copies the probe test into the collapse worktree, runs that one file through the
# browser project, retains the reading beside the round's records, and removes the copy. Run only
# after every audit lane reading the worktree has returned and the replay has finished. Derived from
# collapse-probe-token-doors.sh (round 1); what changed: the probe file, the log, and the subject.
set -u
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer-collapse
PROBE=tests/src/browser/j-collapse-probe-trigger-door.test.ts
LOG="$U/j-collapse-probe-trigger-door.log.txt"
cd "$TREE" || exit 1
cp "$S/j-collapse-probe-trigger-door.test.ts" "$PROBE"
{
	echo "# The Orchestrator's probe of referral R1 (a trigger reaction adding the shown token during hide) on the J-COLLAPSE round-2 source (2026-09-24, Chromium 153.0.8010.12; the probe file is retained beside this log as j-collapse-probe-trigger-door.test.ts and was removed from the worktree after the run)"
	git log --oneline -1
	npm run test:src:browser -- "$PROBE" 2>&1
	echo "probe exit=$?"
} > "$LOG" 2>&1
rm -f "$PROBE"
cp "$S/j-collapse-probe-trigger-door.test.ts" "$U/j-collapse-probe-trigger-door.test.ts"
git status --short | grep -c "j-collapse-probe" && echo "probe copy still present" || echo "probe copy removed"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "probe R1\|Tests \|FAIL \|exit=\|Error" | cut -c1-400 | head -20
