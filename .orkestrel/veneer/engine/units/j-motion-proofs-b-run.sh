#!/usr/bin/env bash
# Runs one browser proof file of the worktree and prints its summary and its failures.
# Usage: bash tmp/j-motion-proofs-b/run.sh <Name> [label] [project]
# The log lands in tmp/j-motion-proofs-b/logs/<label>-<Name>.log.txt; the label defaults to "run"
# and the project to src:browser.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
name="$1"
label="${2:-run}"
project="${3:-src:browser}"
logs="$worktree/tmp/j-motion-proofs-b/logs"
mkdir -p "$logs"
log="$logs/$label-$name.log.txt"
cd "$worktree" || exit 1
file="tests/src/browser/$name.test.ts"
if [ "$project" != "src:browser" ]; then file="$name"; fi
npx vitest run --config vite.config.ts --no-cache --project "$project" "$file" > "$log" 2>&1
status=$?
echo "$name exit $status"
sed 's/\x1b\[[0-9;]*m//g' "$log" | grep -E "Test Files|Tests  |FAIL |^AssertionError|^Error|^[-+] |❯ tests" | head -60
exit $status
