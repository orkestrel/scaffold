#!/usr/bin/env bash
# Compares the ROW and CONTROL lines of two J-COLLAPSE-SIZE-PROBE logs, ignoring the host row.
# Usage: bash tmp/j-collapse-size/compare-runs.sh <log a> <log b>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size || exit 1
grep -E '^(ROW|CONTROL) ' "$1" | grep -v '^ROW host\.' > "compare-a.txt"
grep -E '^(ROW|CONTROL) ' "$2" | grep -v '^ROW host\.' > "compare-b.txt"
if diff compare-a.txt compare-b.txt; then echo "identical: $1 $2"; else echo "differ: $1 $2"; fi
rm -f compare-a.txt compare-b.txt
