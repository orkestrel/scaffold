#!/usr/bin/env bash
# Round 2: runs one browser test file, optionally filtered by a test-name pattern, and writes the log
# under tmp/j-release-record/logs/r2-<label>.log.txt. Usage: r2-run.sh <label> <file> [pattern]
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record || exit 1
mkdir -p tmp/j-release-record/logs
label="r2-$1"
file="$2"
pattern="$3"
log="tmp/j-release-record/logs/$label.log.txt"
if [ -n "$pattern" ]; then
	npx vitest run --config vite.config.ts --no-cache --project src:browser "$file" -t "$pattern" >"$log" 2>&1
else
	npx vitest run --config vite.config.ts --no-cache --project src:browser "$file" >"$log" 2>&1
fi
code=$?
echo "exit $code"
grep -E "Test Files|Tests  |×|FAIL|AssertionError|❯ .*test\.ts:[0-9]+" "$log" | head -60
