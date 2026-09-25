#!/usr/bin/env bash
# Successor of compare-runs.sh for J-COLLAPSE-SIZE-PROBE round 2. Compares the ROW and CONTROL lines of
# a round-1 log with a round-2 log after dropping the host row from both and every round-2 label
# (`paired.`, `boxed.`, `control.paired.`, `control.boxed.`, `compare.paired.`, `compare.boxed.`)
# from the round-2 log, so the diff reads round 1's rows alone.
# Usage: bash tmp/j-collapse-size/compare-round1.sh <round-1 log> <round-2 log>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size || exit 1
grep -E '^(ROW|CONTROL) ' "$1" | grep -v '^ROW host\.' > "compare-round1-a.txt"
grep -E '^(ROW|CONTROL) ' "$2" | grep -v '^ROW host\.' | grep -vE '^(ROW|CONTROL) (paired|boxed|control\.paired|control\.boxed|compare\.paired|compare\.boxed)\.' > "compare-round1-b.txt"
echo "round-1 lines: $(wc -l < compare-round1-a.txt); round-2 lines kept: $(wc -l < compare-round1-b.txt)"
if diff compare-round1-a.txt compare-round1-b.txt; then echo "identical: $1 $2"; else echo "differ: $1 $2"; fi
rm -f compare-round1-a.txt compare-round1-b.txt
