#!/bin/bash
# Gates for the process@0.0.9 re-pin: lsp, mcp, sea, scaffold, serially.
out=/home/user/work/repin-gates.log
: > "$out"
for d in /home/user/fleet/lsp /home/user/fleet/mcp /home/user/fleet/sea /home/user/scaffold; do
  n=$(basename "$d")
  cd "$d" || { echo "$n FAIL cd" >> "$out"; continue; }
  ok=1
  for step in format:check lint:check check build test; do
    if ! npm run "$step" >> "/home/user/work/logs/repin-$n-$step.log" 2>&1; then
      echo "$n FAIL $step" >> "$out"; ok=0; break
    fi
  done
  [ $ok -eq 1 ] && echo "$n OK" >> "$out"
done
echo "REPIN-GATES-COMPLETE" >> "$out"
