#!/usr/bin/env bash
# Completes J-RELEASE-RECORD's replay (2026-09-25), successor to replay-release-record-conformance.sh: the bundle scan
# in test:conformance reads dist/src/core/index.js, so this runs the full build and then conformance. It appends to the
# replay log. Usage: bash replay-release-record-conformance-2.sh
set -u
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record
LOG=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-record-replay.log.txt
T=tmp/j-release-record
cd "$TREE" || exit 1
{
	echo "--- conformance after the full build (the second run found no dist/src/core/index.js)"
	npm run build > $T/logs/replay-build.log.txt 2>&1
	echo "build exit=$?"
	npm run test:conformance > $T/logs/replay-conformance-3.log.txt 2>&1
	echo "test:conformance exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $T/logs/replay-conformance-3.log.txt | grep -E 'Tests +[0-9]')"
	git status --short
} >> "$LOG" 2>&1
tail -4 "$LOG"
