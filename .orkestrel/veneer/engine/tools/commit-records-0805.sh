#!/usr/bin/env bash
# Commits the engine session's records at 06:05 EDT (10:05 UTC, 2026-09-25), by path, then merges origin/main and
# pushes: J-ORACLE-FIX-OFFCANVAS's landing logs, J-RELEASE-RECORD's audit round 1 and its round-2 brief, the
# J-RELEASE-PRIMITIVES brief with its base, the note to the styles session, and the plan.
set -eu
cd /c/Users/mikes/WebstormProjects/scaffold
E=.orkestrel/veneer/engine
git add -- \
	"$E/plan.md" \
	"$E/tools/plan-0815.py" \
	"$E/tools/plan-note-0815.py" \
	"$E/tools/commit-records-0805.sh" \
	"$E/tools/w2-land-2d-oracle-fix-offcanvas-merge.log.txt" \
	"$E/tools/w2-land-diverged-oracle-fix-offcanvas-merge.log.txt" \
	"$E/units/note-to-styles-0815.md" \
	$E/units/j-release-record-audit-* \
	"$E/units/j-release-record-brief-2.md" \
	"$E/units/j-release-primitives-brief.md"
git diff --cached --stat | tail -1
git commit -q -F - <<'MSG'
Land J-ORACLE-FIX-OFFCANVAS, rule J-RELEASE-RECORD round 1, and dispatch RECORD round 2 and PRIMITIVES

J-ORACLE-FIX-OFFCANVAS landed as Veneer 92ca407 over E-ID-ANCHOR, with every gate green.
Both J-RELEASE-RECORD lanes failed claim 5: Tab's take-time selection read is a Bootstrap
departure with no defect behind it, now that the snapshot records at each write. Round 2
restores Bootstrap's read order and binds the priority half and each split-write door.
J-RELEASE-PRIMITIVES writes from 92ca407. J-MOTION-RECORDER and J-ANCHOR-VISIBLE wait on the
units that own their files. The styles session is told, and its dropdown-entry motion unit
waits on nothing here.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
git log --oneline -1
git fetch -q origin
git merge --no-edit -q origin/main
git push -q origin main
git log --oneline -1 origin/main
