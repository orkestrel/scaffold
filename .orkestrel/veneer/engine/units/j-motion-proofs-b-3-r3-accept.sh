#!/usr/bin/env bash
# Round 3 acceptance: runs the read-only gates and the guides project one after another, writing each
# log under r3-logs/ and printing each exit status with its summary lines.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
logs="$worktree/tmp/j-motion-proofs-b/r3-logs"
mkdir -p "$logs"
cd "$worktree" || exit 1
strip() { sed 's/\x1b\[[0-9;]*m//g' "$1"; }
npm run check > "$logs/accept-check.log.txt" 2>&1
echo "npm run check exit $?"
strip "$logs/accept-check.log.txt" | grep -E "error" | head -10
npm run lint:check > "$logs/accept-lint.log.txt" 2>&1
echo "npm run lint:check exit $?"
strip "$logs/accept-lint.log.txt" | grep -E "Found|warning|error" | head -5
npm run format:check > "$logs/accept-format.log.txt" 2>&1
echo "npm run format:check exit $?"
strip "$logs/accept-format.log.txt" | tail -3
git diff --check
echo "git diff --check exit $?"
npm run test:guides > "$logs/accept-guides.log.txt" 2>&1
echo "npm run test:guides exit $?"
strip "$logs/accept-guides.log.txt" | grep -E "Test Files|Tests  |FAIL |AssertionError"
