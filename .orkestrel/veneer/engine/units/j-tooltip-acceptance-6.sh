#!/usr/bin/env bash
# J-TOOLTIP round-6 landing chain, a successor of acceptance-5.sh (left in place unedited).
# What changed and why: round 6 merges main again (J-OFFCANVAS and the styles landing), so the chain runs the landing gates
# once after that resolution: the non-mutating format and lint checks, the tree
# check, the guide, policy, and browser suites, the three builds, conformance, and the setup proof.
# Run from the worktree root. Each command's output goes to its own log under tmp/j-tooltip/, and the
# chain records every exit code in acceptance-6.log.txt; it runs every command whatever an earlier one
# returned, so the log carries each reading.
cd "$(dirname "$0")/../.." || exit 1
LOGS=tmp/j-tooltip
SUMMARY="$LOGS/acceptance-6.log.txt"
: > "$SUMMARY"

step() {
	local name="$1"
	shift
	"$@" > "$LOGS/acceptance-6-$name.log.txt" 2>&1
	local code=$?
	echo "$name exit=$code | $*" >> "$SUMMARY"
}

node tmp/j-tooltip/chromium.mjs >> "$SUMMARY" 2>&1
step format npm run format:check
step lint npm run lint:check
step check npm run check
step guides npm run test:guides
step policy npm run test:policy
step browser npm run test:src:browser
step core npm run build:src:core
step styles npm run build:src:styles
step build npm run build:src:browser
step conformance npm run test:conformance
step setup npm run test:setup
cat "$SUMMARY"
