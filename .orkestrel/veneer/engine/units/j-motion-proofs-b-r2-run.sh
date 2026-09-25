#!/usr/bin/env bash
# Round 2: runs one browser test file through the src:browser project and writes its log under
# tmp/j-motion-proofs-b/r2-logs/<label>.log.txt, then prints the summary and the assertion lines.
#
# Usage: bash tmp/j-motion-proofs-b/r2-run.sh <label> [file]
# The file defaults to tests/src/browser/Carousel.test.ts.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
logs="$worktree/tmp/j-motion-proofs-b/r2-logs"
label="$1"
file="${2:-tests/src/browser/Carousel.test.ts}"
mkdir -p "$logs"
cd "$worktree" || exit 1
npx vitest run --config vite.config.ts --no-cache --project src:browser "$file" > "$logs/$label.log.txt" 2>&1
status=$?
echo "$label exit $status"
sed 's/\x1b\[[0-9;]*m//g' "$logs/$label.log.txt" | grep -E "Test Files|Tests  |FAIL |Error:|^\s*[-+] |❯ tests" | head -40
