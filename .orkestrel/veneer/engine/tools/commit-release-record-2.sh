#!/usr/bin/env bash
# Commits J-RELEASE-RECORD round 2 in its worktree and retains the round under units/ in the same action (2026-09-25):
# the status, the diff over a1041bd, the r2- instruments, each r2 mutant as a diff against the committed source, and the
# r2 logs, with the j-release-record-2- prefix. The report is retained already. Usage: bash commit-release-record-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-release-record
cd "$TREE" || exit 1
git status --short > "$UNITS/j-release-record-2-status.txt"
git add -- guides/veneer.md src/browser/Carousel.ts src/browser/Tab.ts tests/src/browser/Carousel.test.ts \
	tests/src/browser/Collapse.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Toast.test.ts \
	tests/src/browser/helpers.test.ts
git commit -q -F - <<'MSG'
Read Tab's selection after the blur as Bootstrap does, and bind each split-write door (J-RELEASE-RECORD round 2)

Tab reads the sibling's selection after its blur and pane writes, and the host's after its
active write, as Bootstrap's tab.js does; the snapshot records each write as it lands, so the
take-time read had no defect behind it. The blur-listener destroy witness now asserts the
wrapper Bootstrap's order writes before it proves the restoration. The priority half of
recordHostWrite restores through the snapshot, and each door after a split write has a case
in which a reaction destroys the engine and no later write lands. Carousel's door after the
outgoing order removal is removed, because no input reaches it.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01BY9j9qxXVLJdizDdguCY1K
MSG
echo "commit exit=$?"
git log --oneline -2
git status --short
git diff a1041bd HEAD > "$UNITS/j-release-record-2.diff"
for f in "$T"/r2-*.sh "$T"/r2-*.mjs "$T"/r2-tab-cases-*.txt; do cp "$f" "$UNITS/j-release-record-2-$(basename "$f")"; done
diff -u src/browser/Tab.ts "$T/mutants/r2-tab-take.ts" > "$UNITS/j-release-record-2-mutant-tab-take.diff"
diff -u src/browser/helpers.ts "$T/mutants/r2-helpers.ts" > "$UNITS/j-release-record-2-mutant-helpers.diff"
for f in "$T"/logs/r2-*.log.txt; do cp "$f" "$UNITS/j-release-record-2-$(basename "$f")"; done
ls "$UNITS" | grep -c "^j-release-record-2-"
