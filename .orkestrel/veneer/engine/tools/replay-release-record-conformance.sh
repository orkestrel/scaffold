#!/usr/bin/env bash
# Completes J-RELEASE-RECORD's replay (2026-09-25): test:conformance reads dist/src/styles/index.css, which the
# worktree had not built, so this builds the styles first and then runs conformance. It appends to the replay log.
# Usage: bash replay-release-record-conformance.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-replay.log.txt
T=tmp/j-release-record
cd "$TREE" || exit 1
{
	echo "--- conformance after the styles build (the first run found no dist/src/styles/index.css)"
	npm run build:src:styles > $T/logs/replay-build-styles.log.txt 2>&1
	echo "build:src:styles exit=$?"
	npm run test:conformance > $T/logs/replay-conformance-2.log.txt 2>&1
	echo "test:conformance exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $T/logs/replay-conformance-2.log.txt | grep -E 'Tests +[0-9]')"
	git status --short
} >> "$LOG" 2>&1
tail -4 "$LOG"
