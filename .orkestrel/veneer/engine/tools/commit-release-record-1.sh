#!/usr/bin/env bash
# Commits J-RELEASE-RECORD round 1 in its worktree as two commits, the unit's own files and then the Orchestrator's
# integration of its report-only tests/setupBrowser.ts patch, and retains the round under units/ in the same action
# (2026-09-25): the status, the diff, the instruments, each mutant as a diff against the committed source, and the red,
# mutation, and green logs, with the j-release-record- prefix. The report is retained already.
# Usage: bash commit-release-record-1.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-release-record
cd "$TREE" || exit 1
git status --short > "$UNITS/j-release-record-status.txt"
git add -- guides/veneer.md src/browser/Carousel.ts src/browser/Collapse.ts src/browser/Dropdown.ts src/browser/Tab.ts \
	src/browser/Toast.ts src/browser/helpers.ts tests/src/browser/Carousel.test.ts tests/src/browser/Collapse.test.ts \
	tests/src/browser/Dropdown.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Toast.test.ts \
	tests/src/browser/helpers.test.ts
git commit -q -F - <<'MSG'
Write every recorded engine write through the snapshot, and save no target a call never changes (J-RELEASE-RECORD)

recordHostWrite takes the snapshot and makes each recorded write through its write, so the
call's record and the lifetime's record come from one step (E35 unit 2a). Carousel, Collapse,
Tab, Toast, and Dropdown drop their call-start #save and #apply. Tab reads its selection at
the take, and its planned attributes join only a live or pending record (E25 as E35 narrowed it).

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
echo "unit commit exit=$?"
git add -- tests/setupBrowser.ts
git commit -q -F - <<'MSG'
Integrate J-RELEASE-RECORD's shared DROPDOWN_WRITE_BACKS row

The unit's report-only patch: a hide on a toggle already reading aria-expanded="false" writes
nothing under the change-aware write, so the row that took over at that write is unreachable.
The replacement row reaches the same write-back rule through a write that changes the attribute.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
echo "integration commit exit=$?"
git log --oneline -3
git status --short
git diff b8c6a08 HEAD > "$UNITS/j-release-record.diff"
for f in mutate.sh baseline-reading.sh run.sh splice.mjs setupBrowser.patch; do cp "$T/$f" "$UNITS/j-release-record-$f"; done
for m in Carousel Collapse Dropdown Tab Toast helpers; do
	diff -u "src/browser/$m.ts" "$T/mutants/$m.ts" > "$UNITS/j-release-record-mutant-$m.diff"
done
diff -u src/browser/Tab.ts "$T/mutants/Tab-reread.ts" > "$UNITS/j-release-record-mutant-Tab-reread.diff"
for f in "$T"/mutants/*-save.txt; do cp "$f" "$UNITS/j-release-record-mutant-$(basename "$f")"; done
for f in "$T"/logs/red-*.log.txt "$T"/logs/m[123]-*.log.txt "$T"/logs/green-*.log.txt "$T"/logs/dropdown-patched-table-probe.log.txt; do
	cp "$f" "$UNITS/j-release-record-$(basename "$f")"
done
ls "$UNITS" | grep -c "^j-release-record-"
