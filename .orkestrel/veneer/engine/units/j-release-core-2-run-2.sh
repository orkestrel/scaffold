#!/usr/bin/env bash
# Runs one test file in the src:browser project and writes its output to a log under
# tmp/j-release-core/. Usage: bash tmp/j-release-core/run-2.sh <test file> <log name>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core || exit 1
npx vitest run --config vite.config.ts --no-cache --project src:browser "$1" > "tmp/j-release-core/$2.log.txt" 2>&1
status=$?
echo "exit $status" >> "tmp/j-release-core/$2.log.txt"
grep -E "^\s+(×|✓ .*\(|Tests )|Tests  |AssertionError|exit " "tmp/j-release-core/$2.log.txt" | sed 's/\x1b\[[0-9;]*m//g' | tail -40
