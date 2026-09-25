#!/usr/bin/env bash
# Commits the engine session's records at 10:30 UTC (2026-09-25), by path, then merges origin/main and pushes:
# J-RELEASE-RECORD round 2 (its commit's retained artifacts, replay, check, and close verdict) and its landing logs,
# J-COLLAPSE-SIZE-PROBE's two rounds and E27's amendment, the J-RELEASE-POPUPS and J-COLLAPSE-SIZE briefs, and the plan.
set -eu
cd /c/Users/mikes/WebstormProjects/scaffold
E=.orkestrel/veneer/engine
git add -- \
	"$E/plan.md" \
	"$E/decisions.md" \
	"$E/tools/plan-1030.py" \
	"$E/tools/e27-amend-collapse-size.py" \
	"$E/tools/commit-records-1030.sh" \
	"$E/tools/commit-release-record-2.sh" \
	"$E/tools/replay-release-record-2.sh" \
	"$E/tools/w2-merge-main-release-record.log.txt" \
	"$E/tools/w2-land-2d-release-record.log.txt" \
	$E/units/j-release-record* \
	$E/units/j-collapse-size* \
	"$E/units/j-release-popups-brief.md"
git diff --cached --stat | tail -1
git commit -q -F - <<'MSG'
Land J-RELEASE-RECORD, rule the Collapse calc-size bases, and dispatch POPUPS and COLLAPSE-SIZE

J-RELEASE-RECORD landed as Veneer 86491c2 after round 2 closed on the mutation replay and one
objective check of the door cases. J-COLLAPSE-SIZE-PROBE's two rounds rule E27's bases:
min-content for a horizontal show, auto for a vertical show and every hide, with growth
followed and a bordered show reaching its border-box size as the accepted differences.
J-RELEASE-POPUPS and J-COLLAPSE-SIZE write from 86491c2 beside J-RELEASE-PRIMITIVES.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
git log --oneline -1
git fetch -q origin
git merge --no-edit -q origin/main
git push -q origin main
git log --oneline -1 origin/main
