#!/usr/bin/env bash
# Claim 13, T1 pass 1: the script's own commands are `runtime` and `resolution`, not `apply`.
set -u
T="C:/Users/mikes/WebstormProjects/test"
R="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
cd "$T" || exit 1
totals() { sed 's/\x1b\[[0-9;]*m//g' "$1" | grep -E "Tests  " | tail -1; }
run() { local label="$1"; shift; "$@" > "$out/mut-$label.log.txt" 2>&1; echo "$label: exit=$? $(totals "$out/mut-$label.log.txt")"; }
python "$R/t1-instruments/mutate.py" backup && python "$R/t1-instruments/mutate.py" runtime && echo "t1-pass1 runtime applied"
run t1p1-core npm run test:src:core
run t1p1-browser npm run test:src:browser
python "$R/t1-instruments/mutate.py" restore && echo "restored: $(git status --short | grep -v '^?? tmp/' | wc -l) tracked changes"
python "$R/t1-instruments/mutate.py" backup && python "$R/t1-instruments/mutate.py" resolution && echo "t1-pass1 resolution applied"
run t1p1-resolution npm run check
python "$R/t1-instruments/mutate.py" restore && echo "restored: $(git status --short | grep -v '^?? tmp/' | wc -l) tracked changes"
