#!/usr/bin/env bash
# Commits the engine session's records at 07:45 EDT (2026-09-25), by path, then merges origin/main and pushes:
# J-ORACLE-FIX-OFFCANVAS's audit round 5 (both lanes, the focus probe, the verdict), J-CONCERNS-B's landing logs,
# the J-PLACEMENT-141 ruling's confirmation, the host file's close, J-RELEASE-RECORD's retained round, integration,
# replay, and audit round, the J-RELEASE-PRIMITIVES brief, and the plan. Live landing logs stay out.
set -eu
cd /c/Users/mikes/WebstormProjects/scaffold
E=.orkestrel/veneer/engine
git add -- \
	"$E/plan.md" \
	"$E/tools/plan-0700.py" \
	"$E/tools/host-reading-0715.py" \
	"$E/tools/commit-records-0745.sh" \
	"$E/tools/main-reboot-153-reading.sh" \
	"$E/tools/integrate-release-record.sh" \
	"$E/tools/commit-release-record-1.sh" \
	"$E/tools/replay-release-record.sh" \
	"$E/tools/replay-release-record-conformance.sh" \
	"$E/tools/replay-release-record-conformance-2.sh" \
	"$E/tools/w2-land-rest-concerns-b.log.txt" \
	"$E/tools/w2-land-diverged-concerns-b-merge.log.txt" \
	"$E/tools/w2-land-2d-concerns-b-merge.log.txt" \
	"$E/tools/w2-merge-main-oracle-fix-offcanvas.log.txt" \
	"$E/tools/w2-land-2d-oracle-fix-offcanvas.log.txt" \
	"$E/units/host-chromium-153-reading.md" \
	"$E/units/main-reboot-153-reading.log.txt" \
	"$E/units/j-placement-141-fix-ruling.md" \
	$E/units/j-oracle-fix-offcanvas-audit-5-* \
	$E/units/j-release-record* \
	"$E/units/j-release-primitives-brief.md"
git diff --cached --stat | tail -1
git commit -q -F - <<'MSG'
Rule J-ORACLE-FIX-OFFCANVAS PASS, land J-CONCERNS-B, close the standing rows, and open J-RELEASE-RECORD's audit

Both Offcanvas lanes confirmed every code claim and failed only a prose claim the claims file
should not have carried. Its findings are bounds with one carrier each. The Orchestrator's probe
shows holdsFocus reads a root's focus where :focus stops matching without system focus, so the
helper stays.

J-CONCERNS-B landed as Veneer a65d308 over REBOOT-153, and every styles file read green, so no
standing row remains on this host. Two complete Chromium 141 runs confirm the deferred placement
shape. J-RELEASE-RECORD's round and its integration are retained and replayed, and its audit runs
on code and proof claims only. The J-RELEASE-PRIMITIVES brief waits on the Offcanvas landing.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
git log --oneline -1
git merge --no-edit -q origin/main
git push -q origin main
git log --oneline -1 origin/main
