#!/usr/bin/env bash
# Run the gate chain in one checkout and log each gate's exit code. Usage: gates.sh <dir> <label>
D=$1; L=$2; LOG=/home/user/work/logs/gates-$L.log; : > $LOG
cd "$D" || exit 2
for g in format:check lint:check check build test; do
  start=$(date +%s)
  if npm run "$g" > /home/user/work/logs/gates-$L-${g//:/-}.log 2>&1; then echo "$L $g exit=0 $(( $(date +%s) - start ))s" >> $LOG; else echo "$L $g exit=$? $(( $(date +%s) - start ))s FAILED" >> $LOG; tail -40 /home/user/work/logs/gates-$L-${g//:/-}.log >> $LOG; echo "$L GATES RED at $g" >> $LOG; exit 1; fi
done
echo "$L GATES GREEN" >> $LOG
